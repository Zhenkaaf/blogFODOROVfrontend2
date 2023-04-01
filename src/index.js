import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
/* import { router } from './App'
import { RouterProvider } from "react-router-dom"; */
import { HashRouter, BrowserRouter } from "react-router-dom";
import { ContextProvider } from './context/Context';

/* const isLocal = window.location.hostname.includes('localhost');
const Router = isLocal ? BrowserRouter : HashRouter; */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>

  //<React.StrictMode>

  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
