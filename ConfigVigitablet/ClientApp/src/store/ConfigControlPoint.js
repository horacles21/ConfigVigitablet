import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { defaultContrato, GetContractsAction, ContractsAction, defaultContract, getContracts } from '../store/Contracts';
import { getAreas, GetAreasAction } from '../store/Area';
import { defaultConfigRoundControlPoint } from './ConfigRound';
import { getGroups, GetGroupsAction, getGroupsByContract } from '../store/Group';
//import { Login, defaultLogin, GetSessionAction } from '../store/Login';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export const Job = {
    IdTarea: 0,
    DescTarea: ''
};

export const News = {
    IdNovedad: 0,
    DescNovedad: ''
};

export const ConfigControlPoint = {
    IdPuntoControl: 0,
    IdContrato: 0,
    Contrato: '',
    UbicacionQR: '',
    DescripcionQR: '',
    CoordenadasGPS: "POINT(-117.861328 34.089061)",
    CodigoQR: '',
    LluviaQR: false,
    FechaUltActualizacion: ''/* Utils.Now()*/,
    IdArea: 0,
    Interior: false,
    IdUsuario: 0,
    Usuario: '',
    ConfigPuntosControlTareas: '',
    ConfigPuntosControlNovedades: ''
};
/*
const  ConfigControlPointTask {
    IdPuntoControl: number;
    IdTarea: number;
    FechaUltActualizacion: string;
    IdUsuario: number;
}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export const RequestConfigControlPointAction = 'REQUEST_CONFIG_CONTROLPOINT';
export const ReceiveConfigControlPointAction = 'RECEIVE_CONFIG_CONTROLPOINTS';
const ReceiveConfigControlPointNewsAction = 'GET_CONFIG_CONTROLPOINT_NEWS';
const ReceiveConfigGroupNewsAction = 'GET_CONFIG_GROUP_NEWS';
const ReceiveConfigControlPointJobsAction = 'GET_CONFIG_CONTROLPOINT_JOBS';
const UpdateConfigControlPointAction = 'UPDATE_CONFIG_CONTROLPOINT';
const UpdateConfigControlPointNewsAction = 'UPDATE_CONFIG_CONTROLPOINT_NEWS';
const UpdateConfigGroupNewsAction = 'UPDATE_CONFIG_GROUP_NEWS';
const UpdateConfigControlPointJobsAction = 'UPDATE_CONFIG_CONTROLPOINT_JOBS';
const CreateConfigControlPointAction = 'CREATE_CONFIG_CONTROLPOINT';
const DeleteConfigControlPointAction = 'DELETE_CONFIG_CONTROLPOINT';
const GetJobsAction = 'GET_JOBS';
const GetNewsAction = 'GET_NEWS';
const ErrorResponseAction = 'ERROR_RESPONSE';
const GetSessionAction = 'GET_SESSION';
const ReceiveConfigControlPointDistanceAction = "ReceiveConfigControlPointDistanceAction";
const UpdateConfigControlPointTimesAction = "UpdateConfigControlPointTimesAction";

async function updateConfigControlPointJobs(IdControlPoint, configcontrolpointjobs_, configcontrolpointphotos_, access_token) {
    if (access_token) {
        const url = Settings.default.key.url;
        const IdUsuario = Settings.default.key.user;

        const strJobs = configcontrolpointjobs_.join(',');
        const strPhotos = configcontrolpointphotos_.join(',');
        const searchParams = `IdPuntoControl=${IdControlPoint}&configcontrolpointjobs=${strJobs}&configcontrolpointphotos=${strPhotos}&IdUsuario=${IdUsuario}`;
        //return({ type: RequestConfigControlPointAction, idContract: 0 });
        const response = await fetch(url + 'api/VigitabletConfig/UpdateConfigControlPointJobs', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ok) {
            const configcontrolpointjobs = await response.json();
            return { type: UpdateConfigControlPointJobsAction, configcontrolpointjobs/*, response*/ };

        }
        else {
            return { type: 'ERROR_RESPONSE', response };
        }
    }
}
async function updateConfigControlPointNews(IdControlPoint, configcontrolpointnews_, access_token) {

    if (access_token) {
        const url = Settings.default.key.url;
        const IdUsuario = Settings.default.key.user;

        const str = configcontrolpointnews_.join(',');
        const searchParams = `IdPuntoControl=${IdControlPoint}&configcontrolpointnews=${str}&IdUsuario=${IdUsuario}`;
        const response = await fetch(url + 'api/VigitabletConfig/UpdateConfigControlPointNews', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ók) {
            const configcontrolpointnews = await response.json();
            return { type: UpdateConfigControlPointNewsAction, configcontrolpointnews };
        }
        else {
            return { type: 'ERROR_RESPONSE', response };
        }
    }
}

