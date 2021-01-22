import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar.js';
import Edit from '../Edit/Edit.js';
import Portfolio from '../Portfolio/Portfolio.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from '../../util/firebaseConfig.js';

// initialize firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Page />
      </Router>
    </div>
  );
}

function Page() {
  return (
    <div className="Page">
      <Switch>
        <Route path="/edit">
          <Edit />
        </Route>
        <Route path="/">
          <Portfolio />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
