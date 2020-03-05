import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Leadsliste from "./components/Leadsliste";
import EditLead from "./components/EditLead";
import CreateLead from "./components/CreateLead";
import CreateUser from "./components/CreateUser";
import CompnayList from "./components/CompanyList";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Leadsliste} />
        <Route path="/userlist" component={CompnayList} />
        <Route path="/edit/:id" component={EditLead} />
        <Route path="/create" component={CreateLead} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
