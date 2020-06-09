import { Action, Reducer } from 'redux';
import * as Utils from '../store/Utils';
import * as Settings from '../store/MyConfig';
import { Login, defaultLogin } from '../store/Login';
import { Employee, GetEmployeesAction } from '../store/EmployeeInfo';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

/*export interface MaintenanceCompanyState {
    //count: number;
    maintenancecompany: MaintenanceCompany;
    maintenancecompanys: MaintenanceCompany[];
    isLoading: boolean;
    mode: Utils.Mode;
    IdEmpresaMantenimiento: number;
    login: Login;
    response: Utils.Resp;
    employees: Employee[];
    jobtitles: Cargo[];
}
export interface MaintenanceCompany {
    [key: string]: any
    IdEmpresaMantenimiento: number;
    descEmpresaMantenimiento: string;
    TelefonosEmpresaMantenimiento: string;
    EmailEmpresaMantenimiento: string;
    IdPais: number;
    Pais: string;
    DireccionEmpresaMantenimiento: string;
    PersonaContactoMant1: string;
    PersonaContactoMant2: string;
    IdCargoPersonaContactoMant1: number;
    IdCargoPersonaContactoMant2: number;
    CargoPersonaContactoMant1: string;
    CargoPersonaContactoMant2: string;
    CorreoPersonaContactoMant1: string;
    CorreoPersonaContactoMant2: string;
    TelefonosPersonaContactoMant1: string;
    TelefonosPersonaContactoMant2: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}*/
