import { BingoSquareData, SnackbarSeverity } from 'models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextareaAutosize,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Fragment, useState } from 'react';

import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import PropTypes from 'prop-types';

interface Props {
  onImport: (boardRows: Array<Array<BingoSquareData>>) => void;
  disabled: boolean;
  displaySnackbar: (severity: SnackbarSeverity, message: string) => void;
}

function ImportButton({ onImport, disabled, displaySnackbar }: Props): JSX.Element {
  const useStyles = makeStyles(() => ({
    textarea: {
      width: '100%'
    }
  }));
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
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
      displaySnackbar('success', 'Board Imported!');
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Unable to parse import';
      displaySnackbar('error', message);
    } finally {
      handleDialogClose();
    }
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
    </Fragment>
  );
}

ImportButton.propTypes = {
  onImport: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  displaySnackbar: PropTypes.func.isRequired
};

export default ImportButton;
