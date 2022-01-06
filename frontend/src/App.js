import React, { useState } from "react";
import Header from "./components/Header/Header";
import SignUp from "./components/SignUp/SignUp";
import Alert from "./components/Alert/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <SignUp />
            </Route>
          </Switch>
          <Alert errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
