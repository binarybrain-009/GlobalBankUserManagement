import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { showSnack } from './comps/Snackbar';
import axios from "axios";

// CSS
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
        console.log(er.request.responseURL)
        let message = "Something went wrong"
        if(er.request.responseURL === "http://localhost:8080/api/validate" && er.response.status === 404){
          message = "Enter Password is Incorrect"
        }
        showSnack(message, "error")
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
