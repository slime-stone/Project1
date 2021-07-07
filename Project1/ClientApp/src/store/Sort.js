"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    ascSort: function (sortedValue) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees && appState.sort) {
            dispatch({ type: "ASC_SORT", sortedValue: sortedValue });
        }
    }; },
    descSort: function (sortedValue) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.employees && appState.sort) {
            dispatch({ type: "DESC_SORT", sortedValue: sortedValue });
        }
    }; }
};
var unloadedState = { isSorted: false, isToggleOn: false, sortedValue: "" };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'ASC_SORT':
            return {
                isSorted: true,
                isToggleOn: true,
                sortedValue: action.sortedValue
            };
        case 'DESC_SORT':
            return {
                isSorted: true,
                isToggleOn: false,
                sortedValue: action.sortedValue
            };
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=Sort.js.map