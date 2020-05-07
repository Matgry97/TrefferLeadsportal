import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../custom.css";
import styled from "styled-components";

const Lead = (props) => (
  <div class="space">
    <Card className="card-style-custom">
      <Card.Body>
        <Card.Title>
          {props.lead.cname}
          <Card.Text>
            <label className="dato">
              Dato:
              {props.lead.date.substring(0, 10)}
            </label>
          </Card.Text>
        </Card.Title>
        <Card.Subtitle className="mb-2 text muted">
          {props.lead.name}
        </Card.Subtitle>
        <Card.Text>{props.lead.comment}</Card.Text>
        <Card.Link href="#">
          <label className="color-orange">Tlf.Nr:</label>{" "}
          <label className="props-card">{props.lead.tlfnr}</label>
        </Card.Link>
        <Card.Link href="#">
          <label className="color-orange">Rangering:</label>{" "}
          <label className="props-card">{props.lead.range}</label>
        </Card.Link>
        <Card.Link href="#">
          <label className="color-orange">Email :</label>{" "}
          <label className="props-card">{props.lead.email}</label>
        </Card.Link>
        <Card.Link id="moveRight">
          <Link to={"/edit/" + props.lead._id}>
            <Button className="custom-btn">Endre</Button>
          </Link>{" "}
        </Card.Link>
        <Card.Link id="moveRight">
          <Button
            className="custom-btn"
            href="#"
            onClick={() => {
              props.deleteLead(props.lead._id);
            }}
          >
            Slett
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  </div>
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
          <Link to="/" className="link">
            <Button className="custom-btn" id="moveRight">
              Tabell liste
            </Button>
          </Link>
        </div>
        <h3> Leadsliste</h3>
        {this.leadList()}
      </div>
    );
  }
}