export const defaultMaintenanceCompany = {

    IdEmpresaMantenimiento: 0,
    descEmpresaMantenimiento: '',
    TelefonosEmpresaMantenimiento: '',
    EmailEmpresaMantenimiento: '',
    IdPais: 1,
    Pais: '',
    DireccionEmpresaMantenimiento: '',
    PersonaContactoMant1: '',
    PersonaContactoMant2: '',
    TelefonosPersonaContactoMant1: '',
    TelefonosPersonaContactoMant2: '',
    IdCargoPersonaContactoMant1: 0,
    IdCargoPersonaContactoMant2: 0,
    CargoPersonaContactoMant1: '',
    CargoPersonaContactoMant2: '',
    CorreoPersonaContactoMant1: '',
    CorreoPersonaContactoMant2: '',
    FechaUltActualizacion: '',
    IdUsuario: 0,
    Usuario: ''
};
/*
export interface Cargo {
    IdCargo: number;
    DescCargo: string;
}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const UpdateMaintenanceCompanyAction = 'UPDATE_MAINTENANCE_COMPANY';
const CreateMaintenanceCompanyAction = 'CREATE_MAINTENANCE_COMPANY';
const GetMaintenanceCompanyAction = 'GET_MAINTENANCE_COMPANY';
const HandleChangeAction = 'ON_CHANGE';
export const GetJobTitlesAction = 'GET_JOB_TITLE';
const DeleteMaintenanceCompanyAction = 'DELETE_MAINTENANCE_COMPANY';
const GetSessionAction = 'GET_SESSION';
const RequestMaintenanceCompanyInfoAction = 'REQUEST_MAINTENANCE_COMPANY';
const ErrorAction = 'ERROR_MAINTENANCE_COMPANY';
export const GetMaintenanceCompanysAction = 'GET_MAINTENANCE_COMPANYS';
const UpdateMaintenanceCompanyErrorAction = 'UPDATE_MAINTENANCE_COMPANY_ERROR';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = CreateMaintenanceCompanyAction | UpdateMaintenanceCompanyAction | UpdateMaintenanceCompanyErrorAction | DeleteMaintenanceCompanyAction
    | HandleChangeAction | GetMaintenanceCompanyAction | GetSessionAction | GetMaintenanceCompanyAction
    | RequestMaintenanceCompanyInfoAction | ErrorAction | GetMaintenanceCompanysAction | IncrementCountAction | Utils.SetModeAction
    | GetEmployeesAction | GetJobTitlesAction;*/

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getSession: () => async (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    },
    getMaintenanceCompanys: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestMaintenanceCompanyInfoAction, IdEmpresaMantenimiento: getState().maintenancecompany.IdEmpresaMantenimiento });
            const response = await fetch(url + "api/MaintenanceCompany/GetAll", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const maintenancecompanys = await response.json();
                dispatch({ type: GetMaintenanceCompanysAction, maintenancecompanys });
            }
            else {
                dispatch({ type: UpdateMaintenanceCompanyErrorAction, response });
            }
        }
        else {
            dispatch({ type: GetMaintenanceCompanysAction, maintenancecompanys: [] });
        }


    },
    getCompany: (IdEmpresaMantenimiento) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            if (IdEmpresaMantenimiento !== getState().maintenancecompany.IdEmpresaMantenimiento) {
                dispatch({ type: RequestMaintenanceCompanyInfoAction, IdEmpresaMantenimiento: IdEmpresaMantenimiento });
                const response = await fetch(url + `api/MaintenanceCompany/GetById/${IdEmpresaMantenimiento}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (response.ok) {
                    const maintenancecompany = await response.json();
                    dispatch({ type: GetMaintenanceCompanyAction, maintenancecompany, IdEmpresaMantenimiento });
                }
                else {
                    dispatch({ type: UpdateMaintenanceCompanyErrorAction, response });
                }
            }
        }
    },
    create: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            dispatch({ type: RequestMaintenanceCompanyInfoAction, IdEmpresaMantenimiento: objeto.IdEmpresaMantenimiento || 0 });
            const response = await fetch(Settings.default.key.url + "api/MaintenanceCompany/Create", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdEmpresaMantenimiento = await response.json();
                objeto.IdEmpresaMantenimiento = IdEmpresaMantenimiento;
                dispatch({ type: CreateMaintenanceCompanyAction, maintenancecompany: objeto, IdEmpresaMantenimiento });
            }
            else {
                dispatch({ type: UpdateMaintenanceCompanyErrorAction, response });
            }
        }
        else {
            dispatch({ type: CreateMaintenanceCompanyAction, maintenancecompany: objeto });
        }
    },
    update: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            dispatch({ type: RequestMaintenanceCompanyInfoAction, IdEmpresaMantenimiento: objeto.IdEmpresaMantenimiento });
            const response = await fetch(Settings.default.key.url + "api/MaintenanceCompany/Update", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateMaintenanceCompanyAction, maintenancecompany: objeto, IdEmpresaMantenimiento: objeto.IdEmpresaMantenimiento });
            }
            else {
                dispatch({ type: UpdateMaintenanceCompanyErrorAction, response });
            }
        }
    },
    delete: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = '';
            const url = Settings.default.key.url;
            dispatch({ type: RequestMaintenanceCompanyInfoAction, IdEmpresaMantenimiento: objeto.IdEmpresaMantenimiento });
            const response = await fetch(url + `api/MaintenanceCompany/Delete/${objeto.IdEmpresaMantenimiento}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: DeleteMaintenanceCompanyAction, maintenancecompany: objeto });
            }
            else {
                dispatch({ type: DeleteMaintenanceCompanyAction, maintenancecompany: objeto, response });
            }
        }
        else {
            dispatch({ type: DeleteMaintenanceCompanyAction, maintenancecompany: objeto });
        }
    },
    getCargos: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token !== '') {
            const url = Settings.default.key.url;
            dispatch({ type: RequestMaintenanceCompanyInfoAction, IdEmpresaMantenimiento: getState().maintenancecompany.IdEmpresaMantenimiento });
            const response = await fetch(url + `api/JobTitle/GetAll`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const jobtitles = await response.json();
                dispatch({ type: GetJobTitlesAction, jobtitles });
            }
            else {
                //
            }
        }
    },
    getEmployees: (IdEmpresaMantenimiento) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token !== '') {
            const url = Settings.default.key.url;
            dispatch({ type: RequestMaintenanceCompanyInfoAction, IdEmpresaMantenimiento: IdEmpresaMantenimiento });
            const response = await fetch(url + `api/VigitabletConfig/GetEmployeesByCompany/${IdEmpresaMantenimiento}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const employees = await response.json();
                dispatch({ type: 'GET_EMPLOYEES', employees });
            }
            else {
                //
            }
        } else {
            dispatch({ type: 'GET_EMPLOYEES', employees: [] });
        }
    },
    setModeCreate: (dispatch) => dispatch({ type: 'SET_MODE', mode: Utils.Mode.Create }),
    setModeEdit: (dispatch) => dispatch({ type: 'SET_MODE', mode: Utils.Mode.Update }),
    setModeRead: (dispatch) => dispatch({ type: 'SET_MODE', mode: Utils.Mode.Read })
};
const unloadedState = {
    maintenancecompany: defaultMaintenanceCompany,
    isLoading: false,
    mode: Utils.Mode.Read,
    IdEmpresaMantenimiento: 0,
    maintenancecompanys: [],
    login: defaultLogin,
    response: Utils.defaultResponse,
    employees: [],
    jobtitles: []
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestMaintenanceCompanyInfoAction:
            return {
                ...state,
                IdEmpresaMantenimiento: action.IdEmpresaMantenimiento,
                isLoading: true
            };
        case GetMaintenanceCompanyAction:
            console.log(action.maintenancecompany.FechaNacimiento);
            if (action.IdEmpresaMantenimiento === state.IdEmpresaMantenimiento) {
                return {
                    ...state,
                    maintenancecompany: action.maintenancecompany,
                    IdEmpresaMantenimiento: action.IdEmpresaMantenimiento,
                    isLoading: false
                };
            }
            break;
        case HandleChangeAction:
            return {
                ...state,
                isLoading: false
            };
        case CreateMaintenanceCompanyAction:
            return {
                ...state,
                maintenancecompany: action.maintenancecompany,
                isLoading: false

            };
        case UpdateMaintenanceCompanyAction:
            return {
                ...state,
                maintenancecompany: action.maintenancecompany,
                isLoading: false
            };
        case UpdateMaintenanceCompanyErrorAction:
            //alert("Error al actualizar");
            return {
                ...state,
                response: action.response,
                isLoading: false
            };
        case DeleteMaintenanceCompanyAction:
            return {
                ...state,
                response: action.response,
                maintenancecompany: action.maintenancecompany,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case 'ERROR_MAINTENANCE_COMPANY':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.response.statusText
            };
        case GetMaintenanceCompanysAction:
            return {
                ...state,
                isLoading: false,
                maintenancecompanys: action.maintenancecompanys
            };
        case 'SET_MODE':
            return {
                ...state,
                mode: action.mode,
                //IdEmpresaMantenimiento: action.mode == Utils.Mode.Update ? state.IdEmpresaMantenimiento : 0,
                //maintenancecompany: action.mode == Utils.Mode.Create ? defaultMaintenanceCompany : state.maintenancecompany,
                isLoading: false
            };
        case 'GET_EMPLOYEES':
            return {
                ...state,
                isLoading: false,
                employees: action.employees
            };
        case GetJobTitlesAction:
            return {
                ...state,
                isLoading: false,
                jobtitles: action.jobtitles
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state;
};
