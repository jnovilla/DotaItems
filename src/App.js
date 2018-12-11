import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Items from './views/items';
import Heroes from './views/heroes';
class App extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            Me: "",
            Enemy: ""
        };
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
                <p>
                    Item Counter Picker
          </p>
                <Heroes />
                <Items />
                
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
