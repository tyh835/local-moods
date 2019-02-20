import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import './index.scss';
import App from './components/App/App';

dotenv.config();

ReactDOM.render(<App />, document.getElementById('root'));
