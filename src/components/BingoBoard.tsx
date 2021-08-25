import { Card, makeStyles } from '@material-ui/core';

import { BingoBoardRow } from 'components';
import { BingoSquareData } from 'models';
import PropTypes from 'prop-types';

interface Props {
  rows: Array<Array<BingoSquareData>>;
  onToggleSquare: (rowIndex: number, squareIndex: number) => void;
}

function BingoBoard({ rows, onToggleSquare }: Props): JSX.Element {
  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      alignItems: 'center'
    }
  }));
  const classes = useStyles();

  const boardRows = rows.map((row, index) => (
    <BingoBoardRow key={index} row={row} rowIndex={index} onToggleSquare={onToggleSquare} />
  ));

  return <Card className={classes.container}>{boardRows}</Card>;
}

BingoBoard.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.exact({
        display: PropTypes.string,
        toggled: PropTypes.bool
      })
    )
  ).isRequired,
  onToggleSquare: PropTypes.func.isRequired
};

export default BingoBoard;
