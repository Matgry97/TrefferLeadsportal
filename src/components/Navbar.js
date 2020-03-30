import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {
    handleLogOut = async event => {
        event.preventDefault();
        try{
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUserdata(null);
        }catch(error){
            console.log(error.message);
        }
    }
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg"> 
                <Link to="/" className="navbar-brand">Treffer AS - Leadsportal</Link>
                <div className="collapse navbar-collapse">
                    {this.props.auth.isAuthenticated && (
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
                    )}
                    <div className="navbar-end">
                        {this.props.auth.isAuthenticated && this.props.auth.user && (
                            <span className="navbar-text">
                                {this.props.auth.user.username}
                            </span>
                        )}
                    
                        <div className="navbar-item">
                            {!this.props.auth.isAuthenticated && (
                                <Link to="/login" className="nav-link">Logg inn</Link>
                            )}
                        </div>
                        <div className="navbar-item">
                            {this.props.auth.isAuthenticated && (
                                <Link to="/login" className="nav-link" onClick={this.handleLogOut}>Logg ut</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

}
