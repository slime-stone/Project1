import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';


export interface EmployeesState {
    isLoading: boolean;
    startDateIndex?: number;
    isSorted?: boolean;
    isToggleOn?: boolean;
    employess: Employee[];
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
    startDateIndex: number;
}

interface ReceiveEmployeeAction {
    type: 'RECEIVE_EMPLOYEE';
    startDateIndex: number;
    employees: Employee[];
}

interface AscSortAction {
    type: "ASC_SORT";
    startDateIndex: number;
    sortedValue: string;
    employees: Employee[];
}

interface DescSortAction {
    type: "DESC_SORT";
    startDateIndex: number;
    sortedValue: string;
    employees: Employee[];
}



type KnownAction = RequestEmployeeAction | ReceiveEmployeeAction | AscSortAction | DescSortAction;



export const actionCreators = {
    requestEmployees: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees && startDateIndex !== appState.employees.startDateIndex) {
            fetch(`employee`)
                .then(response => response.json() as Promise<Employee[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_EMPLOYEE', startDateIndex: startDateIndex, employees: data });
                });

            dispatch({ type: 'REQUEST_EMPLOYEE', startDateIndex: startDateIndex });
        }
    },
    ascSort: (sortedValue: string, startDataIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees && sortedValue in appState.employees.employess) {
            dispatch({ type: "ASC_SORT", startDateIndex: startDataIndex, sortedValue: sortedValue, employees: appState.employees.employess });
        }
    },
    descSort: (sortedValue: string, startDataIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees && sortedValue in appState.employees.employess) {
            dispatch({ type: "DESC_SORT", startDateIndex: startDataIndex, sortedValue: sortedValue, employees: appState.employees.employess });
        }
    }
};

const unloadedState: EmployeesState = { employess: [], isLoading: false };

function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

export const reducer: Reducer<EmployeesState> = (state: EmployeesState | undefined, incomingAction: Action): EmployeesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
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
            };
        case 'ASC_SORT':
            const sortedEmp = action.employees.sort(byField(action.sortedValue));
            return {
                isSorted: true,
                isToggleOn: true,
                startDateIndex: action.startDateIndex,
                sortedValue: action.sortedValue,
                employess: sortedEmp
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
