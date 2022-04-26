import { Breakpoint, Button } from '@mui/material';

import { BingoSquareData } from 'models';
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

export default withWidth()(BingoSquare);
