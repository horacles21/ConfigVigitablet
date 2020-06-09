import * as Settings from '../store/MyConfig';
import { NullImage, defaultResponse, HandleChangeImageAction } from '../store/Utils';
import { getIncidentTypes, GetIncidentTypesAction } from '../store/IncidentType';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { defaultContrato, GetContractsAction, ContractsAction, defaultContract, getContracts } from '../store/Contracts';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface AreasState {
    isLoading: boolean;
    IdArea?: number;
    areas: Area[];
    area: Area;
    response: Resp;
    incidentTypes: IncidentType[];
    login: LogIn;
    IdIncidentType: number;
    fileName: string;
    jobtitles: JobTitle[];
}

export interface Area {
    [key: string]: any
    IdAreao: number;
    IdTipoAreao: number;
    TipoAreao: string;
    NombreAreao: string;
    IdCargo: number;
    CargoAreao: string;
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

export const defaultArea = {
    IdArea: 0,
    NombreArea: '',
    CodigoArea: '',
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

const RequestAreasAction = 'REQUEST_AreaS';
const GetAreaAction = 'GET_Area';
export const GetAreasAction = 'GET_AreaS';
const ReceiveAreasAction = 'RECEIVE_Area';
const UpdateAreaAction = 'UPDATE_Area';
const CreateAreaAction = 'CREATE_Area';
const DeleteAreaAction = 'DELETE_Area';
const ErrorRequestAreaAction = 'ERROR_REQUEST_Area';
const TestAction = 'TEST';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestAreasAction | UpdateAreaAction | GetAreaAction | ErrorRequestAreaAction
    | CreateAreaAction | ReceiveAreasAction | DeleteAreaAction | GetAreasAction
    | GetIncidentTypesAction | GetSessionAction | GetAreasByTypeAction | HandleChangeImageAction
    | GetJobTitlesAction | TestAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const getAreas = () => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().Areas.IdIncidentType) {
        dispatch({ type: RequestAreasAction, IdArea: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetAllAreas/`, {
           //mode: "no-cors",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const areas = await response.json();
            dispatch({ type: GetAreasAction, areas });
        }
        else {
            dispatch({ type: ErrorRequestAreaAction, IdArea: 0, response });
        }
    }
    else {
        dispatch({ type: GetAreasAction, areas: [] });
    }
};

export const getAreasByContract = (IdContract) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().areas.IdIncidentType) {
        dispatch({ type: RequestAreasAction, IdArea: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetConfigAreasByContract/${IdContract}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const areas = await response.json();
            dispatch({ type: GetAreasAction, areas });
        }
        else {
            dispatch({ type: ErrorRequestAreaAction, IdArea: 0, response });
        }
    }
    else {
        dispatch({ type: GetAreasAction, areas: [] });
    }
};

export const actionCreators = {
    setDefault: () => ({ type: 'GET_CONTACTS_BY_TYPE', IdIncidentType: 0, areas: [] }),
    getAreas: getAreas,
    getAreasByContract: getAreasByContract,
    getArea: IdArea => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdArea !== getState().areas.IdArea) {
            dispatch({ type: RequestAreasAction, IdArea: IdArea });
            const response = await fetch(url + `api/VigitabletConfig/GetAreaById/${IdArea}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            const area = await response.json();
            dispatch({ type: GetAreaAction, IdArea: IdArea, area });
            /*}).catch(reason => {
                dispatch({ type: ErrorRequestAreaAction, IdArea: IdArea, response: reason });
            });*/
        }
    },
    getAreasByIncident: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //  if (IdIncident !== getState().areas.IdArea) {
            dispatch({ type: RequestAreasAction, IdArea: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllsAreasByIncident/${IdIncident}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const areas = await response.json();
                dispatch({ type: GetAreasAction, areas });
            }
            else {
                dispatch({ type: ErrorRequestAreaAction, IdArea: 0, response });
            }
        }
        else {
            return;
        }
        /*    }).catch(reason => {
                
            });*/
    },

    requestAreas: IdArea => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdArea !== getState().areas.IdArea) {
        //        const response = await fetch(`api/VigitabletConfig/CreateArea=${IdArea}`)
        //        })const data = await response.json() as Promise<Area[]>)
        //            
        //                dispatch({ type: 'RECEIVE__CONTACTS', IdArea: IdArea, areas: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestAreasAction, IdArea: IdArea });
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
            dispatch({ type: RequestAreasAction, IdArea: 0 });
            const response = await fetch(url + "api/VigitabletConfig/CreateArea", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdArea = await response.json();
                objeto.IdArea = IdArea;
                dispatch({ type: CreateAreaAction, area: objeto, response: defaultResponse, IdArea: IdArea });
            }
            else {
                const IdArea = 0;
                dispatch({ type: CreateAreaAction, area: objeto, response, IdArea });
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
            dispatch({ type: RequestAreasAction, IdArea: objeto.IdArea });
            const response = await fetch(url + "api/VigitabletConfig/UpdateArea", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateAreaAction, area: objeto, response, IdArea: objeto.IdArea });
            }
            else {
                dispatch({ type: UpdateAreaAction, area: objeto, response, IdArea: objeto.IdArea });
            }
        }
    },
    delete: (area) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestAreasAction, IdArea: area.IdArea });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigArea/${area.IdArea}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                dispatch({ type: DeleteAreaAction, area: defaultArea, response, IdArea: area.IdArea});
            }
            else {
                dispatch({ type: DeleteAreaAction, area: defaultArea, response, IdArea: area.IdArea});
            }
        }
    },
    getIncidents: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const IdContrato = 22;
            const url = Settings.default.key.url;
            dispatch({ type: RequestAreasAction, IdArea: 0 });
            const response = await fetch(url + `api/VigitabletConfig/DeleteArea}`, {
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
            dispatch({ type: RequestAreasAction, IdArea: 0 });
            const data = getIncidentTypes(access_token);
            dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: data });
            /*.catch(reason => {
                    console.log('Error in GET_INCIDENT_TYPES:' + reason);
                    dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: [] });
                });*/
        }
    },
    changeImage: (file) => async (dispatch, getState) => {
        dispatch({ type: RequestAreasAction, IdArea: 0 });
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
                tlf: objeto.TelefonoAreaoIncidente
            };
            const searchParams = Object.keys(_sms).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_sms[key]);

            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestAreasAction, IdArea: 0 });
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
    areas: [],
    isLoading: false,
    area: defaultArea,
    response: defaultResponse,
    IdArea: 0,
    incidentTypes: [],
    login: defaultLogin,
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestAreasAction:
            return {
                ...state,
                IdArea: action.IdArea,
                isLoading: true
            };
        case GetAreaAction:
            return {
                ...state,
                isLoading: false,
                IdArea: action.IdArea,
                area: action.area
            };
        case GetAreasAction:
            return {
                ...state,
                isLoading: false,
                areas: action.areas
            };
        case ReceiveAreasAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (action.IdArea === state.IdArea) {
                return {
                    ...state,
                    //IdArea: action.IdArea,
                    //area: action.area,
                    isLoading: false

                };
            //}
            //break;
        case CreateAreaAction:
            return {
                ...state,
                IdArea: action.IdArea,
                area: action.area,
                isLoading: false
            };
        case UpdateAreaAction:
            return {
                ...state,
                IdArea: action.IdArea,
                area: action.area,
                isLoading: false
            };
        case DeleteAreaAction:
            return {
                ...state,
                area: action.area,
                response: action.response,
                isLoading: false
            };
        case ErrorRequestAreaAction:
            return {
                ...state,
                response: action.response,
                IdArea: action.IdArea,
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