import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";

const Lead = props => (
  <div class="space">
    <Card style={{ width: "69.4rem" }}>
      <Card.Body>
        <Card.Title>
          {props.lead.cname}
          <Card.Text>
            <small class="date-text">{props.lead.date.substring(0, 10)}</small>
          </Card.Text>
        </Card.Title>
        <Card.Subtitle className="mb-2 text muted">
          {props.lead.name}
        </Card.Subtitle>
        <Card.Text>{props.lead.comment}</Card.Text>
        <Card.Link href="#">{props.lead.tlfnr}</Card.Link>
        <Card.Link href="#">{props.lead.email}</Card.Link>
        <Card.Link>
          <Link to={"/edit/" + props.lead._id}>Edit</Link> / {"  "}
          <a
            href="#"
            onClick={() => {
              props.deleteLead(props.lead._id);
            }}
          >
            Delete{"  "}
          </a>
        </Card.Link>
      </Card.Body>
    </Card>
  </div>
);

const tableLeads = props => (
  <tr>
    <td>{props.lead.cname}</td>
    <td>{props.lead.name}</td>
    <td>{props.lead.comment}</td>
    <td>{props.lead.email}</td>
    <td>{props.lead.tlfnr}</td>
    <td>{props.date.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.user._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class CardList extends Component {
  constructor(props) {
    super(props);

    this.deleteLead = this.deleteLead.bind(this);

    this.state = { leads: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/leads/")
      .then(res => {
        this.setState({ leads: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteLead(id) {
    axios
      .delete("http://localhost:5000/leads/" + id)
      .then(res => console.log(res.data));

    this.setState({
      leads: this.state.leads.filter(el => el._id !== id)
    });
  }

  leadList() {
    return this.state.leads.map(currentLead => {
      return (
        <Lead
          lead={currentLead}
          deleteLead={this.deleteLead}
          key={currentLead._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick="viewTable">Tabell</button>
        <button onClick="viewCard">Card</button>
        {this.leadList()}
      </div>
    );
  }
}

/*   render() {
        return (
            <div>
        <h3>Leadsliste</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Bedrifts Navn</th>
              <th>Lead Navn</th>
              <th>Email</th>
              <th>Merknad</th>
              <th>Telefon Nr.</th>
              <th>Dato Laget</th>
              <th>Funksjoner</th>
            </tr>
          </thead>
          <tbody>
            { this.leadList() }
          </tbody>
        </table> 
      </div>
        )
    } */
