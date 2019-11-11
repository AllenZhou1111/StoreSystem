import React, { Component } from 'react';
import { Table, Dropdown, Pagination } from 'semantic-ui-react';
import { AddSale } from './AddSale';
import { EditSale } from './EditSale';
import { DeleteSale } from './DeleteSale';
import _ from 'lodash';

async function getDataAsync(name) {
    let response = await fetch('/api/'+name);
    let data = await response.json()
    return data;
}

export class GetSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isSaleLoaded: false,
            isStoreLoaded: false,
            isCustomerLoaded: false,
            isProductLoaded: false,
            data: [],
            value: 10,
            activePage: 1,
            customerData: [],
            storeData: [],
            productData: [],
        };

        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange = (e, { value }) => this.setState({ value })

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })


    loadData() {

        getDataAsync('customers')
            .then(
                (result) => {
                    this.setState({
                        isCustomerLoaded: true,
                        customerData: _.map(result, (customer) => ({
                            key: customer.id,
                            text: customer.name,
                            value: customer.id,
                        }))
                        
                    })
                },
                (error) => {
                    this.setState({
                        isCustomerLoaded: true,
                        error
                    });
                }
        )
        

        getDataAsync('stores')
            .then(
                (result) => {
                    this.setState({
                        isStoreLoaded: true,
                        storeData: _.map(result, (store) => ({
                            key: store.id,
                            text: store.name,
                            value: store.id,
                        }))
                        
                    })
                },
                (error) => {
                    this.setState({
                        isStoreLoaded: true,
                        error
                    });
                    
                }
            )

        getDataAsync('products')
            .then(
                (result) => {
                    this.setState({
                        isProductLoaded: true,
                        productData: _.map(result, (product) => ({
                            key: product.id,
                            text: product.name,
                            value: product.id,
                        }))
                    })
                },
                (error) => {
                    this.setState({
                        isProductLoaded: true,
                        error
                    });
                    
                }
            )

        getDataAsync('sales')
            .then(
                (result) => {
                    this.setState({
                        isSaleLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isSaleLoaded: true,
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
        const { error, isSaleLoaded, isCustomerLoaded, isProductLoaded, isStoreLoaded, data } = this.state;
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if ((!isSaleLoaded) || (!isCustomerLoaded) || (!isProductLoaded)|| (!isStoreLoaded)) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <AddSale customerData={this.state.customerData} storeData={this.state.storeData} productData={this.state.productData} />

                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Customer</Table.HeaderCell>
                                <Table.HeaderCell>Product</Table.HeaderCell>
                                <Table.HeaderCell>Store</Table.HeaderCell>
                                <Table.HeaderCell>Date Sold</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.filter(sale => (data.indexOf(sale) < this.state.value * this.state.activePage && data.indexOf(sale) >= this.state.value * (this.state.activePage - 1)))
                                .map(sale => (
                                    <Table.Row key={sale.id}>
                                        <Table.Cell>{this.state.customerData.find(x => x.key === sale.customerId).text}</Table.Cell>
                                        <Table.Cell>{this.state.productData.find(x => x.key === sale.productId).text}</Table.Cell>
                                        <Table.Cell>{this.state.storeData.find(x => x.key === sale.customerId).text}</Table.Cell>
                                        <Table.Cell>{sale.dateSold.slice(0,10)}</Table.Cell>
                                        <Table.Cell>
                                            <EditSale sale={sale} customerData={this.state.customerData} storeData={this.state.storeData} productData={this.state.productData} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <DeleteSale sale={sale} />
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

