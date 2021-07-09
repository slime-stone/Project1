import * as React from 'react';
import { useState, useEffect} from 'react';
import { connect , useSelector} from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as EmployeeStore from '../store/Employee';

// At runtime, Redux will merge together...
type EmployeeProps =
    EmployeeStore.EmployeesState // ... state we've requested from the Redux store
    & typeof EmployeeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


export const UpdateEmployee = (id: number) => {

    const ttt = useSelector((state: EmployeeStore.EmployeesState) => state.employees.filter(t => t.id === id));

    const [emp, setEmp] = useState(ttt[0]);

    const [name, setName] = useState(emp.name);

    const [surname, setSurname] = useState(emp.surname);

    const [birthday, setBirthday] = useState(emp.birthDay);

    const [age, setAge] = useState(emp.age);

    const [englishValue, setEnglishValue] = useState(emp.englishValue);


    return (
        <React.Fragment>
            <form name='updateEmp'>
                <p>
                    <label>Name</label>
                </p>
                <p>
                    <input name='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    <label>Surname</label>
                </p>
                <p>
                    <input name='Surname' type='text' value={surname} onChange={(e) => setSurname(e.target.value)} />
                </p>
                <p>
                    <label>Birthday</label>
                </p>
                <p>
                    <input name='Birthday' type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </p>
                <p>
                    <label>Age</label>
                </p>
                <p>
                    <input name='Age' type='number' value={age} onChange={(e) => setAge(Number(e.target.value))} />
                </p>
                <p>
                    <label>Result test from english</label>
                </p>
                <p>
                    <input name='EnglishValue' type='number' value={englishValue} onChange={(e) => setEnglishValue(Number(e.target.value))} />
                </p>
                <p>
                    <input type='button' value='Update' onClick={() => { setEmp({ id: id, name: name, surname: surname, birthDay: birthday, age: age, englishValue: englishValue }); sendData(emp) }} />
                </p>
            </form>
        </React.Fragment>
    );

}

const sendData = (emp: EmployeeStore.Employee) => {
    let response = fetch('/article/fetch/post/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(emp)
    });
}

export default connect(
    (state: ApplicationState) => state.employees,
    EmployeeStore.actionCreators
)(UpdateEmployee as any);
