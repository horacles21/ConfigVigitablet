import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { defaultLogin } from '../store/Login';
import { defaultResponse } from '../store/Utils';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ConfigGeneralState {
    isLoading: boolean;
    path?: string;
    configgenerals: ConfigGeneral[];
    configgeneral: ConfigGeneral;
    login: LogIn;
    response: Resp;
}

export interface ConfigGeneral {
    [key: string]: any
    Id: number;
    Desc: string;
}
*/
export const defaultConfigGeneral = {
    Id: 0,
    Desc: '',
}
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
/*
interface RequestConfigGeneralAction = 'REQUEST_CONFIG_GENERAL';
    path: string;
}
*/
const ReceiveConfigGeneralAction = 'RECEIVE_CONFIG_GENERAL';
const UpdateConfigGeneralAction = 'UPDATE_CONFIG_GENERAL';
const CreateConfigGeneralAction = 'CREATE_CONFIG_GENERAL';
const DeleteConfigGeneralAction = 'DELETE_CONFIG_GENERAL';
const GetSessionAction = 'GET_SESSION';
const SetPathAction = 'SET_PATH';
const ErrorConfigGeneralAction = 'ERROR_CONFIG_GENERAL';


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestConfigGeneralAction | ReceiveConfigGeneralAction | SetPathAction | ErrorConfigGeneralAction
    | CreateConfigGeneralAction | UpdateConfigGeneralAction | DeleteConfigGeneralAction | GetSessionAction;
    */
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    create: (objeto, entity, path) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const id = `Id${entity}`;
            const desc = `Desc${entity}`;
            const searchParams = `${id}=${objeto[id]}&${desc}=${objeto[desc]}`;
            const url = Settings.default.key.url;
            const action = `api/${path}/Create`;
            const method = "POST";
            dispatch({ type: 'REQUEST_CONFIG_GENERAL', path: path });
            const response = await fetch(url + action, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
                body: searchParams,
            });
            if (response.ok) {
                const data = await response.json();
                objeto[id] = data;
                dispatch({ type: CreateConfigGeneralAction, configgeneral: objeto });
            }
            else {
                dispatch({ type: ErrorConfigGeneralAction, response });
            }
        }
    },
    update: (objeto, entity, path) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const id = `Id${entity}`;
            const desc = `Desc${entity}`;
            const searchParams = `${id}=${objeto[id]}&${desc}=${objeto[desc]}`;
            const url = Settings.default.key.url;
            const action = `api/${path}/Update`;
            const method = "PUT";
            dispatch({ type: 'REQUEST_CONFIG_GENERAL', path: path });
            const response = await fetch(url + action, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateConfigGeneralAction, configgeneral: objeto });
            }
            else {
                dispatch({ type: ErrorConfigGeneralAction, response });
            }
        }
    },
    delete: (objeto, entity, path) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const id = `Id${entity}`;
            const desc = `Desc${entity}`;
            //const searchParams = `${id}=${objeto[id]}&${desc}=${objeto[desc]}`;
            const url = Settings.default.key.url;
            const action = `api/${path}/Delete/${objeto[id]}`;
            const method = "DELETE";
            dispatch({ type: 'REQUEST_CONFIG_GENERAL', path: path });
            const response = await fetch(url + action, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
                //body: searchParams,
            });
            if (response.ok) {
                dispatch({ type: DeleteConfigGeneralAction, configgeneral: defaultConfigGeneral });
            } else {
                dispatch({ type: ErrorConfigGeneralAction, response: response });
            }
            /*}).catch(reason => {
                dispatch({ type: ErrorConfigGeneralAction, response: reason });
            });*/

        }
    },
    requestConfigGeneral: (path) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (path !== getState().configgeneral.path) {
            const access_token = getState().login.login.access_token;
            if (access_token) {
                const url = Settings.default.key.url;
                dispatch({ type: 'REQUEST_CONFIG_GENERAL', path: path });
                const response = await fetch(`${url}api/${path}/GetAll`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (response.ok) {
                    const configgenerals = await response.json();
                    dispatch({ type: ReceiveConfigGeneralAction, path: path, configgenerals });
                }
                else {
                    dispatch({ type: ErrorConfigGeneralAction, response });
                }
            }
            else {
                dispatch({ type: ReceiveConfigGeneralAction, path: path, configgenerals: [] });
            }
        }
        else {
            dispatch({ type: ReceiveConfigGeneralAction, path: '', configgenerals: [] });
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login,
        });
    },
    setPath: path => (dispatch, getState) => {
        dispatch({
            type: SetPathAction,
            path: path
        });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = { configgenerals: [], isLoading: false, configgeneral: defaultConfigGeneral, login: defaultLogin, response: defaultResponse };

export const reducer = (state, incomingAction) => {
    const action = incomingAction;
    switch (action.type) {
        case 'REQUEST_CONFIG_GENERAL':
            return {
                ...state,
                path: action.path,
                configgenerals: state.configgenerals,
                configgeneral: state.configgeneral,
                login: state.login,
                isLoading: true
            };
        case ReceiveConfigGeneralAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.path === state.path) {
                return {
                    ...state,
                    path: action.path,
                    configgenerals: action.configgenerals,
                    configgeneral: state.configgeneral,
                    login: state.login,
                    isLoading: false
                };
            }
            break;
        case CreateConfigGeneralAction:
            return {
                ...state,
                configgeneral: action.configgeneral,
                isLoading: false
            };
        case UpdateConfigGeneralAction:
            return {
                ...state,
                configgeneral: action.configgeneral,
                isLoading: false
            };
        case DeleteConfigGeneralAction:
            return {
                ...state,
                configgeneral: action.configgeneral,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case SetPathAction:
            return {
                ...state,
                path: action.path
            };
        case ErrorConfigGeneralAction:
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state || unloadedState;
};
