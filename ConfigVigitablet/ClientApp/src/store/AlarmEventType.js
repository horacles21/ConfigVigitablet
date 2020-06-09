import * as Settings from '../store/MyConfig';
import { defaultResponse } from '../store/Utils';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { defaultContrato, GetContractsAction, defaultContract, getContracts } from '../store/Contracts';

export const defaultAlarmEventType = {
    IdTipoEventoAlarma: 0,
    TipoEventoAlarma: '',
    //FechaUltActualizacion: '',
    //IdUsuario: 0,
    //IdContrato: 0
};

const RequestAlarmEventTypesAction = 'REQUEST_AlarmEventTypeS';
const GetAlarmEventTypeAction = 'GET_AlarmEventType';
export const GetAlarmEventTypesAction = 'GET_ALARM_EVENT_TYPES';
const GetAlarmEventTypesByTypeAction = 'GET__AlarmEventTypeS_BY_TYPE';
const ReceiveAlarmEventTypesAction = 'RECEIVE_AlarmEventType';
const UpdateAlarmEventTypeAction = 'UPDATE_AlarmEventType';
const CreateAlarmEventTypeAction = 'CREATE_AlarmEventType';
const DeleteAlarmEventTypeAction = 'DELETE_AlarmEventType';
const ErrorRequestAlarmEventTypeAction = 'ERROR_REQUEST_AlarmEventType';
const TestAction = 'TEST';

