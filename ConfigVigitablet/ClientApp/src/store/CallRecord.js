import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { defaultLogin } from '../store/Login';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface CallRecordState {
    listdays: number[];
    IdContrato: number;
    callrecords: CallRecord[];
    login: LogIn;
    callrecord: CallRecord;
    response: Utils.Resp;
    isLoading: boolean;

}
export interface CallRecord {
    [key: string]: any
    IdContrato: number;
    Contrato: string;
    IdTipoCalle: number;
    TipoCalle: string;
    FechaCalle: string;
    IdPersonaVig: number;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    NombreImagenCalle: string;
}

export interface SearchVigitabletRounds {
    [key: string]: any
    IdContract?: number;
    IdRound?: number;
    FromRoundDate?: string;
    ToRoundDate?: string;
}*/
export const defaultCallRecord = {
    IdContrato: 0,
    Contrato: '',
    IdTipoCalle: 0,
    TipoCalle: '',
    FechaCalle: Utils.Now(),
    IdPersonaVig: 0,
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    NombreImagenCalle: '',
    imagen: '',
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 0,
    Usuario: ''
};
/*
export interface CallRecordType {

}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const RequestCallRecordsAction = 'REQUEST_INCIDENT_RECORD';
const GetCallRecordsAction = 'GET_INCIDENT_RECORDS';
const GetCallRecordAction = 'GET_INCIDENT_RECORD';
const UpdateCallRecordAction = 'UPDATE_INCIDENT_RECORD';
const CreateCallRecordAction = 'CREATE_INCIDENT_RECORD';
const DeleteCallRecordAction = 'DELETE_INCIDENT_RECORD';
const GetSessionAction = 'GET_SESSION';
const GetCallRecordTypesAction = 'GET_INCIDENT_RECORD_TYPES';
const SetModeAction = 'SET_MODE';
const ErrorResponseAction = 'ERROR_RESPONSE';


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestCallRecordsAction | GetCallRecordsAction
    | GetCallRecordAction | UpdateCallRecordAction | CreateCallRecordAction | DeleteCallRecordAction
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
    getCallRecord: IdContrato => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (IdContrato !== getState().callrecord.IdContrato) {
                dispatch({
                    type: RequestCallRecordsAction, IdContrato: IdContrato, callrecord: getState().callrecord.callrecord
                });
                const response = await fetch(`api/VigitabletConfig/GetCallRecord/${IdContrato}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + getState().login.login.access_token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: GetCallRecordAction, IdContrato: IdContrato, callrecord: data });
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
            dispatch({ type: RequestCallRecordsAction, IdContrato: objeto.IdContrato, callrecord: objeto });
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
                dispatch({ type: CreateCallRecordAction, IdContrato: data, callrecord: objeto, response: Utils.defaultResponse });
            }
            else {
                //console.log('Error in create:' + reason);
                dispatch({ type: CreateCallRecordAction, IdContrato: 0, callrecord: objeto, response: response });
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
            dispatch({ type: RequestCallRecordsAction, IdContrato: objeto.IdContrato, callrecord: objeto });
            const response = await Utils.exec(params);
            if (response.ok) {
                console.log(response.status + ": " + response.statusText);
                dispatch({ type: UpdateCallRecordAction, IdContrato: objeto.IdContrato, callrecord: objeto, response });
            }
            else {
                dispatch({ type: UpdateCallRecordAction, IdContrato: objeto.IdContrato, callrecord: objeto, response });
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
            dispatch({ type: RequestCallRecordsAction, IdContrato: objeto.IdContrato, callrecord: objeto });
            const response = await fetch(url + `api/VigitabletConfig/DeleteCallRecord`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + getState().login.login.access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: DeleteCallRecordAction, IdContrato: objeto.IdContrato, callrecord: objeto, response });
            }
            else {
                dispatch({ type: DeleteCallRecordAction, IdContrato: objeto.IdContrato, callrecord: objeto, response });
            }
        }
    },
    getCallRecords: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestCallRecordsAction, IdContrato: 0, callrecord: getState().callrecord.callrecord });
            let response = await fetch(url + `api/VigitabletConfig/GetCallRecords`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
            });
            if (response.ok) {
                const callrecords = await response.json();
                dispatch({ type: GetCallRecordsAction, callrecords });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        } else {
            dispatch({ type: GetCallRecordsAction, callrecords: [] });
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    }
};
const unloadedState = {
    listdays: Utils.defaultListDays,
    IdContrato: 0,
    callrecords: [],
    login: defaultLogin,
    callrecord: defaultCallRecord,
    response: Utils.defaultResponse,
    isLoading: false
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case GetCallRecordsAction:
            return {
                ...state,
                callrecords: action.callrecords,
                isLoading: false
            };
        case GetCallRecordAction:
            return {
                ...state,
                callrecord: action.callrecord,
                IdContrato: action.IdContrato,
                isLoading: false
            };
        case CreateCallRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                callrecord: action.callrecord,
                isLoading: false
            };
        case UpdateCallRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                callrecord: action.callrecord,
                isLoading: false
            };
        case DeleteCallRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                callrecord: action.callrecord,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case RequestCallRecordsAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                //callrecord: action.callrecord,
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
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state;
};
