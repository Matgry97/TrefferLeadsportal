import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";
import "../custom.css";
import "../login.css";
import { Auth } from "aws-amplify";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false,
    },
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
      },
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    }

    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log(user);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUserdata(user);
      this.props.history.push("/");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <div className="login bg-light">
        <FormErrors formerrors={this.state.errors} />
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <FormLabel>Brukernavn eller epost</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Passord</FormLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </FormGroup>
          <button type="submit" className="custom-btn">
            Login
          </button>
        </form>
      </div>
    );
  }
}
