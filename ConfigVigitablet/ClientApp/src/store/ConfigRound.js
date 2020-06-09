import * as Settings from '../store/MyConfig';
import { ConfigControlPoint, GetAllConfigControlPoints, GetConfigControlPointsByContract, ReceiveConfigControlPointAction, RequestConfigControlPointAction } from '../store/ConfigControlPoint';
import * as Utils from '../store/Utils';
import { defaultLogin, getContract, getSession } from '../store/Login';
import { defaultContrato, GetContractsAction, defaultContract, getContracts, ContractsAction } from '../store/Contracts';
import { GetJobActionTypes, ReceiveJobActionTypeAction, RequestJobActionTypeAction } from '../store/JobActionType';
import { getSpecialDates, getSpecialDatesByContract, GetSpecialDatesAction } from '../store/SpecialDate';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export const ConfigRoundsState = {
    isLoading: boolean;
    IdRonda?: number;
    configrounds: ConfigRound[];
    configround: ConfigRound;
    login: Login;
    response: Utils.Resp;
    configcontrolpoints: [];
    jobs: Job[];
    news: News[];
    idContract: number;
    noticetypes: NoticeType[];
    advicetypes: AdviceType[];
    configroundcontrolpoints: ConfigRoundControlPoint[];
    contract: Contrato;

}*/
/*export interface Job {
    [key: string]: any
    IdTarea: number;
    DescTarea: string;

}
export interface News {
    [key: string]: any
    IdNovedad: number;
    DescNovedad: string;

}*/

/*export interface ConfigRound {
    [key: string]: any
    IdRonda: number;
    DescRonda: string;
    IdContrato: number;
    Contrato: string;
    IdTipoRonda: string;
    TipoRonda: string;
    RondaFija: boolean;
    DiasSemanasRonda: string;
    HoraInicioRonda: string;
    HoraFinRonda: string;
    IntervaloRonda: number;
    VariariacionAleatoriaRonda: number;
    MargenToleranciaRonda: number;
    IdTipoAviso: number;
    TipoAviso: string;
    CantidadPuntos: number;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
    controlpoints: number[];
    OrdenAleatorio: boolean;
    ValidarPresencia: boolean;
    TipoValidacion: number;
}*/
export const defaultConfigRound = {
    IdRonda: 0,
    DescRonda: '',
    IdContrato: 0,
    Contrato: '',
    IdTipoRonda: 0,
    TipoRonda: '',
    RondaFija: false,
    DiasSemanasRonda: '',
    HoraInicioRonda: '',
    HoraFinRonda: '',
    IntervaloRonda: 0,
    VariariacionAleatoriaRonda: 0,
    MargenToleranciaRonda: 0,
    IdTipoAviso: 0,
    TipoAviso: '',
    CantidadPuntos: 0,
    FechaUltActualizacion: '',
    IdUsuario: 0,
    Usuario: '',
    controlpoints: [],
    OrdenAleatorio: true,
    ValidarPresencia: false,
    TipoValidacion: 0,
    ConfigRoundTareas: '',
    ConfigRondasTareas: [],
    configroundjobs: '',
    ConfigRoundNovedades: '',
    Prioridad: 0
};
/*
export interface ConfigRoundControlPoint {
    [key: string]: any
    IdRonda: number;
    IdPuntoControl: number;
    OrdenRonda: number;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}*/
export const defaultConfigRoundControlPoint = {
    IdRonda: 0,
    IdpuntoControl: 0,
    OrdenRonda: 0,
    FechaUltActualizacion: '',
    IdUsuario: 0,
    Usuario: ''
};
//api / NoticeType /GetAll
/*export interface NoticeType {
    [key: string]: any
    IdTipoAnuncio: number;
    DescTipoAnuncio: string;
}
export interface AdviceType {
    [key: string]: any
    IdTipoAviso: number;
    DescTipoAviso: string;
}*/

