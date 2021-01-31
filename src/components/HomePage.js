import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import fetcher from '../api/fetcher';
import swal from 'sweetalert';
import { validateTrackerData } from '../shared/validation';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerData: {
        work_space_role: '',
        email: '',
        work_space_name: '',
        date: '',
        account_manager: '',
        customer: '',
      },
      accounts: [],
      formState: {},
      formMessages: {},
      validityState: {},
    }
  }
  onBlur = (fieldName, value) => {

    const nextState = { ...this.state.formState, [fieldName]: value };
    this.setState({ formState: nextState });
    validateTrackerData(nextState, fieldName)
      .done(this.handleValidationResult);
  }

  handleValidationResult = (result) => {
    const msgs = { ...this.state.formMessages };
    const validity = { ...this.state.validityState };

    // iterate over the updated fields
    // (or everything, when submitting)
    result.tested.forEach((fieldName) => {

      // if current field has errors
      if (result.hasErrors(fieldName)) {
        // set its message to the first error from the errors array

        msgs[fieldName] = result.getErrors(fieldName)[0];
        validity[fieldName] = 'form-control is-invalid';
        // if current field has warnings
      } else if (result.hasWarnings(fieldName)) {

        // set its message to the first warning from the warnings array
        msgs[fieldName] = result.getWarnings(fieldName)[0];
        validity[fieldName] = 'warning';
      } else {
        // otherwise, there's not much need for it.
        delete msgs[fieldName];
        validity[fieldName] = 'form-control is-valid';
      }
    });

    this.setState({ formMessages: msgs, validityState: validity });

  }
  onChangeHandler = (event) => {
    const target = event.target;
    const value = target.value;
    const savedData = { ...this.state.customerData, [target.name]: value };
    this.setState({ customerData: savedData });
  }
  onSaveClick = async () => {
    if (!validateTrackerData(this.state.formState).done(this.handleValidationResult).hasErrors()) {
      const data = await fetcher.post('/tracker/new', this.state.customerData);
      if (data.status === 200) {
        swal(`${data.data}`, "", "success");
        this.setState({
          customerData: {
            work_space_role: '',
            email: '',
            work_space_name: '',
            date: '',
            account_manager: '',
            customer: '',
          },
          validityState: {

          }
        })
      }
    }

  }
  componentDidMount = async () => {
    try {
      const { data } = await fetcher.get('/account');
      this.setState({ accounts: data })
    } catch (error) {

    }
  }
  render() {
    return (

      <div className="container mt-5">


        <h1 style={{ marginTop: '100px', backgroundColor: '#fa923f', boxSizing: 'border-box', textAlign: 'center', padding: '20px 4', color: 'white', fontSize: '1.8rem', borderRadius: '150px' }}>Send Safely Tracker</h1>

        <div className="row mt-5">

          <div className="col-md-4 mt-3">
            <label htmlFor="WorkSpaceRole">WorkSpaceRole</label>
            <select className={this.state.validityState.work_space_role || "form-control mt-1"} type="text" name="work_space_role" placeholder="WorkSpaceRole" onChange={this.onChangeHandler} value={this.state.customerData.work_space_role} onBlur={() => this.onBlur('work_space_role', this.state.customerData.work_space_role)}>
              <option value="" id="WorkSpaceRole" >Select Customer</option>
              <option value="Viewer ">Viewer</option>
              <option value="Limited Contributor">Limited Contributor</option>
              <option value="Contributor">Contributor</option>
              <option value="Manager">Manager</option>
            </select>
            <label className="float-right text-danger">{this.state.formMessages.work_space_role}</label>
          </div>
          <div className="col-md-4 mt-3">
            <label htmlFor="Collaborator">Collaborator (Email Address)</label>
            <input id="Collaborator" className={this.state.validityState.email || "form-control mt-1"} type="text" name="email" placeholder="Collaborator" value={this.state.customerData.email} onChange={this.onChangeHandler} onBlur={() => this.onBlur('email', this.state.customerData.email)}></input>
            <label className="float-right text-danger">{this.state.formMessages.email}</label>
          </div>
          <div className="col-md-4 mt-3">
            <label htmlFor="WorkSpaceName">WorkSpaceName</label>
            <input id="WorkSpaceName" className={this.state.validityState.work_space_name || "form-control mt-1"} type="text" name="work_space_name" placeholder="WorkSpaceName" value={this.state.customerData.work_space_name} onChange={this.onChangeHandler} onBlur={() => this.onBlur('work_space_name', this.state.customerData.work_space_name)}></input>
            <label className="float-right text-danger">{this.state.formMessages.work_space_name}</label>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mt-3">
            <label htmlFor="Date">Date</label>
            <input id="Date" className={this.state.validityState.date || "form-control mt-1"} type="date" name="date" value={this.state.customerData.date} onChange={this.onChangeHandler} onBlur={() => this.onBlur('date', this.state.customerData.date)}></input>
            <label className="float-right text-danger">{this.state.formMessages.date}</label>
          </div>
          <div className="col-md-4 mt-3">
            <label htmlFor="AM">Account Manager</label>
            <select id="AM" className={this.state.validityState.account_manager || "form-control mb-2 mt-1"} name="account_manager" value={this.state.customerData.account_manager} onChange={this.onChangeHandler} onBlur={() => this.onBlur('account_manager', this.state.customerData.account_manager)}>
              <option value="">Select Account Manager</option>
              {this.state.accounts.map((account, index) => <option key={index} value={`${account.first_name}${account.last_name}`}>{account.first_name} {account.last_name}</option>)}
            </select>
            <label className="float-right text-danger">{this.state.formMessages.account_manager}</label>
          </div>
          <div className="col-md-4 mt-3">
            <label htmlFor="Customer">Customer/POC</label>
            <select id="Customer" className={this.state.validityState.customer || "form-control mb-2 mt-1"} name="customer" value={this.state.customerData.customer} onChange={this.onChangeHandler} onBlur={() => this.onBlur('customer', this.state.customerData.customer)}>
              <option value="">Select Customer</option>
              <option value="Customer">Customer</option>
              <option value="POC">POC</option>
            </select>
            <label className="float-right text-danger">{this.state.formMessages.customer}</label>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mt-3">
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} fullWidth={true} onClick={this.onSaveClick}>
              Add
             </Button>
          </div>
          {/* <div className="col-md-4 mt-3">
          </div>
          <div className="col-md-4 mt-3">
          </div> */}
        </div>
      </div>
    );
  }
}

export default HomePage;
