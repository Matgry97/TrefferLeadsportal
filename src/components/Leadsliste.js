import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../custom.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Styled from "styled-components";

const Lead = (props) => (
  <tr>
    <td>{props.lead.cname}</td>
    <td>{props.lead.name}</td>
    <td>{props.lead.email}</td>
    <td>{props.lead.comment}</td>
    <td>{props.lead.tlfnr}</td>
    <td>{props.lead.date.substring(0, 10)}</td>
    <td>{props.lead.range}</td>
    <td>
      <Link to={"/edit/" + props.lead._id}>
        {" "}
        <Button className="custom-btn">Endre</Button>
      </Link>
    </td>
    <td>
      <Button
        className="custom-btn"
        href="#"
        onClick={() => {
          props.deleteLead(props.lead._id);
        }}
      >
        Slett
      </Button>
    </td>
  </tr>
);

export default class LeadsList extends Component {
  constructor(props) {
    super(props);

    this.deleteLead = this.deleteLead.bind(this);

    this.state = { leads: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/leads/")
      .then((res) => {
        this.setState({ leads: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLead(id) {
    axios
      .delete("http://localhost:5000/leads/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      leads: this.state.leads.filter((el) => el._id !== id),
    });
  }

  leadList() {
    return this.state.leads.map((currentLead) => {
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
        <div>
          <Link to="/CardView" className="link">
            <Button className="custom-btn" id="moveRight">
              Card View
            </Button>
          </Link>
        </div>
        <h3>Leadsliste</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Bedrifts Navn</th>
              <th color="gray">Lead Navn</th>
              <th>Email</th>
              <th color="gray">Merknad</th>
              <th>Telefon Nr.</th>
              <th color="gray">Dato Laget</th>
              <th>Range</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.leadList()}</tbody>
        </table>
      </div>
    );
  }
}
