import * as Settings from '../store/MyConfig';
import {  defaultResponse } from '../store/Utils';
import { getSession, GetSessionAction, defaultLogin } from '../store/Login';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface DateTypeState {
    IdDateType: number;
    DateTypes: DateType[];
    DateType: DateType;
    response: Resp;
    isLoading: boolean;
    login: LogIn;
}

export interface DateType {
    [key: string]: any
    IdTipoIncidente: number;
    DescTipoIncidente: string;
    Categoria: string;
}
*/
export const defaultDateType = {
    IdTipoIncidente: 0,
    DescTipoIncidente: '',
    Categoria: ''
};

export const GetDateTypesAction = 'GET_DATE_TYPES';
const UpdateDateTypeAction = 'UPDATE_DATE_TYPE';
const CreateDateTypeAction = 'CREATE_DATE_TYPE';
const DeleteDateTypeAction = 'DELETE_DATE_TYPE';
const ErrorRequestDateTypeAction = 'ERROR_DATE_TYPE';
const RequestDateTypesAction = 'REQUEST_DATE_TYPES';

export const getDateTypes = async (access_token) => {
    if (access_token) {
        const url = Settings.default.key.url;
        return await fetch(url + 'api/VigitabletConfig/GetDateTypes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
    }
};

/*
type KnownAction = GetSessionAction | GetDateTypesAction | ErrorRequestDateTypeAction | RequestDateTypesAction
    | CreateDateTypeAction | UpdateDateTypeAction | DeleteDateTypeAction ;
*/
export const actionCreators = {
    getSession: getSession,
    requestDateType: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestDateTypesAction, IdDateType: 0 });
            const response = await getDateTypes(access_token);
            if (response.ok) {
                const DateTypes = await response.json();
                dispatch({ type: GetDateTypesAction, DateTypes });
            }
            else {
                //console.log('Error in GET_DATE_TYPES:' + reason);
                dispatch({ type: GetDateTypesAction, DateTypes: [] });
            }
        }
    },
    create: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            //dispatch({ type: RequestDateTypesAction, IdDateType: 0 });
            const response = await fetch(url + "api/DateType/Create", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdDateType = await response.json();
                objeto.IdTipoIncidente = IdDateType;
                dispatch({ type: CreateDateTypeAction, DateType: objeto, IdDateType });
            }
            else {
                dispatch({ type: ErrorRequestDateTypeAction, response });
            }
            /* }).catch(reason => {
                 console.log('Error in Create DateType:' + reason);
                 dispatch({ type: CreateDateTypeAction, DateType: objeto, response: reason, IdDateType: 0 });
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
            //dispatch({ type: RequestDateTypesAction, IdDateType: 0 });
            const response = await fetch(url + "api/DateType/Update", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateDateTypeAction, DateType: objeto, response, IdDateType: objeto.IdTipoIncidente });
            }
            else {
                dispatch({ type: ErrorRequestDateTypeAction, response });
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
            //dispatch({ type: RequestDateTypesAction, IdDateType: 0 });
            const response = await fetch(url + "api/DateType/Delete/" + objeto.IdTipoIncidente, {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
                //body: searchParams,
            });
            if (response.ok) {

                dispatch({ type: DeleteDateTypeAction, DateType: objeto, response, IdDateType: objeto.IdTipoIncidente });
            }
            /*}).catch(reason => {
                console.log('Error in Create DateType:' + reason);
                dispatch({ type: ErrorRequestDateTypeAction, response: reason, IdDateType: objeto.IdTipoIncidente });
            });*/
        }
    }
};

const unloadedState = {
    IdDateType: 0,
    DateTypes: [],
    DateType: defaultDateType,
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
        case GetDateTypesAction:
            return {
                ...state,
                DateTypes: action.DateTypes,
                isLoading: false
            };
        case CreateDateTypeAction:
            return {
                ...state,
                isLoading: false,
                DateType: action.DateType,
                IdDateType: action.IdDateType
            };
        case UpdateDateTypeAction:
            return {
                ...state,
                isLoading: false,
                DateType: action.DateType
            };
        case DeleteDateTypeAction:
            return {
                ...state,
                isLoading: false,
                DateType: action.DateType
            };
        case RequestDateTypesAction:
            return {
                ...state,
                isLoading: true
            };
        case ErrorRequestDateTypeAction:
            return {
                ...state,
                response: action.response,
                //IdDateType: action.IdDateType,
                isLoading: false
            };
        default:
            const exhaustiveCheck = action;
    }
    return state;
};
