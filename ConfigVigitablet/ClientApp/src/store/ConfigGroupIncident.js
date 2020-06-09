import * as Settings from '../store/MyConfig';
import { RespImage, NullImage, Resp, defaultResponse, HandleChangeImageAction, Email, defaultEmail, Now } from '../store/Utils';
import { ConfigIncident, ReceiveConfigIncidentsAction } from '../store/ConfigIncident';
import { IncidentType, getIncidentTypes, GetIncidentTypesAction } from '../store/IncidentType';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { JobTitle, GetJobTitlesAction, getJobTitles } from '../store/JobTitle';
import { Contact, defaultContact, getContacts, GetContactsAction } from '../store/Contacts';
import { getGroups, GetGroupsAction, getGroupsByContract } from '../store/Group';
import { getContracts, GetContractsAction } from '../store/Contracts';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ConfigGroupIncidentsState {
    isLoading: boolean;
    IdIncident?: number;
    configgroupincidents: ConfigGroupIncident[];
    configgroupincident: ConfigGroupIncident;
    configincidents: ConfigIncident[];
    response: Resp;
    incidentTypes: IncidentType[];
    login: LogIn;
    IdIncidentType: number;
    fileName: string;
    jobtitles: JobTitle[];
    contacts: Contact[];
    idcontacts: number[];
}

