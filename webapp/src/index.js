import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import axios from "axios";

// CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/declare.css"

// REDUX SETUP
import { createStore } from 'redux';
import allReducers from "./redux/reducers";
import { Provider } from 'react-redux';

// TO PERSIST LOGIN
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';

// LAYOUTS
import Auth from './layouts/Auth';
import Main from './layouts/Main';

// PAGES
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Statement from './pages/main/Statement';
import Home from './Components/Home';
import Loan from './Components/Loan';
import Transaction from './Components/Transaction';

// PERSIST CONFIG
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['cartManager', 'loginPage', 'searchFilter']
};
const pReducer = persistReducer(persistConfig, allReducers);

//redux store 
const myStore = createStore(
  pReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//persistor
const persistor = persistStore(myStore);


const showSnack = (message, type='default') => {
  const ran = Math.floor(Math.random() * 10001);
  const snackid = `Snack${ran.toString()}`
  const div = document.createElement("div")
  div.id = snackid;
  div.className = `snackbar ${type}`
  const p = document.createElement("p")
  p.className = 'snack-message'
  p.innerHTML = message
  div.append(p)
  document.getElementById('snack').append(div)
  // console.log(message, type, snackid)
  setTimeout(() => {
    try{
      document.getElementById(snackid).remove()
    }
    catch {
      console.log('')
    }
  }, 6500);
}

axios.interceptors.response.use(
  function (response) {
    if (response.error) {
      showSnack(response.message, "error")
    }
    return response;
  },
  function (er) {
    if (axios.isAxiosError(er)) {
      if (er.response) {
        showSnack("Something went wrong", "error")
      }
    }

    return Promise.reject(er);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={myStore}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route element={<Auth />} >
          <Route path={"register"} element={<Register />} key={1} />
          <Route path={"login"} element={<Login />} key={2} />
        </Route>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path='/Loan' element={<Loan />}/>
          <Route path='/Transaction' element={<Transaction />}/>
          <Route path='/Statement' element={<Statement />}/>
        </Route>
      </Routes>
      <div className='snack-container' id='snack'></div>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
