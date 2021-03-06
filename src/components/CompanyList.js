import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "../custom.css";
const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.email}</td>
    <td>{props.user.leads.length}</td>
    <td>
      <Link to={"/edit/" + props.user._id}>
        <Button className="custom-btn">Endre </Button>
      </Link>
    </td>
    <td>
      <Button
        className="custom-btn"
        href="#"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Slett
      </Button>
    </td>
  </tr>
);

export default class companyList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteUser(id) {
    axios
      .delete("http://localhost:5000/users/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  }

  userList() {
    return this.state.users.map((currentUser) => {
      return (
        <User
          user={currentUser}
          deleteUser={this.deleteUser}
          key={currentUser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Brukerliste</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Brukernavn</th>
              <th>E-post</th>
              <th>Antall leads</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}