export interface ConfigGroupIncident {
    [key: string]: any
    IdIncidente: number;
    IdTipoIncidente: number;
    TipoIncidente: string;
    NombreContactoIncidente: string;
    IdCargoContactoIncidente: number;
    CargoContactoIncidente: string;
    TelefonoContactoIncidente: string;
    EmailContactoIncidente: string;
    MensajeSMSIncidente: string;
    MensajeEmailIncidente: string;
    RutaImagenIncidente: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    IdContrato: number;
    contacts: number[];
    strcontacts: string;
}
*/
export const defaultConfigGroupIncident = {
    IdIncidente: 0,
    IdTipoIncidente: 0,
    TipoIncidente: '',
    NombreContactoIncidente: '',
    IdCargoContactoIncidente: 0,
    CargoContactoIncidente: '',
    TelefonoContactoIncidente: '',
    EmailContactoIncidente: '',
    MensajeSMSIncidente: '',
    MensajeEmailIncidente: '',
    RutaImagenIncidente: '',
    FechaUltActualizacion: '',
    IdUsuario: 0,
    IdContrato: 0,
    groups: [],
}
/*
export interface SMS {
    [key: string]: string
    tlf: string;
    sms: string;
}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const RequestConfigGroupIncidentsAction = 'REQUEST_CONFIG_INCIDENT_CONTACTS';
const GetConfigGroupIncidentAction = 'GET_CONFIG_INCIDENT_CONTACT';
const GetConfigGroupIncidentsAction = 'GET_CONFIG_INCIDENT_CONTACTS';
const GetConfigGroupIncidentsByTypeAction = 'GET_CONFIG_INCIDENT_CONTACTS_BY_TYPE';
const ReceiveConfigGroupIncidentsAction = 'RECEIVE_CONFIG_INCIDENT_CONTACT';
const UpdateConfigGroupIncidentAction = 'UPDATE_CONFIG_INCIDENT_CONTACT';
const CreateConfigGroupIncidentAction = 'CREATE_CONFIG_INCIDENT_CONTACT';
const DeleteConfigGroupIncidentAction = 'DELETE_CONFIG_INCIDENT_CONTACT';
const ErrorRequestConfigGroupIncidentAction = 'ERROR_REQUEST_CONFIG_INCIDENT_CONTACT';
const TestAction = 'TEST';
const UpdateGroupsIncidentsAction = 'UPDATE_GROUPS_INCIDENTS';
const GetConfigGroupsIncidentsAction = 'CONFIG_GROUPS_INCIDENTS';
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestConfigGroupIncidentsAction | UpdateConfigGroupIncidentAction | GetConfigGroupIncidentAction | ErrorRequestConfigGroupIncidentAction
    | CreateConfigGroupIncidentAction | ReceiveConfigGroupIncidentsAction | DeleteConfigGroupIncidentAction | GetConfigGroupIncidentsAction
    | ReceiveConfigIncidentsAction | GetIncidentTypesAction | GetSessionAction | GetConfigGroupIncidentsByTypeAction | HandleChangeImageAction
    | GetJobTitlesAction | TestAction | GetContactsAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

async function updateGroupsIncidents(IdIncidente, groupsincicdents, access_token) {
    if (access_token) {
        const url = Settings.default.key.url;
        const IdUsuario = Settings.default.key.user;
        const str = groupsincicdents.join(',');
        const searchParams = `IdIncidente=${IdIncidente}&configgroupsincidents=${str}&IdUsuario=${IdUsuario}`;
        //return({ type: RequestConfigControlPointAction, idContract: 0 });
        const response = await fetch(url + 'api/VigitabletConfig/UpdateGroupsIncidents', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ok) {
            const configgroupsincidents = await response.json();
            return { type: UpdateGroupsIncidentsAction, configgroupsincidents };
        }
        else {
            return { type: ErrorRequestConfigGroupIncidentAction, response };
        }
    }
}




export const actionCreators = {
    setDefault: () => ({ type: GetConfigGroupIncidentsByTypeAction, IdIncidentType: 0, configGroupIncidents: [] }),
    getConfigGroupIncidentsByType: IdIncidentType => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            if (IdIncidentType !== getState().configgroupincidents.IdIncidentType) {
                //dispatch({ type: RequestConfigIncidentContactsAction, IdIncident: 0 });
                const response = await fetch(url + `api/VigitabletConfig/GetConfigIncidentsContactsByType/${IdIncidentType}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token,
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: GetConfigGroupIncidentsByTypeAction, IdIncidentType: IdIncidentType, configgroupincidents: data });
                }
                else {
                    dispatch({ type: ErrorRequestConfigGroupIncidentAction, IdIncident: 0, response });
                }
            }
        }
    },
    getConfigGroupIncidents: () => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdIncidentType !== getState().configgroupincidents.IdIncidentType) {
            dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllConfigIncidents`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                }
            });
            if (response.ok) {
                const configgroupincidents = await response.json();
                dispatch({ type: GetConfigGroupIncidentsByTypeAction, IdIncidentType: 0, configgroupincidents });
            } else {
                dispatch({ type: ErrorRequestConfigGroupIncidentAction, IdIncident: 0, response });
            }
            //  }
        }
    },
    getConfigGroupIncidentsByContract: (idContract) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdIncidentType !== getState().configgroupincidents.IdIncidentType) {
            dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigGroupsIncidentsByContract/${idContract}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                }
            });
            if (response.ok) {
                const configgroupincidents = await response.json();
                dispatch({ type: GetConfigGroupIncidentsAction, IdIncidentType: 0, configgroupincidents });
            } else {
                dispatch({ type: ErrorRequestConfigGroupIncidentAction, IdIncident: 0, response });
            }
            //  }
        }
    },
    getConfigGroupIncident: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            if (IdIncident !== getState().configgroupincidents.IdIncident) {
                dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident });
                const response = await fetch(url + `api/VigitabletConfig/GetConfigGroupIncidentById/${IdIncident}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (response.ok) {
                    const configgroupincident = await response.json();
                    dispatch({ type: GetConfigGroupIncidentAction, IdIncident: IdIncident, configgroupincident });
                }
                else {
                    dispatch({ type: ErrorRequestConfigGroupIncidentAction, IdIncident: IdIncident, response });
                }
            }
        }
    },
    getConfigGroupsIncidentsByContract: (IdContrato) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdIncident !== getState().configgroupincidents.IdIncident) {
            //    dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: 0 });
            const response = await fetch(url + `api/VigitabletConfig/getConfigGroupsIncidentsByContract/${IdContrato}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                }
            });
            if (response.ok) {
                const configgroupsincidents = await response.json();
                dispatch({ type: GetConfigGroupsIncidentsAction, configgroupsincidents });
            }
            else {
                dispatch({ type: ErrorRequestConfigGroupIncidentAction, IdIncident: 0, response });
            }
            //}
        }
    },
    getConfigGroupIncidentsByIncident: (IdIncident) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdIncident !== getState().configgroupincidents.IdIncident) {
            //    dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigGroupIncidentsByIncident/${IdIncident}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                }
            });
            if (response.ok) {
                const configgroupsincidents = await response.json();
                dispatch({ type: GetConfigGroupsIncidentsAction, IdIncident: IdIncident, configgroupsincidents });
            }
            else {
                dispatch({ type: ErrorRequestConfigGroupIncidentAction, IdIncident: 0, response });
            }
        }
        //}
    },
    requestConfigGroupIncidents: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdIncident !== getState().configgroupincidents.IdIncident) {
        //        const response = await fetch(`api/VigitabletConfig/CreateConfigGroupIncident=${IdIncident}`)
        //        })const data = await response.json() as Promise<ConfigGroupIncident[]>)
        //            
        //                dispatch({ type: 'RECEIVE_CONFIG_INCIDENT_CONTACTS', IdIncident: IdIncident, configgroupincidents: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: IdIncident });
        //    }
        //}
    },
    create: (objeto, configgroupsincidents) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: 0 });
            const response = await fetch(url + "api/VigitabletConfig/AddConfigIncident", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
                body: searchParams,
            });
            if (response.ok) {
                const IdIncident = await response.json();
                updateGroupsIncidents(IdIncident, configgroupsincidents, access_token);
                objeto.IdIncidente = IdIncident;
                dispatch({ type: CreateConfigGroupIncidentAction, configgroupincident: objeto, IdIncident });
            }
            else {
                console.log('Error in Create ConfigGroupIncident:' + response);
                dispatch({ type: CreateConfigGroupIncidentAction, configgroupincident: objeto, response: response, IdIncident: 0 });
            }
        }
    },
    update: (objeto, configgroupsincidents) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        //objeto.IdContrato = getState().login.contracts[0].Id || 22;
        objeto.FechaUltActualizacion = Now();
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: objeto.IdIncident });
            const response = await fetch(url + "api/VigitabletConfig/UpdateConfigIncident", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
                body: searchParams
            });
            if (response.ok) {
                updateGroupsIncidents(objeto.IdIncidente, configgroupsincidents, access_token);
                dispatch({ type: UpdateConfigGroupIncidentAction, configgroupincident: objeto, IdIncident: objeto.IdIncident });
            }
            else {
                dispatch({ type: UpdateConfigGroupIncidentAction, configgroupincident: objeto, response, IdIncident: objeto.IdIncident });
            }
        }
    },
    delete: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: 0 });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigIncident/${objeto.IdIncidente}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
            });
            if (response.ok) {
                dispatch({ type: DeleteConfigGroupIncidentAction, configgroupincident: objeto });
            }
            else {
                dispatch({ type: DeleteConfigGroupIncidentAction, configgroupincident: defaultConfigGroupIncident, response, IdIncident: objeto.IdIncidente });
            }
        }
    },
    getIncidents: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const IdContrato = 22;
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: getState().configgroupincidents.IdIncident });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigGroupIncident}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token,
                },
            });
            if (response.ok) {
                const configincidents = await response.json();
                dispatch({ type: ReceiveConfigIncidentsAction, IdContrato: IdContrato, configincidents });
            }
            else {
                console.log('Error in Update:' + response);
                dispatch({ type: ReceiveConfigIncidentsAction, IdContrato: IdContrato, configincidents: [] });
            }
        }
    },
    getIncidentTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: getState().configgroupincidents.IdIncident });
            const response = await fetch(url + 'api/IncidentType/GetAll', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const incidentTypes = await response.json();
                dispatch({ type: GetIncidentTypesAction, incidentTypes });

            } else {
                console.log('Error in GET_INCIDENT_TYPES:' + response);
                dispatch({ type: GetIncidentTypesAction, incidentTypes: [] });
            }
        }
    },
    changeImage: file => async (dispatch, getState) => {
        dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: getState().configgroupincidents.IdIncident });
        const response = await fetch('api/Upload', {
            credentials: 'same-origin',
            method: 'post',
            headers: {
                'Content-Type': 'false',
                'processData': 'false'
            },
            body: file//e.target.files[0]
        });
        if (response.ok) {
            const file = await response.json();
            dispatch({ type: 'ON_CHANGE_IMAGE', file });
        }
        else {
            console.log('Error en Change Image:' + response);
            dispatch({ type: 'ON_CHANGE_IMAGE', file: NullImage });
        }
    },
    getSession: getSession,
    getJobTitles: getJobTitles,
    sendSMS: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let _sms = {
                sms: objeto.MensajeSMSIncidente,
                tlf: objeto.TelefonoContactoIncidente
            };
            const searchParams = Object.keys(_sms).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_sms[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: getState().configgroupincidents.IdIncident });
            const response = await fetch(`api/SMS?sms=${_sms.sms}&tlf=${_sms.tlf}`, {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded"
                }
                //body: 'sms=aaaaaa&tlf=04121797954',//searchParams,
            });
            //const data = await {
            dispatch({ type: 'TEST', response: response });
            /*}).catch(reason => {
                dispatch({ type: 'TEST', response: reason });
            });*/
        }
    },
    sendEmail: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let _email = defaultEmail;
            _email.CuerpoEmail = objeto.MensajeSMSIncidente;
            const searchParams = Object.keys(_email).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_email[key]);
            }).join('&');

            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigGroupIncidentsAction, IdIncident: getState().configgroupincidents.IdIncident });
            const response = await fetch(`api/Email`, {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                body: searchParams
            });
            //const data = await {
            dispatch({ type: 'TEST', response });
            /*}).catch(reason => {
                dispatch({ type: 'TEST', response: reason });
            });*/
        }
    },
    getContacts: getContacts,
    getContracts: getContracts,
    getGroups: getGroups,
    getGroupsByContract: getGroupsByContract
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    configgroupincidents: [],
    isLoading: false,
    configgroupincident: defaultConfigGroupIncident,
    response: defaultResponse,
    IdIncident: 0,
    configincidents: [],
    incidentTypes: [],
    login: defaultLogin,
    IdIncidentType: 0,
    fileName: '',
    jobtitles: [],
    contacts: [],
    idcontacts: []
};

