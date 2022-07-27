import { BingoBoardRow } from 'components';
import { BingoSquareData } from 'models';
import { Card } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

export default BingoBoard;
