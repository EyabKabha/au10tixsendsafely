import React, { Component } from 'react';
import Table from './Table';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ WorkSpaceRole: 'Eyab',
                     Collaborator: 'eyab.kabha@gmail.com', 
                     WorkSpaceName: 'test22',
                     Date: '1212', 
                     AM: 'AAAA', 
                     Customer: 'Customer'},],

            columns: [  { title: 'WorkSpaceRole',field: 'WorkSpaceRole'},
                        { title: 'Collaborator', field: 'Collaborator' },
                        { title: 'WorkSpaceName', field: 'WorkSpaceName' },
                        { title: 'Date', field: 'Date' }, 
                        { title: 'AM', field: 'AM' },{ title: 'Customer/POC', field: 'Customer' }
            ]
        }
    }

    render() {
        return (
            <div className="mt-5">
                <Table data={this.state.data} columns={this.state.columns} />
            </div>
        );
    }
}

export default Search;