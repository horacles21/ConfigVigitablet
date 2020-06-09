import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { defaultLogin } from '../store/Login';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface NewsRecordState {
    listdays: number[];
    IdContrato: number;
    newsrecords: NewsRecord[];
    login: LogIn;
    newsrecord: NewsRecord;
    response: Utils.Resp;
    isLoading: boolean;

}
export interface NewsRecord {
    [key: string]: any
    IdContrato: number;
    Contrato: string;
    IdTipoNewse: number;
    TipoNewse: string;
    FechaNewse: string;
    IdPersonaVig: number;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    NombreImagenNewse: string;
}

export interface SearchVigitabletRounds {
    [key: string]: any
    IdContract?: number;
    IdRound?: number;
    FromRoundDate?: string;
    ToRoundDate?: string;
}*/
export const defaultNewsRecord = {
    IdContrato: 0,
    IdNovedad: 0,
    IdRonda: 0,
    IdPuntoControl: 0,
    IdPersonaVig: 0,
    FechaNovedad: Utils.Now(),
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    ImagenNovedad: '',
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 2922,
    Usuario: ''
};
/*
export interface IncidentRecordType {

}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const RequestNewsRecordsAction = 'REQUEST_NEWS_RECORD';
const GetNewsRecordsAction = 'GET_NEWS_RECORDS';
const GetNewsRecordAction = 'GET_NEWS_RECORD';
const UpdateNewsRecordAction = 'UPDATE_NEWS_RECORD';
const CreateNewsRecordAction = 'CREATE_NEWS_RECORD';
const DeleteNewsRecordAction = 'DELETE_NEWS_RECORD';
const GetSessionAction = 'GET_SESSION';
const GetNewsRecordTypesAction = 'GET_NEWS_RECORD_TYPES';
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
export function validate(newsrecord) {
    // true means invalid, so our conditions got reversed
    return {
        IdContrato: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.IdContrato) },
        IdPeriodo: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.IdPeriodo) },
        HorarioInicioAR: { errorMessage: "Falta HorarioInicioAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.HorarioInicioAR) },
        HorarioFinAR: { errorMessage: "Falta HorarioFinAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.HorarioFinAR) },
        CantidadEventosAR: { errorMessage: "Falta CantidadEventosAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.CantidadEventosAR.toString()) },
        NotifificacionAR: { errorMessage: "Falta NotifificacionAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.NotifificacionAR) },
        EnvioAR: { errorMessage: "Falta EnvioAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.EnvioAR) },
        MensajeAR: { errorMessage: "Falta MensajeAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.MensajeAR) },
        FechaUltActualizacion: { errorMessage: "Falta FechaUltActualizacion", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.FechaUltActualizacion) },
        IdUsuario: { errorMessage: "Falta IdUsuario", isRequired: true, valid: true, isEmpty: Utils.isEmpty(newsrecord.IdUsuario) }
    };
}



// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getNewsRecord: IdContrato => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (IdContrato !== getState().newsrecord.IdContrato) {
                dispatch({
                    type: RequestNewsRecordsAction, IdContrato: IdContrato, newsrecord: getState().newsrecord.newsrecord
                });
                const response = await fetch(`api/VigitabletConfig/GetNewsRecord/${IdContrato}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + getState().login.login.access_token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: GetNewsRecordAction, IdContrato: IdContrato, newsrecord: data });
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
            dispatch({ type: RequestNewsRecordsAction, IdContrato: objeto.IdContrato, newsrecord: objeto });
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
                dispatch({ type: CreateNewsRecordAction, IdContrato: data, newsrecord: objeto, response: Utils.defaultResponse });
            }
            else {
                //console.log('Error in create:' + reason);
                dispatch({ type: CreateNewsRecordAction, IdContrato: 0, newsrecord: objeto, response: response });
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
            dispatch({ type: RequestNewsRecordsAction, IdContrato: objeto.IdContrato, newsrecord: objeto });
            const response = await Utils.exec(params);
            if (response.ok) {
                console.log(response.status + ": " + response.statusText);
                dispatch({ type: UpdateNewsRecordAction, IdContrato: objeto.IdContrato, newsrecord: objeto, response });
            }
            else {
                dispatch({ type: UpdateNewsRecordAction, IdContrato: objeto.IdContrato, newsrecord: objeto, response });
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
            dispatch({ type: RequestNewsRecordsAction, IdContrato: objeto.IdContrato, newsrecord: objeto });
            const response = await fetch(url + `api/VigitabletConfig/DeleteNewsRecord`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + getState().login.login.access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: DeleteNewsRecordAction, IdContrato: objeto.IdContrato, newsrecord: objeto, response });
            }
            else {
                dispatch({ type: DeleteNewsRecordAction, IdContrato: objeto.IdContrato, newsrecord: objeto, response });
            }
        }
    },
    getNewsRecords: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            //dispatch({ type: RequestNewsRecordsAction, IdContrato: 0, newsrecord: getState().newsrecord.newsrecord });
            let response = await fetch(url + `api/VigitabletConfig/GetNewsRecords`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const newsrecords = await response.json();
                dispatch({ type: GetNewsRecordsAction, newsrecords });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        } else {
            dispatch({ type: GetNewsRecordsAction, newsrecords: [] });
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
    newsrecords: [],
    login: defaultLogin,
    newsrecord: defaultNewsRecord,
    response: Utils.defaultResponse,
    isLoading: false
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case GetNewsRecordsAction:
            return {
                ...state,
                newsrecords: action.newsrecords,
                isLoading: false
            };
        case GetNewsRecordAction:
            return {
                ...state,
                newsrecord: action.newsrecord,
                IdContrato: action.IdContrato,
                isLoading: false
            };
        case CreateNewsRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                newsrecord: action.newsrecord,
                isLoading: false
            };
        case UpdateNewsRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                newsrecord: action.newsrecord,
                isLoading: false
            };
        case DeleteNewsRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                newsrecord: action.newsrecord,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case RequestNewsRecordsAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                //newsrecord: action.newsrecord,
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
