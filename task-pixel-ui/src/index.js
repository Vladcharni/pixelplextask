import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import {Create} from './components/Create.js';
import {Edit} from './components/Edit.js';
import {NotFound} from './components/NotFound.js';
import {RedirectToApp} from './components/RedirectToApp.js';
import store from './store/store.js';


ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RedirectToApp} />
        <Route exact path="/articles" component={App} />
        <Route exact path="/articles/create" component={Create} />
        <Route path="/articles/:id" component={Edit} />
        <Route path="/notfound" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
),document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
