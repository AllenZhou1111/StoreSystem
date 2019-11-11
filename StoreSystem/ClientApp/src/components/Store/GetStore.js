import React, { Component } from 'react';
import { Table, Dropdown, Pagination } from 'semantic-ui-react';
import { AddStore } from './AddStore';
import { EditStore } from './EditStore';
import { DeleteStore } from './DeleteStore';

import _ from 'lodash';

export class GetStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            value: 10,
            activePage: 1,
        };

        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange = (e, { value }) => this.setState({ value })

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    loadData() {
        fetch('/api/stores')
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
                    <AddStore />

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
                            {data.filter(store => (data.indexOf(store) < this.state.value * this.state.activePage && data.indexOf(store) >= this.state.value * (this.state.activePage - 1)))
                                .map(store => (
                                    <Table.Row key={store.id}>
                                        <Table.Cell>{store.name}</Table.Cell>
                                        <Table.Cell>{store.address}</Table.Cell>
                                        <Table.Cell>
                                            <EditStore store={store} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <DeleteStore store={store} />
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

