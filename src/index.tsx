import React, { render } from "react-dom"; //import React,　…　App.jsの場合、importのみで型指定の必要なし。
import { App } from "./components/App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);


//デフォルト__テンプレート
/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
