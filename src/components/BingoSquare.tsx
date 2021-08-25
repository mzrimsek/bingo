import { Button, makeStyles, withWidth } from '@material-ui/core';

import { BingoSquareData } from 'models';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import PropTypes from 'prop-types';
import { gradientButtonStyles } from 'variables';

// could not figure out how to make the withWidth
// PropInjector work with typed Props
// https://stackoverflow.com/questions/54749927/typescript-compile-error-trying-to-use-material-ui-withstyles
// interface Props {
//   data: BingoSquareData;
// }

function BingoSquare(props): JSX.Element {
  const data: BingoSquareData = props.data;
  const width: Breakpoint = props.width;

  const { display, toggled } = data;

  const isSmall = width === 'xs';

  const useStyles = makeStyles(() => ({
    bingoSquare: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(toggled ? gradientButtonStyles : {}),
      fontSize: isSmall ? '.65rem' : '.875rem'
    }
  }));
  const classes = useStyles();

  return <Button className={classes.bingoSquare}>{display}</Button>;
}

BingoSquare.propTypes = {
  data: PropTypes.exact({
    display: PropTypes.string,
    toggled: PropTypes.bool
  }).isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(BingoSquare);
