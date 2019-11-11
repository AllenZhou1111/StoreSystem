import React, { Component } from 'react';
import { Button, Modal, Input, Form } from 'semantic-ui-react';



export class AddStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            addOpen:false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchAdd = this.switchAdd.bind(this);

    }

    handleSubmit() {
        fetch('/api/stores', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json ; charset=utf-8'
            },
            body: JSON.stringify({
                'name': this.state.name,
                'address': this.state.address
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
        this.setState({ name: "", address: "" });
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
            <Modal trigger={<Button primary onClick={this.switchAdd}>New Store</Button>}
                size='small'
                open={this.state.addOpen}
                closeOnDimmerClick={false}
                closeOnEscape={false}
                onClose={this.switchAdd}>
                < Modal.Header >Create store</Modal.Header >
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