export const getAlarmEventTypes = () => async (dispatch, getState) => {//(access_token: string): GetAlarmEventTypesAction | void => {
    const access_token = getState().login.login.access_token;
    if (access_token !== '') {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/VigitabletConfig/GetAlarmEventTypes`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const alarmeventtypes = await response.json();
            dispatch({ type: GetAlarmEventTypesAction, alarmeventtypes });
        }
        else {
            dispatch({ type: GetAlarmEventTypesAction, alarmeventtypes: [] });
        }
    }
    else {
        dispatch({ type: GetAlarmEventTypesAction, alarmeventtypes: [] });
    }
};


export const actionCreators = {
    setDefault: () => ({ type: 'GET_CONTACTS_BY_TYPE', IdAlarmEventType: 0, eventtypes: [] }),
    getAlarmEventTypes: getAlarmEventTypes,
    getAlarmEventType: IdAlarmEventType => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdGroup !== getState().eventtypes.IdGroup) {
            dispatch({ type: RequestAlarmEventTypesAction, IdAlarmEventType: IdAlarmEventType });
            const response = await fetch(url + `api/VigitabletConfig/GetAlarmEventTypeById/${IdAlarmEventType}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const alarmeventtype = await response.json();
                dispatch({ type: GetAlarmEventTypeAction, IdAlarmEventType: IdAlarmEventType, alarmeventtype });
            }
            else {
                dispatch({ type: ErrorRequestAlarmEventTypeAction, IdAlarmEventType: IdAlarmEventType, response });
            }
        }
    },
    getAlarmEventTypesByIncident: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //  if (IdIncident !== getState().eventtypes.IdGroup) {
            dispatch({ type: RequestAlarmEventTypesAction, IdAlarmEventType: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllsAlarmEventTypesByIncident/${IdIncident}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const eventtypes = await response.json();
                dispatch({ type: GetAlarmEventTypesAction, eventtypes });
            }
            else {
                dispatch({ type: ErrorRequestAlarmEventTypeAction, IdAlarmEventType: 0, response });
            }
        }
        else {
            return;
        }
        /*    }).catch(reason => {
                
            });*/
    },

    requestAlarmEventTypes: IdAlarmEventType => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdGroup !== getState().eventtypes.IdGroup) {
        //        const response = await fetch(`api/VigitabletConfig/CreateGroup=${IdGroup}`)
        //        })const data = await response.json() as Promise<AlarmEventType[]>)
        //            
        //                dispatch({ type: 'RECEIVE__CONTACTS', IdGroup: IdGroup, eventtypes: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestAlarmEventTypesAction, IdGroup: IdGroup });
        //    }
        //}
    },
    create: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestAlarmEventTypesAction, IdAlarmEventType: 0 });
            const response = await fetch(url + "api/VigitabletConfig/AddConfigAlarmEventType", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdAlarmEventType = await response.json();
                objeto.IdTipoEventoAlarma = IdAlarmEventType;
                dispatch({ type: CreateAlarmEventTypeAction, alarmeventtype: objeto, response, IdAlarmEventType: IdAlarmEventType });
            }
            else {
                const IdAlarmEventType = 0;
                dispatch({ type: CreateAlarmEventTypeAction, alarmeventtype: objeto, response, IdAlarmEventType });
            }
        }
        else {
            return;
        }

    },
    update: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestAlarmEventTypesAction, IdAlarmEventType: objeto.IdAlarmEventType });
            const response = await fetch(url + "api/VigitabletConfig/UpdateConfigAlarmEventType", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateAlarmEventTypeAction, alarmeventtype: objeto, IdAlarmEventType: objeto.IdTipoEventoAlarma });
            } else {
                dispatch({ type: UpdateAlarmEventTypeAction, alarmeventtype: objeto, response, IdAlarmEventType: objeto.IdTipoEventoAlarma });
            }
        }
    },
    delete: (alarmeventtype) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestAlarmEventTypesAction, IdAlarmEventType: alarmeventtype.IdTipoEventoAlarma });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigAlarmEventType/${alarmeventtype.IdTipoEventoAlarma}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            //const data = await {
            if (response.ok) {
                dispatch({ type: DeleteAlarmEventTypeAction, alarmeventtype, IdAlarmEventType: alarmeventtype.IdAlarmEventType });
            }else {
                dispatch({ type: DeleteAlarmEventTypeAction, alarmeventtype: defaultAlarmEventType, response, IdAlarmEventType: alarmeventtype.IdAlarmEventType });
            }
        }
    },
    getIncidents: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const IdContrato = 22;
            const url = Settings.default.key.url;
            dispatch({ type: RequestAlarmEventTypesAction, IdAlarmEventType: 0 });
            const response = await fetch(url + `api/VigitabletConfig/DeleteAlarmEventType}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            const data = await response.json();
            dispatch({ type: 'RECEIVE_S', IdContrato: IdContrato, configincidents: data });
            /* }).catch(reason => {
                 console.log('Error in Update:' + reason);
                 //   dispatch({ type: 'RECEIVE_S', IdContrato: IdContrato, configincidents: [] });
             }*/
        }
    },
    getIncidentTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestAlarmEventTypesAction, IdAlarmEventType: 0 });
            const data = '';//getIncidentTypes(access_token);
            dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: data });
            /*.catch(reason => {
                    console.log('Error in GET_INCIDENT_TYPES:' + reason);
                    dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: [] });
                });*/
        }
    },
    changeImage: (file) => async (dispatch, getState) => {
        dispatch({ type: RequestAlarmEventTypesAction, IdGroup: 0 });
        const response = await fetch('api/Upload', {
            credentials: 'same-origin',
            method: 'post',
            headers: {
                'Content-Type': 'false',
                'processData': 'false'
            },
            body: file//e.target.files[0]
        });
        const data = await response.json();
        dispatch({ type: 'ON_CHANGE_IMAGE', file: data });
        /*}).catch(reason => {
            console.log('Error en Change Image:' + reason);
            dispatch({ type: 'ON_CHANGE_IMAGE', file: NullImage });
        });*/
    },
    getSession: getSession,
    //getJobTitles: getJobTitles,
    sendSMS: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let _sms = {
                sms: objeto.MensajeSMSIncidente,
                tlf: objeto.TelefonoGroupoIncidente
            };
            const searchParams = Object.keys(_sms).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_sms[key]);

            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestAlarmEventTypesAction, IdGroup: 0 });
            const response = await fetch(`api/SMS?sms=${_sms.sms}&tlf=${_sms.tlf}`, {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            });
            //const data = await {
            dispatch({ type: 'TEST', response });
            /*}).catch(reason => {
                dispatch({ type: 'TEST', response: reason });
            });*/
        }
    },
    getContracts: getContracts
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    eventtypes: [],
    isLoading: false,
    alarmeventtype: defaultAlarmEventType,
    response: defaultResponse,
    IdAlarmEventType: 0,
    incidentTypes: [],
    login: defaultLogin,
    fileName: '',
    jobtitles: []
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestAlarmEventTypesAction:
            return {
                ...state,
                IdAlarmEventType: action.IdAlarmEventType,
                isLoading: true
            };
        case GetAlarmEventTypeAction:
            return {
                ...state,
                isLoading: false,
                IdAlarmEventType: action.IdAlarmEventType,
                alarmeventtype: action.alarmeventtype
            };
        case GetAlarmEventTypesAction:
            return {
                ...state,
                isLoading: false,
                alarmeventtypes: action.alarmeventtypes
            };
        case ReceiveAlarmEventTypesAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.IdAlarmEventType === state.IdAlarmEventType) {
                return {
                    ...state,
                    //IdAlarmEventType: action.IdAlarmEventType,
                    //alarmeventtype: action.alarmeventtype,
                    isLoading: false

                };
            }
            break;
        case CreateAlarmEventTypeAction:
            return {
                ...state,
                IdAlarmEventType: action.IdAlarmEventType,
                alarmeventtype: action.alarmeventtype,
                isLoading: false
            };
        case UpdateAlarmEventTypeAction:
            return {
                ...state,
                IdAlarmEventType: action.IdAlarmEventType,
                alarmeventtype: action.alarmeventtype,
                isLoading: false
            };
        case DeleteAlarmEventTypeAction:
            return {
                ...state,
                alarmeventtype: action.alarmeventtype,
                IdAlarmEventType: action.IdAlarmEventType,
                //response: action.response,
                isLoading: false
            };
        case ErrorRequestAlarmEventTypeAction:
            return {
                ...state,
                response: action.response,
                IdAlarmEventType: action.IdAlarmEventType,
                //alarmeventtype: action.alarmeventtype,
                isLoading: false
            };
        //case GetAlarmEventTypesAction:
        //    return {
        //        ...state,
        //        isLoading: false,
        //      //  eventtypes: action.eventtypes,
        //    }
        //case 'RECEIVE_S':
        //    return {
        //        ...state,
        //        isLoading: false,
        //       // configincidents: action.configincidents,
        //    }
        case GetSessionAction:
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        case GetAlarmEventTypesByTypeAction:
            return {
                ...state,
                isLoading: false,
                eventtypes: action.eventtypes,
                IdAlarmEventType: action.IdAlarmEventType
            };
        case 'ON_CHANGE_IMAGE':

            return {
                ...state,
                isLoading: false,
                fileName: JSON.parse(String(action.file)).fileName
            };
        case 'TEST':
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case GetContractsAction:
            return {
                ...state,
                contracts: action.contracts
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state;
};


