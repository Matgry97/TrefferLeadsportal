import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Lead = props => (
    <tr>
       <td>{props.lead.cname}</td>
      <td>{props.lead.amount}</td>
      <td>
        <Link to={"/edit/"+props.lead._id}>edit</Link> | <a href="#" onClick={() => { props.deleteLead(props.lead._id) }}>delete</a>
      </td>
    </tr>
  )

export default class LeadsList extends Component {
    
    constructor(props){
        super(props);

        this.deleteLead = this.deleteLead.bind(this);

        this.state = {leads: []};


    }

    componentDidMount() {
        axios.get('http://localhost:5000/leads/')
            .then(res => {
                this.setState({leads: res.data})
            })
            .catch((err) => {
                console.log(err);
            })
    }       

    deleteLead(id) {
        axios.delete('http://localhost:5000/leads/' + id)
            .then(res => console.log(res.data));

        this.setState({
            leads: this.state.leads.filter(el => el._id !== id)
        })
    }

    leadList() {
        return this.state.leads.map(currentLead => {
            return <Lead lead={currentLead} deleteLead={this.deleteLead} key={currentLead._id}/>;
        })
    }

    render() {
        return (
            <div>
        <h3>Leadsliste</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Bedrifts Navn</th>
              <th>Antall leads</th>
              <th>Funksjoner</th>
            </tr>
          </thead>
          <tbody>
            { this.leadList() }
          </tbody>
        </table> 
      </div>
        )
    }
}