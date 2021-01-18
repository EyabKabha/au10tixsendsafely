import React, { Component } from 'react';
import MaterialTable from "material-table";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathName: '',
        }
    }
    componentDidMount = () => {
        const adminOrHome = window.location.pathname.split('/')[1];
        console.log(adminOrHome)
        this.setState({ pathName: adminOrHome });
    }
    render() {
        return (
            <div className="container">
                <MaterialTable title={this.state.pathName === 'adminsetting' ? 'List of Account Managers' : "List of Customers"}
                    data={this.props.data}
                    columns={this.props.columns}
                    options={{
                        // search:false,
                        paging: false,
                        exportButton: true,
                        headerStyle: {
                            backgroundColor: '#00BFFF',
                            fontWeight:'bold',
                        }

                    }}

                />

            </div>
        );
    }
}

export default Table;