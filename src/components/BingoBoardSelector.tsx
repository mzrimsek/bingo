import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  makeStyles
} from '@material-ui/core';

import { BingoBoardOption } from 'models';
import PropTypes from 'prop-types';

interface Props {
  options: Array<BingoBoardOption>;
  currentSelection: string;
  onUpdateSelection: (nextValue: string) => void;
}

function BingoBoardSelector({ options, currentSelection, onUpdateSelection }: Props): JSX.Element {
  const useStyles = makeStyles(() => ({
    formControl: {
      minWidth: 120
    }
  }));
  const classes = useStyles();

  const handleChange = event => onUpdateSelection(event.target.value);

  const nodes = options.map((option, index) => {
    return (
      <MenuItem key={index} value={option.url}>
        {option.label}
      </MenuItem>
    );
  });

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Bingo Board</InputLabel>
      <Select value={currentSelection} onChange={handleChange}>
        {nodes}
      </Select>
      <FormHelperText>Select Bingo Board</FormHelperText>
    </FormControl>
  );
}

BingoBoardSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.exact({
      url: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  currentSelection: PropTypes.string.isRequired,
  onUpdateSelection: PropTypes.func.isRequired
};

export default BingoBoardSelector;
