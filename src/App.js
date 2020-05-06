import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Leadsliste from "./components/Leadsliste";
import EditLead from "./components/EditLead";
import CreateLead from "./components/CreateLead";
import CreateUser from "./components/CreateUser";
import CompanyList from "./components/CompanyList";
import "./custom.css";
import Cardview from "./components/Cardview";
import Login from "./components/login";
import { Auth } from "aws-amplify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);

  function setAuthStatus(authenticated) {
    setIsAuthenticated(authenticated);
  }

  function setUserdata(user) {
    setUser(user);
  }

  useEffect(() => {
    async function retrieveSession() {
      try {
        const session = await Auth.currentSession();
        setAuthStatus(true);
        console.log(session);
        const user = await Auth.currentAuthenticatedUser();
        setUserdata(user);
      } catch (error) {
        console.log(error);
      }
      setIsAuthenticating(false);
    }
    retrieveSession();
  }, []);

  const authProps = {
    isAuthenticated: isAuthenticated,
    user: user,
    setAuthStatus: setAuthStatus,
    setUserdata: setUserdata,
  };

  return (
    <Router>
      <div className="container">
        <Navbar auth={authProps} />
        <br />
        {isAuthenticated && (
          <div>
            <Route
              exact
              path="/"
              render={(props) => <Leadsliste {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/CardView"
              render={(props) => <Cardview {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/userlist"
              render={(props) => <CompanyList {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/edit/:id"
              render={(props) => <EditLead {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/create"
              render={(props) => <CreateLead {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/user"
              render={(props) => <CreateUser {...props} auth={authProps} />}
            />
          </div>
        )}
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} auth={authProps} />}
        />
      </div>
    </Router>
  );
}

export default App;
