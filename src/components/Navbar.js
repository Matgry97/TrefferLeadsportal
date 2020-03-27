import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../pictures/treffer.png';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand" ><img src={Logo} alt="Treffer AS logo"/></Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Leads</Link>
          </li>
          <li className="navbar-item">
            <Link to="/userlist" className="nav-link">Brukerliste</Link>
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
