import { Button, makeStyles, Snackbar } from '@material-ui/core';

import { BingoSquareData } from 'models';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { gradientButtonStyles } from 'variables';
import { Alert } from '@material-ui/lab';

interface Props {
  bingoBoardRows: Array<Array<BingoSquareData>>;
  disabled: boolean;
}

function ExportButton({ bingoBoardRows, disabled }: Props): JSX.Element {
  const useStyles = makeStyles(theme => ({
    actionButton: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(2),
      ...gradientButtonStyles
    }
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const stringifiedData = JSON.stringify(bingoBoardRows);
  return (
    <div>
      <CopyToClipboard text={stringifiedData} onCopy={() => setOpen(true)}>
        <Button className={classes.actionButton} disabled={disabled}>Export Board</Button>
      </CopyToClipboard>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      ><Alert severity="info">Copied to clipboard!</Alert></Snackbar>
    </div>
  );
}

ExportButton.propTypes = {
  bingoBoardRows: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.exact({
        display: PropTypes.string,
        toggled: PropTypes.bool
      })
    )
  ).isRequired,
  disabled: PropTypes.bool.isRequired
};

export default ExportButton;
