import React, { Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Treffer AS - Leadsportal</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Leads</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Lag en Lead</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Lag en Bruker</Link>
          </li>
        </ul>
        </div>
      </nav>
        );
    }

}
