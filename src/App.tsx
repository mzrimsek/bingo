import './App.css';

import BingoSelector from 'components/bingoSelector/BingoSelector';
import { getBingoBoardOptions } from './helpers';
import { useState } from 'react';

function App() {
  const [selectedBingoBoardOption, setSelectedBingoBoardOption] = useState('');

  const options = getBingoBoardOptions();

  return (
    <div className="App">
      <BingoSelector
        options={options}
        currentSelection={selectedBingoBoardOption}
        updateSelection={setSelectedBingoBoardOption}
      />
    </div>
  );
}

export default App;
