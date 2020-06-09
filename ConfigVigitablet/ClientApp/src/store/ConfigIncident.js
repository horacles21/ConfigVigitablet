import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { getIncidentTypes, GetIncidentTypesAction } from '../store/IncidentType';
import { defaultLogin } from '../store/Login';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ConfigIncidentsState {
    isLoading: boolean;
    IdContrato?: number;
    configincidents: ConfigIncident[];
    incidentTypes: IncidentType.IncidentType[];
    login: LogIn;
}

export interface ConfigIncident {
    [key: string]: any
    IdContrato: number;
    Contrato: string;
    IdTipoIncidente: number;
    TipoIncidente: string;
    //FechaIncidente: string;
    //IdPersonaVig: number;
    //PrimerNombre: string;
    //SegundoNombre: string;
    //PrimerApellido: string;
    //SegundoApellido: string;
    //NombreImagenIncidente: string;
    IdUsuario: number;
    Usuario: string;

}*/
export const defaultConfigIncident = {
    IdContrato: 22,
    Contrato: '',
    IdTipoIncidente: 0,
    TipoIncidente: ''
};
//FechaIncidente: string;
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const RequestConfigIncidentsAction = 'REQUEST_CONFIG_INCIDENTS';
export const ReceiveConfigIncidentsAction = 'RECEIVE_CONFIG_INCIDENTS';
const UpdateConfigIncidentAction = 'UPDATE_CONFIG_INCIDENT';
const CreateConfigIncidentAction = 'CREATE_CONFIG_INCIDENT';
const DeleteConfigIncidentAction = 'DELETE_CONFIG_INCIDENT';
//const GetIncidentTypesAction = 'GET_INCIDENT_TYPES';
const IncidentTypeErrorAction = 'ERROR_INCIDENT_TYPES';
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
//type KnownAction = RequestConfigIncidentsAction | ReceiveConfigIncidentsAction | GetIncidentTypesAction | IncidentTypeErrorAction | GetSessionAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getIncidentsByContract: IdContrato => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //          if (IdContrato !== getState().configincidents.IdContrato) {
            dispatch({ type: RequestConfigIncidentsAction, IdContrato: IdContrato });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigIncidentsByContract/${IdContrato}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configincidents = await response.json();
                dispatch({ type: ReceiveConfigIncidentsAction, IdContrato, configincidents });
            }
            else {
                dispatch({ type: ReceiveConfigIncidentsAction, IdContrato, response });
            }
        }
        else {
            dispatch({ type: ReceiveConfigIncidentsAction, IdContrato, configincidents: [] });
        }

    },
    createIncidents: (configincidents) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        const IdContrato = getState().login.contracts[0].Id;
        if (access_token) {

            const url = Settings.default.key.url;
            const strIncidents = configincidents.map((incident, key) => {
                return encodeURIComponent(incident.toString()); /*+ '=' +encodeURIComponent(key.toString())*/
            }).join(',');
            //          if (IdContrato !== getState().configincidents.IdContrato) {
            const searchParams = `IdContrato=${IdContrato}&IdUsuario=${Settings.default.key.user}&configincidents=${strIncidents}`;
            //dispatch({ type: RequestConfigIncidentsAction, IdContrato: IdContrato });
            const response = await fetch(url + `api/VigitabletConfig/AddConfigIncidents`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const configincidents = await response.json();
                dispatch({ type: CreateConfigIncidentAction, IdContrato, configincidents });
            }
            else {
                dispatch({ type: IncidentTypeErrorAction, response });
            }
            //}).catch(reason => dispatch({ type: ReceiveConfigIncidentsAction, IdContrato: IdContrato, configincidents: [], }));
        }
        else {
            dispatch({ type: CreateConfigIncidentAction, IdContrato, configincidents: [] });
        }
        //     }
    },
    deleteIncidents: (IdContrato, configincidents) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //const searchParams = Object.keys(configincidents).map((key) => {
            //    return encodeURIComponent(key) + '=' + encodeURIComponent(configincidents[key]);
            //}).join('&');
            //          if (IdContrato !== getState().configincidents.IdContrato) {
            const searchParams = `configincidents=1,2,3&IdContrato=22&IdUsuario=${Settings.default.key.user}`;
            dispatch({ type: RequestConfigIncidentsAction, IdContrato: IdContrato });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigIncidentsByContract/${IdContrato}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const data = await response.json();
            }
            else {
                dispatch({ type: IncidentTypeErrorAction, response });
            }
            //dispatch({ type: ReceiveConfigIncidentsAction, IdContrato: IdContrato, configincidents: data });
            //   }).catch(reason => dispatch({ type: ReceiveConfigIncidentsAction, IdContrato: IdContrato, configincidents: [], }));
        }
        //     }
    },
    getIncidentTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigIncidentsAction, IdContrato: getState().configincidents.IdContrato || 0 });
            const response = await getIncidentTypes(access_token);
            if (response.ok) {
                const incidentTypes = await response.json();
                dispatch({ type: GetIncidentTypesAction, incidentTypes });
            }
            else {
                dispatch({ type: IncidentTypeErrorAction, response });
            }
        }
        else {
            dispatch({ type: GetIncidentTypesAction, incidentTypes: [] });
        }
    },

    getSession: () => (dispatch, getState) => {
        dispatch({
            type: 'GET_SESSION',
            login: getState().login.login
        });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = { configincidents: [], isLoading: false, incidentTypes: [], login: defaultLogin };

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestConfigIncidentsAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                //configincidents: state.configincidents,
                isLoading: true
            };
        case ReceiveConfigIncidentsAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (action.IdContrato === state.IdContrato) {
            return {
                ...state,
                IdContrato: action.IdContrato,
                configincidents: action.configincidents,
                isLoading: false
            };
        //}
        case GetIncidentTypesAction:
            return {
                ...state,
                incidentTypes: action.incidentTypes,
                isLoading: false
            };
        case IncidentTypeErrorAction:
            return {
                ...state,
                incidentTypes: [],
                isLoading: false
            };
        case 'GET_SESSION':
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state;
};
