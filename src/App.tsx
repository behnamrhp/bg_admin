import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components/Main';
import './assets/css/App.css';

function App() {
  return (
        <Router>
          <Main />
        </Router>
  );
}

export default App;
