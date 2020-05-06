import React, { Component } from "react";
import "../custom.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercises extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangecname = this.onChangecname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTlfnr = this.onChangeTlfnr.bind(this);
    this.onChangeRange = this.onChangeRange.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      cname: "",
      email: "",
      tlfnr: 0,
      range: 1,
      comment: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/leads/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          cname: response.data.cname,
          email: response.data.email,
          tlfnr: response.data.tlfnr,
          range: response.data.range,
          comment: response.data.comment,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangecname(e) {
    this.setState({
      cname: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeTlfnr(e) {
    this.setState({
      tlfnr: e.target.value,
    });
  }

  onChangeRange(e) {
    this.setState({
      range: e.target.value,
    });
  }

  onChangeComment(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const lead = {
      name: this.state.name,
      cname: this.state.cname,
      email: this.state.email,
      tlfnr: this.state.tlfnr,
      range: this.state.range,
      comment: this.state.comment,
      date: this.state.date,
    };

    axios
      .post(
        "http://localhost:5000/leads/update/" + this.props.match.params.id,
        lead
      )
      .then((res) => console.log(res.data));

    console.log(lead);

    window.location = "/CardView";
  }

  render() {
    return (
      <div>
        <h3>EndreLead</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Velg en Bedrift: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.cname}
              onChange={this.onChangecname}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Navn på Lead: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              placeholder="leadEksempel@treffer.no"
              type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Telefon Nummer</label>
            <input
              type="number"
              className="form-control"
              value={this.state.tlfnr}
              onChange={this.onChangeTlfnr}
            />
          </div>
          <div className="form-group">
            <label>
              Rangering <small>(Tall fra 1 til 5)</small>
            </label>
            <input
              type="number"
              min="1"
              max="5"
              className="form-control"
              value={this.state.range}
              onChange={this.onChangeRange}
            />
          </div>
          <div className="form-group">
            <label>Kommentar</label>
            <textarea
              type="number"
              className="form-control"
              value={this.state.comment}
              onChange={this.onChangeComment}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Oppdater Lead" className="custom-btn" />
          </div>
        </form>
      </div>
    );
  }
}
