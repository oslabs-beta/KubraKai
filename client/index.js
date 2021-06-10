//Modules 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import history from "./History";
//Components
import App from "./App"
//CSS
import "./assets/styles/Custom.scss";


window.addEventListener('load', () => {
    <BrowserRouter history={history}>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
})