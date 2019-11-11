import React, { Component } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';


export class DeleteStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            deleteOpen: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchDelete = this.switchDelete.bind(this);
        this.resetState = this.resetState.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }


    handleSubmit() {

        fetch('/api/stores/' + this.state.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json ; charset=utf-8'
            },
            body: JSON.stringify({
                'id': this.state.id,
            })
        })
            .then((response) => response.json())
            .then(
                (res) => {
                    this.switchDelete();
                },
                (error) => {
                    alert(error.message);
                });
    }

    resetState() {
        this.setState({ id: -1 });
    }

    switchDelete() {
        this.setState(preState => ({ deleteOpen: !preState.deleteOpen }));
    }

    onOpen() {
        this.setState({
            id: this.props.store.id,
        });
    }

    

    render() {
        return (

            <Modal trigger={<Button onClick={this.switchDelete} color='red'><Icon name='trash' />Delete</Button>}
                size='small'
                open={this.state.deleteOpen}
                onOpen={this.onOpen}
                closeOnDimmerClick={false}
                closeOnEscape={false}
                onClose={this.resetState}>

                < Modal.Header>Delete store</Modal.Header >

                <Modal.Content> Are you sure?</Modal.Content>

                <Form onSubmit={this.handleSubmit}>

                    <Button type='button' secondary onClick={this.switchDelete}>cancel</Button>

                    <Button
                        color='red'
                        icon='close'
                        labelPosition='right'
                        content='delete'
                        type='submit'
                    />
                </Form>
            </Modal>
        )
    }
}