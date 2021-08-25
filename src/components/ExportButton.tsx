import { Button, Snackbar } from '@material-ui/core';
import { Fragment, useState } from 'react';

import { Alert } from '@material-ui/lab';
import { BingoSquareData } from 'models';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';

interface Props {
  bingoBoardRows: Array<Array<BingoSquareData>>;
  disabled: boolean;
}

function ExportButton({ bingoBoardRows, disabled }: Props): JSX.Element {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const stringifiedData = JSON.stringify(bingoBoardRows);
  return (
    <Fragment>
      <CopyToClipboard text={stringifiedData} onCopy={() => setSnackbarOpen(true)}>
        <Button disabled={disabled}>Export Board</Button>
      </CopyToClipboard>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="info">Copied to clipboard!</Alert>
      </Snackbar>
    </Fragment>
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
