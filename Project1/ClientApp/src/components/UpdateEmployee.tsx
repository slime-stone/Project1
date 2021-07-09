import * as React from 'react';
import { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as EmployeeStore from '../store/Employee';

// At runtime, Redux will merge together...
type EmployeeProps =
    EmployeeStore.EmployeesState // ... state we've requested from the Redux store
    & typeof EmployeeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

export const UpdateEmployee = (props: any) => {

    const [name, setName] = useState(props.match.params.name);

    const [surname, setSurname] = useState(props.match.params.surname);

    const [birthday, setBirthday] = useState(props.match.params.birthDay);

    const [age, setAge] = useState(props.match.params.age);

    const [englishValue, setEnglishValue] = useState(props.match.params.englishvalue);

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
                    <input type='button' value='Update' onClick={() => sendData(props.match.params.id, name, surname, birthday, age, englishValue)}/>
                </p>
            </form>
        </React.Fragment>
    );

}

const sendData = (id: number, name: string, surname: string, birthday: string, age: number, englishValue: number) => {
    let body = "?Id=" + id + "&Name=" + name + "&Surname=" + surname + "&BirthDay=" + birthday + "&Age=" + age + "&EnglishValue=" + englishValue;
    let request = new XMLHttpRequest();
    console.log(body);
    request.open("Post", "employee/" + body);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(body);
}




export default connect(
    (state: ApplicationState) => state.employees,
    EmployeeStore.actionCreators
)(UpdateEmployee as any);
