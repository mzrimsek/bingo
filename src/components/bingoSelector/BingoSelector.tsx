import { FormControl, MenuItem, Select, makeStyles } from '@material-ui/core';

import { BingoBoardOption } from 'models';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

interface Props {
  options: Array<BingoBoardOption>;
  currentSelection: string;
  updateSelection: (event) => void;
}

function BingoSelector({ options, currentSelection, updateSelection }: Props): JSX.Element {
  const classes = useStyles();

  const handleChange = event => updateSelection(event.target.value);

  const nodes = options.map((option, index) => {
    return (
      <MenuItem key={index} value={option.url}>
        {option.label}
      </MenuItem>
    );
  });

  return (
    <FormControl className={classes.formControl}>
      <Select value={currentSelection} onChange={handleChange}>
        {nodes}
      </Select>
    </FormControl>
  );
}

BingoSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.exact({
      url: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  currentSelection: PropTypes.string,
  updateSelection: PropTypes.func.isRequired
};

export default BingoSelector;
