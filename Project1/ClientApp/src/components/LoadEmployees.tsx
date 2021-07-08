import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as EmployeeStore from '../store/Employee';

// At runtime, Redux will merge together...
type EmployeeProps =
    EmployeeStore.EmployeesState // ... state we've requested from the Redux store
    & typeof EmployeeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

export function LoadEmploye(props: EmployeeProps) {
    const [emp, setEmp] = useState(props.employees);



    return (
        <React.Fragment>
            props.requestEmployees();
            {props.employees.map((employee: EmployeeStore.Employee) =>
                <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.birthDay}</td>
                    <td>{employee.age}</td>
                    <td>{employee.englishValue}</td>
                    <td>x</td>
                </tr>
            )}
        </React.Fragment>
    );

}

class LoadEmployee extends React.PureComponent<EmployeeProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        //this.ensureDataFetched(0);
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Employees</h1>
                {this.renderEmployeesTable()}
                {this.renderPagination()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestEmployees();
    }

    private renderEmployeesTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Birthday</th>
                        <th>Age</th>
                        <th>English test result</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.employees.map((employee: EmployeeStore.Employee) =>
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.surname}</td>
                            <td>{employee.birthDay}</td>
                            <td>{employee.age}</td>
                            <td>{employee.englishValue}</td>
                            <td>x</td>
                        </tr>
                    )}

                </tbody>
            </table>
        );
    }

    private renderPagination() {

        return (
            <div className="d-flex justify-content-between">
                {this.props.pageNumb != 0 ? <button className='btn btn-outline-secondary btn-sm' onClick={this.props.prevPage}>Previous</button> : ""}
                {this.props.isLoading && <span>Loading...</span>}
                {this.props.pageNumb != this.props.maxPage ? <button className='btn btn-outline-secondary btn-sm' onClick={this.props.nextPage}>Next</button> : ""}
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.employees, 
    EmployeeStore.actionCreators 
)(LoadEmploye as any);
