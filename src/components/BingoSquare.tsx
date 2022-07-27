import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useWidth } from 'hooks';

import { BingoSquareData } from 'models';
import { gradientButtonStyles } from 'variables';

interface Props {
  data: BingoSquareData;
}

function BingoSquare(props: Props): JSX.Element {
  const data: BingoSquareData = props.data;
  const { display, toggled } = data;

  const width = useWidth();
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

export default (BingoSquare);
