import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';


export interface EmployeesState {
    isLoading: boolean;
    isLoaded: boolean;
    employees: Employee[];
    pageNumb: number;
    pageSize: number;
    maxPage: number;
    sortColumn?: string;
    sortDirection: "asc" | "desc" | "none";
}

export interface Employee {
    id: number;
    name: string;
    surname: string;
    birthDay: string;
    age: number;
    englishValue: number;
}

interface RequestEmployeeAction {
    type: 'REQUEST_EMPLOYEE';
}

interface ReceiveEmployeeAction {
    type: 'RECEIVE_EMPLOYEE';
    employees: Employee[];
}

interface AscSortAction {
    type: "ASC_SORT";
    sortedValue: string;
}

interface DescSortAction {
    type: "DESC_SORT";
    sortedValue: string;
}

interface NextPageAction {
    type: "NEXT_PAGE";
}

interface PrewPageAction {
    type: "PREV_PAGE";
}



type KnownAction = RequestEmployeeAction | ReceiveEmployeeAction | AscSortAction | DescSortAction | NextPageAction | PrewPageAction;



export const actionCreators = {
    requestEmployees: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees) {
            fetch(`employee`)
                .then(response => response.json() as Promise<Employee[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_EMPLOYEE', employees: data });
                });
            dispatch({ type: 'REQUEST_EMPLOYEE'});
        }
    },
    ascSort: (sortedValue: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees && sortedValue in appState.employees.employees) {
            dispatch({ type: "ASC_SORT", sortedValue: sortedValue});
        }
    },
    descSort: (sortedValue: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees && sortedValue in appState.employees.employees) {
            dispatch({ type: "DESC_SORT", sortedValue: sortedValue});
        }
    },
    nextPage: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees) {
            dispatch({ type: "NEXT_PAGE"});
        }
    },
    prevPage: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees) {
            dispatch({ type: "PREV_PAGE" });
        }
    }
};

const unloadedState: EmployeesState = { employees: [], isLoading: false, isLoaded: false, pageNumb: 0, pageSize: 5, maxPage: 0, sortDirection: "none" };

export const reducer: Reducer<EmployeesState> = (state: EmployeesState | undefined, incomingAction: Action): EmployeesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_EMPLOYEE':
            return {
                ...state,
                isLoading: false,
                isLoaded: true
            };
        case 'RECEIVE_EMPLOYEE':
            return {
                maxPage: Math.ceil(action.employees.length / 5) - 1,
                pageNumb: 0,
                pageSize: 5,
                employees: action.employees,
                sortDirection: "none",
                isLoading: true,
                isLoaded: false
            };
        case 'ASC_SORT':
            return {
                ...state,
                sortDirection: "asc",
                sortColumn: action.sortedValue
            };
        case 'DESC_SORT':
            return {
                ...state,
                sortDirection: "desc",
                sortColumn: action.sortedValue
            };
        case 'NEXT_PAGE':
            return {
                ...state,
                pageNumb: (state.pageNumb != state.maxPage) ? state.pageNumb + 1 : state.pageNumb
            };
        case 'PREV_PAGE':
            return {
                ...state,
                sortDirection: "desc",
                pageNumb: (state.pageNumb != 0) ? state.pageNumb - 1 : state.pageNumb
            };
        default:
            return state;
    }

};
