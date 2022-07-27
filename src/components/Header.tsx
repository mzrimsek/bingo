import {
  AppBar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Theme
} from '@mui/material';
import { BingoBoardOption, BingoSquareData, SnackbarSeverity } from 'models';
import { BingoBoardSelector, ExportButton, ImportButton } from 'components';
import { Fragment, useState } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import { getBingoBoards } from 'helpers';
import { makeStyles } from '@mui/styles';

interface Props {
  currentBingoBoardSelection: BingoBoardOption;
  onUpdateBingoBoardSelection: (nextValue: BingoBoardOption) => void;
  bingoBoardRows: Array<Array<BingoSquareData>>;
  onBoardImport: (boardRows: Array<Array<BingoSquareData>>) => void;
  onGenerateBoard: () => void;
  displaySnackbar: (severity: SnackbarSeverity, message: string) => void;
}

function Header({
  currentBingoBoardSelection,
  onUpdateBingoBoardSelection,
  bingoBoardRows,
  onBoardImport,
  onGenerateBoard,
  displaySnackbar
}: Props): JSX.Element {
  const useStyles = makeStyles((theme: Theme) => ({
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(8)
      }
    },
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      minWidth: 250
    }
  }));
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawerAfterSnackbar: (severity: SnackbarSeverity, message: string) => void = (
    severity,
    message
  ) => {
    displaySnackbar(severity, message);
    setDrawerOpen(false);
  };

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const bingoBoards = getBingoBoards();
  const actionButtonIsDisabled = currentBingoBoardSelection.label === '';

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          <div className={classes.actions}>
            <BingoBoardSelector
              options={bingoBoards}
              currentSelection={currentBingoBoardSelection.url}
              onUpdateSelection={onUpdateBingoBoardSelection}
            />
            <Button color="inherit" disabled={actionButtonIsDisabled} onClick={onGenerateBoard}>
              Generate New Board
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer anchor="left" open={drawerOpen} onClose={closeDrawer} onOpen={openDrawer}>
        <div className={classes.drawer}>
          <List component="nav">
            <ExportButton
              bingoBoardRows={bingoBoardRows}
              disabled={actionButtonIsDisabled}
              displaySnackbar={closeDrawerAfterSnackbar}
            />
            <ImportButton
              disabled={actionButtonIsDisabled}
              onImport={onBoardImport}
              displaySnackbar={closeDrawerAfterSnackbar}
            />
          </List>
          <div>
            <Divider />
            <List component="nav">
              <ListItem
                button
                component="a"
                href="https://github.com/mzrimsek/bingo"
                target="_blank"
                onClick={closeDrawer}
              >
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText primary="View Source" />
              </ListItem>
            </List>
          </div>
        </div>
      </SwipeableDrawer>
    </Fragment>
  );
}

export default Header;
