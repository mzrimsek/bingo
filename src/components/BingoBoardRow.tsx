import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BingoSquare } from 'components';
import { BingoSquareData } from 'models';

interface Props {
  row: Array<BingoSquareData>;
  rowIndex: number;
  onToggleSquare: (rowIndex: number, squareIndex: number) => void;
}

function BingoBoardRow({ row, rowIndex, onToggleSquare }: Props): JSX.Element {
  const useStyles = makeStyles((theme: Theme) => ({
    row: {
      display: 'flex',
      height: '20%',
      width: '100%'
    },
    square: {
      height: '100%',
      width: '20%',
      padding: theme.spacing(1)
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

export default BingoBoardRow;
