import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { defaultLogin } from '../store/Login';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface RoundRecordState {
    listdays: number[];
    IdContrato: number;
    roundrecords: RoundRecord[];
    login: LogIn;
    roundrecord: RoundRecord;
    response: Utils.Resp;
    isLoading: boolean;

}
export interface RoundRecord {
    [key: string]: any
    IdContrato: number;
    Contrato: string;
    IdRonda: number;
    FechaRonda: string;
    ImagenLluviaQR: string;
    IdPuntoControl?: number;
    OrdenRonda?: number;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}

export interface SearchVigitabletRounds {
    [key: string]: any
    IdContract?: number;
    IdRound?: number;
    FromRoundDate?: string;
    ToRoundDate?: string;
}*/
export const defaultRoundRecord = {
    IdContrato: 22,
    Contrato: '',
    IdRonda: 0,
    FechaRonda: Utils.Now(),
    ImagenLluviaQR: '',
    IdPuntoControl: 0,
    OrdenRonda: 0,
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 2922,
    Usuario: ''
};
/*
export interface RoundRecordType {

}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const RequestRoundRecordsAction = 'REQUEST_ROUND_RECORD';
const GetRoundRecordsAction = 'GET_ROUND_RECORDS';
const GetRoundRecordAction = 'GET_ROUND_RECORD';
const UpdateRoundRecordAction = 'UPDATE_ROUND_RECORD';
const CreateRoundRecordAction = 'CREATE_ROUND_RECORD';
const DeleteRoundRecordAction = 'DELETE_ROUND_RECORD';
const GetSessionAction = 'GET_SESSION';
const GetRoundRecordTypesAction = 'GET_ROUND_RECORD_TYPES';
const SetModeAction = 'SET_MODE';
const ErrorResponseAction = 'ERROR_RESPONSE';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestRoundRecordsAction | GetRoundRecordsAction
    | GetRoundRecordAction | UpdateRoundRecordAction | CreateRoundRecordAction | DeleteRoundRecordAction
    | SetModeAction | ErrorResponseAction | GetSessionAction;
    
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
export function validate(roundrecord) {
    // true means invalid, so our conditions got reversed
    return {
        IdContrato: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.IdContrato) },
        IdPeriodo: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.IdPeriodo) },
        HorarioInicioAR: { errorMessage: "Falta HorarioInicioAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.HorarioInicioAR) },
        HorarioFinAR: { errorMessage: "Falta HorarioFinAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.HorarioFinAR) },
        CantidadEventosAR: { errorMessage: "Falta CantidadEventosAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.CantidadEventosAR.toString()) },
        NotifificacionAR: { errorMessage: "Falta NotifificacionAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.NotifificacionAR) },
        EnvioAR: { errorMessage: "Falta EnvioAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.EnvioAR) },
        MensajeAR: { errorMessage: "Falta MensajeAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.MensajeAR) },
        FechaUltActualizacion: { errorMessage: "Falta FechaUltActualizacion", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.FechaUltActualizacion) },
        IdUsuario: { errorMessage: "Falta IdUsuario", isRequired: true, valid: true, isEmpty: Utils.isEmpty(roundrecord.IdUsuario) }
    };
}



// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getRoundRecord: (IdContrato) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (IdContrato !== getState().roundrecord.IdContrato) {
                dispatch({
                    type: RequestRoundRecordsAction, IdContrato: IdContrato, roundrecord: getState().roundrecord.roundrecord
                });
                const response = await fetch(`api/VigitabletConfig/GetRoundRecord/${IdContrato}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    }
                });
                const data = await response.json();
                dispatch({ type: GetRoundRecordAction, IdContrato: IdContrato, roundrecord: data });
            }
        }
    },
    create: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            let response = Utils.defaultResponse;
            const url = Settings.default.key.url;
            dispatch({ type: RequestRoundRecordsAction, IdContrato: objeto.IdContrato, roundrecord: objeto });
            response = await fetch(url + `api/VigitabletConfig/Create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + getState().login.login.access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdContrato = await response.json();
                objeto.IdContrato = IdContrato;
                dispatch({ type: CreateRoundRecordAction, IdContrato, roundrecord: objeto, response });
            } else {
                dispatch({ type: CreateRoundRecordAction, IdContrato: 0, roundrecord: objeto, response });
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
                access_token: access_token,
                searchParams: searchParams
            };
            const response = await Utils.exec(params);
            if (response.ok) {
                console.log(response.status + ": " + response.statusText);
                dispatch({ type: UpdateRoundRecordAction, IdContrato: objeto.IdContrato, roundrecord: objeto, response });
            }
            else {
                dispatch({ type: UpdateRoundRecordAction, IdContrato: objeto.IdContrato, roundrecord: objeto, response });
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
            dispatch({ type: RequestRoundRecordsAction, IdContrato: objeto.IdContrato, roundrecord: objeto });
            const response = await fetch(url + `api/VigitabletConfig/DeleteRoundRecord`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + getState().login.login.access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: DeleteRoundRecordAction, IdContrato: objeto.IdContrato, roundrecord: objeto, response });
            }
            else {
                dispatch({ type: DeleteRoundRecordAction, IdContrato: objeto.IdContrato, roundrecord: objeto, response });
            }
        }
    },
    getRoundRecords: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            //dispatch({ type: RequestRoundRecordsAction, IdContrato: 0, roundrecord: getState().roundrecord.roundrecord });
            const response = await fetch(url + `api/VigitabletConfig/GetSurveillanceRounds`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const roundrecords = await response.json();
                dispatch({ type: GetRoundRecordsAction, roundrecords });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        } else {
            dispatch({ type: GetRoundRecordsAction, roundrecords: [] });
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
    roundrecords: [],
    login: defaultLogin,
    roundrecord: defaultRoundRecord,
    response: Utils.defaultResponse,
    isLoading: false
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case GetRoundRecordsAction:
            return {
                ...state,
                roundrecords: action.roundrecords,
                isLoading: false
            };
        case GetRoundRecordAction:
            return {
                ...state,
                roundrecord: action.roundrecord,
                IdContrato: action.IdContrato,
                isLoading: false
            };
        case CreateRoundRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                roundrecord: action.roundrecord,
                isLoading: false
            };
        case UpdateRoundRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                roundrecord: action.roundrecord,
                isLoading: false
            };
        case DeleteRoundRecordAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                roundrecord: action.roundrecord,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case RequestRoundRecordsAction:
            return {
                ...state,
                IdContrato: action.IdContrato,
                //roundrecord: action.roundrecord,
                isLoading: true
            };
        case 'SET_MODE':
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
