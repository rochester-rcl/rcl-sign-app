/**
* LSF - ASL React Web App
* @flow
*/

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Styles

import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));

registerServiceWorker();