async function updateConfigGroupNews(IdControlPoint, configcgroupnews_, access_token) {

    if (access_token) {
        const url = Settings.default.key.url;
        const IdUsuario = Settings.default.key.user;

        const str = configcgroupnews_.join(',');
        const searchParams = `IdPuntoControl=${IdControlPoint}&configgroupnews=${str}&IdUsuario=${IdUsuario}`;
        const response = await fetch(url + 'api/VigitabletConfig/UpdateConfigGroupNews', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ók) {
            const configgroupnews = await response.json();
            return { type: UpdateConfigGroupNewsAction, configgroupnews };
        }
        else {
            return { type: 'ERROR_RESPONSE', response };
        }
    }
}
export const GetAllConfigControlPoints = () => async (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    //if (idContract !== getState().weatherForecasts.idContract) {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        //const idContract = getState().login.contracts[0].Id || defaultContract.Id;//;22;//
        dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
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
};
export const GetConfigControlPointsByContract = idContract => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        dispatch({ type: RequestConfigControlPointAction, idContract: idContract });
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
        } else {
            dispatch({ type: ErrorResponseAction, response });
        }
    }
    else {
        dispatch({ type: ReceiveConfigControlPointAction, configcontrolpoints: [] });
    }
};
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    GetTiemposPuntos: (idContrato) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        //if (idContract !== getState().weatherForecasts.idContract) {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //const idContract = getState().login.contracts[0].Id || defaultContract.Id;//;22;//
            //dispatch({ type: RequestConfigControlPointAction, idContract });
            const response = await fetch(`${url}api/VigitabletConfig/GetTiemposEntrePuntosByContract/${idContrato}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                }
            );
            if (response.ok) {
                const configcontrolpointtimes = await response.json();
                dispatch({ type: ReceiveConfigControlPointDistanceAction, idContract: idContrato, configcontrolpointtimes });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    GetAllConfigControlPoints: () => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        //if (idContract !== getState().weatherForecasts.idContract) {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //const idContract = getState().login.contracts[0].Id || defaultContract.Id;//;22;//
            dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
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
    GetConfigControlPointsByContract: idContract => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        //if (idContract !== getState().weatherForecasts.idContract) {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigControlPointAction, idContract });
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
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
        else {
            dispatch({ type: ReceiveConfigControlPointAction, configcontrolpoints: [] });
        }
    },
    create: (objeto, configcontrolpointnews, configcontrolpointjobs, configcontrolpointphotos, configgroupnews) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.FechaUltActualizacion = Utils.Now();
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            const action = "api/VigitabletConfig/CreateConfigControlPoint_";
            const method = "PUT";
            dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
            const response = await fetch(url + action, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdPuntoControl = await response.json();
                objeto.IdPuntoControl = IdPuntoControl;
                objeto.ConfigPuntosControlTareas = configcontrolpointjobs.join(',');
                updateConfigControlPointJobs(IdPuntoControl, configcontrolpointjobs, configcontrolpointphotos, access_token);
                updateConfigControlPointNews(IdPuntoControl, configcontrolpointnews, access_token);
                updateConfigGroupNews(IdPuntoControl, configgroupnews, access_token);
                dispatch({ type: CreateConfigControlPointAction, configcontrolpoint: objeto, response });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    update: (objeto, configcontrolpointnews, configcontrolpointjobs, configcontrolpointphotos, configgroupnews) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.FechaUltActualizacion = Utils.Now();
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const params = {
                url: Settings.default.key.url,
                action: "api/VigitabletConfig/UpdateConfigControlPoint",
                method: "PUT",
                access_token: access_token,
                searchParams: searchParams
            };
            dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
            const response = await Utils.exec(params);
            if (response.ok) {
                objeto.ConfigPuntosControlTareas = configcontrolpointjobs.join(',');
                objeto.ConfigPuntosControlNovedades = configcontrolpointnews.join(',');
                updateConfigControlPointJobs(objeto.IdPuntoControl, configcontrolpointjobs, configcontrolpointphotos, access_token);
                updateConfigControlPointNews(objeto.IdPuntoControl, configcontrolpointnews, access_token);
                updateConfigGroupNews(objeto.IdPuntoControl, configgroupnews, access_token);
                //const configcontrolpoint = await response.json();
                dispatch({ type: UpdateConfigControlPointAction, configcontrolpoint: objeto, response });
            }
            else {
                dispatch({ type: UpdateConfigControlPointAction, configcontrolpoint: objeto, response });
            }
        }
    },
    delete: (configcontrolpoint) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigControlPoint/${configcontrolpoint.IdControlPoint}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }

            });

            if (response.ok) {
                //response = await response.json();
                dispatch({ type: DeleteConfigControlPointAction, configcontrolpoint: defaultConfigRoundControlPoint, response, IdControlPoint: ConfigControlPoint.IdControlPoint });
            }
            else {
                dispatch({ type: DeleteConfigControlPointAction, configcontrolpoint: defaultConfigRoundControlPoint, response, IdControlPoint: ConfigControlPoint.IdControlPoint });
            }
        }
    },
    getNews: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
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
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
        else {
            dispatch({ type: GetNewsAction, news: [] });
        }
    },
    getJobs: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
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
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
        else {
            dispatch({ type: GetJobsAction, jobs: [] });
        }
    },
    getConfigControlPointJobs: IdControlPoint => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetIDConfigControlPointJobs/${IdControlPoint}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configcontrolpointjobs = await response.json();
                dispatch({ type: ReceiveConfigControlPointJobsAction, configcontrolpointjobs });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    getConfigControlPointNews: IdControlPoint => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigControlPointNews/${IdControlPoint}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configcontrolpointnews = await response.json();
                dispatch({ type: ReceiveConfigControlPointNewsAction, configcontrolpointnews });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },


    getConfigGroupNews: IdControlPoint => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigGroupNewsByControlPoint/${IdControlPoint}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configgroupnews = await response.json();
                dispatch({ type: ReceiveConfigGroupNewsAction, configgroupnews });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },

    updateConfigControlPointJobs: configcontrolpointjobs => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const IdUsuario = Settings.default.key.user;
            const url = Settings.default.key.url;
            const str = configcontrolpointjobs.join(',');
            const searchParams = `IdPuntoControl=${str}&configcontrolpointjobs=${str}&IdUsuario=${IdUsuario}`;
            dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
            const response = await fetch(url + 'api/VigitabletConfig/UpdateConfigControlPointJobs', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                configcontrolpointjobs = await response.json();
                dispatch({ type: UpdateConfigControlPointJobsAction, configcontrolpointjobs });
            } else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
    },
    updateConfigControlPointNews: configcontrolpointnews => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            const str = configcontrolpointnews.join(',');
            const searchParams = `IdPuntoControl=${str}&configcontrolpointnews=${str}&IdUsuario=${Settings.default.key.user}`;

            //dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
            const response = await fetch(url + 'api/VigitabletConfig/UpdateConfigControlPointNews/', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                configcontrolpointnews = await response.json();
                dispatch({ type: UpdateConfigControlPointNewsAction, configcontrolpointnews });
            }
            else {
                dispatch({ type: 'ERROR_RESPONSE', response });
            }
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    },
    updateConfigControlPointTimes: configcontrolpointtime => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;

            const searchParams = `IdContrato=${configcontrolpointtime.IdContrato}&arMaximos=${configcontrolpointtime.arMaximos}&arMinimos=${configcontrolpointtime.arMinimos}&arPuntosA=${configcontrolpointtime.arPuntosA}&arPuntosB=${configcontrolpointtime.arPuntosB}&IdUsuario=${Settings.default.key.user}`;
            /*Object.keys(configcontrolpointtime).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(configcontrolpointtime[key]);
            }).join('&');*/
            //const p_configcontrolpointtimes = 'IdContrato=1160';// `IdContrato=1160&arPuntosA=${arPuntosA.join(',')}&arPuntosB=${arPuntosB.join(',')}&arMaximos=${arMaximos.join(',')}&arMinimos=${arMinimos.join(',')}`;
            //const strCconfigcontrolpointtimes = JSON.stringify(configcontrolpointtimes)
            //dispatch({ type: RequestConfigControlPointAction, idContract: 0 });
            const response = await fetch(url + 'api/VigitabletConfig/UpdateConfigControlPointTimes', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams//p_configcontrolpointtimes
            });
            if (response.ok) {
                //(configcontrolpoint = await response.json();
                //dispatch({ type: UpdateConfigControlPointTimesAction, configcontrolpointtime });
            }
            else {
                dispatch({ type: 'ERROR_RESPONSE', response });
            }
        }
    },
    getContracts: getContracts,
    getAreas: getAreas,
    getGroups: getGroups,
    getGroupsByContract: getGroupsByContract,

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const unloadedState = {
    configcontrolpoint: ConfigControlPoint,
    configcontrolpoints: [],
    isLoading: false,
    jobs: [],
    news: [],
    login: {}/*defaultLogin*/,
    response: Utils.defaultResponse,
    configcontrolpointjobs: [],
    configcontrolpointnews: [],
    configcontrolpointtimes: [],
    groups: []
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestConfigControlPointAction:
            return {
                ...state,
                isLoading: true
            };
        case ReceiveConfigControlPointAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (action.idContract === state.idContract) {
            return {
                ...state,
                configcontrolpoints: action.configcontrolpoints,
                isLoading: false
            };
        case CreateConfigControlPointAction:
            return {

                ...state,
                configcontrolpoint: action.configcontrolpoint,
                response: action.response,
                isLoading: false
            };
        case UpdateConfigControlPointAction:
            return {
                ...state,
                configcontrolpoint: action.configcontrolpoint,
                response: action.response,
                isLoading: false
            };
        case DeleteConfigControlPointAction:
            return {
                ...state,
                configcontrolpoint: action.configcontrolpoint,
                response: action.response,
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
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                jobs: [],
                news: [],
                isLoading: false
            };
        case ErrorResponseAction:
            return {
                ...state,
                response: action.response,
                isLoading: false
            };
        case ReceiveConfigControlPointJobsAction:
            return {
                ...state,
                isLoading: false,
                configcontrolpointjobs: action.configcontrolpointjobs
            };
        case ReceiveConfigControlPointNewsAction:
            return {
                ...state,
                isLoading: false,
                configcontrolpointnews: action.configcontrolpointnews
            };
        case ReceiveConfigGroupNewsAction:
            return {
                ...state,
                isLoading: false,
                configgroupnews: action.configgroupnews
            };
        case UpdateConfigControlPointJobsAction:
            return {
                ...state,
                isLoading: false,
                configcontrolpointjobs: action.configcontrolpointjobs
            };
        case UpdateConfigControlPointNewsAction:
            return {
                ...state,
                isLoading: false,
                configcontrolpointnews: action.configcontrolpointnews
            };
        case UpdateConfigGroupNewsAction:
            return {
                ...state,
                isLoading: false,
                configgroupnews: action.configgroupnews
            };
        case GetContractsAction:
            return {
                ...state,
                contracts: action.contracts,
                isLoading: false,
            };
        case GetAreasAction:
            return {
                ...state,
                areas: action.areas,
                isLoading: false,
            };
        case ReceiveConfigControlPointDistanceAction:
            return {
                ...state,
                configcontrolpointtimes: action.configcontrolpointtimes
            };
        case UpdateConfigControlPointTimesAction:
            return {
                ...state,
                configcontrolpointtime: action.configcontrolpointtime
            };
        case GetGroupsAction:
            return {
                ...state,
                isLoading: false,
                groups: action.groups
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }
    return state;/*|| unloadedState;*/
};
