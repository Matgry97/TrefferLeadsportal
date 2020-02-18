import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateLead extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeTlfnr = this.onChangeTlfnr.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: [] 
        }


    }

    componentDidMount() {
      axios.get('http://localhost:5000/users/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.username),
                    username: res.data[0].username
                }) 
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeTlfnr(e) {
        this.setState({
            tlfnr: e.target.value
        });
    }


  onChangeComment(e) {
    this.setState({
        comment: e.target.value
    });
  }

  onChangeDate(date){
    this.setState({
      date: date
    })
  }
    onSubmit(e){
        e.preventDefault();

        const lead = {
            name: this.state.name,
            lastname: this.state.lastname, 
            email: this.state.email,
            tlfnr: this.state.tlfnr,
            comment: this.state.comment,
            date: this.state.date
        }

        axios.post('http://localhost:5000/leads/add', lead)
                .then(res => console.log(res.data));

        console.log(lead); 

        window.location = '/';
    }

    render() {
        return (
            <div>
            <h3>Lag en Ny Lead</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Velg en Bedrift: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.lastname}
                    onChange={this.onChangeLastname}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Navn på Lead: </label>
                <input  type="text"
                    required
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
                <input type="submit" value="Lag en Lead" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}