import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
                {this.props.children}

            </Container>

            <footer>{'\u00A9'}2019 - Allen Zhou</footer>
        </div>
    );
  }
}
