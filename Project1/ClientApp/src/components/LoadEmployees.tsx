import * as React from 'react';
import { useState, useEffect } from 'react';
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

export const LoadEmployees = (props: EmployeeProps) => {
    const [empPage, setEmpPage] = useState(props.employees.slice(0, 4));
    const [page, setPage] = useState(props.pageNumb);
    useEffect(() => {
        if (!props.isLoaded && !props.isLoading) props.requestEmployees();
    }, []);
    useEffect(() => {
        setEmpPage(props.employees.slice(page * 5, (page * 5) + 4));
    }, [page]);
    return (
        <React.Fragment>
            <h1 id="tabelLabel">Employees</h1>
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
                    {empPage.map((employee: EmployeeStore.Employee) =>
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
            <div className="d-flex justify-content-between">
                {props.pageNumb != 0 ? <button className='btn btn-outline-secondary btn-sm' onClick={props.prevPage}>Previous</button> : <span />}
                {props.isLoaded && <span>Loading...</span>}
                {!props.isLoaded && <span>Current page: {props.pageNumb + 1} - Last page: {props.maxPage + 1}</span>}
                {props.pageNumb != props.maxPage ? <button className='btn btn-outline-secondary btn-sm' onClick={props.nextPage}>Next</button> : <span />}
            </div>
        </React.Fragment>
    );

}


export default connect(
    (state: ApplicationState) => state.employees, 
    EmployeeStore.actionCreators 
)(LoadEmployees as any);
