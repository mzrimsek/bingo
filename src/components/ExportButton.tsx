import { BingoSquareData, SnackbarSeverity } from 'models';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

interface Props {
  bingoBoardRows: Array<Array<BingoSquareData>>;
  disabled: boolean;
  displaySnackbar: (severity: SnackbarSeverity, message: string) => void;
}

function ExportButton({ bingoBoardRows, disabled, displaySnackbar }: Props): JSX.Element {
  const handleExportClick = () => {
    displaySnackbar('info', 'Copied to clipboard!');
  };

  const stringifiedData = JSON.stringify(bingoBoardRows);

  return (
    <Fragment>
      <CopyToClipboard text={stringifiedData} onCopy={handleExportClick}>
        <ListItem button component="a" disabled={disabled}>
          <ListItemIcon>
            <FileCopyOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Export Board" />
        </ListItem>
      </CopyToClipboard>
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
  disabled: PropTypes.bool.isRequired,
  displaySnackbar: PropTypes.func.isRequired
};

export default ExportButton;
