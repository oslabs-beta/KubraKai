//Modules 
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import App from "./App"
//CSS
import "./assets/styles/Custom.scss";

window.addEventListener('load', () => {
    ReactDOM.render(
        <App />,
    document.getElementById('root'))
});

