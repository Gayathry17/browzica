import React from 'react';
import './App.css';
import { Login, Profile, Bookmarks  } from '../src/components';
import PrivateRoute from './utils/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function App() {
  return (
    <div className="app">
       <Router >
         <Switch>
           <PrivateRoute path='/' component={Bookmarks} exact />
           <PrivateRoute path='/profile' component={Profile} exact />
           <Route path='/login' exact>
             <Login />
           </Route>
         </Switch>
       </Router>
    </div>
  );
}

export default App;
