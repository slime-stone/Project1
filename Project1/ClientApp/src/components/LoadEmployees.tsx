import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as EmployeeStore from '../store/Employee';
import EmployeeSort from './Sort';

// At runtime, Redux will merge together...
type EmployeeProps =
    EmployeeStore.EmployeesState // ... state we've requested from the Redux store
    & typeof EmployeeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class LoadEmployee extends React.PureComponent<EmployeeProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched();
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
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestEmployees(startDateIndex);
    }

    private renderEmployeesTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name<EmployeeSort /></th>
                        <th>Surname</th>
                        <th>Birthday</th>
                        <th>Age</th>
                        <th>English test result</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.employess.map((employee: EmployeeStore.Employee) =>
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
        const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

        return (
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/load-employees/${prevStartDateIndex}`}>Previous</Link>
                {this.props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/load-employees/${nextStartDateIndex}`}>Next</Link>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.employees, 
    EmployeeStore.actionCreators 
)(LoadEmployee as any);
