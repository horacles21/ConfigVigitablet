import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { defaultLogin } from '../store/Login';
import { defaultContrato, GetContractsAction, ContractsAction, defaultContract, getContracts } from '../store/Contracts';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface IncidentRecordState {
    listdays: number[];
    IdContrato: number;
    incidentrecords: IncidentRecord[];
    login: LogIn;
    incidentrecord: IncidentRecord;
    response: Utils.Resp;
    isLoading: boolean;

}
export interface IncidentRecord {
    [key: string]: any
    IdContrato: number;
    Contrato: string;
    IdTipoIncidente: number;
    TipoIncidente: string;
    FechaIncidente: string;
    IdPersonaVig: number;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    NombreImagenIncidente: string;
}

export interface SearchVigitabletRounds {
    [key: string]: any
    IdContract?: number;
    IdRound?: number;
    FromRoundDate?: string;
    ToRoundDate?: string;
}*/
export const defaultIncidentRecord = {
    IdContrato: 0,
    Contrato: '',
    IdTipoIncidente: 0,
    TipoIncidente: '',
    FechaIncidente: Utils.Now(),
    IdPersonaVig: 0,
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    NombreImagenIncidente: '',
    imagen: '',
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 0,
    Usuario: ''
};
/*
export interface IncidentRecordType {

}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const RequestIncidentRecordsAction = 'REQUEST_INCIDENT_RECORD';
const GetIncidentRecordsAction = 'GET_INCIDENT_RECORDS';
const GetIncidentRecordAction = 'GET_INCIDENT_RECORD';
const UpdateIncidentRecordAction = 'UPDATE_INCIDENT_RECORD';
const CreateIncidentRecordAction = 'CREATE_INCIDENT_RECORD';
const DeleteIncidentRecordAction = 'DELETE_INCIDENT_RECORD';
const GetSessionAction = 'GET_SESSION';
const GetIncidentRecordTypesAction = 'GET_INCIDENT_RECORD_TYPES';
const SetModeAction = 'SET_MODE';
const ErrorResponseAction = 'ERROR_RESPONSE';


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestIncidentRecordsAction | GetIncidentRecordsAction
    | GetIncidentRecordAction | UpdateIncidentRecordAction | CreateIncidentRecordAction | DeleteIncidentRecordAction
    | SetModeAction | ErrorResponseAction | GetSessionAction;
*/
/*
export interface Errors {
    [key: string]: Utils.AttrField
    IdContrato: Utils.AttrField,
    IdPeriodo: Utils.AttrField,
    HorarioInicioAR: Utils.AttrField,
    HorarioFinAR: Utils.AttrField,
    CantidadEventosAR: Utils.AttrField,
    NotifificacionAR: Utils.AttrField,
    EnvioAR: Utils.AttrField,
    MensajeAR: Utils.AttrField,
    FechaUltActualizacion: Utils.AttrField,
    IdUsuario: Utils.AttrField
}*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getIncidentRecord: IdContrato => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (IdContrato !== getState().incidentrecord.IdContrato) {
                dispatch({
                    type: RequestIncidentRecordsAction, IdContrato: IdContrato, incidentrecord: getState().incidentrecord.incidentrecord
                });
                const response = await fetch(`api/VigitabletConfig/GetIncidentRecord/${IdContrato}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + getState().login.login.access_token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: GetIncidentRecordAction, IdContrato: IdContrato, incidentrecord: data });
                }
                else {

                }
            }
        }
    },
    create: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestIncidentRecordsAction, IdContrato: objeto.IdContrato, incidentrecord: objeto });
            const response = await fetch(url + `api/VigitabletConfig/Create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + getState().login.login.access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const data = await response.json();
                objeto.IdContrato = data;
                dispatch({ type: CreateIncidentRecordAction, IdContrato: data, incidentrecord: objeto, response: Utils.defaultResponse });
            }
            else {
                //console.log('Error in create:' + reason);
                dispatch({ type: CreateIncidentRecordAction, IdContrato: 0, incidentrecord: objeto, response: response });
            }
        }
    },
    update: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.FechaUltActualizacion = Utils.Now();
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            console.log('searchParams:' + searchParams);
            const params = {
                url: Settings.default.key.url,
                action: "api/VigitabletConfig/Update",
                method: "PUT",
                access_token: getState().login.login.access_token,
                searchParams: searchParams
            };
            //let response = Utils.defaultResponse;
            dispatch({ type: RequestIncidentRecordsAction, IdContrato: objeto.IdContrato, incidentrecord: objeto });
            const response = await Utils.exec(params);
            if (response.ok) {
                console.log(response.status + ": " + response.statusText);
                dispatch({ type: UpdateIncidentRecordAction, IdContrato: objeto.IdContrato, incidentrecord: objeto, response });
            }
            else {
                dispatch({ type: UpdateIncidentRecordAction, IdContrato: objeto.IdContrato, incidentrecord: objeto, response });
            }

        }
    },

    delete: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            objeto.FechaUltActualizacion = Utils.Now();
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            dispatch({ type: RequestIncidentRecordsAction, IdContrato: objeto.IdContrato, incidentrecord: objeto });
            const response = await fetch(url + `api/VigitabletConfig/DeleteIncidentRecord`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + getState().login.login.access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: DeleteIncidentRecordAction, IdContrato: objeto.IdContrato, incidentrecord: objeto, response });
            }
            else {
                dispatch({ type: DeleteIncidentRecordAction, IdContrato: objeto.IdContrato, incidentrecord: objeto, response });
            }
        }
    },
    getIncidentRecords: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            dispatch({ type: RequestIncidentRecordsAction, IdContrato: 0 });
            let response = await fetch(url + `api/VigitabletConfig/GetSurveillanceIncidents`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const incidentrecords = await response.json();
                dispatch({ type: GetIncidentRecordsAction, incidentrecords });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        } else {
            dispatch({ type: GetIncidentRecordsAction, incidentrecords: [] });
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    },
    getContracts: getContracts
};
const unloadedState = {
    IdContrato: 0,
    incidentrecords: [],
    login: defaultLogin,
    incidentrecord: defaultIncidentRecord,
    response: Utils.defaultResponse,
    isLoading: false
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case GetIncidentRecordsAction:
            return {
                ...state,
                incidentrecords: action.incidentrecords,
                isLoading: false
            };
        case GetIncidentRecordAction:
            return {
                ...state,
                incidentrecord: action.incidentrecord,
                IdContrato: action.IdContrato,
                isLoading: false
            };
        case CreateIncidentRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                incidentrecord: action.incidentrecord,
                isLoading: false
            };
        case UpdateIncidentRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                incidentrecord: action.incidentrecord,
                isLoading: false
            };
        case DeleteIncidentRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                incidentrecord: action.incidentrecord,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case RequestIncidentRecordsAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                //incidentrecord: action.incidentrecord,
                isLoading: true
            };
        case SetModeAction:
            return {
                ...state,
                mode: action.mode,
                isLoading: false
            };
        case ErrorResponseAction:
            return {
                ...state,
                response: action.response,
                isLoading: false
            };
        case GetContractsAction:
            return ContractsAction(state, action) ;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state;
};
