import { AppBar, Button, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import { BingoBoardOption, BingoSquareData } from 'models';
import { BingoBoardSelector, ExportButton, ImportButton } from 'components';

import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { getBingoBoards } from 'helpers';

interface Props {
  currentBingoBoardSelection: BingoBoardOption;
  onUpdateBingoBoardSelection: (nextValue: BingoBoardOption) => void;
  bingoBoardRows: Array<Array<BingoSquareData>>;
  onBoardImport: (boardRows: Array<Array<BingoSquareData>>) => void;
  onGenerateBoard: () => void;
}

function Header({
  currentBingoBoardSelection,
  onUpdateBingoBoardSelection,
  bingoBoardRows,
  onBoardImport,
  onGenerateBoard
}: Props): JSX.Element {
  const useStyles = makeStyles(() => ({
    actions: {
      display: 'flex'
    }
  }));
  const classes = useStyles();

  const bingoBoards = getBingoBoards();
  const actionButtonIsDisabled = currentBingoBoardSelection.label === '';

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <BingoBoardSelector
          options={bingoBoards}
          currentSelection={currentBingoBoardSelection.url}
          onUpdateSelection={onUpdateBingoBoardSelection}
        />
        <div className={classes.actions}>
          <ExportButton bingoBoardRows={bingoBoardRows} disabled={actionButtonIsDisabled} />
          <ImportButton disabled={actionButtonIsDisabled} onImport={onBoardImport} />
          <Button disabled={actionButtonIsDisabled} onClick={onGenerateBoard}>
            Generate New Board
          </Button>
        </div>
      </Toolbar>
    </AppBar>
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
  onGenerateBoard: PropTypes.func.isRequired
};

export default Header;
