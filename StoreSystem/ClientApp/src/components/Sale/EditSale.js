import React, { Component } from 'react';
import { Button, Modal, Input, Form, Icon, Dropdown } from 'semantic-ui-react';


export class EditSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            customer: -1,
            product: -1,
            store: -1,
            datesold: "",
            editOpen: false,
            
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchEdit = this.switchEdit.bind(this);
        this.resetState = this.resetState.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit() {
        
        fetch('/api/sales/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json ; charset=utf-8'
            },
            body: JSON.stringify({
                'id': this.state.id,
                'customerId': parseFloat(this.state.customer),
                'productId': parseFloat(this.state.product),
                'storeId': parseFloat(this.state.store),
                'dateSold': this.state.datesold
            })
        })
            .then((response) => response.json())
            .then(
                (res) => {
                    
                },
                (error) => {
                    
                });
        this.switchEdit();
        
    }

    resetState() {
        this.setState({ customer: -1, product: -1, store: -1, datesold: "" });
    }

    switchEdit() {
        this.setState(preState => ({ editOpen: !preState.editOpen }));
    }


    onOpen() {
        this.setState({
            id: this.props.sale.id,
            customer: this.props.sale.customerId,
            product: this.props.sale.productId,
            store: this.props.sale.storeId,
            datesold: this.props.sale.dateSold.slice(0,10)
        });
    }

    handleInputChange(event) {
        
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            
            <Modal trigger={<Button onClick={this.switchEdit} color='yellow'><Icon name='edit' />Edit</Button>}
                size='small'
                open={this.state.editOpen}
                onOpen={this.onOpen}
                closeOnDimmerClick={false}
                closeOnEscape={false}
                onClose={this.resetState}>

                < Modal.Header >Edit sale</Modal.Header >

                <Form onSubmit={this.handleSubmit}>

                    <Form.Field>
                        <label>Customer</label>

                        <Dropdown
                            placeholder='Select Customer'
                            fluid
                            selection
                            value={this.state.customer}
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
                            value={this.state.product}
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
                            value={this.state.store}
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

                    <Button type='button' secondary onClick={this.switchEdit}>cancel</Button>

                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='edit'
                        type='submit'
                    />
                </Form>
            </Modal>
        )
    }
}