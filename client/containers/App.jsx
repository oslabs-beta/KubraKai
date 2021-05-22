import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LeftNav from '../components/Navagation/leftNavBar'
import Dashboard from '../containers/Dashboard'



const App = (props) => {
  return (
    <section>
      
      <Router>
      <LeftNav/>
        <Switch>
          
          <Route path="/dashboard"><Dashboard/> </Route>
          <Route exact path="/settings">Settings</Route>
          <Route path="/">
            <h2>Welcome!</h2>
          </Route>
        </Switch>
        </Router>
     </section>
  );
};

export default App;