import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = useState();

  useEffect(() => {
    fetch('/api')
    .then(res => res.json())
    .then(data => setState(data.message))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!state ? "Loading..." : state}
        </p>
      </header>
    </div>
  );
}

export default App;
