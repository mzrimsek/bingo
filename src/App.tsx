import {
  Box,
  Card,
  CssBaseline,
  ThemeProvider,
  createTheme,
  makeStyles,
  useMediaQuery
} from '@material-ui/core';
import { generateBingoBoard, getBingoBoards, sheetrockHandler } from './helpers';
import { useMemo, useState } from 'react';

import BingoBoard from 'components/BingoBoard';
import BingoBoardSelector from 'components/BingoBoardSelector';

function App(): JSX.Element {
  const useStyles = makeStyles(theme => ({
    wrapper: {
      padding: theme.spacing(2)
    },
    card: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2)
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
  const bingoBoards = getBingoBoards();

  const [bingoBoardOptions, setBingoBoardOptions] = useState([]);

  const updateSelectedBingoBoard = (nextSelectedBingoBoard: string) => {
    setSelectedBingoBoard(nextSelectedBingoBoard);
    sheetrockHandler(nextSelectedBingoBoard, (_error, _options, response) => {
      if (response && response.rows) {
        const { rows } = response;
        const rowsMinusHeader = rows.filter(row => row.num > 1);
        const boardOptions = rowsMinusHeader.flatMap(row => row.cellsArray);
        setBingoBoardOptions(boardOptions);
      }
    });
  };

  const shouldRenderBingoBoard = bingoBoardOptions.length !== 0;

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
          </Card>
          {shouldRenderBingoBoard && (
            <Card className={classes.card}>
              <BingoBoard rows={generateBingoBoard(bingoBoardOptions)} />
            </Card>
          )}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
