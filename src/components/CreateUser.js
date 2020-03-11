import React, {Component} from 'react';
import axios from 'axios'; 

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            registrationError: ""
        } 
    }

        handleChange(e) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

        onSubmit(e){
           
            const {username, email, password, password_confirmation} = this.state;

            axios.post('http://localhost:5000/users/add', {
                user: {
                    username: username,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                }
            },
            {withCredentials: true}
            ).then(res => {console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
                
             
    
            /*this.setState({
                username: '',
                email: '',
                password: '',
                password_confirmation: ''

            })*/
            e.preventDefault();
        }



    render() {
        return (
            <div>
                <h3>Lag en ny Bruker</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        name="username"
                        className="form-control"
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                </div>
                <div className="form-group">
                    <label>E-mail: </label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="eksempel@gmail.no"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input 
                        type="password" 
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm password: </label>
                    <input 
                        type="password" 
                        name="password_confirmation"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
      </div>
        )
    }
}