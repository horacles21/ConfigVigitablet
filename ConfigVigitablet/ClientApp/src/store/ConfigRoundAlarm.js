import * as Settings from '../store/MyConfig';
import { getContacts, GetContactsAction } from '../store/Contacts';
import * as Utils from '../store/Utils';
import { defaultLogin } from '../store/Login';
import { getPeriods } from '../store/Period';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ConfigRoundAlarmState {
    listdays: number[];
    IdAlarmaRonda: number;
    configroundalarms: ConfigRoundAlarm[];
    login: LogIn;
    configroundalarm: ConfigRoundAlarm;
    response: Utils.Resp;
    isLoading: boolean;
    periods: Period[];
    contacts: Contact[];

}
export interface ConfigRoundAlarm {
    [key: string]: any
    IdAlarmaRonda: number;
    IdPeriodo: string;
    IdContacto: number;
    Periodo: string;
    HorarioInicioAR: string;
    HorarioFinAR: string;
    CantidadEventosAR: number;
    NotifificacionAR: string;
    EnvioAR: string;
    MensajeAR: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    IdTipoEnvio: number;
    Usuario: string;
    contacts: number[];
}
*/
export const defaultConfigRoundAlarm = {
    IdAlarmaRonda: 0,
    IdContacto: 0,
    IdPeriodo: '',
    Periodo: '',
    HorarioInicioAR: '',
    HorarioFinAR: '',
    CantidadEventosAR: 0,
    NotifificacionAR: '',
    EnvioAR: '',
    MensajeAR: '',
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 0,
    Usuario: '',
    IdTipoEnvio: 0,
    contacts: [3, 4, 6]
};
/*
export interface ConfigRoundAlarmType {

}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const RequestConfigRoundAlarmsAction = 'REQUEST_CONFIG_ROUND_ALARM';
const GetConfigRoundAlarmsAction = 'GET_CONFIG_ROUND_ALARMS';
const GetConfigRoundAlarmAction = 'GET_CONFIG_ROUND_ALARM';
const UpdateConfigRoundAlarmAction = 'UPDATE_CONFIG_ROUND_ALARM';
const CreateConfigRoundAlarmAction = 'CREATE_CONFIG_ROUND_ALARM';
const DeleteConfigRoundAlarmAction = 'DELETE_CONFIG_ROUND_ALARM';
const GetSessionAction = 'GET_SESSION';
const GetConfigRoundAlarmTypesAction = 'GET_CONFIG_ROUND_ALARM_TYPES';
const SetModeAction = 'SET_MODE';
const ErrorResponseAction = 'ERROR_RESPONSE';
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestConfigRoundAlarmsAction | GetConfigRoundAlarmsAction
    | GetConfigRoundAlarmAction | UpdateConfigRoundAlarmAction | CreateConfigRoundAlarmAction | DeleteConfigRoundAlarmAction
    | SetModeAction | ErrorResponseAction | GetSessionAction | PeriodsAction | GetContactsAction;
*/
/*
export interface Errors {
    [key: string]: Utils.AttrField
    //IdAlarmaRonda: Utils.AttrField,
    IdPeriodo: Utils.AttrField,
    HorarioInicioAR: Utils.AttrField,
    HorarioFinAR: Utils.AttrField,
    CantidadEventosAR: Utils.AttrField,
    NotifificacionAR: Utils.AttrField,
    EnvioAR: Utils.AttrField,
    MensajeAR: Utils.AttrField,
    //FechaUltActualizacion: Utils.AttrField,
    //IdUsuario: Utils.AttrField
}*/
export function validate(configroundalarm) {
    // true means invalid, so our conditions got reversed
    return {
        //IdAlarmaRonda: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.IdAlarmaRonda) },
        IdPeriodo: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.IdPeriodo) },
        HorarioInicioAR: { errorMessage: "Falta HorarioInicioAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.HorarioInicioAR) },
        HorarioFinAR: { errorMessage: "Falta HorarioFinAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.HorarioFinAR) },
        CantidadEventosAR: { errorMessage: "Falta CantidadEventosAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.CantidadEventosAR.toString()) },
        NotifificacionAR: { errorMessage: "Falta NotifificacionAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.NotifificacionAR) },
        EnvioAR: { errorMessage: "Falta EnvioAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.EnvioAR) },
        MensajeAR: { errorMessage: "Falta MensajeAR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.MensajeAR) }
        //FechaUltActualizacion: { errorMessage: "Falta FechaUltActualizacion", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.FechaUltActualizacion) },
        //IdUsuario: { errorMessage: "Falta IdUsuario", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configroundalarm.IdUsuario) },
    };
}



// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getConfigRoundAlarm: IdAlarmaRonda => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (IdAlarmaRonda !== getState().configroundalarm.IdAlarmaRonda) {
                dispatch({
                    type: RequestConfigRoundAlarmsAction, IdAlarmaRonda: IdAlarmaRonda, configroundalarm: getState().configroundalarm.configroundalarm || defaultConfigRoundAlarm
                });
                const response = await fetch(`api/VigitabletConfig/GetConfigRoundAlarm/${IdAlarmaRonda}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    }
                });
                const data = await response.json();
                dispatch({ type: GetConfigRoundAlarmAction, IdAlarmaRonda: IdAlarmaRonda, configroundalarm: data });
            }
        }
    },
    create: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let searchParams = Object.keys(objeto).map((key) => {
                return key === 'contacts' ? '' : encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            let strContacts = objeto.contacts.map(contact => {
                return "contacts=" + contact;
            }).join('&');
            searchParams = searchParams + '&' + strContacts;
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundAlarmsAction, IdAlarmaRonda: objeto.IdAlarmaRonda, configroundalarm: objeto });
            const response = await fetch(url + `api/VigitabletConfig/Create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            const data = await response.json();
            objeto.IdAlarmaRonda = data;
            dispatch({ type: CreateConfigRoundAlarmAction, IdAlarmaRonda: data, configroundalarm: objeto, response: Utils.defaultResponse });
            /*}).catch(reason => {
                console.log('Error in create:' + reason);
                dispatch({ type: CreateConfigRoundAlarmAction, IdAlarmaRonda: 0, configroundalarm: objeto, response: response });
            });*/
        }
    },
    update: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.FechaUltActualizacion = Utils.Now();
            let searchParams = Object.keys(objeto).map((key) => {
                return key === 'contacts' ? '' : encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            let strContacts = objeto.contacts.map(contact => {
                return "contacts=" + contact;
            }).join('&');
            searchParams = searchParams + '&' + strContacts;
            console.log('searchParams:' + searchParams);
            let params = {
                url: Settings.default.key.url,
                action: "api/VigitabletConfig/Update",
                method: "PUT",
                access_token: access_token,
                searchParams: searchParams
            };

            dispatch({ type: RequestConfigRoundAlarmsAction, IdAlarmaRonda: objeto.IdAlarmaRonda, configroundalarm: objeto });
            const response = await Utils.exec(params);
            console.log(response.status + ": " + response.statusText);
            dispatch({ type: UpdateConfigRoundAlarmAction, IdAlarmaRonda: objeto.IdAlarmaRonda, configroundalarm: objeto, response });
            /*}).catch(reason => {
                console.log('Error in create:' + reason);
                dispatch({ type: UpdateConfigRoundAlarmAction, IdAlarmaRonda: objeto.IdAlarmaRonda, configroundalarm: objeto, response: reason });
            });*/
        }
    },

    delete: (id) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundAlarmsAction, IdAlarmaRonda: id, configroundalarm: defaultConfigRoundAlarm });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigRoundAlarm/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            //const data = await {
            dispatch({ type: DeleteConfigRoundAlarmAction, IdAlarmaRonda: id, configroundalarm: defaultConfigRoundAlarm, response });
            /*}).catch(reason => {
                console.log('Error in Delete:' + reason);
                dispatch({ type: DeleteConfigRoundAlarmAction, IdAlarmaRonda: id, configroundalarm: defaultConfigRoundAlarm, response: reason });
            });*/
        }
    },
    getConfigRoundAlarms: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundAlarmsAction, IdAlarmaRonda: 0, configroundalarm: getState().configroundalarm.configroundalarm || defaultConfigRoundAlarm });
            const response = await fetch(url + `api/VigitabletConfig/GetAllConfigRoundAlarm`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            const data = await response.json();
            dispatch({ type: GetConfigRoundAlarmsAction, configroundalarms: data });
            /*}).catch(reason => {
                console.log(reason);
                dispatch({ type: ErrorResponseAction, response: reason });
            });*/
        } else {
            dispatch({ type: GetConfigRoundAlarmsAction, configroundalarms: [] });
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    },
    getPeriods: getPeriods,
    getContacts: getContacts
};
const unloadedState = {
    listdays: Utils.defaultListDays,
    IdAlarmaRonda: 0,
    configroundalarms: [],
    login: defaultLogin,
    configroundalarm: defaultConfigRoundAlarm,
    response: Utils.defaultResponse,
    isLoading: false,
    periods: [],
    contacts: []
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case GetConfigRoundAlarmsAction:
            return {
                ...state,
                configroundalarms: action.configroundalarms,
                isLoading: false
            };
        case GetConfigRoundAlarmAction:
            return {
                ...state,
                configroundalarm: action.configroundalarm,
                IdAlarmaRonda: action.IdAlarmaRonda,
                isLoading: false
            };
        case CreateConfigRoundAlarmAction:
            return {
                ...state,
                IdAlarmaRonda: action.IdAlarmaRonda,
                configroundalarm: action.configroundalarm,
                isLoading: false
            };
        case UpdateConfigRoundAlarmAction:
            return {
                ...state,
                IdAlarmaRonda: action.IdAlarmaRonda,
                configroundalarm: action.configroundalarm,
                isLoading: false
            };
        case DeleteConfigRoundAlarmAction:
            return {
                ...state,
                IdAlarmaRonda: action.IdAlarmaRonda,
                configroundalarm: action.configroundalarm,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case RequestConfigRoundAlarmsAction:
            return {
                ...state,
                IdAlarmaRonda: action.IdAlarmaRonda,
                configroundalarm: action.configroundalarm,
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
        case 'GET_PERIODS':
            return {
                ...state,
                isLoading: false,
                periods: action.periods
            };
        case GetContactsAction:
            return {
                ...state,
                isLoading: false,
                contacts: action.contacts
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state;
};
