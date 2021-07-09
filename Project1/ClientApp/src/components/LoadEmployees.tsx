import * as React from 'react';
import { useState, useEffect , useMemo} from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as EmployeeStore from '../store/Employee';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

// At runtime, Redux will merge together...
type EmployeeProps =
    EmployeeStore.EmployeesState // ... state we've requested from the Redux store
    & typeof EmployeeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

function byFieldASC(field:string) {
    return (a: any, b: any) => a[field] < b[field] ? 1 : -1;
}
function byFieldDESC(field: string) {
    return (a: any, b: any) => a[field] > b[field] ? 1 : -1;
}

export const LoadEmployees = (props: EmployeeProps) => {


    useEffect(() => {
        if (!props.isLoaded && !props.isLoading) {
            props.requestEmployees();
        }
    }, []);


    const [empPack, setEmpPack] = useState(props.employees);

    ///sort

    const [nameSort, setNameSort] = useState('none');

    useEffect(() => {
        if (nameSort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("name")));
        } else {
            setEmpPack(empPack.sort(byFieldDESC("name")));
        }
    }, [nameSort]);

    const [surnameSort, setSurnameSort] = useState('none');

    useEffect(() => {
        if (surnameSort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("surname")));
        } else {
            setEmpPack(empPack.sort(byFieldDESC("surname")));
        }
    }, [surnameSort]);

    const [birthdaySort, setBirthdaySort] = useState('none');

    useEffect(() => {
        if (birthdaySort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("birthDay")));
        } else {
            setEmpPack(empPack.sort(byFieldDESC("birthDay")));
        }
    }, [birthdaySort]);

    const [ageSort, setAgeSort] = useState('none');

    useEffect(() => {
        if (ageSort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("age")));
        } else {
            setEmpPack(empPack.sort(byFieldDESC("age")));
        }
    }, [ageSort]);

    const [englishSort, setEnglishSort] = useState('none');

    useEffect(() => {
        if (englishSort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("age")));
        } else {
            setEmpPack(empPack.sort(byFieldDESC("age")));
        }
    }, [englishSort]);

    ///pagination

    const [page, setPage] = useState(0);

    const [maxPage, setMaxPage] = useState(0);

    useEffect(() => {
        setMaxPage(Math.ceil(props.employees.length / 5) - 1);
    }, [props.employees]);

    ///empPack

    useEffect(() => {
        setEmpPack(props.employees.slice(page * 5, (page * 5) + 5))
    }, [page, props.employees]);



    ///

    return (
        <React.Fragment>
            <h1 id="tabelLabel">Employees</h1>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name - <button className='btn btn-outline-secondary btn-sm' onClick={() => setNameSort(nameSort !== 'asc' ? 'asc' : 'desc')}>{nameSort}</button></th>
                        <th>Surname - <button className='btn btn-outline-secondary btn-sm' onClick={() => setSurnameSort(surnameSort !== 'asc' ? 'asc' : 'desc')}>{surnameSort}</button></th>
                        <th>Birthday - <button className='btn btn-outline-secondary btn-sm' onClick={() => setBirthdaySort(birthdaySort !== 'asc' ? 'asc' : 'desc')}>{birthdaySort}</button></th>
                        <th>Age - <button className='btn btn-outline-secondary btn-sm' onClick={() => setAgeSort(ageSort !== 'asc' ? 'asc' : 'desc')}>{ageSort}</button></th>
                        <th>English test result - <button className='btn btn-outline-secondary btn-sm' onClick={() => setEnglishSort(englishSort !== 'asc' ? 'asc' : 'desc')}>{englishSort}</button></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {empPack.map((employee: EmployeeStore.Employee) =>
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.surname}</td>
                            <td>{employee.birthDay}</td>
                            <td>{employee.age}</td>
                            <td>{employee.englishValue}</td>
                            <td><NavLink tag={Link} className="text-dark" to={`/update-employee/${employee.id}/${employee.name}/${employee.surname}/${employee.birthDay}/${employee.age}/${employee.englishValue}`}>Edit</NavLink></td>
                        </tr>
                    )}

                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                {page!= 0 ? <button className='btn btn-outline-secondary btn-sm' onClick={() => setPage(page - 1)}>Previous</button> : <span />}
                {props.isLoaded && <span>Loading...</span>}
                {!props.isLoaded && <span>Current page: {page + 1} - Last page: {maxPage+1}</span>}
                {page != maxPage ? <button className='btn btn-outline-secondary btn-sm' onClick={() => setPage(page + 1)}>Next</button> : <span />}
            </div>
        </React.Fragment>
    );

}


export default connect(
    (state: ApplicationState) => state.employees, 
    EmployeeStore.actionCreators 
)(LoadEmployees as any);
