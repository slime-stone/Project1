"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadEmployees = void 0;
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var EmployeeStore = require("../store/Employee");
var LoadEmployees = function (props) {
    var _a = react_1.useState(props.employees.slice(0, 4)), empPage = _a[0], setEmpPage = _a[1];
    var _b = react_1.useState(props.pageNumb), page = _b[0], setPage = _b[1];
    react_1.useEffect(function () {
        if (!props.isLoaded && !props.isLoading)
            props.requestEmployees();
    }, []);
    react_1.useEffect(function () {
        setEmpPage(props.employees.slice(page * 5, (page * 5) + 4));
    }, [page]);
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", { id: "tabelLabel" }, "Employees"),
        React.createElement("table", { className: 'table table-striped', "aria-labelledby": "tabelLabel" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Surname"),
                    React.createElement("th", null, "Birthday"),
                    React.createElement("th", null, "Age"),
                    React.createElement("th", null, "English test result"),
                    React.createElement("th", null))),
            React.createElement("tbody", null, empPage.map(function (employee) {
                return React.createElement("tr", { key: employee.id },
                    React.createElement("td", null, employee.name),
                    React.createElement("td", null, employee.surname),
                    React.createElement("td", null, employee.birthDay),
                    React.createElement("td", null, employee.age),
                    React.createElement("td", null, employee.englishValue),
                    React.createElement("td", null, "x"));
            }))),
        React.createElement("div", { className: "d-flex justify-content-between" },
            props.pageNumb != 0 ? React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: props.prevPage }, "Previous") : React.createElement("span", null),
            props.isLoaded && React.createElement("span", null, "Loading..."),
            !props.isLoaded && React.createElement("span", null,
                "Current page: ",
                props.pageNumb + 1,
                " - Last page: ",
                props.maxPage + 1),
            props.pageNumb != props.maxPage ? React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: props.nextPage }, "Next") : React.createElement("span", null))));
};
exports.LoadEmployees = LoadEmployees;
exports.default = react_redux_1.connect(function (state) { return state.employees; }, EmployeeStore.actionCreators)(exports.LoadEmployees);
//# sourceMappingURL=LoadEmployees.js.map