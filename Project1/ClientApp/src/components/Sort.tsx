import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as EmployeeStore from '../store/Employee';

type EmployeeProps =
    EmployeeStore.EmployeesState // ... state we've requested from the Redux store
    & typeof EmployeeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class SortEmployee extends React.PureComponent<EmployeeProps>{

    render() {
        return (
            <button></button>
        );
    }

}

export default connect(
    (state: ApplicationState) => state.employees,
    EmployeeStore.actionCreators
)(SortEmployee as any);