import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import combinedReducer from './redux/reducers';

import MainPageWithRoutes from './src/MainPageWithRoutes';
import Header from './src/Header';
import Footer from './src/Footer';

let store = createStore(combinedReducer);

ReactDOM.render(
    <BrowserRouter>
     <Provider store={store}>
      <div>
      <Header/>
      <MainPageWithRoutes/>
      <Footer/>
      </div>
      </Provider>
      </BrowserRouter>,
    document.getElementById('container')
)
