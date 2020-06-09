import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { Employee } from '../store/EmployeeInfo';
import { GuardEmployee } from '../store/GuardEmployeeInfo';
import { defaultLogin, getSession } from '../store/Login';
import { Period, PeriodsAction, getPeriods } from '../store/Period';
import { defaultResponse } from '../store/Utils';
import { defaultContrato, GetContractsAction, defaultContract, getContracts } from '../store/Contracts';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

/*export interface ConfigTurnsState {
    isLoading: boolean;
    IdGuardia?: number;
    configturn: ConfigTurn;
    configturns: ConfigTurn[];
    //employees: Employee[];
    guardemployees: GuardEmployee[],
    idguardemployees: number[],
    login: Login,
    periods: Period[];
    response: Resp;
}*/
/*
export interface ConfigTurn {
    [key: string]: any
    IdGuardia: number;
    NombreGuardia: string;
    IdPersonaVig: number;
    PrimerNombreVigilante: string;
    SegundoNombreVigilante: string;
    PrimerApellidoVigilante: string;
    SegundoApellidoVigilante: string;
    PeriodoGuardia: string;
    DiasSemanasGuardia: string;
    HoraInicioGuardia: string;
    HoraFinGuardia: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
    ConfigGuardiasVigilantes: number[];

}*/
export const defaultConfigTurn = {
    IdGuardia: 0,
    NombreGuardia: '',
    IdPersonaVig: 0,
    IdContrato: 0,
    PrimerNombreVigilante: '',
    SegundoNombreVigilante: '',
    PrimerApellidoVigilante: '',
    SegundoApellidoVigilante: '',
    PeriodoGuardia: '',
    DiasSemanasGuardia: '',
    HoraInicioGuardia: '',
    HoraFinGuardia: '',
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 0,
    Usuario: '',
    ConfigGuardiasVigilantes: []
};
/*
export interface ConfigTurnGuard {
    [key: string]: any
    IdGuardia: number;
    NombreGuardia: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}
*/
export const defaultConfigTurnGuard = {
    IdGuardia: 0,
    NombreGuardia: '',
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 0,
    Usuario: ''
};
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
const ErrorRequestAction = 'ERROR_REQUEST_CONFIGTURN';
const RequestConfigTurnsAction = 'REQUEST_CONFIG_TURNS';
const ReceiveIDConfigTurnGuardsAction = 'GET_CONFIG_TURN_GUARDS_ID';
const ReceiveConfigTurnGuardsAction = 'GET_CONFIG_TURN_GUARDS';
const ReceiveConfigTurnsAction = 'RECEIVE_CONFIG_TURNS';
const UpdateConfigTurnAction = 'UPDATE_CONFIG_TURN';
const CreateConfigTurnAction = 'CREATE_CONFIG_TURN';
const DeleteConfigTurnAction = 'DELETE_CONFIG_TURN';
const GetConfigTurnsAction = 'GET_CONFIG_TURNS';
const GetConfigTurnAction = 'GET_CONFIG_TURN';
const ErrorConfigTurnAction = 'ERROR_CONFIG_TURN';
const GetGuardEmployeesAction = 'GET_GUARD_EMPLOYEES';
const GetSessionAction = 'GET_SESSION';
const IncrementCountAction = 'INCREMENT_COUNT';
const GetTurnEventTypesAction = 'TURN_EVENT_TYPE';
const GetConfigTurnsGuardsAction = 'GetConfigTurnsGuardsAction';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestConfigTurnsAction | ReceiveConfigTurnsAction | GetConfigTurnsAction | GetConfigTurnAction | GetGuardEmployeesAction | ReceiveConfigTurnGuardsAction | ReceiveIDConfigTurnGuardsAction
    | IncrementCountAction | CreateConfigTurnAction | UpdateConfigTurnAction | DeleteConfigTurnAction | GetSessionAction | ErrorRequestAction | PeriodsAction
    | ErrorConfigTurnAction;*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getConfigTurnGuards: (IdGuardia) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            if (IdGuardia !== getState().configturns.IdGuardia) {
                dispatch({ type: RequestConfigTurnsAction, IdGuardia: IdGuardia });
                const response = await fetch(url + `api/VigitabletConfig/GetConfigTurnGuardsByturn/${IdGuardia}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (response.ok) {
                    const guardemployees = await response.json();
                    dispatch({ type: ReceiveConfigTurnGuardsAction, IdGuardia, guardemployees });
                }
                else {
                    dispatch({ type: ErrorRequestAction, response });
                }
            }
        }
    },
    getIDsConfigTurnGuards: (IdGuardia) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //          if (IdGuardia !== getState().configturns.IdGuardia) {
            //dispatch({ type: RequestConfigTurnsAction, IdGuardia });
            const response = await fetch(url + `api/VigitabletConfig/GetIDConfigTurnGuardsByturn/${IdGuardia}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const idguardemployees = await response.json();
                dispatch({ type: ReceiveIDConfigTurnGuardsAction, idguardemployees });
            }
            else {
                dispatch({ type: ErrorRequestAction, response });
            }
        }
    },
    getConfigTurn: (IdGuardia) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            if (IdGuardia !== getState().configturns.IdGuardia) {
                dispatch({ type: RequestConfigTurnsAction, IdGuardia: IdGuardia });
                const response = await fetch(url + `api/VigitabletConfig/GetConfigTurnById/${IdGuardia}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (response.ok) {
                    const configturn = await response.json();
                    dispatch({ type: GetConfigTurnAction, IdGuardia: IdGuardia, configturn });
                }
                else {
                    dispatch({ type: ErrorRequestAction, response });
                }

            }
        }
    },
    getConfigTurnsByContract: (IdContract) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigTurnsAction, IdGuardia: 0/*getState().configturns.IdGuardia || 0*/ });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigTurnsByContract/${IdContract}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configturns = await response.json();
                dispatch({ type: GetConfigTurnsAction, configturns });
            }
            else {
                dispatch({ type: ErrorRequestAction, response });
            }
        }
    },
    getConfigTurnsGuardsByContract: (IdContract) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigTurnsAction, IdGuardia: 0/*getState().configturns.IdGuardia || 0*/ });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigTurnGuardsByContract/${IdContract}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configturnsguards = await response.json();
                dispatch({ type: GetConfigTurnsGuardsAction, configturnsguards });
            }
            else {
                dispatch({ type: ErrorRequestAction, response });
            }
        }
    },
    getConfigTurns: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigTurnsAction, IdGuardia: 0/*getState().configturns.IdGuardia || 0*/ });
            const response = await fetch(url + `api/VigitabletConfig/GetAllConfigTurns`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configturns = await response.json();
                dispatch({ type: GetConfigTurnsAction, configturns });
            }
            else {
                dispatch({ type: ErrorRequestAction, response });
            }
        }
    },
    requestConfigTurns: (IdGuardia) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdGuardia !== getState().configturns.IdGuardia) {
        //        const response = await fetch(`api/VigitabletConfig/CreateConfigTurn=${IdGuardia}`)
        //        })const data = await response.json() as Promise<ConfigTurn[]>)
        //            
        //                dispatch({ type: 'RECEIVE_CONFIG_TURNS', IdGuardia: IdGuardia, configturns: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestConfigTurnsAction, IdGuardia: IdGuardia });
        //    }
        //}
    },
    create: (objeto, guards) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigTurnsAction, IdGuardia: 0/*getState().configturns.IdGuardia || 0*/ });
            const response = await fetch(url + "api/VigitabletConfig/CreateConfigTurn", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            dispatch({ type: RequestConfigTurnsAction, IdGuardia: 0/*getState().configturns.IdGuardia || 0*/ });
            if (response.ok) {
                const IdGuardia = await response.json();
                objeto.IdGuardia = IdGuardia;
                objeto.ConfigGuardiasVigilantes = guards;
                const guardemployees = guards.join(',');
                const searchParams_ = `IdGuardia=${IdGuardia}&guardemployees=${guardemployees}&IdUsuario=${Settings.default.key.user}`;
                const response_ = await fetch(url + "api/VigitabletConfig/UpdateConfigTurnGuards", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    },
                    body: searchParams_
                });
                if (response_.ok) {
                    //const data = await response_.json();
                    //dispatch({ type: UpdateConfigTurnAction, configturn: objeto, response: data, IdGuardia: objeto.IdGuardia });
                    dispatch({ type: CreateConfigTurnAction, configturn: objeto, IdGuardia });
                }
                else {
                    dispatch({ type: ErrorRequestAction, response: response_ });
                }
            }
        }
    },
    update: (objeto, guards) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.ConfigGuardiasVigilantes = '';
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;

            const response = await fetch(url + "api/VigitabletConfig/UpdateConfigTurn", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                objeto.ConfigGuardiasVigilantes = guards;
                const guardemployees = guards.join(',');
                const searchParams_ = `IdGuardia=${objeto.IdGuardia}&guardemployees=${guardemployees}&IdUsuario=${Settings.default.key.user}`;
                //dispatch({ type: UpdateConfigTurnAction, configturn: objeto, response: Utils.defaultResponse, IdGuardia: objeto.IdGuardia });
                //dispatch({ type: RequestConfigTurnsAction, IdGuardia: objeto.IdGuardia });
                const response_ = await fetch(url + "api/VigitabletConfig/UpdateConfigTurnGuards", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    },
                    body: searchParams_
                });
                if (response_.ok) {
                    //const data = await response_.json();
                    dispatch({ type: UpdateConfigTurnAction, configturn: objeto, IdGuardia: objeto.IdGuardia });
                } else {
                    dispatch({ type: ErrorConfigTurnAction, response: response_ });
                }
            }
            else {
                dispatch({ type: ErrorConfigTurnAction, response });
            }
        }
    },
    delete: (IdGuardia) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigTurnsAction, IdGuardia: IdGuardia });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigTurn/${IdGuardia}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                dispatch({ type: DeleteConfigTurnAction, configturn: defaultConfigTurn });
            } else {
                dispatch({ type: ErrorConfigTurnAction, response });
            }
            /*  .catch(reason => {
                  console.log('Error in Update:' + reason);
                  dispatch({ type: DeleteConfigTurnAction, response: reason });
              });*/
        }
    },
    getGuardEmployees: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigTurnsAction, IdGuardia: getState().configturns.IdGuardia || 0 });
            const response = await fetch(url + 'api/VigitabletConfig/GetAllGuardEmployeeInfo', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const guardemployees = await response.json();
                dispatch({ type: GetGuardEmployeesAction, guardemployees });
            } else {
                dispatch({ type: ErrorConfigTurnAction, response });
            }
        }
    },
    getSession: getSession,
    getTurnEventTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigTurnsAction, IdGuardia: getState().configturns.IdGuardia || 0 });
            const response = await fetch(url + 'api/VigitabletConfig/GetAllTurnEventTypes', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const turneventtypes = await response.json();
                dispatch({ type: GetTurnEventTypesAction, turneventtypes });
            } else {
                dispatch({ type: ErrorConfigTurnAction, response });
            }
        }
    },
    getPeriods: getPeriods,
    getContracts: getContracts,
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    configturn: defaultConfigTurn,
    configturns: [],
    isLoading: false,
    guardemployees: [],
    login: defaultLogin,
    idguardemployees: [],
    periods: [],
    response: defaultResponse
};

export const reducer = (state, incomingAction) => {
    const action = incomingAction;
    switch (action.type) {
        case RequestConfigTurnsAction:
            return {
                ...state,
                IdGuardia: action.IdGuardia,
                isLoading: true
            };
        case ReceiveConfigTurnsAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.IdGuardia === state.IdGuardia) {
                return {
                    ...state,
                    IdGuardia: action.IdGuardia,
                    configTurns: action.configturns,
                    isLoading: false
                };
            }
            break;
        case GetConfigTurnAction:
            if (action.IdGuardia === state.IdGuardia) {
                return {
                    ...state,
                    IdGuardia: action.IdGuardia,
                    configturn: action.configturn,
                    isLoading: false
                };
            }
            break;
        case GetConfigTurnsAction:
            return {
                ...state,
                configturns: action.configturns,
                isLoading: false
            };
        case GetGuardEmployeesAction:
            return {
                ...state,
                guardemployees: action.guardemployees,
                isLoading: false
            };
        case CreateConfigTurnAction:
            return {
                ...state,
                configturn: action.configturn,
                IdGuardia: action.IdGuardia,
                //response: action.response,
                isLoading: false
            };
        case UpdateConfigTurnAction:
            return {
                ...state,
                configturn: action.configturn,
                IdGuardia: action.IdGuardia,
                //response: action.response,
                isLoading: false
            };
        case DeleteConfigTurnAction:
            return {
                ...state,
                configturn: action.configturn,
                isLoading: false
            };
        case IncrementCountAction:
            console.log('In ConfigTurn - increment');
            return {
                ...state,
                listdays: action.listdays,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case ErrorRequestAction:
            return {
                ...state,
                isLoading: false,
                //IdGuardia: action.IdGuardia,
                response: action.response
            };
        case ReceiveConfigTurnGuardsAction:
            return {
                ...state,
                isLoading: false,
                IdGuardia: action.IdGuardia,
                guardemployees: action.guardemployees
            };
        case ReceiveIDConfigTurnGuardsAction:
            return {
                ...state,
                isLoading: false,
                //IdGuardia: action.IdGuardia,
                idguardemployees: action.idguardemployees

            };
        case 'GET_PERIODS':
            return {
                ...state,
                isLoading: false,
                periods: action.periods
            };
        case ErrorConfigTurnAction:
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case GetContractsAction:
            return {
                ...state,
                isLoading: false,
                contracts: action.contracts
            };
        case GetTurnEventTypesAction:
            return {
                ...state,
                turneventtypes: action.turneventtypes
            };
        case GetConfigTurnsGuardsAction:
            return {
                ...state,
                configturnsguards: action.configturnsguards
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }
    return state || unloadedState;
};
