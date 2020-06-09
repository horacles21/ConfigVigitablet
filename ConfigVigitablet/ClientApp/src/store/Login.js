import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { defaultContrato } from '../store/Contracts';
import { defaultUsuario } from '../store/Usuario';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface LogInState {
    login: Login;
    isLoading: boolean;
    response: Utils.Resp;
    user: Usuario;
    contracts: Contrato[];
}
export interface Login {
    [k: string]: string
    uname: string;
    passw: string;
    access_token: string;
    error: string;
    error_description: string;
    // logIn: Function
}*/
export const defaultLogin = {
    uname: "horaciomarmoto\\@gmail.com",
    passw: "1234",
    access_token: "",
    error: '',
    error_description: ''
};


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const GetTokenAction = 'GET_TOKEN';
export const GetSessionAction = 'GET_SESSION';
const RequestLoginAction = 'REQUEST_LOGIN';
const ErrorRequestLoginAction = 'ERROR_REQUEST_LOGIN';
const GetUserAction = 'GET_USER';
const GetContractsAction = 'GET_CONTRACTS';
export const GetContractAction = 'GET_CONTRACT';

//
// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
//type KnownAction = GetTokenAction | RequestLoginAction | ErrorRequestLoginAction | GetUserAction | GetContractsAction;

export const getSession = () => (dispatch, getState) => {
    dispatch({
        type: GetSessionAction,
        login: getState().login.login
    });
};

export const getContract = () => async (dispatch, getState) => {
    dispatch({
        type: GetContractAction,
        contract: getState().login.contracts.find(x => x.IdPais === 1) || defaultContrato
    });
};
export const requestSettings = () => async (dispatch, getState) => {
    try {
        /*if (startDateIndex === getState().settings.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }*/

        //dispatch({ type: requestSettingsType, startDateIndex });
        const url = `settings/Setting/GetUrl`;
        const response = await fetch(url);
        const settings = await response.json();
        Settings.default.key.url = settings;
    } catch (reason) {
        console.log("Error en rquessettings:" + reason);
    }

    //dispatch({ type: receiveSettingsType, settings });
};

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestSettings: requestSettings,
    getToken: form => async (dispatch, getState) => {
        try {
            // const _token = defaultLogin;//{ uname: "", passw: "", access_token: "" };
            const searchParams = "grant_type=password&username=" + encodeURIComponent(form.uname) + "&password=" + form.passw;
            const url = Settings.default.key.url;
            dispatch({ type: RequestLoginAction });
            const response = await fetch(`${url}token`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                body: searchParams
            });
            if (response.ok) {
                const data = await response.json();
                const login = {
                    ...getState().login.login,
                    uname: form.uname,
                    passw: form.passw,
                    access_token: data.access_token
                };
                dispatch({ type: GetTokenAction, login });
            }
            else {
                dispatch({ type: ErrorRequestLoginAction, response });
            }
        } catch (reason) {
            console.log(reason);
            dispatch({ type: ErrorRequestLoginAction, response: reason });
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
        //getState().login.login.access_token ? history.push();
    },
    getUserbyEmail: () => async (dispatch, getState) => {
        if (getState().login.login.access_token !== '') {
            const url = Settings.default.key.url;
            const email = encodeURIComponent(getState().login.login.uname);//.replace('\\','');  'horaciomarmoto';// 
            const access_token = getState().login.login.access_token;
            dispatch({ type: RequestLoginAction });
            const response = await fetch(url + `api/User/GetUserByEmail/${email.substring(0, 10)}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const user = await response.json();
                /*dispatch({
                    type: GetUserAction,
                    //contracts,
                    user
                });*/
                Settings.default.key.user = user;

                const IdUser = user.Id;
                const responseUser = await fetch(url + `api/Contract/GetAllbyUserId/${IdUser}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (responseUser.ok) {
                    const contracts = await responseUser.json();
                    dispatch({
                        type: GetUserAction,
                        contracts,
                        user
                    });
                }
                else {
                    dispatch({ type: ErrorRequestLoginAction, response: responseUser });
                }
            }
            else {
                dispatch({ type: ErrorRequestLoginAction, response });
            }
        }
    },

    getContratoByUser: () => async (dispatch, getState) => {
        //if (getState().login.login.access_token != '') {
        const url = Settings.default.key.url;
        const access_token = getState().login.login.access_token;
        const IdUser = getState().login.user.Id;
        dispatch({ type: RequestLoginAction });
        const response = await fetch(url + `api/Contract/GetAllbyUserId/${IdUser}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const contracts = await response.json();
            dispatch({ type: GetContractsAction, contracts });
        }
        else {
            dispatch({ type: ErrorRequestLoginAction, response });

        }
    },
    getIP: async () => {
        const response = await fetch('https://api.ipify.org?format=json');
        if (response.ok) {
            const ip= response.json();
        }
    }
};
const unloadedState = {
    login: defaultLogin,
    isLoading: false,
    response: Utils.Resp,
    user: defaultUsuario,
    contracts: []
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    switch (action.type) {
        case GetTokenAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case RequestLoginAction:
            return {

                ...state,
                isLoading: true
            };
        case ErrorRequestLoginAction:
            return {
                ...state,
                response: action.response,
                isLoading: false
            };
        case GetUserAction:
            return {
                ...state,
                isLoading: false,
                contracts: action.contracts,
                user: action.user
            };
        case GetContractsAction:
            return {
                ...state,
                isLoading: false,
                contracts: action.contracts

            };
        default:
        // The following line guarantees that every action in the KnownAction union has been covered by a case above
        //const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};

