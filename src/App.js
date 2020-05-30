import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'

import {Home} from './components/Home'
import {Department} from './components/Department'
import {Users} from './components/Users'

function App() {
  return (
    <div className="container">
    <Home/>
    <Department/>
    <Users/>
    </div>
  );
}

export default App;
