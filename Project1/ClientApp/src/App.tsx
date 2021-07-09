import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import LoadEmployees from './components/LoadEmployees';
import { UpdateEmployee } from './components/UpdateEmployee';

import './custom.css';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/load-employees/' component={LoadEmployees} />
        <Route path='/update-employee/:id' component={UpdateEmployee} />
    </Layout>
);
