"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadEmployees = void 0;
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var EmployeeStore = require("../store/Employee");
function byFieldASC(field) {
    return function (a, b) { return a[field] < b[field] ? 1 : -1; };
}
function byFieldDESC(field) {
    return function (a, b) { return a[field] > b[field] ? 1 : -1; };
}
var LoadEmployees = function (props) {
    react_1.useEffect(function () {
        if (!props.isLoaded && !props.isLoading) {
            props.requestEmployees();
        }
    }, []);
    var _a = react_1.useState(props.employees), empPack = _a[0], setEmpPack = _a[1];
    ///sort
    var _b = react_1.useState('none'), nameSort = _b[0], setNameSort = _b[1];
    react_1.useEffect(function () {
        if (nameSort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("name")));
        }
        else {
            setEmpPack(empPack.sort(byFieldDESC("name")));
        }
    }, [nameSort]);
    var _c = react_1.useState('none'), surnameSort = _c[0], setSurnameSort = _c[1];
    react_1.useEffect(function () {
        if (surnameSort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("surname")));
        }
        else {
            setEmpPack(empPack.sort(byFieldDESC("surname")));
        }
    }, [surnameSort]);
    var _d = react_1.useState('none'), birthdaySort = _d[0], setBirthdaySort = _d[1];
    react_1.useEffect(function () {
        if (birthdaySort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("birthDay")));
        }
        else {
            setEmpPack(empPack.sort(byFieldDESC("birthDay")));
        }
    }, [birthdaySort]);
    var _e = react_1.useState('none'), ageSort = _e[0], setAgeSort = _e[1];
    react_1.useEffect(function () {
        if (ageSort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("age")));
        }
        else {
            setEmpPack(empPack.sort(byFieldDESC("age")));
        }
    }, [ageSort]);
    var _f = react_1.useState('none'), englishSort = _f[0], setEnglishSort = _f[1];
    react_1.useEffect(function () {
        if (englishSort === 'asc') {
            setEmpPack(empPack.sort(byFieldASC("age")));
        }
        else {
            setEmpPack(empPack.sort(byFieldDESC("age")));
        }
    }, [englishSort]);
    ///pagination
    var _g = react_1.useState(0), page = _g[0], setPage = _g[1];
    var _h = react_1.useState(0), maxPage = _h[0], setMaxPage = _h[1];
    react_1.useEffect(function () {
        setMaxPage(Math.ceil(props.employees.length / 5) - 1);
    }, [props.employees]);
    ///empPack
    react_1.useEffect(function () {
        setEmpPack(props.employees.slice(page * 5, (page * 5) + 5));
    }, [page, props.employees]);
    ///
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", { id: "tabelLabel" }, "Employees"),
        React.createElement("table", { className: 'table table-striped', "aria-labelledby": "tabelLabel" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null,
                        "Name - ",
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return setNameSort(nameSort !== 'asc' ? 'asc' : 'desc'); } }, nameSort)),
                    React.createElement("th", null,
                        "Surname - ",
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return setSurnameSort(surnameSort !== 'asc' ? 'asc' : 'desc'); } }, surnameSort)),
                    React.createElement("th", null,
                        "Birthday - ",
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return setBirthdaySort(birthdaySort !== 'asc' ? 'asc' : 'desc'); } }, birthdaySort)),
                    React.createElement("th", null,
                        "Age - ",
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return setAgeSort(ageSort !== 'asc' ? 'asc' : 'desc'); } }, ageSort)),
                    React.createElement("th", null,
                        "English test result - ",
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return setEnglishSort(englishSort !== 'asc' ? 'asc' : 'desc'); } }, englishSort)),
                    React.createElement("th", null))),
            React.createElement("tbody", null, empPack.map(function (employee) {
                return React.createElement("tr", { key: employee.id },
                    React.createElement("td", null, employee.name),
                    React.createElement("td", null, employee.surname),
                    React.createElement("td", null, employee.birthDay),
                    React.createElement("td", null, employee.age),
                    React.createElement("td", null, employee.englishValue),
                    React.createElement("td", null,
                        React.createElement("button", null, "Update")));
            }))),
        React.createElement("div", { className: "d-flex justify-content-between" },
            page != 0 ? React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return setPage(page - 1); } }, "Previous") : React.createElement("span", null),
            props.isLoaded && React.createElement("span", null, "Loading..."),
            !props.isLoaded && React.createElement("span", null,
                "Current page: ",
                page + 1,
                " - Last page: ",
                maxPage + 1),
            page != maxPage ? React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return setPage(page + 1); } }, "Next") : React.createElement("span", null))));
};
exports.LoadEmployees = LoadEmployees;
exports.default = react_redux_1.connect(function (state) { return state.employees; }, EmployeeStore.actionCreators)(exports.LoadEmployees);
//# sourceMappingURL=LoadEmployees.js.map