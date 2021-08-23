import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  makeStyles
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { gradientButtonStyles } from 'variables';
import { useState } from 'react';

interface Props {
  disabled: boolean;
}

function ImportButton({ disabled }: Props): JSX.Element {
  const useStyles = makeStyles(theme => ({
    actionButton: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(2),
      ...gradientButtonStyles
    },
    textarea: {
      width: '100%'
    }
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button className={classes.actionButton} onClick={() => setOpen(true)} disabled={disabled}>
        Import Board
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth>
        <DialogTitle>Import Board</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            className={classes.textarea}
            placeholder="Paste Board Export"
            minRows={10}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary">Import</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ImportButton.propTypes = {
  disabled: PropTypes.bool.isRequired
};

export default ImportButton;
