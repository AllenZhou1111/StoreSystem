import React, { Component } from 'react';
import { Button, Modal, Input, Form, Icon} from 'semantic-ui-react';


export class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            name: "",
            address: "",
            editOpen: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchEdit = this.switchEdit.bind(this);
        this.resetState = this.resetState.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }


    handleSubmit() {
        
        fetch('/api/customers/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json ; charset=utf-8'
            },
            body: JSON.stringify({
                'id': this.state.id,
                'name': this.state.name,
                'address': this.state.address
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
        this.setState({ id: -1, name: "", address: "" });
    }

    switchEdit() {
        this.setState(preState => ({ editOpen: !preState.editOpen }));
    }


    onOpen() {
        this.setState({
            id: this.props.customer.id,
            name: this.props.customer.name,
            address: this.props.customer.address
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

                < Modal.Header >Edit customer</Modal.Header >

                <Form onSubmit={this.handleSubmit}>

                    <Form.Field>
                        
                        <label>Name</label>
                        <Input name='name'
                            type='text'
                            value={this.state.name}
                            onChange={this.handleInputChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <Input name='address'
                            type='text'
                            value={this.state.address}
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