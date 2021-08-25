import { BingoSquare } from 'components';
import { BingoSquareData } from 'models';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

interface Props {
  row: Array<BingoSquareData>;
  rowIndex: number;
  onToggleSquare: (rowIndex: number, squareIndex: number) => void;
}

// small styles aren't perfect but they're serviable for now
function BingoBoardRow({ row, rowIndex, onToggleSquare }: Props): JSX.Element {
  const useStyles = makeStyles(theme => ({
    row: {
      display: 'flex',
      height: '20%',
      width: '100%'
    },
    square: {
      height: '100%',
      width: '20%',
      padding: theme.spacing(1),
    }
  }));
  const classes = useStyles();

  const squares = row.map((squareData, index) => {
    const handleSquareClick = () => onToggleSquare(rowIndex, index);
    return (
      <div key={index} className={classes.square} onClick={handleSquareClick}>
        <BingoSquare data={squareData} />
      </div>
    );
  });
  return <div className={classes.row}>{squares}</div>;
}

BingoBoardRow.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.exact({
      display: PropTypes.string,
      toggled: PropTypes.bool
    })
  ).isRequired,
  rowIndex: PropTypes.number.isRequired,
  onToggleSquare: PropTypes.func.isRequired
};

export default BingoBoardRow;
