import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from '../src/routes/Router';
import { ProvideUser } from './ContextApis/ProvideUser';

function App() {
  return (
    <div className="App">
      <ProvideUser>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ProvideUser>
    </div>
  );
}

export default App;
