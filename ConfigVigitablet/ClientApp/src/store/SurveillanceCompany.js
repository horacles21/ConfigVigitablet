import * as Utils from '../store/Utils';
import { GetGuardEmployeesAction } from '../store/GuardEmployeeInfo';
import * as Settings from '../store/MyConfig';
import { defaultLogin } from '../store/Login';
import { GetJobTitlesAction, getJobTitles } from '../store/JobTitle';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface SurveillanceCompanyState {
    surveillancecompany: SurveillanceCompany;
    surveillancecompanys: SurveillanceCompany[];
    isLoading: boolean;
    mode: Utils.Mode;
    IdEmpresaVigilancia: number;
    response: Utils.Resp;
    login: Login;
    guardemployees: GuardEmployee[];
    jobtitles: JobTitle[];
}


export interface SurveillanceCompany {
    [key: string]: any
    IdEmpresaVigilancia: number;
    descEmpresaVigilancia: string;
    TelefonosEmpresaVigilancia: string;
    EmailEmpresaVigilancia: string;
    IdPais: number;
    Pais: string;
    DireccionEmpresaVigilancia: string;
    PersonaContactoEmpresaVigilancia1: string;
    PersonaContactoEmpresaVigilancia2: string;
    TelefonosPersonaContactoEmpresaVigilancia1: string;
    TelefonosPersonaContactoEmpresaVigilancia2: string;
    CorreoPersonaContactoEmpresaVigilancia1: string;
    CorreoPersonaContactoEmpresaVigilancia2: string;
    IdCargoPersonaContactoEmpresaVigilancia1: number;
    IdCargoPersonaContactoEmpresaVigilancia2: number;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;


}
*/
export const defaultSurveillanceCompany =
{
    IdEmpresaVigilancia: 0,
    descEmpresaVigilancia: '',
    TelefonosEmpresaVigilancia: '',
    EmailEmpresaVigilancia: '',
    IdPais: 1,
    Pais: '',
    DireccionEmpresaVigilancia: '',
    PersonaContactoEmpresaVigilancia1: '',
    PersonaContactoEmpresaVigilancia2: '',
    TelefonosPersonaContactoEmpresaVigilancia1: '',
    TelefonosPersonaContactoEmpresaVigilancia2: '',
    CorreoPersonaContactoEmpresaVigilancia1: '',
    CorreoPersonaContactoEmpresaVigilancia2: '',
    IdCargoPersonaContactoEmpresaVigilancia1: 0,
    IdCargoPersonaContactoEmpresaVigilancia2: 0,
    FechaUltActualizacion: '',
    IdUsuario: 0,
    Usuario: ''
};
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const ErrorGetRelationshipAction = 'ERROR_GET_RELATIONSHIPS';
const UpdateSurveillanceCompanyAction = 'UPDATE_SURVEILLANCE_COMPANY';
const CreateSurveillanceCompanyAction = 'CREATE_SURVEILLANCE_COMPANY';
export const GetSurveillanceCompanyAction = 'GET_SURVEILLANCE_COMPANY';
const UpdateSurveillanceCompanyErrorAction = 'UPDATE_SURVEILLANCE_COMPANY_ERROR';
const HandleChangeAction = 'ON_CHANGE';
const DeleteSurveillanceCompanyAction = 'DELETE_SURVEILLANCE_COMPANY';
const GetSessionAction = 'GET_SESSION';
const RequesfSurveillanceCompanyInfoAction = 'REQUEST_SURVEILLANCE_COMPANY';
const ErrorAction = 'ERROR_SURVEILLANCE_COMPANY';
export const GetSurveillanceCompanysAction = 'GET_SURVEILLANCE_COMPANYS';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = CreateSurveillanceCompanyAction | UpdateSurveillanceCompanyAction | UpdateSurveillanceCompanyErrorAction | DeleteSurveillanceCompanyAction
    | HandleChangeAction | GetSurveillanceCompanyAction | GetSessionAction | GetSurveillanceCompanyAction | GetJobTitlesAction
    | RequesfSurveillanceCompanyInfoAction | ErrorAction | GetSurveillanceCompanysAction | GetGuardEmployeesAction | Utils.SetModeAction;*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getSession: () => async (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    },
    getSurveillanceCompanys: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequesfSurveillanceCompanyInfoAction, IdEmpresaVigilancia: getState().surveillancecompany.IdEmpresaVigilancia });
            const response = await fetch(url + "api/SurveillanceCompany/GetAll", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const surveillancecompanys = await response.json();
                dispatch({ type: GetSurveillanceCompanysAction, surveillancecompanys });
            }
            else {
                dispatch({ type: ErrorAction, response });
            }
        }
        else {
            dispatch({ type: GetSurveillanceCompanysAction, surveillancecompanys: [] });
        }
    },
    getCompany: (IdEmpresaVigilancia) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            if (IdEmpresaVigilancia !== getState().surveillancecompany.IdEmpresaVigilancia) {
                const url = Settings.default.key.url;
                dispatch({ type: RequesfSurveillanceCompanyInfoAction, IdEmpresaVigilancia: IdEmpresaVigilancia });
                const response = await fetch(url + `api/SurveillanceCompany/GetById/${IdEmpresaVigilancia}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: GetSurveillanceCompanyAction, surveillancecompany: data, IdEmpresaVigilancia: IdEmpresaVigilancia });
                }
                else {

                    dispatch({ type: ErrorAction, response });
                }
            }
        }
    },
    create: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            dispatch({ type: RequesfSurveillanceCompanyInfoAction, IdEmpresaVigilancia: objeto.IdEmpresaVigilancia });
            const response = await fetch(Settings.default.key.url + "api/SurveillanceCompany/Create", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdEmpresaVigilancia = await response.json();
                objeto.IdEmpresaVigilancia = IdEmpresaVigilancia;
                dispatch({ type: CreateSurveillanceCompanyAction, surveillancecompany: objeto, IdEmpresaVigilancia });
            }
            else {

                dispatch({ type: ErrorAction, response });
            }
        }
    },
    update: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            dispatch({ type: RequesfSurveillanceCompanyInfoAction, IdEmpresaVigilancia: objeto.IdEmpresaVigilancia });
            const response = await fetch(Settings.default.key.url + "api/SurveillanceCompany/Update", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: UpdateSurveillanceCompanyAction, surveillancecompany: objeto, IdEmpresaVigilancia: objeto.IdEmpresaVigilancia });
            }
            else {
                dispatch({ type: ErrorAction, response });
            }
        }
    },
    delete: (IdEmpresaVigilancia) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = '';
            const url = Settings.default.key.url;
            dispatch({ type: RequesfSurveillanceCompanyInfoAction, IdEmpresaVigilancia: IdEmpresaVigilancia });
            const response = await fetch(url + `api/SurveillanceCompany/Delete/${IdEmpresaVigilancia}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const json = await response.json();
                dispatch({ type: DeleteSurveillanceCompanyAction, response: json });
            }
            else {
                dispatch({ type: ErrorAction, response });
            }
        }
    },
    getGuardEmployees: (IdEmpresaVigilancia) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token !== '') {
            const url = Settings.default.key.url;
            dispatch({ type: RequesfSurveillanceCompanyInfoAction, IdEmpresaVigilancia: IdEmpresaVigilancia });
            const response = await fetch(url + `api/VigitabletConfig/GetGuardEmployeeInfoByCompany/${IdEmpresaVigilancia}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const guardemployees = await response.json();
                dispatch({ type: GetGuardEmployeesAction, guardemployees });
            }
            else {
                dispatch({ type: ErrorAction, response });
            }
        }
        else {
            dispatch({ type: GetGuardEmployeesAction, guardemployees: [] });
        }
    },
    getJobTitles: getJobTitles,
    getCargos: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token !== '') {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestMaintenanceCompanyInfoAction, IdEmpresaMantenimiento: getState().maintenancecompany.IdEmpresaMantenimiento });
            const response = await fetch(url + `api/JobTitle/GetAll`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const jobtitles = await response.json();
                dispatch({ type: GetJobTitlesAction, jobtitles });
            }
            else {
                //
            }
        }
    },

};
const unloadedState = {
    surveillancecompany: defaultSurveillanceCompany,
    surveillancecompanys: [],
    isLoading: false,
    mode: Utils.Mode.Read,
    IdEmpresaVigilancia: 0,
    response: Utils.defaultResponse,
    login: defaultLogin,
    guardemployees: [],
    jobtitles: []
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequesfSurveillanceCompanyInfoAction:
            return {
                ...state,
                IdEmpresaVigilancia: action.IdEmpresaVigilancia,
                isLoading: true
            };
        case GetSurveillanceCompanyAction:
            if (action.IdEmpresaVigilancia === state.IdEmpresaVigilancia) {
                return {
                    ...state,
                    surveillancecompany: action.surveillancecompany,
                    IdEmpresaVigilancia: action.IdEmpresaVigilancia,
                    isLoading: false
                };
            }
            break;
        case CreateSurveillanceCompanyAction:
            return {
                ...state,
                surveillancecompany: action.surveillancecompany,
                isLoading: false
            };
        case UpdateSurveillanceCompanyAction:
            return {
                ...state,
                surveillancecompany: action.surveillancecompany,
                isLoading: false
            };
        case UpdateSurveillanceCompanyErrorAction:
            return {
                ...state,
                response: action.response,
                isLoading: false
            };
        case DeleteSurveillanceCompanyAction:
            return {
                ...state,
                surveillancecompany: defaultSurveillanceCompany,
                IdEmpresaVigilancia: 0,
                response: action.response,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case ErrorAction:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.response.statusText
            };
        case GetSurveillanceCompanysAction:
            return {
                ...state,
                isLoading: false,
                surveillancecompanys: action.surveillancecompanys
            };
        case GetGuardEmployeesAction:
            return {
                ...state,
                isLoading: false,
                guardemployees: action.guardemployees
            };
        case GetJobTitlesAction:
            return {
                ...state,
                isLoading: false,
                jobtitles: action.jobtitles
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state;
};
