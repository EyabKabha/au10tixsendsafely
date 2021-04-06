import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Table from './Table';
import fetcher from '../api/fetcher';
import { validateAccountManager } from '../shared/validation';


class AdminSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAM: {
                first_name: '',
                last_name: '',
            },
            dataTemp: [],
            data: [],
            columns: [{ title: 'First Name', field: 'first_name' }, { title: 'Last Name', field: 'last_name' }],
            formState: {},
            formMessages: {},
            validityState: {},
        }
    }

    onRowUpdate = async (dataFromTable, id) => {
        try {
            const token = localStorage.getItem('token')
            const dataFiltered = dataFromTable.filter(account => account.id === id)
            await fetcher.put(`/account/edit/${id}`, dataFiltered, { headers: { "authorization": `token ${token}` } })
        } catch (error) {

        }
        this.setState({
            data: dataFromTable
        })
    }
    onBlur = (fieldName, value) => {

        const nextState = { ...this.state.formState, [fieldName]: value };
        this.setState({ formState: nextState });
        validateAccountManager(nextState, fieldName)
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
    onRowDelete = async (deleteFromTable, id) => {
        try {
            const token = localStorage.getItem('token')
            console.log(token)
            await fetcher.delete(`/account/delete/${id}`, deleteFromTable);
            this.setState({
                data: deleteFromTable
            })
        } catch (error) {

        }
    }
    addNewAm = async () => {
        const obj = { first_name: this.state.dataAM.first_name, last_name: this.state.dataAM.last_name };
        if (!validateAccountManager(this.state.formState).done(this.handleValidationResult).hasErrors()) {
            const token = localStorage.getItem('token')
            await fetcher.post('/account/new', obj, { headers: { "authorization": `token ${token}` } });
            this.setState({
                data: [...this.state.data, obj],
                dataAM: {
                    first_name: '',
                    last_name: '',
                },
                validityState: {}
            })
        }
    }
    onChangeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const savedData = { ...this.state.dataAM, [target.name]: value };
        this.setState({ dataAM: savedData });
    }
    componentDidMount = async () => {
        const arrayFromDB = [];
        const token = localStorage.getItem('token')
        const account = await fetcher.get('/account', { headers: { "authorization": `token ${token}` } });
        account.data.forEach(am => {
            arrayFromDB.push({ id: am.id, first_name: am.first_name, last_name: am.last_name })
        })
        this.setState({ data: arrayFromDB })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="first_name" className="mt-5">First Name</label>
                        <input id="first_name" className={this.state.validityState.first_name || "form-control"} value={this.state.dataAM.first_name} type="text" name="first_name" onChange={this.onChangeHandler} onBlur={() => this.onBlur('first_name', this.state.dataAM.first_name)}></input>
                        <label style={{ color: 'red' }}>{this.state.formMessages.first_name}</label>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="last_name" className="mt-5">Last Name</label>
                        <input id="last_name" className={this.state.validityState.last_name || "form-control"} value={this.state.dataAM.last_name} type="text" name="last_name" onChange={this.onChangeHandler} onBlur={() => this.onBlur('last_name', this.state.dataAM.last_name)}></input>
                        <label style={{ color: 'red' }}>{this.state.formMessages.last_name}</label>
                    </div>
                    <div className="col-md-4">
                        <label className="mt-5">&nbsp;</label>
                        <Button variant="contained" color="secondary" startIcon={<AddIcon />} fullWidth={true} onClick={this.addNewAm}>
                            Add
                         </Button>
                    </div>
                </div>
                <div className="mt-5">
                    <Table data={this.state.data} columns={this.state.columns} onRowUpdate={this.onRowUpdate} onRowDelete={this.onRowDelete} />
                </div>
            </div>
        );
    }
}

export default AdminSettings;