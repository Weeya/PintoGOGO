import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
// import "font-awesome/css/font-awesome.min.css";
// import "mdbreact/dist/css/mdb.css";

// const AppWithRouter = () => (
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// )
// ReactDOM.render(<AppWithRouter/>, document.getElementById('root'));
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
