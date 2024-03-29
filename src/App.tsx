import {
  Alert,
  Box,
  CssBaseline,
  Snackbar,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery
} from '@mui/material';
import { BingoBoard, Header } from 'components';
import { BingoBoardOption, BingoSquareData, SnackbarSeverity } from 'models';
import {
  generateBingoBoard,
  getInitialBingoBoardRows,
  getInitialSelectedBingoBoardOption,
  persistBingoBoard,
  persistSelectedBingoBoardName,
  querySheetrock,
  retrieveBingoBoard
} from 'helpers';
import { primary, secondary } from 'variables';
import { useMemo, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { useTitle } from 'react-use';

function App(): JSX.Element {
  const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: `70px 16px 1fr`,
      height: '100vh',
      width: '100%'
    },
    headerContainer: {
      gridColumn: 1,
      gridRow: 1
    },
    boardContainer: {
      gridColumn: 1,
      gridRow: 3,
      margin: theme.spacing(1)
    },
    placeholder: {
      display: 'flex',
      justifyContent: 'center'
    }
  }));
  const classes = useStyles();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: primary.main
          },
          secondary: {
            main: secondary.main
          }
        }
      }),
    [prefersDarkMode]
  );

  const initialSelectedBingoBoardOption = getInitialSelectedBingoBoardOption();
  const [selectedBingoBoardOption, setSelectedBingoBoardOption] = useState<BingoBoardOption>(
    initialSelectedBingoBoardOption
  );

  const initialBingoBoardRows = getInitialBingoBoardRows(initialSelectedBingoBoardOption.label);
  const [bingoBoardRows, setBingoBoardRows] =
    useState<Array<Array<BingoSquareData>>>(initialBingoBoardRows);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>(undefined);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const displaySnackbar: (severity: SnackbarSeverity, message: string) => void = (
    severity,
    message
  ) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const updateCurrentBingoBoard: (
    boardName: string,
    boardRows: Array<Array<BingoSquareData>>
  ) => void = (boardName, boardRows) => {
    setBingoBoardRows(boardRows);
    if (boardName) {
      persistBingoBoard(boardName, boardRows);
    }
  };

  const generateNewBingoBoard: (sheetUrl: string) => void = sheetUrl => {
    querySheetrock(sheetUrl, (boardName, boardOptions) => {
      const boardRows = generateBingoBoard(boardOptions);
      updateCurrentBingoBoard(boardName, boardRows);
    });
  };

  const handleUpdateSelectedBingoBoardOption = (nextSelectedBingoBoardOption: BingoBoardOption) => {
    setSelectedBingoBoardOption(nextSelectedBingoBoardOption);
    persistSelectedBingoBoardName(nextSelectedBingoBoardOption.label);

    const persistedBoard = retrieveBingoBoard(nextSelectedBingoBoardOption.label);
    if (persistedBoard) {
      setBingoBoardRows(persistedBoard);
    } else {
      generateNewBingoBoard(nextSelectedBingoBoardOption.url);
    }
  };

  const handleGenerateBoardClick = () => {
    generateNewBingoBoard(selectedBingoBoardOption.url);
  };

  const handleToggleSquare = (rowIndex: number, squareIndex: number) => {
    const updatedBingoBoardRows = bingoBoardRows.map((row, index) => {
      if (rowIndex === index) {
        return row.map((squareData, index) => {
          if (squareIndex === index) {
            const { toggled } = squareData;
            return {
              ...squareData,
              toggled: !toggled
            };
          }
          return squareData;
        });
      }
      return row;
    });
    updateCurrentBingoBoard(selectedBingoBoardOption.label, updatedBingoBoardRows);
  };

  const handleImportBoard: (boardRows: Array<Array<BingoSquareData>>) => void = boardRows => {
    updateCurrentBingoBoard(selectedBingoBoardOption.label, boardRows);
  };

  const title = selectedBingoBoardOption.label
    ? `Bingo - ${selectedBingoBoardOption.label}`
    : 'Bingo';
  useTitle(title);

  const renderMainContent: () => JSX.Element = () => {
    const shouldRenderBingoBoard = bingoBoardRows.length === 5;
    if (shouldRenderBingoBoard) {
      return <BingoBoard rows={bingoBoardRows} onToggleSquare={handleToggleSquare} />;
    }
    return (
      <Typography variant="h5" className={classes.placeholder}>
        Select a board to get started!
      </Typography>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.wrapper}>
          <div className={classes.headerContainer}>
            <Header
              currentBingoBoardSelection={selectedBingoBoardOption}
              onUpdateBingoBoardSelection={handleUpdateSelectedBingoBoardOption}
              bingoBoardRows={bingoBoardRows}
              onBoardImport={handleImportBoard}
              onGenerateBoard={handleGenerateBoardClick}
              displaySnackbar={displaySnackbar}
            />
          </div>
          <div className={classes.boardContainer}>{renderMainContent()}</div>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
          </Snackbar>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
