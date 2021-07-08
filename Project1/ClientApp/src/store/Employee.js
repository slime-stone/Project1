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
    }; }
};
var unloadedState = { employees: [], isLoading: false, isLoaded: false };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_EMPLOYEE':
            return __assign(__assign({}, state), { isLoading: false, isLoaded: true });
        case 'RECEIVE_EMPLOYEE':
            return {
                employees: action.employees,
                isLoading: true,
                isLoaded: false
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Employee.js.map