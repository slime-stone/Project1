"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestEmployees: function (startDateIndex) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees && startDateIndex !== appState.employees.startDateIndex) {
            fetch("employee")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_EMPLOYEE', startDateIndex: startDateIndex, employees: data });
            });
            dispatch({ type: 'REQUEST_EMPLOYEE', startDateIndex: startDateIndex });
        }
    }; },
    ascSort: function (sortedValue, startDataIndex) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees && sortedValue in appState.employees.employess) {
            dispatch({ type: "ASC_SORT", startDateIndex: startDataIndex, sortedValue: sortedValue, employees: appState.employees.employess });
        }
    }; },
    descSort: function (sortedValue, startDataIndex) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees && sortedValue in appState.employees.employess) {
            dispatch({ type: "DESC_SORT", startDateIndex: startDataIndex, sortedValue: sortedValue, employees: appState.employees.employess });
        }
    }; }
};
var unloadedState = { employess: [], isLoading: false };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_EMPLOYEE':
            return {
                startDateIndex: action.startDateIndex,
                employess: state.employess,
                isLoading: true
            };
        case 'RECEIVE_EMPLOYEE':
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    employess: action.employees,
                    isLoading: false
                };
            }
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Employee.js.map