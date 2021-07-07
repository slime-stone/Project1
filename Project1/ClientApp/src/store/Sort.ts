import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { Employee } from './Employee';

export interface SortState {
    isSorted: boolean;
    isToggleOn: boolean;
    sortedValue: string;
}

interface AscSortAction {
    type: "ASC_SORT";
    sortedValue: string;
}

interface DescSortAction {
    type: "DESC_SORT";
    sortedValue: string;
}

type KnownAction = AscSortAction | DescSortAction;

export const actionCreators = {
    ascSort: (sortedValue: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees && appState.sort) {
            dispatch({ type: "ASC_SORT", sortedValue: sortedValue });
        }
    },
    descSort: (sortedValue: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees && appState.sort) {
            dispatch({ type: "DESC_SORT", sortedValue: sortedValue });
        }
    }
};

const unloadedState: SortState = { isSorted: false, isToggleOn: false, sortedValue: "" };

export const reducer: Reducer<SortState> = (state: SortState | undefined, incomingAction: Action): SortState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
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
