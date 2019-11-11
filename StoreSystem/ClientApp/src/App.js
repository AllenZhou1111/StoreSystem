import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { GetCustomer } from './components/Customer/GetCustomer';
import { GetProduct } from './components/Product/GetProduct';
import { GetStore } from './components/Store/GetStore';
import { GetSale } from './components/Sale/GetSale';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/Customers' component={GetCustomer} />
            <Route path='/Products' component={GetProduct} />
            <Route path='/Stores' component={GetStore} />
            <Route path='/Sales' component={GetSale} />
      </Layout>
    );
  }
}
