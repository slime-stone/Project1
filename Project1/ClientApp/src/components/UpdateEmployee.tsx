import * as React from 'react';
import { useState, useEffect} from 'react';
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

export const UpdateEmployee = (props: EmployeeStore.Employee) => {

    const [name, setName] = useState(props.name);

    const [surname, setSurname] = useState(props.surname);

    const [birthday, setBirthday] = useState(props.birthDay);

    const [age, setAge] = useState(props.age);

    const [englishValue, setEnglishValue] = useState(props.englishValue);

    return (
        <React.Fragment>
            <form name='updateEmp' onSubmit={()=>sendData(props.id, name, surname, birthday, age, englishValue)}>
                <input name='Id' value={props.id} hidden/>
                <label>Name</label>
                <input name='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <label>Surname</label>
                <input name='Surname' type='text' value={surname} onChange={(e) => setSurname(e.target.value)} />
                <label>Birthday</label>
                <input name='Birthday' type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                <label>Age</label>
                <input name='Age' type='number' value={age} onChange={(e) => setAge(Number(e.target.value))} />
                <label>Result test from english</label>
                <input name='EnglishValue' type='number' value={englishValue} onChange={(e) => setEnglishValue(Number(e.target.value))} />
                <label>Submit</label>
                <input type='submit' value='Update'/>
            </form>
        </React.Fragment>
    );

}

const sendData = (id: number, name: string, surname: string, birthday: string, age: number, englishValue: number) => {
    const Employee: EmployeeStore.Employee = { id: id, name: name, surname: surname, birthDay: birthday, age: age, englishValue: englishValue };
    let body = "emp=" + Employee;
    let request = new XMLHttpRequest();
    request.open("POST", "employee");
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(body);
}




export default connect(
    (state: ApplicationState) => state.employees,
    EmployeeStore.actionCreators
)(UpdateEmployee as any);
