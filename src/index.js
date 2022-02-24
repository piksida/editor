import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import App from './App.js';
import Auth from './components/auth/Auth';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="auth" element={<Auth />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

/*ReactDOM.render(<App />, document.getElementById('root'));*/
