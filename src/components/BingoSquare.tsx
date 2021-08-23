import { Button, makeStyles } from '@material-ui/core';
import { gradientButtonStyles } from 'variables';

import { BingoSquareData } from 'models';
import PropTypes from 'prop-types';

interface Props {
  data: BingoSquareData;
}

function BingoSquare({ data }: Props): JSX.Element {
  const { display, toggled } = data;

  const useStyles = makeStyles(() => ({
    bingoSquare: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(toggled ? gradientButtonStyles : {})
    }
  }));
  const classes = useStyles();

  return <Button className={classes.bingoSquare}>{display}</Button>;
}

BingoSquare.propTypes = {
  data: PropTypes.exact({
    display: PropTypes.string,
    toggled: PropTypes.bool
  }).isRequired
};

export default BingoSquare;
