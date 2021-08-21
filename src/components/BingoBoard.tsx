import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';

interface Props {
  boardOptions: Array<string>;
}

function BingoBoard({ boardOptions }: Props): JSX.Element {
  const tempDisplay = boardOptions.map((option, index) => {
    <Container key={index}>{option}</Container>;
  });

  return <Container>{tempDisplay}</Container>;
}

BingoBoard.propTypes = {
  boardOptions: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default BingoBoard;
