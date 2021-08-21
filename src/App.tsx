import './App.css';

import { sheetrockHandler } from './helpers/sheetrock';

function App() {
  sheetrockHandler((error, options, response) => {
    console.log('error', error);
    console.log('options', options);
    console.log('response', response);
  });
  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
