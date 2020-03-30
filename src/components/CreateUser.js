import React, { Component } from 'react';
import Validate from "../utility/FormValidation";
import FormErrors from "../utility/FormErrors";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../login.css";
import { Auth } from "aws-amplify";

export default class CreateUser extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
        }
  }

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                blankfield: false,
                passwordmatch: false
            }
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.clearErrorState();
        const error = Validate(event, this.state);
        if (error) {
            this.setState({
                errors: { ...this.state.errors, ...error }
            });
        }

        // AWS Cognito
        const { username, email, password} = this.state;
        try {
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
                }
            });
            console.log(signUpResponse);
            this.props.history.push("/");
        }catch(error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: {
                    ...this.state.errors,
                    cognito: err
                }
            })
        }
    };

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    }

    render() {
        return (
            <div className="login">
                <FormErrors formerrors={this.state.errors} />
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username">
                        <FormLabel>Brukernavn</FormLabel>
                        <FormControl 
                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <FormLabel>Epost</FormLabel>
                        <FormControl
                            type="email"
                            value={this.state.email}
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <FormLabel>Passord</FormLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="confirmpassword">
                        <FormLabel>Bekreft passord</FormLabel>
                        <FormControl
                            type="password"
                            value={this.state.confirmpassword}
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
                    <Button type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}