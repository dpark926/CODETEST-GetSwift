import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetSwift from './containers/GetSwift.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GetSwift/>
      </div>
    );
  }
}

export default App;
