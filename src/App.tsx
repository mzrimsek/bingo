import './App.css';

import { getBingoBoardOptions } from './helpers';

function App() {
  const options = getBingoBoardOptions();
  console.log(options);

  return <div className="App">Hello</div>;
}

export default App;
