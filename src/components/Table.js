import React, { Component } from 'react';
import MaterialTable from "material-table";
import '../style/index.css'
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathName: '',
        }
    }
    componentDidMount = () => {
        const adminOrHome = window.location.pathname.split('/')[1];
        this.setState({ pathName: adminOrHome });

    }

    updateItem = (updateItems, id) => {
        this.props.onRowUpdate(updateItems, id);
    }

    deleteItem = (deleteItems, id) => {
        this.props.onRowDelete(deleteItems, id);
    }
    render() {
        return (
            <div className="container">
                <MaterialTable title={this.state.pathName === 'adminsetting' ? 'Account Managers' : "Customers"}
                    data={this.props.data}
                    columns={this.props.columns}
                    hiddenByColumnsButton={true}

                    options={{
                        paging: false,
                        exportButton: true,
                        headerStyle: {
                            textAlign: 'center',
                            color: 'white',
                            backgroundColor: '#00BFFF',
                        },
                        align: 'center',
                        rowStyle: { textAlign: 'center', fontSize: '15px' },

                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {

                                    const dataUpdate = [...this.props.data];
                                    const indexTable = oldData.tableData.id;
                                    const id = oldData.id;
                                    dataUpdate[indexTable] = newData;
                                    this.updateItem(dataUpdate, id);
                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...this.props.data];
                                    const indexTable = oldData.tableData.id;
                                    const id = oldData.id;
                                    dataDelete.splice(indexTable, 1);
                                    this.deleteItem(dataDelete, id)
                                    resolve()
                                }, 1000)
                            }),
                    }}

                />

            </div>
        );
    }
}

export default Table;