/*export interface AttrField {
    [key: string]: any
    errorMessage: string, isRequired: boolean, valid: boolean, isEmpty: boolean,
    }
 
export interface Errors {
    [key: string]: AttrField
    IdRonda: AttrField;
    DescRonda: AttrField;
    IdContrato: AttrField;
    IdTipoRonda: AttrField;
    RondaFija: AttrField;
    DiasSemanasRonda: AttrField;
    HoraInicioRonda: AttrField;
    HoraFinRonda: AttrField;
    IntervaloRonda: AttrField;
    VariariacionAleatoriaRonda: AttrField;
    MargenToleranciaRonda: AttrField;
    IdTipoAviso: AttrField;
    CantidadPuntos: AttrField;
    FechaUltActualizacion: AttrField;
    IdUsuario: AttrField;
}*/
/*export interface Toched {
    [key: string]: boolean
    IdRonda: boolean;
    DescRonda: boolean;
    IdContrato: boolean;
    IdTipoRonda: boolean;
    RondaFija: boolean;
    DiasSemanasRonda: boolean;
    HoraInicioRonda: boolean;
    HoraFinRonda: boolean;
    IntervaloRonda: boolean;
    VariariacionAleatoriaRonda: boolean;
    MargenToleranciaRonda: boolean;
    IdTipoAviso: boolean;
    CantidadPuntos: boolean;
    FechaUltActualizacion: boolean;
    IdUsuario: boolean;
}*/

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
const RequestConfigRoundsAction = 'REQUEST_CONFIG_ROUNDS';
const ReceiveConfigRoundsAction = 'RECEIVE_CONFIG_ROUNDS';
const RequestConfigRoundAction = 'GET_CONFIG_ROUND';
const UpdateConfigRoundAction = 'UPDATE_CONFIG_ROUND';
const CreateConfigRoundAction = 'CREATE_CONFIG_ROUND';
const DeleteConfigRoundAction = 'DELETE_CONFIG_ROUND';
const GetSessionAction = 'GET_SESSION';
const GetJobsAction = 'GET_JOBS';
const GetNewsAction = 'GET_NEWS';
const ErrorResponseAction = 'ERROR_RESPONSE';
const GetNoticeTypesAction = 'GET_NOTICETYPES';
const GetAdviceTypesAction = 'GET_ADVICETYPES';
const GetConfigRoundControlPointsAction = 'GET_CONFIG_ROUND_CONTROL_POINTS';
const GetConfigRoundJobs = 'GET_CONFIG_ROUND_JOBS';
const GetValidationTypes = 'GET_Validation_Types';
//TYPE: 'ERROR_CREATE_CONFIG_ROUND';


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestConfigRoundsAction | ReceiveConfigRoundsAction | RequestConfigRoundAction
    | CreateConfigRoundAction | UpdateConfigRoundAction | GetSessionAction | GetNoticeTypesAction
    | GetJobsAction | GetNewsAction | ErrorResponseAction | DeleteConfigRoundAction | GetAdviceTypesAction
    | ReceiveConfigControlPointAction | RequestConfigControlPointAction
    | GetConfigRoundControlPointsAction
    | GetContractAction;*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
async function updateConfigRoundJobs(IdRound, configroundjobs, access_token) {
    if (access_token) {
        const url = Settings.default.key.url;
        const IdUsuario = Settings.default.key.user;
        const str = configroundjobs.join(',');
        const searchParams = `IdRonda=${IdRound}&configroundjobs=${str}&IdUsuario=${IdUsuario}`;
        //return({ type: RequestConfigControlPointAction, idContract: 0 });
        const response = await fetch(url + 'api/VigitabletConfig/UpdateConfigRoundJobs', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ok) {
            configroundjobs = await response.json();
            return { type: 'UPDATE_CONFIG_ROUND_JOBS', configroundjobs/*, response*/ };
        }
        else {
            return/*dispatch*/({ type: 'ERROR_RESPONSE', response });
        }
    }
}


