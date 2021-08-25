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
  makeStyles
} from '@material-ui/core';
import { BingoBoardOption, BingoSquareData, SnackbarSeverity } from 'models';
import { BingoBoardSelector, ExportButton, ImportButton } from 'components';
import { Fragment, useState } from 'react';

import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { getBingoBoards } from 'helpers';

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
  const useStyles = makeStyles(theme => ({
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

  const bingoBoards = getBingoBoards();
  const actionButtonIsDisabled = currentBingoBoardSelection.label === '';

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <div className={classes.actions}>
            <BingoBoardSelector
              options={bingoBoards}
              currentSelection={currentBingoBoardSelection.url}
              onUpdateSelection={onUpdateBingoBoardSelection}
            />
            <Button disabled={actionButtonIsDisabled} onClick={onGenerateBoard}>
              Generate New Board
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
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

Header.propTypes = {
  currentBingoBoardSelection: PropTypes.exact({
    url: PropTypes.string,
    label: PropTypes.string
  }).isRequired,
  onUpdateBingoBoardSelection: PropTypes.func.isRequired,
  bingoBoardRows: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.exact({
        display: PropTypes.string,
        toggled: PropTypes.bool
      })
    )
  ).isRequired,
  onBoardImport: PropTypes.func.isRequired,
  onGenerateBoard: PropTypes.func.isRequired,
  displaySnackbar: PropTypes.func.isRequired
};

export default Header;
