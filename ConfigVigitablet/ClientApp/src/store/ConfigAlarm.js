import * as Settings from '../store/MyConfig';
import { getContacts, GetContactsAction, getContactsByContract } from '../store/Contacts';
import { getGroups, GetGroupsAction, getGroupsByContract } from '../store/Group';
import * as Utils from '../store/Utils';
import { defaultLogin } from '../store/Login';
import { getPeriods } from '../store/Period';
import { GetAlarmShipmentTypesAction, getAlarmShipmentTypes } from '../store/AlarmShipmentType';
import { GetAlarmEventTypesAction, getAlarmEventTypes } from '../store/AlarmEventType';
import { GetAlarmNotificationTypesAction, getAlarmNotificationTypes } from '../store/AlarmNotificationType';
import { GetAlarmActivationTypesAction, getAlarmActivationTypes } from '../store/AlarmActivationType';
import { GetAlarmTypesAction, getAlarmTypes } from '../store/AlarmType';
import { GetAlarmCallingTypesAction, getAlarmCallingTypes } from '../store/AlarmCallingType';
import { defaultContrato, GetContractsAction, defaultContract, getContracts } from '../store/Contracts';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ConfigAlarmState {
    listdays: number[];
    IdAlarma: number;
    configalarms: ConfigAlarm[];
    login: LogIn;
    configalarm: ConfigAlarm;
    response: Utils.Resp;
    isLoading: boolean;
    periods: Period[];
    groups: Contact[];

}
export interface ConfigAlarm {
    [key: string]: any
    IdAlarma: number;
    IdPeriodo: string;
    IdContacto: number;
    Periodo: string;
    HorarioInicioAR: string;
    HorarioFinAR: string;
    CantidadEventos: number;
    IdTipoNotificacionAlarma: string;
    IdTipoEnvioAlarma: string;
    MensajeEmail: string;
    MensajeSMS: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    IdTipoEnvio: number;
    Usuario: string;
    groups: number[];
}
*/
export const defaultConfigAlarm = {
    IdAlarma: 0,
    IdContrato: 0,
    IdContacto: 0,
    //IdPeriodo: '',
    //Periodo: '',
    //HorarioInicioAR: '',
    //HorarioFinAR: '',
    CantidadEventos: 0,
    IdTipoAlarma: 0,
    IdTipoActivacionAlarma: 0,
    IdTipoEventoAlarma: 0,
    IdTipoNotificacionAlarma: 0,
    IdTipoEnvioAlarma: 0,
    IdTipoLlamadaAlarma: 0,
    MensajeEmail: '',
    MensajeSMS: '',
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 0,
    Usuario: '',
    IdTipoEnvio: 0,
    //groups: [],
    groups: [],
    contracts: [],
};
/*
export interface ConfigAlarmType {

}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const RequestConfigAlarmsAction = 'REQUEST_CONFIG_ALARM';
const GetConfigAlarmsAction = 'GET_CONFIG_ALARMS';
const GetConfigAlarmAction = 'GET_CONFIG_ALARM';
const UpdateConfigAlarmAction = 'UPDATE_CONFIG_ALARM';
const CreateConfigAlarmAction = 'CREATE_CONFIG_ALARM';
const DeleteConfigAlarmAction = 'DELETE_CONFIG_ALARM';
const GetSessionAction = 'GET_SESSION';
const GetConfigAlarmTypesAction = 'GET_CONFIG_ALARM_TYPES';
const SetModeAction = 'SET_MODE';
const ErrorResponseAction = 'ERROR_RESPONSE';
const GetConfigGroupAlarmsAction = 'GET_CONFIG_GROUP_ALARM';
const UpdateAlarmGroupsAction = 'UPDATE_ALARM_GROUPS';
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestConfigAlarmsAction | GetConfigAlarmsAction
    | GetConfigAlarmAction | UpdateConfigAlarmAction | CreateConfigAlarmAction | DeleteConfigAlarmAction
    | SetModeAction | ErrorResponseAction | GetSessionAction | PeriodsAction | GetContactsAction;
*/
/*
export interface Errors {
    [key: string]: Utils.AttrField
    //IdAlarma: Utils.AttrField,
    IdPeriodo: Utils.AttrField,
    HorarioInicioAR: Utils.AttrField,
    HorarioFinAR: Utils.AttrField,
    CantidadEventos: Utils.AttrField,
    IdTipoNotificacionAlarma: Utils.AttrField,
    IdTipoEnvioAlarma: Utils.AttrField,
    MensajeEmail: Utils.AttrField,
    MensajeSMS: Utils.AttrField,
    //FechaUltActualizacion: Utils.AttrField,
    //IdUsuario: Utils.AttrField
}*/

