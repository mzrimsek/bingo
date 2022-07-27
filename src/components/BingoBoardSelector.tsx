import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';

import { BingoBoardOption } from 'models';
import { makeStyles } from '@mui/styles';

interface Props {
  options: Array<BingoBoardOption>;
  currentSelection: string;
  onUpdateSelection: (nextValue: BingoBoardOption) => void;
}

function BingoBoardSelector({ options, currentSelection, onUpdateSelection }: Props): JSX.Element {
  const useStyles = makeStyles(() => ({
    formControl: {
      minWidth: 120,
      color: 'white'
    },
    white: {
      color: 'white'
    }
  }));
  const classes = useStyles();

  const handleChange = event => {
    const url: string = event.target.value;
    const matchingOption = options.find(option => option.url === url);
    const label = matchingOption ? matchingOption.label : '';

    const nextOption: BingoBoardOption = { url, label };
    onUpdateSelection(nextOption);
  };

  const nodes = options.map((option, index) => {
    return (
      <MenuItem key={index} value={option.url}>
        {option.label}
      </MenuItem>
    );
  });

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={currentSelection}
        onChange={handleChange}
        displayEmpty
        className={classes.white}
      >
        <MenuItem value="" disabled>
          Board Name
        </MenuItem>
        {nodes}
      </Select>
      <FormHelperText className={classes.white}>Select Bingo Board</FormHelperText>
    </FormControl>
  );
}

export default BingoBoardSelector;
