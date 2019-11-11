import React, { Component } from 'react';
import { Button, Modal, Input, Form, Dropdown } from 'semantic-ui-react';



export class AddSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: -1,
            product: -1,
            store: -1,
            datesold: "",
            addOpen:false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchAdd = this.switchAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json ; charset=utf-8'
            },
            body: JSON.stringify({
                'customerId': parseFloat(this.state.customer),
                'productId': parseFloat(this.state.product),
                'storeId': parseFloat(this.state.store),
                'dateSold': this.state.datesold
            })
        })
            .then((response) => response.json())
            .then(
                (res) => {
                    this.switchAdd();
                    this.resetState();
                },
                (error) => {
                    alert(error.message);
                });
    }

    switchAdd() {
        this.setState(preState => ({ addOpen: !preState.addOpen }));
        
    }

    resetState() {
        this.setState({ customer: -1, product: -1, store: -1, datesold:"" });
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleInputChange(event) {
        debugger;
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Modal trigger={<Button primary onClick={this.switchAdd}>New Sale</Button>}
                size='small'
                open={this.state.addOpen}
                closeOnDimmerClick={false}
                closeOnEscape={false}
                onClose={this.switchAdd}>
                < Modal.Header >Create sale</Modal.Header >
            <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Customer</label>

                        <Dropdown
                            placeholder='Select Customer'
                            fluid
                            selection
                            name='customer'
                            onChange={this.handleChange}
                            options={this.props.customerData}
                        />


                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            placeholder='Select Product'
                            fluid
                            selection
                            name='product'
                            onChange={this.handleChange}
                            options={this.props.productData}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            placeholder='Select Store'
                            fluid
                            selection
                            name='store'
                            onChange={this.handleChange}
                            options={this.props.storeData}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Date Sold</label>
                        <Input name='datesold'
                            type='date'
                            value={this.state.datesold}
                            onChange={this.handleInputChange} />
                    </Form.Field>

                    <Button type='button' secondary onClick={this.switchAdd}>cancel</Button>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='create'
                        type='submit'
                    />
                
                </Form>
            </Modal>
        )
    }
}