import * as Settings from '../store/MyConfig';
import { defaultResponse } from '../store/Utils';
import { getSession, GetSessionAction, defaultLogin } from '../store/Login';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface IncidentTypeState {
    IdIncidentType: number;
    incidenttypes: IncidentType[];
    incidenttype: IncidentType;
    response: Resp;
    isLoading: boolean;
    login: LogIn;
}

export interface IncidentType {
    [key: string]: any
    IdTipoIncidente: number;
    DescTipoIncidente: string;
    Categoria: string;
}
*/
export const defaultIncidentType = {
    IdTipoIncidente: 0,
    DescTipoIncidente: '',
    Categoria: ''
};

export const GetIncidentTypesAction = 'GET_INCIDENT_TYPES';
const UpdateIncidentTypeAction = 'UPDATE_INCIDENT_TYPE';
const CreateIncidentTypeAction = 'CREATE_INCIDENT_TYPE';
const DeleteIncidentTypeAction = 'DELETE_INCIDENT_TYPE';
const ErrorRequestIncidentTypeAction = 'ERROR_INCIDENT_TYPE';
const RequestIncidentTypesAction = 'REQUEST_INCIDENT_TYPES';

export const getIncidentTypes = async (access_token) => {
    if (access_token) {
        const url = Settings.default.key.url;
        return await fetch(url + 'api/IncidentType/GetAll', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
    }
};

/*
type KnownAction = GetSessionAction | GetIncidentTypesAction | ErrorRequestIncidentTypeAction | RequestIncidentTypesAction
    | CreateIncidentTypeAction | UpdateIncidentTypeAction | DeleteIncidentTypeAction ;
*/
export const actionCreators = {
    getSession: getSession,
    getIncidentType: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestIncidentTypesAction, IdIncidentType: 0 });
            const response = await getIncidentTypes(access_token);
            if (response.ok) {
                const incidentTypes = await response.json();
                dispatch({ type: GetIncidentTypesAction, incidentTypes });
            }
            else {
                //console.log('Error in GET_INCIDENT_TYPES:' + reason);
                dispatch({ type: GetIncidentTypesAction, incidentTypes: [] });
            }
        }
        else {
            dispatch({ type: GetIncidentTypesAction, incidentTypes: [] });
        }
    },
    create: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            //dispatch({ type: RequestIncidentTypesAction, IdIncidentType: 0 });
            const response = await fetch(url + "api/IncidentType/Create", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdIncidentType = await response.json();
                objeto.IdTipoIncidente = IdIncidentType;
                dispatch({ type: CreateIncidentTypeAction, incidenttype: objeto, IdIncidentType });
            }
            else {
                dispatch({ type: ErrorRequestIncidentTypeAction, response });
            }
            /* }).catch(reason => {
                 console.log('Error in Create IncidentType:' + reason);
                 dispatch({ type: CreateIncidentTypeAction, incidenttype: objeto, response: reason, IdIncidentType: 0 });
             });*/
        }
    },
    update: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            //dispatch({ type: RequestIncidentTypesAction, IdIncidentType: 0 });
            const response = await fetch(url + "api/IncidentType/Update", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateIncidentTypeAction, incidenttype: objeto, response, IdIncidentType: objeto.IdTipoIncidente });
            }
            else {
                dispatch({ type: ErrorRequestIncidentTypeAction, response });
            }
        }
    },
    delete: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            //const searchParams = Object.keys(objeto).map((key) => {
            //    return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            //}).join('&');
            const url = Settings.default.key.url;
            //dispatch({ type: RequestIncidentTypesAction, IdIncidentType: 0 });
            const response = await fetch(url + "api/IncidentType/Delete/" + objeto.IdTipoIncidente, {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
                //body: searchParams,
            });
            if (response.ok) {

                dispatch({ type: DeleteIncidentTypeAction, incidenttype: objeto, response, IdIncidentType: objeto.IdTipoIncidente });
            }
            /*}).catch(reason => {
                console.log('Error in Create IncidentType:' + reason);
                dispatch({ type: ErrorRequestIncidentTypeAction, response: reason, IdIncidentType: objeto.IdTipoIncidente });
            });*/
        }
    }
};

const unloadedState = {
    IdIncidentType: 0,
    incidenttypes: [],
    incidenttype: defaultIncidentType,
    response: defaultResponse,
    isLoading: false,
    login: defaultLogin
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case GetSessionAction:
            return {
                ...state,
                login: action.login
            };
        case GetIncidentTypesAction:
            return {
                ...state,
                incidenttypes: action.incidentTypes,
                isLoading: false
            };
        case CreateIncidentTypeAction:
            return {
                ...state,
                isLoading: false,
                incidenttype: action.incidenttype,
                IdIncidentType: action.IdIncidentType
            };
        case UpdateIncidentTypeAction:
            return {
                ...state,
                isLoading: false,
                incidenttype: action.incidenttype
            };
        case DeleteIncidentTypeAction:
            return {
                ...state,
                isLoading: false,
                incidenttype: action.incidenttype
            };
        case RequestIncidentTypesAction:
            return {
                ...state,
                isLoading: true
            };
        case ErrorRequestIncidentTypeAction:
            return {
                ...state,
                response: action.response,
                //IdIncidentType: action.IdIncidentType,
                isLoading: false
            };
        default:
            const exhaustiveCheck = action;
    }
    return state;
};
