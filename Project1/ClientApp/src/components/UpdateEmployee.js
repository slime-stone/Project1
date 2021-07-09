"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployee = void 0;
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var EmployeeStore = require("../store/Employee");
var UpdateEmployee = function (props) {
    var _a = react_1.useState(props.match.params.name), name = _a[0], setName = _a[1];
    var _b = react_1.useState(props.match.params.surname), surname = _b[0], setSurname = _b[1];
    var _c = react_1.useState(props.match.params.birthDay), birthday = _c[0], setBirthday = _c[1];
    var _d = react_1.useState(props.match.params.age), age = _d[0], setAge = _d[1];
    var _e = react_1.useState(props.match.params.englishvalue), englishValue = _e[0], setEnglishValue = _e[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { name: 'updateEmp' },
            React.createElement("p", null,
                React.createElement("label", null, "Name")),
            React.createElement("p", null,
                React.createElement("input", { name: 'Name', type: 'text', value: name, onChange: function (e) { return setName(e.target.value); } })),
            React.createElement("p", null,
                React.createElement("label", null, "Surname")),
            React.createElement("p", null,
                React.createElement("input", { name: 'Surname', type: 'text', value: surname, onChange: function (e) { return setSurname(e.target.value); } })),
            React.createElement("p", null,
                React.createElement("label", null, "Birthday")),
            React.createElement("p", null,
                React.createElement("input", { name: 'Birthday', type: 'date', value: birthday, onChange: function (e) { return setBirthday(e.target.value); } })),
            React.createElement("p", null,
                React.createElement("label", null, "Age")),
            React.createElement("p", null,
                React.createElement("input", { name: 'Age', type: 'number', value: age, onChange: function (e) { return setAge(Number(e.target.value)); } })),
            React.createElement("p", null,
                React.createElement("label", null, "Result test from english")),
            React.createElement("p", null,
                React.createElement("input", { name: 'EnglishValue', type: 'number', value: englishValue, onChange: function (e) { return setEnglishValue(Number(e.target.value)); } })),
            React.createElement("p", null,
                React.createElement("input", { type: 'button', value: 'Update', onClick: function () { return sendData(props.match.params.id, name, surname, birthday, age, englishValue); } })))));
};
exports.UpdateEmployee = UpdateEmployee;
var sendData = function (id, name, surname, birthday, age, englishValue) {
    var body = "?Id=" + id + "&Name=" + name + "&Surname=" + surname + "&BirthDay=" + birthday + "&Age=" + age + "&EnglishValue=" + englishValue;
    var request = new XMLHttpRequest();
    console.log(body);
    request.open("Post", "employee/" + body);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(body);
};
exports.default = react_redux_1.connect(function (state) { return state.employees; }, EmployeeStore.actionCreators)(exports.UpdateEmployee);
//# sourceMappingURL=UpdateEmployee.js.map