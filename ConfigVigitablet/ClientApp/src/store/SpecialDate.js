import * as Settings from '../store/MyConfig';
import { NullImage, defaultResponse, HandleChangeImageAction } from '../store/Utils';
import { getIncidentTypes, GetIncidentTypesAction } from '../store/IncidentType';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { GetJobTitlesAction, getJobTitles } from '../store/JobTitle';
import { defaultContrato, GetContractsAction, defaultContract, getContracts } from '../store/Contracts';
import * as DateType from '../store/DateType';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface SpecialDatesState {
    isLoading: boolean;
    IdFecha?: number;
    SpecialDates: SpecialDate[];
    SpecialDate: SpecialDate;
    response: Resp;
    incidentTypes: IncidentType[];
    login: LogIn;
    IdIncidentType: number;
    fileName: string;
    jobtitles: JobTitle[];
}

export interface SpecialDate {
    [key: string]: any
    IdFechao: number;
    IdTipoFechao: number;
    TipoFechao: string;
    NombreFechao: string;
    IdCargo: number;
    CargoFechao: string;
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

export const defaultSpecialDate = {
    IdFecha: 0,
    Fecha: '',
    DescFecha: '',
    IdTipoFecha: 0,
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

const RequestSpecialDatesAction = 'REQUEST_SpecialDateS';
const GetSpecialDateAction = 'GET_SpecialDate';
export const GetSpecialDatesAction = 'GET_SpecialDateS';
const GetSpecialDatesByTypeAction = 'GET__SpecialDateS_BY_TYPE';
const ReceiveSpecialDatesAction = 'RECEIVE_SpecialDate';
const UpdateSpecialDateAction = 'UPDATE_SpecialDate';
const CreateSpecialDateAction = 'CREATE_SpecialDate';
const DeleteSpecialDateAction = 'DELETE_SpecialDate';
const ErrorRequestSpecialDateAction = 'ERROR_REQUEST_SpecialDate';
const TestAction = 'TEST';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestSpecialDatesAction | UpdateSpecialDateAction | GetSpecialDateAction | ErrorRequestSpecialDateAction
    | CreateSpecialDateAction | ReceiveSpecialDatesAction | DeleteSpecialDateAction | GetSpecialDatesAction
    | GetIncidentTypesAction | GetSessionAction | GetSpecialDatesByTypeAction | HandleChangeImageAction
    | GetJobTitlesAction | TestAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const getSpecialDates = () => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().SpecialDates.IdIncidentType) {
        dispatch({ type: RequestSpecialDatesAction, IdSpecialDate: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetAllSpecialDates/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const specialdates = await response.json();
            dispatch({ type: GetSpecialDatesAction, specialdates });
        }
        else {
            dispatch({ type: ErrorRequestSpecialDateAction, IdSpecialDate: 0, response });
        }
    }
    else {
        dispatch({ type: GetSpecialDatesAction, SpecialDates: [] });
    }
};

export const getSpecialDatesByContract = (IdContract) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().SpecialDates.IdIncidentType) {
        dispatch({ type: RequestSpecialDatesAction, IdFecha: 0 });
        const response = await fetch(url + `api/VigitabletConfig/SpecialDatesByContract/${IdContract}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const SpecialDates = await response.json();
            dispatch({ type: GetSpecialDatesAction, SpecialDates });
        }
        else {
            dispatch({ type: ErrorRequestSpecialDateAction, IdFecha: 0, response });
        }
    }
    else {
        dispatch({ type: GetSpecialDatesAction, SpecialDates: [] });
    }
};

export const actionCreators = {
    setDefault: () => ({ type: 'GET_CONTACTS_BY_TYPE', IdIncidentType: 0, SpecialDates: [] }),
    getSpecialDates: getSpecialDates,
    getSpecialDatesByContract: getSpecialDatesByContract,
    getSpecialDate: IdFecha => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdFecha !== getState().SpecialDates.IdFecha) {
            dispatch({ type: RequestSpecialDatesAction, IdFecha: IdFecha });
            const response = await fetch(url + `api/VigitabletConfig/GetSpecialDateById/${IdFecha}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            const specialdate = await response.json();
            dispatch({ type: GetSpecialDateAction, IdFecha, specialdate });
            /*}).catch(reason => {
                dispatch({ type: ErrorRequestFechaAction, IdFecha: IdFecha, response: reason });
            });*/
        }
    },
    getSpecialDateByIncident: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //  if (IdIncident !== getState().SpecialDates.IdFecha) {
            dispatch({ type: RequestSpecialDatesAction, IdSpecialDate: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllsSpecialDatesByIncident/${IdIncident}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const SpecialDates = await response.json();
                dispatch({ type: GetSpecialDatesAction, SpecialDates });
            }
            else {
                dispatch({ type: ErrorRequestSpecialDateAction, IdSpecialDate: 0, response });
            }
        }
        else {
            return;
        }
        /*    }).catch(reason => {
                
            });*/
    },

    requestSpecialDates: IdFecha => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdFecha !== getState().Fechas.IdFecha) {
        //        const response = await fetch(`api/VigitabletConfig/CreateFecha=${IdFecha}`)
        //        })const data = await response.json() as Promise<Fecha[]>)
        //            
        //                dispatch({ type: 'RECEIVE__CONTACTS', IdFecha: IdFecha, Fechas: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestFechasAction, IdFecha: IdFecha });
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
            dispatch({ type: RequestSpecialDatesAction, IdFecha: 0 });
            const response = await fetch(url + "api/VigitabletConfig/CreateSpecialDate", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdFecha = await response.json();
                objeto.IdFecha = IdFecha;
                dispatch({ type: CreateSpecialDateAction, specialdate: objeto, response: defaultResponse, IdFecha });
            }
            else {
                const IdSpecialDate = 0;
                dispatch({ type: CreateSpecialDateAction, specialdate: objeto, response });
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
            dispatch({ type: RequestSpecialDatesAction, IdFecha: objeto.IdFecha });
            const response = await fetch(url + "api/VigitabletConfig/UpdateSpecialDate", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: UpdateSpecialDateAction, specialdate: objeto, response, IdFecha: objeto.IdFecha });
            }
            else {
                dispatch({ type: UpdateSpecialDateAction, specialdate: objeto, response, IdFecha: objeto.IdFecha });
            }
        }
    },
    delete: (SpecialDate) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestSpecialDatesAction, IdFecha: SpecialDate.IdFecha });
            const response = await fetch(url + `api/VigitabletConfig/DeleteSpecialDate/${SpecialDate.IdFecha}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                dispatch({ type: DeleteSpecialDateAction, specialdate: defaultSpecialDate, response, IdFecha: SpecialDate.IdFecha });
            }
            else {
                dispatch({ type: DeleteSpecialDateAction, specialdate: defaultSpecialDate, response, IdFecha: SpecialDate.IdFecha });
            }
        }
    },
    getDateTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const response = await DateType.getDateTypes(access_token);
            if (response.ok) {
                const datetypes = await response.json();
                dispatch({ type: DateType.GetDateTypesAction, datetypes });
            }
            else {

            }
        }
    },

    changeImage: (file) => async (dispatch, getState) => {
        dispatch({ type: RequestSpecialDatesAction, IdFecha: 0 });
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
                tlf: objeto.TelefonoSpecialDateoIncidente
            };
            const searchParams = Object.keys(_sms).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_sms[key]);

            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestSpecialDatesAction, IdFecha: 0 });
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
    SpecialDates: [],
    isLoading: false,
    SpecialDate: defaultSpecialDate,
    response: defaultResponse,
    IdFecha: 0,
    incidentTypes: [],
    login: defaultLogin,
    IdIncidentType: 0,
    fileName: '',
    jobtitles: []
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestSpecialDatesAction:
            return {
                ...state,
                IdFecha: action.IdFecha,
                isLoading: true
            };
        case GetSpecialDateAction:
            return {
                ...state,
                isLoading: false,
                IdFecha: action.IdFecha,
                specialdate: action.specialdate,
            };
        case GetSpecialDatesAction:
            return {
                ...state,
                isLoading: false,
                specialdates: action.specialdates,
            };
        case ReceiveSpecialDatesAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.IdFecha === state.IdFecha) {
                return {
                    ...state,
                    //IdFecha: action.IdFecha,
                    //SpecialDate: action.SpecialDate,
                    isLoading: false

                };
            }
            break;
        case CreateSpecialDateAction:
            return {
                ...state,
                IdFecha: action.IdFecha,
                specialdate: action.specialdate,
                isLoading: false
            };
        case UpdateSpecialDateAction:
            return {
                ...state,
                IdFecha: action.IdFecha,
                specialdate: action.specialdate,
                isLoading: false
            };
        case DeleteSpecialDateAction:
            return {
                ...state,
                specialdate: action.specialdate,
                response: action.response,
                isLoading: false
            };
        case ErrorRequestSpecialDateAction:
            return {
                ...state,
                response: action.response,
                IdFecha: action.IdFecha,
                //SpecialDate: action.SpecialDate,
                isLoading: false
            };
        //case GetSpecialDatesAction:
        //    return {
        //        ...state,
        //        isLoading: false,
        //      //  SpecialDates: action.SpecialDates,
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
        case GetSpecialDatesByTypeAction:
            return {
                ...state,
                isLoading: false,
                specialdates: action.specialdates,
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
        case DateType.GetDateTypesAction:
            return {
                ...state,
                datetypes: action.datetypes
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state;
};