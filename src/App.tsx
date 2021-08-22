import { BingoBoard, BingoBoardSelector } from 'components';
import { BingoSquareData, SheetrockCallback } from 'models';
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
import { generateBingoBoard, getBingoBoards, sheetrockHandler } from 'helpers';
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

  const [selectedBingoBoard, setSelectedBingoBoard] = useState('');
  const [bingoBoardRows, setBingoBoardRows] = useState<Array<Array<BingoSquareData>>>([]);

  const bingoBoards = getBingoBoards();

  const sheetrockCallback: SheetrockCallback = (_error, _options, response) => {
    if (response && response.rows) {
      const { rows } = response;
      const rowsMinusHeader = rows.filter(row => row.num !== 0);

      const boardOptions: Array<string> = rowsMinusHeader.flatMap(row => row.cellsArray);
      const boardRows = generateBingoBoard(boardOptions);
      setBingoBoardRows(boardRows);
    }
  };

  const updateSelectedBingoBoard = (nextSelectedBingoBoard: string) => {
    setSelectedBingoBoard(nextSelectedBingoBoard);
    sheetrockHandler(nextSelectedBingoBoard, sheetrockCallback);
  };

  const generateNewBingoBoard = () => {
    sheetrockHandler(selectedBingoBoard, sheetrockCallback);
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
              updateSelection={updateSelectedBingoBoard}
            />
            <Button
              className={classes.generateButton}
              disabled={generateButtonIsDisabled}
              onClick={generateNewBingoBoard}
            >
              Generate New Board
            </Button>
          </Card>
          {shouldRenderBingoBoard && (
            <Card className={classes.board}>
              <BingoBoard rows={bingoBoardRows} />
            </Card>
          )}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
