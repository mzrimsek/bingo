import { BingoBoardRow } from 'components';
import { BingoSquareData } from 'models';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

interface Props {
  rows: Array<Array<BingoSquareData>>;
}

function BingoBoard({ rows }: Props): JSX.Element {
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

  const boardRows = rows.map((row, index) => <BingoBoardRow key={index} row={row} />);

  return <div className={classes.container}>{boardRows}</div>;
}

BingoBoard.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.exact({
        display: PropTypes.string,
        toggled: PropTypes.bool
      })
    )
  ).isRequired
};

export default BingoBoard;
