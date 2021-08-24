import { BingoBoard, BingoBoardSelector, ExportButton, ImportButton } from 'components';
import { BingoBoardOption, BingoSquareData } from 'models';
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
  getInitialBingoBoardRows,
  getInitialSelectedBingoBoardOption,
  persistBingoBoard,
  persistSelectedBingoBoardName,
  querySheetrock,
  retrieveBingoBoard
} from 'helpers';
import { gradientButtonStyles, primary, secondary } from 'variables';
import { useMemo, useState } from 'react';

import { useTitle } from 'react-use';

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
    actions: {
      display: 'flex',
      alignItems: 'center'
    },
    actionButton: {
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

  const initialSelectedBingoBoardOption = getInitialSelectedBingoBoardOption();
  const [selectedBingoBoardOption, setSelectedBingoBoardOption] = useState<BingoBoardOption>(
    initialSelectedBingoBoardOption
  );

  const initialBingoBoardRows = getInitialBingoBoardRows(initialSelectedBingoBoardOption.label);
  const [bingoBoardRows, setBingoBoardRows] =
    useState<Array<Array<BingoSquareData>>>(initialBingoBoardRows);

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

  const bingoBoards = getBingoBoards();

  const actionButtonIsDisabled = selectedBingoBoardOption.label === '';
  const shouldRenderBingoBoard = bingoBoardRows.length === 5;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.wrapper}>
          <Card className={classes.header}>
            <BingoBoardSelector
              options={bingoBoards}
              currentSelection={selectedBingoBoardOption.url}
              onUpdateSelection={handleUpdateSelectedBingoBoardOption}
            />
            <div className={classes.actions}>
              <ExportButton bingoBoardRows={bingoBoardRows} disabled={actionButtonIsDisabled} />
              <ImportButton disabled={actionButtonIsDisabled} onImport={handleImportBoard} />
              <Button
                className={classes.actionButton}
                disabled={actionButtonIsDisabled}
                onClick={handleGenerateBoardClick}
              >
                Generate New Board
              </Button>
            </div>
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