async function updateAlarmGroups(IdAlarma, alarmgroups, access_token) {
    if (access_token) {
        const url = Settings.default.key.url;
        const IdUsuario = Settings.default.key.user;
        const str = alarmgroups.join(',');
        const searchParams = `IdAlarma=${IdAlarma}&configalarmgroups=${str}&IdUsuario=${IdUsuario}`;
        //return({ type: RequestConfigControlPointAction, idContract: 0 });
        const response = await fetch(url + 'api/VigitabletConfig/UpdateAlarmGroups', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ok) {
            const configalarmgroups = await response.json();
            return { type: UpdateAlarmGroupsAction, configalarmgroups };
        }
        else {
            return { type: ErrorResponseAction, response };
        }
    }
}



// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getConfigAlarm: IdAlarma => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (IdAlarma !== getState().configalarm.IdAlarma) {
                dispatch({
                    type: RequestConfigAlarmsAction, IdAlarma: IdAlarma, configalarm: getState().configalarm.configalarm || defaultConfigAlarm
                });
                const response = await fetch(`api/VigitabletConfig/GetConfigAlarm/${IdAlarma}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (response.ok) {
                    const configalarm = await response.json();
                    dispatch({ type: GetConfigAlarmAction, IdAlarma, configalarm });
                }
                else {
                    dispatch({ type: GetConfigAlarmAction, IdAlarma, configalarm: defaultConfigAlarm });
                }
            }
        }
    },
    create: (objeto, configgroupalarms) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.IdContrato = getState().login.login.IdContrato || 22;
            let searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigAlarmsAction, IdAlarma: objeto.IdAlarma, configalarm: objeto });
            const response = await fetch(url + `api/VigitabletConfig/Create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdAlarma = await response.json();
                objeto.IdAlarma = IdAlarma;
                updateAlarmGroups(IdAlarma, configgroupalarms, access_token);
                dispatch({ type: CreateConfigAlarmAction, IdAlarma, configalarm: objeto, response: Utils.defaultResponse });
            }
            else {
                dispatch({ type: CreateConfigAlarmAction, IdAlarma: 0, configalarm: objeto, response });
            }
        }
    },
    update: (objeto, configgroupalarms) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.FechaUltActualizacion = Utils.Now();
            let searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            let params = {
                url: Settings.default.key.url,
                action: "api/VigitabletConfig/Update",
                method: "PUT",
                access_token: access_token,
                searchParams: searchParams
            };
            dispatch({ type: RequestConfigAlarmsAction, IdAlarma: objeto.IdAlarma, configalarm: objeto });
            const response = await Utils.exec(params);
            if (response.ok) {
                updateAlarmGroups(objeto.IdAlarma, configgroupalarms, access_token);
                dispatch({ type: UpdateConfigAlarmAction, IdAlarma: objeto.IdAlarma, configalarm: objeto, response });
            }
            else {
                dispatch({ type: UpdateConfigAlarmAction, IdAlarma: objeto.IdAlarma, configalarm: objeto, response });
            }
        }
    },

    delete: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigAlarmsAction, IdAlarma: objeto.IdAlarma, configalarm: objeto });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigAlarm/${objeto.IdAlarma}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                //const data = await response.json();
                dispatch({ type: DeleteConfigAlarmAction, IdAlarma: objeto.IdAlarma, configalarm: objeto });
            }
        }
        else {
           // dispatch({ type: DeleteConfigAlarmAction, IdAlarma: id, configalarm: defaultConfigAlarm, response });
        }
    },
    getConfigAlarms: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //const IdContract = getState().login.IdContract || 22;
            dispatch({ type: RequestConfigAlarmsAction, IdAlarma: 0, configalarm: getState().configalarm.configalarm || defaultConfigAlarm });
            const response = await fetch(url + `api/VigitabletConfig/GetAllConfigAlarm`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configalarms = await response.json();
                dispatch({ type: GetConfigAlarmsAction, configalarms });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        } else {
            dispatch({ type: GetConfigAlarmsAction, configalarms: [] });
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    },
    getConfigGroupAlarms: (IdAlarma) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigAlarmsAction, IdAlarma, configalarm: getState().configalarm.configalarm || defaultConfigAlarm });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigGroupAlarmsByAlarm/${IdAlarma}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configalarmgroups = await response.json();
                dispatch({ type: GetConfigGroupAlarmsAction, configalarmgroups });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        } else {
            dispatch({ type: GetConfigGroupAlarmsAction, configalarmgroups: [] });
        }
    },
    getPeriods: getPeriods,
    getContacts: getContacts,
    getAlarmShipmentTypes: getAlarmShipmentTypes,
    getAlarmActivationTypes: getAlarmActivationTypes,
    getAlarmNotificationTypes: getAlarmNotificationTypes,
    getAlarmCallingTypes: getAlarmCallingTypes,
    getAlarmEventTypes: getAlarmEventTypes,
    getAlarmTypes: getAlarmTypes,
    getContracts: getContracts,
    getContactsByContract: getContactsByContract,
    getGroupsByContract: getGroupsByContract,
    getGroups: getGroups,
 
};
const unloadedState = {
    listdays: Utils.defaultListDays,
    IdAlarma: 0,
    configalarms: [],
    alarmactivationtypes: [],
    alarmshipmenttypes: [],
    alarmeventtypes: [],
    alarmtypes: [],
    alarmcallingtypes: [],
    alarmnotificationtypes: [],
    login: defaultLogin,
    configalarm: defaultConfigAlarm,
    response: Utils.defaultResponse,
    isLoading: false,
    periods: [],
    groups: []
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case GetConfigAlarmsAction:
            return {
                ...state,
                configalarms: action.configalarms,
                isLoading: false
            };
        case GetConfigAlarmAction:
            return {
                ...state,
                configalarm: action.configalarm,
                IdAlarma: action.IdAlarma,
                isLoading: false
            };
        case CreateConfigAlarmAction:
            return {
                ...state,
                IdAlarma: action.IdAlarma,
                configalarm: action.configalarm,
                isLoading: false
            };
        case UpdateConfigAlarmAction:
            return {
                ...state,
                IdAlarma: action.IdAlarma,
                configalarm: action.configalarm,
                isLoading: false
            };
        case DeleteConfigAlarmAction:
            return {
                ...state,
                IdAlarma: action.IdAlarma,
                configalarm: defaultConfigAlarm,//action.configalarm,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case RequestConfigAlarmsAction:
            return {
                ...state,
                IdAlarma: action.IdAlarma,
                configalarm: action.configalarm,
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
        case GetGroupsAction:
            return {
                ...state,
                isLoading: false,
                groups: action.groups
            };
        case GetAlarmTypesAction:
            return {
                ...state,
                isLoading: false,
                alarmtypes: action.alarmtypes
            };
        case GetAlarmActivationTypesAction:
            return {
                ...state,
                isLoading: false,
                alarmactivationtypes: action.alarmactivationtypes
            };
        case GetAlarmNotificationTypesAction:
            return {
                ...state,
                isLoading: false,
                alarmnotificationtypes: action.alarmnotificationtypes
            };
        case GetAlarmEventTypesAction:
            return {
                ...state,
                isLoading: false,
                alarmeventtypes: action.alarmeventtypes
            };
        case GetAlarmCallingTypesAction:
            return {
                ...state,
                isLoading: false,
                alarmcallingtypes: action.alarmcallingtypes
            };
        case GetAlarmShipmentTypesAction:
            return {
                ...state,
                isLoading: false,
                alarmshipmenttypes: action.alarmshipmenttypes
            };
        case GetContractsAction:
            return {
                ...state,
                contracts: action.contracts
            };
        case GetConfigGroupAlarmsAction:
            return {
                ...state,
                configalarmgroups: action.configalarmgroups
            };
        case UpdateAlarmGroupsAction: 
            return {
                ...state,
                configalarmgroups: action.configalarmgroups
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state;
};
