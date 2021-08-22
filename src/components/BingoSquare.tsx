import { primary, secondary } from 'variables';

import { BingoSquareData } from 'models';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

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
      background: toggled
        ? `linear-gradient(45deg, ${primary.main} 30%, ${secondary.main} 90%)`
        : undefined,
      color: toggled ? primary.contrastText : undefined,
      boxShadow: toggled ? `0 3px 5px 2px ${secondary.mainShadow}` : undefined
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
