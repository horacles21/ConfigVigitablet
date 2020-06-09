import * as Settings from '../store/MyConfig';
import { NullImage, defaultResponse, HandleChangeImageAction } from '../store/Utils';
import { getIncidentTypes, GetIncidentTypesAction } from '../store/IncidentType';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { GetJobTitlesAction, getJobTitles } from '../store/JobTitle';
import { defaultContrato, GetContractsAction, defaultContract, getContracts } from '../store/Contracts';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ActivitiesState {
    isLoading: boolean;
    IdActivity?: number;
    activities: Activity[];
    area: Activity;
    response: Resp;
    incidentTypes: IncidentType[];
    login: LogIn;
    IdIncidentType: number;
    fileName: string;
    jobtitles: JobTitle[];
}

export interface Activity {
    [key: string]: any
    IdActivityo: number;
    IdTipoActivityo: number;
    TipoActivityo: string;
    NombreActivityo: string;
    IdCargo: number;
    CargoActivityo: string;
    CorreoElectronico: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    IdContrato: number;
    TelefonoMovil: string;
    TelefonPrincipal: string;
    TelefonSecundario: string;
    Usuario: string;
}
*/

export const defaultActivity = {
    IdActividad: 0,
    DescActividad: '',
    CodigoActividad: '',
    ActividadCompetencia: '',
    FechaUltActualizacion: '',
    IdUsuario: 0,
    IdContrato: 0
};
/*
export interface SMS {
    [key: string]: string
    tlf: string;
    sms: string;
}
*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const RequestActivitiesAction = 'REQUEST_ActivityS';
const GetActivityAction = 'GET_Activity';
export const GetActivitiesAction = 'GET_ActivityS';
const GetActivitiesByTypeAction = 'GET__ActivityS_BY_TYPE';
const ReceiveActivitiesAction = 'RECEIVE_Activity';
const UpdateActivityAction = 'UPDATE_Activity';
const CreateActivityAction = 'CREATE_Activity';
const DeleteActivityAction = 'DELETE_Activity';
const ErrorRequestActivityAction = 'ERROR_REQUEST_Activity';
const TestAction = 'TEST';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestActivitiesAction | UpdateActivityAction | GetActivityAction | ErrorRequestActivityAction
    | CreateActivityAction | ReceiveActivitiesAction | DeleteActivityAction | GetActivitiesAction
    | GetIncidentTypesAction | GetSessionAction | GetActivitiesByTypeAction | HandleChangeImageAction
    | GetJobTitlesAction | TestAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const getActivities = () => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().Activities.IdIncidentType) {
        dispatch({ type: RequestActivitiesAction, IdActivity: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetAllActivities/`, {
           //mode: "no-cors",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const activities = await response.json();
            dispatch({ type: GetActivitiesAction, activities });
        }
        else {
            dispatch({ type: ErrorRequestActivityAction, IdActivity: 0, response });
        }
    }
    else {
        dispatch({ type: GetActivitiesAction, activities: [] });
    }
};

export const getActivitiesByContract = (IdContract) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().activities.IdIncidentType) {
        dispatch({ type: RequestActivitiesAction, IdActivity: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetConfigActivitiesByContract/${IdContract}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const activities = await response.json();
            dispatch({ type: GetActivitiesAction, activities });
        }
        else {
            dispatch({ type: ErrorRequestActivityAction, IdActivity: 0, response });
        }
    }
    else {
        dispatch({ type: GetActivitiesAction, activities: [] });
    }
};

export const actionCreators = {
    setDefault: () => ({ type: 'GET_CONTACTS_BY_TYPE', IdIncidentType: 0, activities: [] }),
    getActivities: getActivities,
    getActivitiesByContract: getActivitiesByContract,
    getActivity: IdActivity => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdActivity !== getState().activities.IdActivity) {
            dispatch({ type: RequestActivitiesAction, IdActivity: IdActivity });
            const response = await fetch(url + `api/VigitabletConfig/GetActivityById/${IdActivity}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            const area = await response.json();
            dispatch({ type: GetActivityAction, IdActivity: IdActivity, area });
            /*}).catch(reason => {
                dispatch({ type: ErrorRequestActivityAction, IdActivity: IdActivity, response: reason });
            });*/
        }
    },
    getActivitiesByIncident: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //  if (IdIncident !== getState().activities.IdActivity) {
            dispatch({ type: RequestActivitiesAction, IdActivity: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllsActivitiesByIncident/${IdIncident}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const activities = await response.json();
                dispatch({ type: GetActivitiesAction, activities });
            }
            else {
                dispatch({ type: ErrorRequestActivityAction, IdActivity: 0, response });
            }
        }
        else {
            return;
        }
        /*    }).catch(reason => {
                
            });*/
    },

    requestActivities: IdActivity => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdActivity !== getState().activities.IdActivity) {
        //        const response = await fetch(`api/VigitabletConfig/CreateActivity=${IdActivity}`)
        //        })const data = await response.json() as Promise<Activity[]>)
        //            
        //                dispatch({ type: 'RECEIVE__CONTACTS', IdActivity: IdActivity, activities: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestActivitiesAction, IdActivity: IdActivity });
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
            dispatch({ type: RequestActivitiesAction, IdActivity: 0 });
            const response = await fetch(url + "api/VigitabletConfig/CreateActivity", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdActivity = await response.json();
                objeto.IdActivity = IdActivity;
                dispatch({ type: CreateActivityAction, area: objeto, response: defaultResponse, IdActivity: IdActivity });
            }
            else {
                const IdActivity = 0;
                dispatch({ type: CreateActivityAction, area: objeto, response, IdActivity });
            }
        }
        else {
            return;
        }

    },
    update: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        objeto.IdContrato = 22;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestActivitiesAction, IdActivity: objeto.IdActivity });
            const response = await fetch(url + "api/VigitabletConfig/UpdateActivity", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateActivityAction, area: objeto, response, IdActivity: objeto.IdActivity });
            }
            else {
                dispatch({ type: UpdateActivityAction, area: objeto, response, IdActivity: objeto.IdActivity });
            }
        }
    },
    delete: (area) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestActivitiesAction, IdActivity: area.IdActivity });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigActivity/${area.IdActivity}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                dispatch({ type: DeleteActivityAction, area: defaultActivity, response, IdActivity: area.IdActivity});
            }
            else {
                dispatch({ type: DeleteActivityAction, area: defaultActivity, response, IdActivity: area.IdActivity});
            }
        }
    },
    getIncidents: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const IdContrato = 22;
            const url = Settings.default.key.url;
            dispatch({ type: RequestActivitiesAction, IdActivity: 0 });
            const response = await fetch(url + `api/VigitabletConfig/DeleteActivity}`, {
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
            dispatch({ type: RequestActivitiesAction, IdActivity: 0 });
            const data = getIncidentTypes(access_token);
            dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: data });
            /*.catch(reason => {
                    console.log('Error in GET_INCIDENT_TYPES:' + reason);
                    dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: [] });
                });*/
        }
    },
    changeImage: (file) => async (dispatch, getState) => {
        dispatch({ type: RequestActivitiesAction, IdActivity: 0 });
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
    getJobTitles: getJobTitles,
    sendSMS: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let _sms = {
                sms: objeto.MensajeSMSIncidente,
                tlf: objeto.TelefonoActivityoIncidente
            };
            const searchParams = Object.keys(_sms).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_sms[key]);

            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestActivitiesAction, IdActivity: 0 });
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
    activities: [],
    isLoading: false,
    activity: defaultActivity,
    response: defaultResponse,
    IdActivity: 0,
    incidentTypes: [],
    login: defaultLogin,
    IdIncidentType: 0,
    fileName: '',
    jobtitles: []
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestActivitiesAction:
            return {
                ...state,
                IdActivity: action.IdActivity,
                isLoading: true
            };
        case GetActivityAction:
            return {
                ...state,
                isLoading: false,
                IdActivity: action.IdActivity,
                area: action.area
            };
        case GetActivitiesAction:
            return {
                ...state,
                isLoading: false,
                activities: action.activities
            };
        case ReceiveActivitiesAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.IdActivity === state.IdActivity) {
                return {
                    ...state,
                    //IdActivity: action.IdActivity,
                    //area: action.area,
                    isLoading: false

                };
            }
            break;
        case CreateActivityAction:
            return {
                ...state,
                IdActivity: action.IdActivity,
                area: action.area,
                isLoading: false
            };
        case UpdateActivityAction:
            return {
                ...state,
                IdActivity: action.IdActivity,
                area: action.area,
                isLoading: false
            };
        case DeleteActivityAction:
            return {
                ...state,
                area: action.area,
                response: action.response,
                isLoading: false
            };
        case ErrorRequestActivityAction:
            return {
                ...state,
                response: action.response,
                IdActivity: action.IdActivity,
                //area: action.area,
                isLoading: false
            };
        //case GetActivitiesAction:
        //    return {
        //        ...state,
        //        isLoading: false,
        //      //  activities: action.activities,
        //    }
        //case 'RECEIVE_S':
        //    return {
        //        ...state,
        //        isLoading: false,
        //       // configincidents: action.configincidents,
        //    }
        case GetIncidentTypesAction:
            return {
                ...state,
                incidentTypes: action.incidentTypes,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        case GetActivitiesByTypeAction:
            return {
                ...state,
                isLoading: false,
                activities: action.activities,
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