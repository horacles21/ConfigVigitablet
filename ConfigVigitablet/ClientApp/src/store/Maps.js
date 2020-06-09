import * as Settings from '../store/MyConfig';
import { Now, Mode, defaultResponse } from '../store/Utils';
import { defaultLogin, getSession, GetSessionAction } from '../store/Login';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface MapState {
    isLoading: boolean;
    idContract: number;
    lng: number;
    lat: number;
    //createMode: boolean;
    response: Resp;
    mode: Mode;
    login: LogIn,

}
export interface SpatialTableModel {
    //[key: string]: any
    //ID: number;
    latitude: string; 
    longitude: string;
}
export interface ConfigCall {
    [key: string]: any
    IdContrato: number;
    Contrato: string;
    idVigitabletTipoLLamadas: number;
    VigitabletTipoLlamada: string;
    TelefonoContactoVT: string;
    PersonaContactoVT: string;
    CargoPersonaContactoVT: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}*/
/*
interface ConfigCallType {
    [key: string]: any
    IdVigitabletTipoLlamadas: number;
    DescVigitabletTipoLlamadas: string;
}
*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const RequestConfigCallsAction = 'REQUEST_CONFIGCALL';
const GetConfigCallsAction = 'GET_CONFIGCALLS';
const GetSpatialtableAction = 'GET_SPATIAL_TABLE';
const ReceiveConfigCallsAction = 'RECEIVE_CONFIGCALL';
const UpdateConfigCallAction = 'UPDATE_CONFIGCALL';
const CreateConfigCallAction = 'CREATE_CONFIGCALL';
const DeleteConfigCallAction = 'DELETE_CONFIGCALL';
const ChangeAction = 'CHANGE';
const StartAction = 'START';
const StartAction_ = 'START_';
const GetConfigCallTypesAction = 'GET_CONFIGCALL_TYPES';
const SetModeAction = 'SET_MODE';
const ErrorResponseAction = 'ERROR_RESPONSE';
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestConfigCallsAction | ReceiveConfigCallsAction | GetSessionAction | GetConfigCallTypesAction | ErrorResponseAction
    | UpdateConfigCallAction | CreateConfigCallAction | DeleteConfigCallAction | GetConfigCallsAction | SetModeAction | ChangeAction | StartAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
/*
export interface paramsCommand {
    action: string, method: string, access_token: string, searchParams: string,
}
*/
export const exec = async (params) => {
    let url = Settings.default.key.url;
    return await fetch(url + params.action, {
        method: params.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + params.access_token
        },
        body: params.searchParams
    });
    /*}).catch(function (ex) {
        console.log('Error en exec:' + ex);
        return ex
    });*/
}
export const actionCreators = {
    start: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let url = Settings.default.key.url;
            //dispatch({ type: 'REQUEST_CONFIGCALL', IdContract: 22 });
            const response = await fetch(url + `api/VigitabletConfig/GetLastSpatialTable`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token,
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data != null) {
                    if (data.length && data.length > 0) {
                        dispatch({
                            type: 'START_',
                            markers: data,
                        });
                    } else {
                        dispatch({
                            type: 'START_',
                            markers: [ data ]
                        });
                        /*dispatch({
                            type: StartAction,
                            lat: data[0].latitude,
                            lng: data[0].longitude,
                        });*/
                    }
                }
                else {
                    dispatch({
                        type: StartAction,
                        lat: 10.496,
                        lng: -66.8535,
                    });
                }
            } else {
                console.log('Error in Maps.start:' + response);
                dispatch({
                    type: StartAction,
                    lat: 10.496,
                    lng: -66.8535,
                });
                //dispatch({ type: 'CREATE_CONFIGCALL', configcall: null, response: reason });
            }
        }
    },
    change: () => async (dispatch, getState) => {

        const access_token = getState().login.login.access_token;
        if (access_token) {
            //dispatch({ type: 'REQUEST_CONFIGCALL', IdContract: 22 });
            const response = await fetch(`api/VigitabletConfig/GetLastSpatialTable`)
            if (response.ok) {
                const data = await response.json();
                dispatch({
                    type: 'CHANGE',
                    lat: data.latitude,
                    lng: data.longitude,
                });

            } else {
                console.log('Error in create:' + response);
                dispatch({
                    type: StartAction,
                    lat: 10.496,
                    lng: -66.8535,
                });
                //dispatch({ type: 'CREATE_CONFIGCALL', configcall: null, response: reason });
            }



        }
    },
    getSession: getSession
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    lng: 10.644,
    lat: -34.397,
    markers: [],
    response: defaultResponse,
    login: defaultLogin
};

export const reducer = (state, incomingAction) => {
    const action = incomingAction;
    switch (action.type) {
        case GetSessionAction:
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        case 'ERROR_RESPONSE':
            return {
                ...state,
                response: action.response,
                isLoading: false
            };
        case 'CHANGE':
            return {
                ...state,
                lat: action.lat,
                lng: action.lng
            };
        case StartAction:
            return {
                ...state,
                lat: Number(action.lat),
                lng: Number(action.lng),
                isLoading: false
            };
        default:
        case 'START_':
            return {
                ...state,
                markers: action.markers,
                isLoading: false
            };

            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }
    return state || unloadedState;
};
