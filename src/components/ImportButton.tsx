import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextareaAutosize,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Fragment, useState } from 'react';

import { Alert } from '@material-ui/lab';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { BingoSquareData } from 'models';
import PropTypes from 'prop-types';

interface Props {
  onImport: (boardRows: Array<Array<BingoSquareData>>) => void;
  disabled: boolean;
}

function ImportButton({ onImport, disabled }: Props): JSX.Element {
  const useStyles = makeStyles(() => ({
    textarea: {
      width: '100%'
    }
  }));
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [importContent, setImportContent] = useState('');

  const handleDialogClose = () => {
    setDialogOpen(false);
    setImportContent('');
  };

  const handleChange = event => {
    setImportContent(event.target.value);
  };

  const handleImportClick = () => {
    try {
      const serializedImportContent: Array<Array<BingoSquareData>> = JSON.parse(importContent);

      if (!Array.isArray(serializedImportContent)) {
        throw 'Invalid board format';
      }

      if (serializedImportContent.length !== 5) {
        throw 'Invalid row count';
      }

      serializedImportContent.forEach(row => {
        if (!Array.isArray(row)) {
          throw 'Invalid row format';
        }

        if (row.length !== 5) {
          throw 'Invalid row size';
        }

        row.forEach(square => {
          if (typeof square.display !== 'string' || square.display === '') {
            throw 'Invalid square display value';
          }

          if (typeof square.toggled !== 'boolean') {
            throw 'Invalid square toggled value';
          }
        });
      });

      onImport(serializedImportContent);
      handleDialogClose();
      setSuccessSnackbarOpen(true);
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Unable to parse import';
      setErrorMessage(message);
      setErrorSnackbarOpen(true);
      handleDialogClose();
    }
  };

  const handleSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  };

  const importIsDisabled = importContent === '';

  return (
    <Fragment>
      <ListItem button component="a" onClick={() => setDialogOpen(true)} disabled={disabled}>
        <ListItemIcon>
          <AssignmentOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Import Board" />
      </ListItem>
      <Dialog onClose={handleDialogClose} open={dialogOpen} fullWidth>
        <DialogTitle>Import Board</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            className={classes.textarea}
            placeholder="Paste Board Export"
            value={importContent}
            onChange={handleChange}
            minRows={10}
          />
          <Typography variant="subtitle1" color="error">
            This will overwrite the current board!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleImportClick} disabled={importIsDisabled}>
            Import
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error">{errorMessage}!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success">Board Imported!</Alert>
      </Snackbar>
    </Fragment>
  );
}

ImportButton.propTypes = {
  onImport: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default ImportButton;
