import { Container, makeStyles } from '@material-ui/core';

import { BingoSquareData } from 'models';
import PropTypes from 'prop-types';

interface Props {
  data: BingoSquareData;
}

function BingoSquare({ data }: Props): JSX.Element {
  const useStyles = makeStyles(theme => ({
    bingoSquare: {
      margin: theme.spacing(1)
    }
  }));
  const classes = useStyles();

  return <Container className={classes.bingoSquare}>{data.display}</Container>;
}

BingoSquare.propTypes = {
  data: PropTypes.exact({
    display: PropTypes.string,
    toggled: PropTypes.bool
  }).isRequired
};

export default BingoSquare;
