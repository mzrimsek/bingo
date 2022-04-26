import { BingoSquareData, SnackbarSeverity } from 'models';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { Fragment } from 'react';

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

export default ExportButton;
