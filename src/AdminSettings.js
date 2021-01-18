import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Table from './Table';
class AdminSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAM: {
                firstname: '',
                lastname: '',
            },
            data: [{ FirstName: 'Eyab', LastName: 'Kabha' }],
            columns: [{ title: 'First Name', field: 'FirstName' }, { title: 'Last Name', field: 'LastName' }]
        }
    }

    addNewAm = () => {
        const obj = { FirstName: this.state.dataAM.firstname, LastName: this.state.dataAM.lastname };
        this.setState({
            data: [...this.state.data, obj], 
            dataAM: {
                firstname: '',
                lastname: '',
            }
        })
    }
    onChangeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const savedData = { ...this.state.dataAM, [target.name]: value };
        this.setState({ dataAM: savedData });
    }
    render() {
        return (
            <div className="container">
                {/* <div>Admin page</div> */}
                <h1 style={{ fontStyle:'',marginTop: '100px', backgroundColor: '#fa923f', boxSizing: 'border-box', textAlign: 'center', padding: '20px 0', color: 'white', fontSize: '1.8rem' }}>Admin Settings</h1>
                <div className="row">
                    <div className="col-md-4">
                        <label className="mt-5">First Name</label>
                        <input className="form-control" value={this.state.dataAM.firstname} type="text" name="firstname" onChange={this.onChangeHandler} ></input>
                    </div>
                    <div className="col-md-4">
                        <label className="mt-5">Last Name</label>
                        <input className="form-control" value={this.state.dataAM.lastname} type="text" name="lastname" onChange={this.onChangeHandler} ></input>
                    </div>
                    <div className="col-md-4">
                        <label className="mt-5">&nbsp;</label>
                        <Button variant="contained" color="secondary" startIcon={<AddIcon />} fullWidth={true} onClick={this.addNewAm}>
                            Add
                         </Button>
                    </div>
                </div>
                <div className="mt-5">
                    <Table data={this.state.data} columns={this.state.columns} />
                </div>
            </div>
        );
    }
}

export default AdminSettings;