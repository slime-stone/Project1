"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var EmployeeStore = require("../store/Employee");
var Sort_1 = require("./Sort");
var LoadEmployee = /** @class */ (function (_super) {
    __extends(LoadEmployee, _super);
    function LoadEmployee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // This method is called when the component is first added to the document
    LoadEmployee.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    // This method is called when the route parameters change
    LoadEmployee.prototype.componentDidUpdate = function () {
        this.ensureDataFetched();
    };
    LoadEmployee.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", { id: "tabelLabel" }, "Employees"),
            this.renderEmployeesTable(),
            this.renderPagination()));
    };
    LoadEmployee.prototype.ensureDataFetched = function () {
        var startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestEmployees(startDateIndex);
    };
    LoadEmployee.prototype.renderEmployeesTable = function () {
        return (React.createElement("table", { className: 'table table-striped', "aria-labelledby": "tabelLabel" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null,
                        "Name",
                        React.createElement(Sort_1.default, null)),
                    React.createElement("th", null, "Surname"),
                    React.createElement("th", null, "Birthday"),
                    React.createElement("th", null, "Age"),
                    React.createElement("th", null, "English test result"),
                    React.createElement("th", null))),
            React.createElement("tbody", null, this.props.employess.map(function (employee) {
                return React.createElement("tr", { key: employee.id },
                    React.createElement("td", null, employee.name),
                    React.createElement("td", null, employee.surname),
                    React.createElement("td", null, employee.birthDay),
                    React.createElement("td", null, employee.age),
                    React.createElement("td", null, employee.englishValue),
                    React.createElement("td", null, "x"));
            }))));
    };
    LoadEmployee.prototype.renderPagination = function () {
        var prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        var nextStartDateIndex = (this.props.startDateIndex || 0) + 5;
        return (React.createElement("div", { className: "d-flex justify-content-between" },
            React.createElement(react_router_dom_1.Link, { className: 'btn btn-outline-secondary btn-sm', to: "/load-employees/" + prevStartDateIndex }, "Previous"),
            this.props.isLoading && React.createElement("span", null, "Loading..."),
            React.createElement(react_router_dom_1.Link, { className: 'btn btn-outline-secondary btn-sm', to: "/load-employees/" + nextStartDateIndex }, "Next")));
    };
    return LoadEmployee;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.employees; }, EmployeeStore.actionCreators)(LoadEmployee);
//# sourceMappingURL=LoadEmployees.js.map