import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Employers from "./Pages/Employers";
import Applicants from "./Pages/Applicants";
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
          <Header/>
            <Switch>
                <Route path={"/jobs"} exact component={Jobs}/>
                <Route path={"/employers"} exact component={Employers}/>
                <Route path={"/applicants"} exact component={Applicants}/>
                <Route path={"/"} exact component={Jobs}/>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
