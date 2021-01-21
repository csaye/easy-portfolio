import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar.js';
import Edit from '../Edit/Edit.js';
import Portfolio from '../Portfolio/Portfolio.js';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navbar />
        </header>
        <section>
          <Page />
        </section>
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
