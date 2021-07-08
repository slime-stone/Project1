"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestEmployees: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees) {
            fetch("employee")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_EMPLOYEE', employees: data });
            });
            dispatch({ type: 'REQUEST_EMPLOYEE' });
        }
    }; },
    ascSort: function (sortedValue) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees && sortedValue in appState.employees.employees) {
            dispatch({ type: "ASC_SORT", sortedValue: sortedValue });
        }
    }; },
    descSort: function (sortedValue) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees && sortedValue in appState.employees.employees) {
            dispatch({ type: "DESC_SORT", sortedValue: sortedValue });
        }
    }; },
    nextPage: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees) {
            dispatch({ type: "NEXT_PAGE" });
        }
    }; },
    prevPage: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees) {
            dispatch({ type: "PREV_PAGE" });
        }
    }; }
};
var unloadedState = { employees: [], isLoading: false, pageNumb: 0, pageSize: 5, maxPage: 0, sortDirection: "none" };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_EMPLOYEE':
            return __assign(__assign({}, state), { isLoading: true });
        case 'RECEIVE_EMPLOYEE':
            return {
                maxPage: (action.employees.length / 5) - 1,
                pageNumb: 0,
                pageSize: 5,
                employees: action.employees,
                sortDirection: "none",
                isLoading: false
            };
        case 'ASC_SORT':
            return __assign(__assign({}, state), { sortDirection: "asc", sortColumn: action.sortedValue });
        case 'DESC_SORT':
            return __assign(__assign({}, state), { sortDirection: "desc", sortColumn: action.sortedValue });
        case 'NEXT_PAGE':
            return __assign(__assign({}, state), { pageNumb: (state.pageNumb != state.maxPage) ? state.pageNumb + 1 : state.pageNumb });
        case 'PREV_PAGE':
            return __assign(__assign({}, state), { sortDirection: "desc", pageNumb: (state.pageNumb != 0) ? state.pageNumb - 1 : state.pageNumb });
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Employee.js.map