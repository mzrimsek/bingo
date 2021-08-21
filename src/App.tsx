import './App.css';

import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  makeStyles,
  useMediaQuery
} from '@material-ui/core';
import { useMemo, useState } from 'react';

import BingoBoardSelector from 'components/BingoBoardSelector/BingoBoardSelector';
import { getBingoBoardOptions } from './helpers';

function App() {
  const useStyles = makeStyles(theme => ({
    wrapper: {
      padding: theme.spacing(2)
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

  const [selectedBingoBoardOption, setSelectedBingoBoardOption] = useState('');
  const bingoBoardOptions = getBingoBoardOptions();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={classes.wrapper}>
          <BingoBoardSelector
            options={bingoBoardOptions}
            currentSelection={selectedBingoBoardOption}
            updateSelection={setSelectedBingoBoardOption}
          />
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
