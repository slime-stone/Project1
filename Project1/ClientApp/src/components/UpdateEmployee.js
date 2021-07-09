"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployee = void 0;
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var EmployeeStore = require("../store/Employee");
var UpdateEmployee = function (id) {
    var ttt = react_redux_1.useSelector(function (state) { return state.employees.employees.filter(function (t) { return t.id === id; }); });
    var _a = react_1.useState(ttt[0]), emp = _a[0], setEmp = _a[1];
    var _b = react_1.useState(emp.name), name = _b[0], setName = _b[1];
    var _c = react_1.useState(emp.surname), surname = _c[0], setSurname = _c[1];
    var _d = react_1.useState(emp.birthDay), birthday = _d[0], setBirthday = _d[1];
    var _e = react_1.useState(emp.age), age = _e[0], setAge = _e[1];
    var _f = react_1.useState(emp.englishValue), englishValue = _f[0], setEnglishValue = _f[1];
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
                React.createElement("input", { type: 'button', value: 'Update', onClick: function () { setEmp({ id: id, name: name, surname: surname, birthDay: birthday, age: age, englishValue: englishValue }); sendData(emp); } })))));
};
exports.UpdateEmployee = UpdateEmployee;
var sendData = function (emp) {
    var response = fetch('/article/fetch/post/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(emp)
    });
};
exports.default = react_redux_1.connect(function (state) { return state.employees; }, EmployeeStore.actionCreators)(exports.UpdateEmployee);
//# sourceMappingURL=UpdateEmployee.js.map