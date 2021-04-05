import React, { Component } from 'react';
import fetcher from '../api/fetcher';
import Table from './Table';

import swal from 'sweetalert';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [{ title: 'WorkSpaceRole', field: 'work_space_role' },
            { title: 'Collaborator', field: 'email' },
            { title: 'WorkSpaceName', field: 'work_space_name' },
            { title: 'Date', field: 'date' },
            { title: 'Account Manager', field: 'account_manager' },
            { title: 'Customer/POC', field: 'customer' },
            ]
        }
    }

    onRowUpdate = async (dataFromTable, id) => {
        try {
            const dataFilteredTracker = dataFromTable.filter(datatracker => datatracker.id === id)
            const token = localStorage.getItem('token')
            const data = await fetcher.put(`/tracker/edit/${id}`, dataFilteredTracker, { headers: { "authorization": `token ${token}` }})
            if (data.status === 200) {
                swal(`${data.data}`, "", "success");
                this.setState({
                    data: dataFromTable
                })
            }
        } catch (error) {

        }
    }

    onRowDelete = async (deleteFromTable, id) => {
        try {
            const token = localStorage.getItem('token')
            const data = await fetcher.delete(`/tracker/delete/${id}`, deleteFromTable, { headers: { "authorization": `token ${token}` }});
            if (data.status === 200) {
                swal(`${data.data}`, "", "success");
                this.setState({
                    data: deleteFromTable
                })
            }
        } catch (error) {

        }
    }

    componentDidMount = async () => {
        try {
            const dataTracker = []
            const token = localStorage.getItem('token')
            const allCustomers = await fetcher.get('/tracker',{ headers: { "authorization": `token ${token}` }});
            allCustomers.data.forEach(tracker => {
                dataTracker.push({
                    id: tracker.id,
                    work_space_role: tracker.work_space_role,
                    work_space_name: tracker.work_space_name,
                    email: tracker.email,
                    date: tracker.date,
                    account_manager: tracker.account_manager,
                    customer: tracker.customer
                })
            })
            this.setState({ data: dataTracker });
        } catch (error) {

        }
    }
    
    render() {
        return (
            <div className="mt-5">
              
                <Table data={this.state.data} columns={this.state.columns} onRowUpdate={this.onRowUpdate} onRowDelete={this.onRowDelete} />
            </div>
        );
    }
}

export default Search;