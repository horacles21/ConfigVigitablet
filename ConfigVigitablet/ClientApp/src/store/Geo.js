import * as Settings from '../store/MyConfig';
import { NullImage, defaultResponse, HandleChangeImageAction } from '../store/Utils';
import { getIncidentTypes, GetIncidentTypesAction } from '../store/IncidentType';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { defaultContrato, GetContractsAction, ContractsAction, defaultContract, getContracts } from '../store/Contracts';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface GeosState {
    isLoading: boolean;
    IdArea?: number;
    geos: Geo[];
    area: Geo;
    response: Resp;
    incidentTypes: IncidentType[];
    login: LogIn;
    IdIncidentType: number;
    fileName: string;
    jobtitles: JobTitle[];
}

export interface Geo {
    [key: string]: any
    IdGeoo: number;
    IdTipoGeoo: number;
    TipoGeoo: string;
    NombreGeoo: string;
    IdCargo: number;
    CargoGeoo: string;
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

export const defaultGeo = {
    Id: 0,
    longitude: '',
    latitude: '',
    //FechaUltActualizacion: '',
    //IdUsuario: 0,
    //IdContrato: 0
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

const RequestGeosAction = 'REQUEST_GeoS';
const GetGeoAction = 'GET_Geo';
export const GetGeosAction = 'GET_GeoS';
const ReceiveGeosAction = 'RECEIVE_Geo';
const UpdateGeoAction = 'UPDATE_Geo';
const CreateGeoAction = 'CREATE_Geo';
const DeleteGeoAction = 'DELETE_Geo';
const ErrorRequestGeoAction = 'ERROR_REQUEST_Geo';
const TestAction = 'TEST';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestGeosAction | UpdateGeoAction | GetGeoAction | ErrorRequestGeoAction
    | CreateGeoAction | ReceiveGeosAction | DeleteGeoAction | GetGeosAction
    | GetIncidentTypesAction | GetSessionAction | GetGeosByTypeAction | HandleChangeImageAction
    | GetJobTitlesAction | TestAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const getGeos = () => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().Geos.IdIncidentType) {
        dispatch({ type: RequestGeosAction, IdGeo: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetSpatial/`, {
           //mode: "no-cors",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const geos = await response.json();
            dispatch({ type: GetGeosAction, geos });
        }
        else {
            dispatch({ type: ErrorRequestGeoAction, IdGeo: 0, response });
        }
    }
    else {
        dispatch({ type: GetGeosAction, geos: [] });
    }
};

export const getGeosByContract = (IdContract) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().geos.IdIncidentType) {
        dispatch({ type: RequestGeosAction, IdGeo: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetConfigGeosByContract/${IdContract}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const geos = await response.json();
            dispatch({ type: GetGeosAction, geos });
        }
        else {
            dispatch({ type: ErrorRequestGeoAction, IdGeo: 0, response });
        }
    }
    else {
        dispatch({ type: GetGeosAction, geos: [] });
    }
};

export const actionCreators = {
    setDefault: () => ({ type: 'GET_CONTACTS_BY_TYPE', IdIncidentType: 0, geos: [] }),
    getGeos: getGeos,
    getGeosByContract: getGeosByContract,
    getGeo: IdGeo => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdGeo !== getState().geos.IdGeo) {
            dispatch({ type: RequestGeosAction, IdGeo: IdGeo });
            const response = await fetch(url + `api/VigitabletConfig/GetGeoById/${IdGeo}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            const area = await response.json();
            dispatch({ type: GetGeoAction, IdGeo: IdGeo, area });
            /*}).catch(reason => {
                dispatch({ type: ErrorRequestGeoAction, IdGeo: IdGeo, response: reason });
            });*/
        }
    },
    getGeosByIncident: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //  if (IdIncident !== getState().geos.IdGeo) {
            dispatch({ type: RequestGeosAction, IdGeo: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllsGeosByIncident/${IdIncident}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const geos = await response.json();
                dispatch({ type: GetGeosAction, geos });
            }
            else {
                dispatch({ type: ErrorRequestGeoAction, IdGeo: 0, response });
            }
        }
        else {
            return;
        }
        /*    }).catch(reason => {
                
            });*/
    },

