import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import TrefferLogo from "../trefferLogo.png";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import LogoutLogo from "../logoutLogo.png";
import LoggetInn from "../loggetInn.png";
import "../custom.css";

export default class Navbar extends Component {
  handleLogOut = async (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUserdata(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          <img src={TrefferLogo} alt="Treffer" width="120em" heigth="120em" />
        </Link>
        <div className="collapse navbar-collapse">
          {this.props.auth.isAuthenticated && (
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Leads
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/userlist" className="nav-link">
                  Brukerliste
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Lag en Lead
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/user" className="nav-link">
                  Lag en Bruker
                </Link>
              </li>
            </ul>
          )}
          <div className="navbar-item">
            {this.props.auth.isAuthenticated && this.props.auth.user && (
              <span className="navbar-text">
                {this.props.auth.user.username}
                <img src={LoggetInn} height="35em" width="30em" />
              </span>
            )}

            <div className="navbar-item" id="moveRight">
              {!this.props.auth.isAuthenticated && (
                <Link to="/login" className="nav-link">
                  <Button className="custom-btn">Login</Button>
                </Link>
              )}
            </div>
            <div className="navbar-item" id="moveRight">
              {this.props.auth.isAuthenticated && (
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={this.handleLogOut}
                >
                  <img
                    src={LogoutLogo}
                    alt="Logout"
                    height="35em"
                    width="30em"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
