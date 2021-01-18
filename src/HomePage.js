import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class HomePage extends Component {
  constructor(props) {
    super(props);
      this.state={
        customerData:{
          WorkSpaceRole:'',
          Collaborator:'',
          WorkSpaceName:'',
          Date:'',
          AM:'',
          Customer:'',
        }
      }
  }

  componentDidMount = () => {

  }
  render() {
    return (

      <div className="container mt-5">

     
        <h1 style={{ marginTop: '100px', backgroundColor: '#fa923f', boxSizing: 'border-box', textAlign: 'center', padding: '20px 0', color: 'white', fontSize: '1.8rem' }}>Send Safely Tracker</h1>

        <div className="row mt-5">

          <div className="col-md-4 mt-3">
            <label for="WorkSpaceRole">WorkSpaceRole</label>
            <input id="WorkSpaceRole" class="form-control mt-1" type="text" name="WorkSpaceRole" placeholder="WorkSpaceRole"></input>
          </div>
          <div className="col-md-4 mt-3">
            <label for="Collaborator">Collaborator (Email Address)</label>
            <input id="Collaborator" class="form-control mt-1" type="text" name="Collaborator" placeholder="Collaborator"></input>
          </div>
          <div className="col-md-4 mt-3">
            <label for="WorkSpaceName">WorkSpaceName</label>
            <input id="WorkSpaceName"  class="form-control mt-1" type="text" name="WorkSpaceName" placeholder="WorkSpaceName"></input>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mt-3">
            <label for="Date">Date</label>
            <input id="Date"class="form-control mt-1" type="date" name="Date"></input>
          </div>
          <div className="col-md-4 mt-3">
            <label for="AM">AM (Account Manager)</label>
            <select id="AM" className="form-control mb-2 mt-1" name="AM">
              <option id="AM"value="">test1</option>
              <option>test2</option>
            </select>
          </div>
          <div className="col-md-4 mt-3">
            <label for="Customer">Customer/POC</label>
            <select id="Customer" className="form-control mb-2 mt-1"  name="Customer">
              
              <option value="Customer">Customer</option>
              <option value="POC">POC</option>
            </select>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mt-3">
          </div>
          <div className="col-md-4 mt-3">
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} fullWidth={true}>
              Add
             </Button>
          </div>
          <div className="col-md-4 mt-3">
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