    requestGeos: IdGeo => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdGeo !== getState().geos.IdGeo) {
        //        const response = await fetch(`api/VigitabletConfig/CreateGeo=${IdGeo}`)
        //        })const data = await response.json() as Promise<Geo[]>)
        //            
        //                dispatch({ type: 'RECEIVE__CONTACTS', IdGeo: IdGeo, geos: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestGeosAction, IdGeo: IdGeo });
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
            dispatch({ type: RequestGeosAction, IdGeo: 0 });
            const response = await fetch(url + "api/VigitabletConfig/CreateGeo", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdGeo = await response.json();
                objeto.IdGeo = IdGeo;
                dispatch({ type: CreateGeoAction, area: objeto, response: defaultResponse, IdGeo: IdGeo });
            }
            else {
                const IdGeo = 0;
                dispatch({ type: CreateGeoAction, area: objeto, response, IdGeo });
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
            dispatch({ type: RequestGeosAction, IdGeo: objeto.IdGeo });
            const response = await fetch(url + "api/VigitabletConfig/UpdateGeo", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateGeoAction, area: objeto, response, IdGeo: objeto.IdGeo });
            }
            else {
                dispatch({ type: UpdateGeoAction, area: objeto, response, IdGeo: objeto.IdGeo });
            }
        }
    },
    delete: (area) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestGeosAction, IdGeo: area.IdGeo });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigGeo/${area.IdGeo}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                dispatch({ type: DeleteGeoAction, area: defaultGeo, response, IdGeo: area.IdGeo});
            }
            else {
                dispatch({ type: DeleteGeoAction, area: defaultGeo, response, IdGeo: area.IdGeo});
            }
        }
    },
    getIncidents: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const IdContrato = 22;
            const url = Settings.default.key.url;
            dispatch({ type: RequestGeosAction, IdGeo: 0 });
            const response = await fetch(url + `api/VigitabletConfig/DeleteGeo}`, {
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
            dispatch({ type: RequestGeosAction, IdGeo: 0 });
            const data = getIncidentTypes(access_token);
            dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: data });
            /*.catch(reason => {
                    console.log('Error in GET_INCIDENT_TYPES:' + reason);
                    dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: [] });
                });*/
        }
    },
    changeImage: (file) => async (dispatch, getState) => {
        dispatch({ type: RequestGeosAction, IdGeo: 0 });
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
    sendSMS: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let _sms = {
                sms: objeto.MensajeSMSIncidente,
                tlf: objeto.TelefonoGeooIncidente
            };
            const searchParams = Object.keys(_sms).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_sms[key]);

            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestGeosAction, IdGeo: 0 });
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
    getContracts: getContracts,
    sendWhatsApp: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        //if (access_token) {
            /*const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');*/
            //const url = Settings.default.key.url;
            //dispatch({ type: RequestGeosAction, IdGeo: 0 });
            const response = await fetch("https://eu38.chat-api.com/instance136066/sendMessage?token=6jzrwb0j8tmyqydf", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                },
                body: {
                    "phone": "79995253422",
                    "body": "WhatsApp API on chat-api.com works good"
                }
            });
            if (response.ok) {
                const IdGeo = await response.json();
                //objeto.IdGeo = IdGeo;
                //dispatch({ type: CreateGeoAction, area: objeto, response: defaultResponse, IdGeo: IdGeo });
            }
            else {
                //const IdGeo = 0;
                //dispatch({ type: CreateGeoAction, area: objeto, response, IdGeo });
            }
        /*}
        else {
            return;
        }*/

    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    geos: [],
    isLoading: false,
    area: defaultGeo,
    response: defaultResponse,
    IdGeo: 0,
    incidentTypes: [],
    login: defaultLogin,
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestGeosAction:
            return {
                ...state,
                IdGeo: action.IdGeo,
                isLoading: true
            };
        case GetGeoAction:
            return {
                ...state,
                isLoading: false,
                IdGeo: action.IdGeo,
                area: action.area
            };
        case GetGeosAction:
            return {
                ...state,
                isLoading: false,
                geos: action.geos
            };
        case ReceiveGeosAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (action.IdGeo === state.IdGeo) {
                return {
                    ...state,
                    //IdGeo: action.IdGeo,
                    //area: action.area,
                    isLoading: false

                };
            //}
            //break;
        case CreateGeoAction:
            return {
                ...state,
                IdGeo: action.IdGeo,
                area: action.area,
                isLoading: false
            };
        case UpdateGeoAction:
            return {
                ...state,
                IdGeo: action.IdGeo,
                area: action.area,
                isLoading: false
            };
        case DeleteGeoAction:
            return {
                ...state,
                area: action.area,
                response: action.response,
                isLoading: false
            };
        case ErrorRequestGeoAction:
            return {
                ...state,
                response: action.response,
                IdGeo: action.IdGeo,
                //area: action.area,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                isLoading: false,
                login: action.login
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