export const reducer = (state, incomingAction) => {
    const action = incomingAction;
    switch (action.type) {
        case RequestConfigGroupIncidentsAction:
            return {
                //incidentcontact: state.incidentcontact,
                ...state,
                IdIncident: action.IdIncident,
                isLoading: true
            };
        case GetConfigGroupIncidentAction:
            return {
                ...state,
                isLoading: false
            };
        case ReceiveConfigGroupIncidentsAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.IdIncident === state.IdIncident) {
                return {
                    ...state
                    //IdIncident: action.IdIncident,
                    //configgroupincident: action.configgroupincident,
                    //isLoading: false
                };
            }
            break;
        case CreateConfigGroupIncidentAction:
            return {
                ...state,
                IdIncident: action.IdIncident,
                configgroupincident: action.configgroupincident,
                isLoading: false
            };
        case UpdateConfigGroupIncidentAction:
            return {
                ...state,
                IdIncident: action.IdIncident,
                configgroupincident: action.configgroupincident,
                isLoading: false
            };
        case DeleteConfigGroupIncidentAction:
            return {
                ...state,
                configgroupincident: action.configgroupincident,
                //response: action.response,
                isLoading: false
            };
        case ErrorRequestConfigGroupIncidentAction:
            return {
                ...state,
                response: action.response,
                IdIncident: action.IdIncident,
                //configgroupincident: action.configgroupincident,
                isLoading: false
            };
        case GetConfigGroupIncidentsAction:
            return {
                ...state,
                isLoading: false,
                configgroupincidents: action.configgroupincidents,
                IdIncident: action.IdIncident
            };
        case ReceiveConfigIncidentsAction:
            return {
                ...state,
                isLoading: false,
                configincidents: action.configincidents
            };
        case GetIncidentTypesAction:
            return {
                ...state,
                incidentTypes: action.incidentTypes,
                isLoading: false
            };
        case 'GET_SESSION':
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        case GetConfigGroupIncidentsByTypeAction:
            return {
                ...state,
                isLoading: false,
                configgroupincidents: action.configgroupincidents,
                IdIncidentType: action.IdIncidentType
            };
        case 'ON_CHANGE_IMAGE':
            return {
                ...state,
                isLoading: false,
                fileName: JSON.parse(String(action.file)).fileName
            };
        case GetJobTitlesAction:
            return {
                ...state,
                isLoading: false,
                jobtitles: action.jobtitles
            };
        case 'TEST':
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case 'GET_CONTACTS':
            return {
                ...state,
                isLoading: false,
                contacts: action.contacts
            };
        case UpdateGroupsIncidentsAction:
            return {
                ...state,
                isLoading: false,
                configgroupsincidents: action.configgroupsincidents
            };
        case GetConfigGroupsIncidentsAction:
            return {
                ...state,
                isLoading: false,
                configgroupsincidents: action.configgroupsincidents
            };
        case GetGroupsAction:
            return {
                ...state,
                isLoading: false,
                groups: action.groups
            };
        case GetContractsAction:
            return {
                ...state,
                isLoading: false,
                contracts: action.contracts
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state || unloadedState;
};