import { BingoBoard, BingoBoardSelector } from 'components';
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
import { generateBingoBoard, getBingoBoards, sheetrockHandler } from './helpers';
import { useMemo, useState } from 'react';

import { BingoSquareData } from 'models';

function App(): JSX.Element {
  const useStyles = makeStyles(theme => ({
    wrapper: {
      padding: theme.spacing(2)
    },
    card: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between'
    }
  }));
  const classes = useStyles();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  const [selectedBingoBoard, setSelectedBingoBoard] = useState('');
  const [bingoBoardRows, setBingoBoardRows] = useState<Array<Array<BingoSquareData>>>([]);

  const bingoBoards = getBingoBoards();

  const updateSelectedBingoBoard = (nextSelectedBingoBoard: string) => {
    setSelectedBingoBoard(nextSelectedBingoBoard);
    sheetrockHandler(nextSelectedBingoBoard, (_error, _options, response) => {
      if (response && response.rows) {
        const { rows } = response;
        const rowsMinusHeader = rows.filter(row => row.num > 1);

        const boardOptions: Array<string> = rowsMinusHeader.flatMap(row => row.cellsArray);
        const boardRows = generateBingoBoard(boardOptions);
        setBingoBoardRows(boardRows);
      }
    });
  };

  const generateNewBingoBoard = () => {
    sheetrockHandler(selectedBingoBoard, (_error, _options, response) => {
      if (response && response.rows) {
        const { rows } = response;
        const rowsMinusHeader = rows.filter(row => row.num > 1);

        const boardOptions: Array<string> = rowsMinusHeader.flatMap(row => row.cellsArray);
        const boardRows = generateBingoBoard(boardOptions);
        setBingoBoardRows(boardRows);
      }
    });
  };

  const shouldRenderBingoBoard = bingoBoardRows.length === 5;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.wrapper}>
          <Card className={classes.card}>
            <BingoBoardSelector
              options={bingoBoards}
              currentSelection={selectedBingoBoard}
              updateSelection={updateSelectedBingoBoard}
            />
            <Button onClick={generateNewBingoBoard}>Generate New Board</Button>
          </Card>
          {shouldRenderBingoBoard && (
            <Card className={classes.card}>
              <BingoBoard rows={bingoBoardRows} />
            </Card>
          )}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
