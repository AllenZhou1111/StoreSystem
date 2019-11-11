import React, { Component } from 'react';
import { Table, Dropdown, Pagination } from 'semantic-ui-react';
import { AddCustomer } from './AddCustomer';
import { EditCustomer } from './EditCustomer';
import { DeleteCustomer } from './DeleteCustomer';

import _ from 'lodash';

export class GetCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            value: 10, 
            activePage:1,
        };

        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange = (e, { value }) => this.setState({ value })

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    loadData() {
        fetch('/api/customers')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.state.data, prevState.data)) {
            this.loadData();
        }
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
               <div>
                    <AddCustomer />

                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.filter(customer => (data.indexOf(customer) < this.state.value * this.state.activePage && data.indexOf(customer) >= this.state.value * (this.state.activePage - 1)))
                                    .map(customer => (
                                    <Table.Row key={customer.id}>
                                        <Table.Cell>{customer.name}</Table.Cell>
                                        <Table.Cell>{customer.address}</Table.Cell>
                                            <Table.Cell>
                                                <EditCustomer customer={customer} />
                                            </Table.Cell>
                                        <Table.Cell>
                                            <DeleteCustomer customer={customer}/>
                                        </Table.Cell>
                                    </Table.Row>))
                            }
                        </Table.Body>
                        
                    </Table>

                    <div>
                        <Dropdown button basic floating
                            value={this.state.value}
                            options={[
                                { text: '5', value: 5 },
                                { text: '10', value: 10 },
                                { text: '15', value: 15 },
                                { text: '20', value: 20 },
                            ]}
                            onChange={this.handlePageChange} />

                        <Pagination
                            defaultActivePage={this.state.activePage}
                            boundaryRange={0}
                            onPageChange={this.handlePaginationChange}
                            siblingRange={0}
                            totalPages={this.state.data.length / this.state.value} />
                    </div>
                </div>
                
            )
        }
    }

}

