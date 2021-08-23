import { BingoBoard, BingoBoardSelector } from 'components';
import { BingoSquareData, BoardOptionCallback } from 'models';
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
  persistSelectedBingoBoard,
  retrieveBingoBoard,
  retrieveSelectedBingoBoard,
  sheetrockHandler
} from 'helpers';
import { primary, secondary } from 'variables';
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
      background: `linear-gradient(45deg, ${primary.main} 30%, ${secondary.main} 90%)`,
      color: primary.contrastText,
      boxShadow: `0 3px 5px 2px ${secondary.mainShadow}`
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

  const persistedSelectedBingoBoard = retrieveSelectedBingoBoard();
  const initialSelectedBingoBoard = persistedSelectedBingoBoard ? persistedSelectedBingoBoard : '';
  const [selectedBingoBoard, setSelectedBingoBoard] = useState(initialSelectedBingoBoard);

  let initialBingoBoardRows: Array<Array<BingoSquareData>> = [];
  if (initialBingoBoardRows) {
    const targetBoard = getBoardNameFromUrl(initialSelectedBingoBoard);
    if (targetBoard) {
      const persistedBoard = retrieveBingoBoard(targetBoard);
      if (persistedBoard) {
        initialBingoBoardRows = persistedBoard;
      }
    }
  }
  const [bingoBoardRows, setBingoBoardRows] =
    useState<Array<Array<BingoSquareData>>>(initialBingoBoardRows);

  const bingoBoards = getBingoBoards();

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

  const generateNewBingoBoard: BoardOptionCallback = (sheetUrl, boardOptions) => {
    const boardRows = generateBingoBoard(boardOptions);
    updateBingoBoard(sheetUrl, boardRows);
  };

  const handleUpdateSelectedBingoBoard = (nextSelectedBingoBoard: string) => {
    setSelectedBingoBoard(nextSelectedBingoBoard);
    persistSelectedBingoBoard(nextSelectedBingoBoard);

    const targetBoard = getBoardNameFromUrl(nextSelectedBingoBoard);
    if (targetBoard) {
      const persistedBoard = retrieveBingoBoard(targetBoard);
      if (persistedBoard) {
        setBingoBoardRows(persistedBoard);
      } else {
        sheetrockHandler(nextSelectedBingoBoard, generateNewBingoBoard);
      }
    }
  };

  const handleGenerateBoardClick = () => {
    sheetrockHandler(selectedBingoBoard, generateNewBingoBoard);
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
    updateBingoBoard(selectedBingoBoard, updatedBingoBoardRows);
  };

  const generateButtonIsDisabled = selectedBingoBoard === '';
  const shouldRenderBingoBoard = bingoBoardRows.length === 5;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.wrapper}>
          <Card className={classes.header}>
            <BingoBoardSelector
              options={bingoBoards}
              currentSelection={selectedBingoBoard}
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
