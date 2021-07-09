import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';


export interface EmployeesState {
    isLoading: boolean;
    isLoaded: boolean;
    employees: Employee[];
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

interface UpdateEmployeeAction {
    type: 'UPDATE_EMPLOYEE',
    employee: Employee
}



type KnownAction = RequestEmployeeAction | ReceiveEmployeeAction | UpdateEmployeeAction;



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
    updateEmployee: (emp: Employee): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.employees && emp) {
            dispatch({ type: 'UPDATE_EMPLOYEE', employee: emp });
        }
    }
};

const unloadedState: EmployeesState = { employees: [], isLoading: false, isLoaded: false};

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
                employees: action.employees,
                isLoading: true,
                isLoaded: false
            };
        default:
            return state;
    }

};