export const actionCreators = {
    requestRounds: IdRonda => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            if (IdRonda !== getState().configrounds.IdRonda) {
                dispatch({ type: RequestConfigRoundsAction, IdRonda: IdRonda });
                const response = await fetch(`api/SampleData/WeatherForecasts?IdRonda=${IdRonda}`);
                const data = await response.json();

                dispatch({ type: ReceiveConfigRoundsAction, idContract: IdRonda, configrounds: data });


            }
        }
    },
    create: (objeto, controlpoints, ordenpuntos, configroundjobs) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.controlpoints = [];
            objeto.configroundjobs = configroundjobs;
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: objeto.IdRonda || 0 });
            const response = await fetch(url + "api/VigitabletConfig/CreateConfigRound", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdRonda = await response.json();
                objeto.IdRonda = IdRonda;
                objeto.ConfigRoundTareas = configroundjobs.join(',');
                updateConfigRoundJobs(IdRonda, configroundjobs, access_token);
                //updateConfigControlPointNews(IdRonda, configcontrolpointnews, access_token);
                objeto.controlpoints = controlpoints;
                const strControlpoints = controlpoints.map((controlpoint, key) => {
                    return encodeURIComponent(controlpoint.toString()); /*+ '=' +encodeURIComponent(key.toString())*/
                }).join(',');
                //          if (IdContrato !== getState().configrounds.IdContrato) {
                const searchParams_ = `IdRonda=${IdRonda}&IdUsuario=${Settings.default.key.user}&configcontrolpoints=${strControlpoints}&ordenpuntos=${ordenpuntos}`;
                const response_ = await fetch(url + `api/VigitabletConfig/UpdateConfigRoundControlPointsByRound`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    },
                    body: searchParams_
                });
                if (response_.ok) {
                    const response__ = await response_.json();
                    dispatch({ type: CreateConfigRoundAction, configround: objeto, response: response__ });
                }
                else {
                    dispatch({ type: CreateConfigRoundAction, configround: objeto, response });
                }
            }
        }
    },
    update: (objeto, controlpoints, ordenpuntos, configroundjobs) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.controlpoints = [];
            objeto.configroundjobs = configroundjobs;
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');

            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: objeto.IdRonda || 0 });
            const response = await fetch(url + "api/VigitabletConfig/UpdateConfigRound", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                objeto.ConfigRoundTareas = configroundjobs.join(',');
                updateConfigRoundJobs(objeto.IdRonda, configroundjobs, access_token);

                objeto.controlpoints = controlpoints;
                const strControlpoints = controlpoints.map((controlpoint, key) => {
                    return encodeURIComponent(controlpoint.toString()); /*+ '=' +encodeURIComponent(key.toString())*/
                }).join(',');
                //          if (IdContrato !== getState().configrounds.IdContrato) {
                const searchParams_ = `IdRonda=${objeto.IdRonda}&IdUsuario=${Settings.default.key.user}&configcontrolpoints=${strControlpoints}&ordenpuntos=${ordenpuntos}`;
                const response_ = await fetch(url + `api/VigitabletConfig/UpdateConfigRoundControlPointsByRound`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    },
                    body: searchParams_
                });
                if (response_.ok) {
                    //const response__ = await response_.json();
                    dispatch({ type: UpdateConfigRoundAction, configround: objeto });
                } else {
                    dispatch({ type: UpdateConfigRoundAction, configround: objeto, response: response_ });
                }
            }
            else {
                dispatch({ type: UpdateConfigRoundAction, configround: objeto, response });
            }
        }
    },

    updateConfigRoundJobs: configroundjobs => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const IdUsuario = Settings.default.key.user;
            const url = Settings.default.key.url;
            const str = configroundjobs.join(',');
            const IdRonda = 0;
            const searchParams = `IdRonda=${str}&configroundjobs=${str}&IdUsuario=${IdUsuario}`;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: IdRonda || 0 });
            const response = await fetch(url + 'api/VigitabletConfig/UpdateConfigRoundJobs', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                configroundjobs = await response.json();
                dispatch({ type: 'UPDATE_CONFIG_ROUND_JOBS', configroundjobs });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },

    getValidationTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigRoundsAction, IdRonda: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllValidationTypa`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const validationtypes = await response.json();
                dispatch({ type: GetValidationTypes, validationtypes });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    getConfigRoundJobs: (IdRonda) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigRoundsAction, IdRonda: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigRoundJobs/${IdRonda}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const ConfigRondasTareas = await response.json();
                dispatch({ type: GetConfigRoundJobs, ConfigRondasTareas });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    getSession: getSession,
    getJobs: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: 0 });
            const response = await fetch(url + 'api/Job/GetAll', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const jobs = await response.json();
                dispatch({ type: GetJobsAction, jobs });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    getConfigRoundsByContract: (idContract) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            //const idContract = getState().login.contracts[0].Id || defaultContract.id;
            //if (idContract !== getState().configrounds.idContract) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: 0 });
            const response = await fetch(`${url}api/VigitabletConfig/GetConfigRoundsByContract/${idContract}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configrounds = await response.json();
                dispatch({ type: ReceiveConfigRoundsAction, configrounds });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }

        }
        else {
            dispatch({ type: ReceiveConfigRoundsAction, configrounds: [] });
        }
    },
    getAllConfigRounds: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            //if (idContract !== getState().configrounds.idContract) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: 0 });
            const response = await fetch(`${url}api/VigitabletConfig/GetAllConfigRounds/`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configrounds = await response.json();
                dispatch({ type: ReceiveConfigRoundsAction, configrounds });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
        else {
            dispatch({ type: ReceiveConfigRoundsAction, configrounds: [] });
        }
    },
    GetConfigRoundById: IdRonda => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            //if (IdRonda !== getState().configrounds.IdRonda) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigRoundById/${IdRonda}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: RequestConfigRoundAction, configround: data, IdRonda: IdRonda });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },

    getNews: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: 0 });
            const response = await fetch(url + 'api/News/GetAll', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const news = await response.json();
                dispatch({ type: GetNewsAction, news });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    delete: IdRonda => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = '';
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: IdRonda || 0 });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigRound/${IdRonda}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: DeleteConfigRoundAction, response: data });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },

    getNoticeTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: getState().configround.IdRonda || 0 });
            const response = await fetch(url + 'api/NoticeType/GetAll', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: GetNoticeTypesAction, noticetypes: data });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    getAdviceTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: getState().configround.IdRonda || 0 });
            const response = await fetch(url + 'api/AdviceType/GetAll', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: GetAdviceTypesAction, advicetypes: data });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    GetConfigControlPointsByContract: idContract => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        //if (idContract !== getState().weatherForecasts.idContract) {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            //            idContract = getState().login.contracts[0].Id;
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: /*getState().configround.IdRonda ||*/ 0 });
            const response = await fetch(`${url}api/VigitabletConfig/GetConfigControlPointsByContract/${idContract}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                }
            );
            if (response.ok) {
                const configcontrolpoints = await response.json();
                dispatch({ type: ReceiveConfigControlPointAction, configcontrolpoints });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    getConfigRoundControlPointsByRound: idRound => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: getState().configround.IdRonda || 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigRoundControlPointsByRound/${idRound}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configroundcontrolpoints = await response.json();
                dispatch({ type: GetConfigRoundControlPointsAction, configroundcontrolpoints });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    getConfigRoundControlPointsByRoundRandom: idRound => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigRoundsAction, IdRonda: getState().configround.IdRonda || 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigRoundControlPointsByRoundRandom/${idRound}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configroundcontrolpoints = await response.json();
                dispatch({ type: GetConfigRoundControlPointsAction, configroundcontrolpoints });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    getContract: getContract,
    getDefaultContract: () => (dispatch, getState) => {
        dispatch({ type: 'GET_CONTRACT', contract: defaultContrato });
    },
    GetJobActionTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestJobActionTypeAction });
            const response = await fetch(`${url}api/VigitabletConfig/GetJobActionTypes`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                }
            );
            if (response.ok) {
                const jobactiontypes = await response.json();
                dispatch({ type: ReceiveJobActionTypeAction, jobactiontypes });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
        else {
            dispatch({ type: ReceiveJobActionTypeAction, jobactiontypes: [] });
        }
    },
    getContracts: getContracts,
    getSpecialDates: getSpecialDates,
    GetAllConfigControlPoints: () => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //const idContract = getState().login.contracts[0].Id || defaultContract.Id;//;22;//
            //dispatch({ type: RequestConfigRoundsAction, idContract: 0 });
            const response = await fetch(`${url}api/VigitabletConfig/GetAllConfigControlPoints/`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                }
            );
            if (response.ok) {
                const configcontrolpoints = await response.json();
                dispatch({ type: ReceiveConfigControlPointAction, configcontrolpoints });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
        else {
            dispatch({ type: ReceiveConfigControlPointAction, configcontrolpoints: [] });
        }
    },
    //GetConfigControlPointsByContract: GetConfigControlPointsByContract

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    configround: defaultConfigRound,
    configrounds: [],
    isLoading: false,
    login: defaultLogin,
    response: Utils.defaultResponse,
    news: [],
    jobs: [],
    configcontrolpoints: [],
    idContract: 0,
    noticetypes: [],
    advicetypes: [],
    configroundcontrolpoints: [],
    contract: defaultContrato,
    jobactiontypes: [],
    validationtypes: [],


};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestConfigRoundsAction:
            return {
                ...state,
                IdRonda: action.IdRonda,
                //configrounds: state.configrounds,
                isLoading: true
            };
        /*case RequestJobActionTypeAction:
            return {
                ...state,
                isLoading: true
            };*/
        case ReceiveConfigRoundsAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                ...state,
                //idContract: action.idContract,
                configrounds: action.configrounds,
                isLoading: false
            };
        case CreateConfigRoundAction:
            return {
                ...state,
                configround: action.configround,
                isLoading: false
            };
        case UpdateConfigRoundAction:
            return {
                ...state,
                configround: action.configround,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case GetJobsAction:
            return {
                ...state,
                jobs: action.jobs,
                isLoading: false
            };
        case GetNewsAction:
            return {
                ...state,
                news: action.news,
                isLoading: false
            };
        case ErrorResponseAction:
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case RequestConfigRoundAction:
            if (action.IdRonda === state.IdRonda) {
                return {
                    ...state,
                    isLoading: false,
                    configround: action.configround,
                    IdRonda: action.IdRonda
                };
            }
            break;
        case DeleteConfigRoundAction:
            return {
                ...state,
                configround: defaultConfigRound,
                isLoading: false
            };
        case GetNoticeTypesAction:
            return {
                ...state,
                isLoading: false,
                noticetypes: action.noticetypes
            };
        case GetAdviceTypesAction:
            return {
                ...state,
                isLoading: false,
                advicetypes: action.advicetypes
            };
        case ReceiveConfigControlPointAction:
            return {
                ...state,
                isLoading: false,
                configcontrolpoints: action.configcontrolpoints
            };
        case RequestConfigControlPointAction:
            return {
                ...state,
                isLoading: true,
                idContract: action.idContract
            };
        case GetConfigRoundControlPointsAction:
            return {
                ...state,
                isLoading: false,
                configroundcontrolpoints: action.configroundcontrolpoints
            };
        case ReceiveJobActionTypeAction:
            return {
                ...state,
                jobactiontypes: action.jobactiontypes,
                isLoading: false
            };
        case 'GET_CONTRACT':
            return {
                ...state,
                contract: action.contract
            };
        case GetConfigRoundJobs:
            return {
                ...state,
                ConfigRondasTareas: action.ConfigRondasTareas
            };
        case GetContractsAction:
            return {
                ...state,
                isLoading: false,
                contracts: action.contracts
            };
        case GetValidationTypes:
            return {
                ...state,
                validationtypes: action.validationtypes,
                isLoading: false,
            };
        case GetSpecialDatesAction:
            return {
                ...state,
                specialdates: action.specialdates,
                isLoading: false
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state;
};
