import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'

import {Home} from './components/Home'
import {Department} from './components/Department'
import {Users} from './components/Users'
import {Navigation} from './components/Navigation'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">

      <h3 className="m-3 d-flex justify-content-center">Rostelecom test React JS app consuming ASP .NET Core Web Api</h3>
      <h5 className="m-3 d-flex justify-content-center">Users and departments management portal</h5>

      <Navigation/>

<Switch>
  <Route path = "/" component = {Home} exact/>
  <Route path = "/department" component = {Department} />
  <Route path = "/users" component = {Users}/>
</Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
