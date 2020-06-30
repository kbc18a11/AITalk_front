import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Wada from './pages/development/Wada';
import Murase from './pages/development/Murase';
import Tsutsui from './pages/development/Tsutsui';
import Nakagoshi from './pages/development/Nakagoshi';
import Talking from './pages/appPages/Talking';
import Register from './pages/appPages/Register';
import DefaultNavigationbar from './components/navber/DefaultNavigationbar';


function App() {
  return (
    <div className="App">
      <DefaultNavigationbar/>
      <div>
        <Router>
          <Switch>
            <Route path="/wada" component={Wada} />
            <Route path="/murase" component={Murase} />
            <Route path="/tsutsui" component={Tsutsui} />
            <Route path="/nakagoshi" component={Nakagoshi} />
            <Route path="/taking" component={Talking} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
