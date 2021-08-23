import { BingoBoard, BingoBoardSelector } from 'components';
import { BingoSquareData } from 'models';
import {
  Box,
  Button,
  Card,
  CssBaseline,
  ThemeProvider,
  createTheme,
  makeStyles,
  useMediaQuery
} from '@material-ui/core';
import {
  generateBingoBoard,
  getBingoBoards,
  getBoardNameFromUrl,
  persistBingoBoard,
  persistSelectedBingoBoardUrl,
  retrieveBingoBoard,
  retrieveSelectedBingoBoardUrl,
  sheetrockHandler
} from 'helpers';
import { gradientButtonStyles, primary, secondary } from 'variables';
import { useMemo, useState } from 'react';

function App(): JSX.Element {
  const useStyles = makeStyles(theme => ({
    wrapper: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    header: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    board: {
      padding: theme.spacing(1),
      width: '100%',
      flexGrow: 1
    },
    generateButton: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(2),
      ...gradientButtonStyles
    }
  }));
  const classes = useStyles();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            light: primary.light,
            main: primary.main,
            dark: primary.dark,
            contrastText: primary.contrastText
          },
          secondary: {
            light: secondary.light,
            main: secondary.main,
            dark: secondary.dark,
            contrastText: secondary.contrastText
          }
        }
      }),
    [prefersDarkMode]
  );

  const persistedSelectedBingoBoardUrl = retrieveSelectedBingoBoardUrl();
  const initialSelectedBingoBoardUrl = persistedSelectedBingoBoardUrl ? persistedSelectedBingoBoardUrl : '';
  const [selectedBingoBoardUrl, setSelectedBingoBoardUrl] = useState(initialSelectedBingoBoardUrl);

  let initialBingoBoardRows: Array<Array<BingoSquareData>> = [];
  if (initialBingoBoardRows) {
    const targetBoard = getBoardNameFromUrl(initialSelectedBingoBoardUrl);
    if (targetBoard) {
      const persistedBoard = retrieveBingoBoard(targetBoard);
      if (persistedBoard) {
        initialBingoBoardRows = persistedBoard;
      }
    }
  }
  const [bingoBoardRows, setBingoBoardRows] =
    useState<Array<Array<BingoSquareData>>>(initialBingoBoardRows);


  const updateBingoBoard: (sheetUrl: string, boardRows: Array<Array<BingoSquareData>>) => void = (
    sheetUrl,
    boardRows
  ) => {
    setBingoBoardRows(boardRows);

    const targetBoard = getBoardNameFromUrl(sheetUrl);
    if (targetBoard) {
      persistBingoBoard(targetBoard, boardRows);
    }
  };

  const generateNewBingoBoard = (sheetUrl) => {
    sheetrockHandler(sheetUrl, (sheetUrl, boardOptions) => {
      const boardRows = generateBingoBoard(boardOptions);
      updateBingoBoard(sheetUrl, boardRows);
    });
  };

  const handleUpdateSelectedBingoBoard = (nextSelectedBingoBoard: string) => {
    setSelectedBingoBoardUrl(nextSelectedBingoBoard);
    persistSelectedBingoBoardUrl(nextSelectedBingoBoard);

    const targetBoard = getBoardNameFromUrl(nextSelectedBingoBoard);
    if (targetBoard) {
      const persistedBoard = retrieveBingoBoard(targetBoard);
      if (persistedBoard) {
        setBingoBoardRows(persistedBoard);
      } else {
        generateNewBingoBoard(nextSelectedBingoBoard);
      }
    }
  };

  const handleGenerateBoardClick = () => {
    generateNewBingoBoard(selectedBingoBoardUrl);
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
    updateBingoBoard(selectedBingoBoardUrl, updatedBingoBoardRows);
  };
  
  const bingoBoards = getBingoBoards();

  const generateButtonIsDisabled = selectedBingoBoardUrl === '';
  const shouldRenderBingoBoard = bingoBoardRows.length === 5;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.wrapper}>
          <Card className={classes.header}>
            <BingoBoardSelector
              options={bingoBoards}
              currentSelection={selectedBingoBoardUrl}
              onUpdateSelection={handleUpdateSelectedBingoBoard}
            />
            <Button
              className={classes.generateButton}
              disabled={generateButtonIsDisabled}
              onClick={handleGenerateBoardClick}
            >
              Generate New Board
            </Button>
          </Card>
          {shouldRenderBingoBoard && (
            <Card className={classes.board}>
              <BingoBoard rows={bingoBoardRows} onToggleSquare={handleToggleSquare} />
            </Card>
          )}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
