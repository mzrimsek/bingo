import { BingoSquare } from 'components';
import { BingoSquareData } from 'models';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

interface Props {
  rows: Array<Array<BingoSquareData>>;
}

function BingoBoard({ rows }: Props): JSX.Element {
  const boardRows = rows.map((row, index) => {
    const squares = row.map((squareData, index) => (
      <Grid item xs={2} key={index}>
        <BingoSquare data={squareData} />
      </Grid>
    ));
    return (
      <Grid container item xs={12} key={index}>
        {squares}
      </Grid>
    );
  });

  return <Grid container>{boardRows}</Grid>;
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
