import * as Settings from '../store/MyConfig';
import { defaultLogin } from '../store/Login';
import { defaultResponse, Mode, Now } from '../store/Utils';
import { defaultContrato, GetContractsAction, ContractsAction, defaultContract, getContracts } from '../store/Contracts';
/*
export interface AccessesState {
    isLoading: boolean;
    idContract: number;
    idAccess: number;
    access: Access;
    accesses: Access[];
    accesstypes: AccessType[];
    //createMode: boolean;
    response: Resp;
    mode: Mode;
    login: Login,

}*/

/*export interface UnidadPersonaHorarioAcceso {
    [key: string]: any
    IdHorario: number;
    IdAcceso: number;
    Acceso: string;
    FechaActivacion: string;
    IdUsuario: number;
    Usuario: string;
    accesos: string;
}*/

export const defaultUnidadPersonaHorarioAcceso = {
    IdHorario: 0,
    IdAcceso: 0,
    Acceso: '',
    FechaActivacion: Now(),
    IdUsuario: 0,
    Usuario: '',
    accesos: ''
};
// [Route("GetPersonTimeByPerson/{idUnit:int}/{idType:int}/{idPerson:int}")]

/*
export interface UnidadPersonaHorario {
    [key: string]: any
    IdHorario: number;
    IdUnidad: number;
    Unidad: string;
    IdTipoPersona: number;
    TipoPersona: string;
    IdPersona: number;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    Dias: string;
    FechaInicio: string;
    HoraInicio1: string;
    Duracion1: number;
    FechaFinal: string;
    HoraInicio2?: string;
    Duracion2?: number;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
    // public IQueryable<UnidadPersonaHorarioAccesoModel> Accesos { get; set; }
}*/

export const defaultUnidadPersonaHorario = {
    IdHorario: 0,
    IdUnidad: 0,
    Unidad: '',
    IdTipoPersona: 7,
    TipoPersona: '',
    IdPersona: 0,
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    Dias: '',
    FechaInicio: Now(),
    HoraInicio1: '',
    Duracion1: 0,
    FechaFinal: Now(),
    HoraInicio2: '',
    Duracion2: 0,
    FechaUltActualizacion: Now(),
    IdUsuario: 0,
    Usuario: ''
    // public IQueryable<UnidadPersonaHorarioAccesoModel> Accesos { get; set; }
};

const ErrorRequestAction = 'ERROR_REQUEST_UnidadPersonaHorario';

/*
export interface AccessType {

    IdTipoAcceso: number;
    DescTipoAcceso: string;
}*/
export const defaultAccessType = {

    IdTipoAcceso: 0,
    DescTipoAcceso: ''
};

/*
export interface Access {
    [key: string]: any
    Id: number;
    IdContrato: number;
    Contrato: string;
    NombreAcceso: string;
    DescAcceso: string;
    NroPersonas: number;
    JuntaCondominio: boolean;
    CantidadSecundarios: number;
    NroInvitados: number;
    TipoPlantilla: string;
    PlantillasPersona: number;
    PlantillasEmergencia: number;
    IdTipoAcceso: number;
    TipoAcceso: string;
    IdSubRed: string;
    Entrada: boolean;
    Salida: boolean;
    Personal: boolean;
    Peatonal: boolean;
    Vehicular: boolean;
    Servicio: boolean;
    RFID: boolean;
    Principales: boolean;
    Secundarios: boolean;
    Visitante: boolean;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}
*/
export const defaultAccess = {
    Id: 0,
    IdContrato: 0,
    Contrato: '',
    NombreAcceso: '',
    DescAcceso: '',
    NroPersonas: 0,
    JuntaCondominio: false,
    CantidadSecundarios: 0,
    NroInvitados: 0,
    TipoPlantilla: '',
    PlantillasPersona: 0,
    PlantillasEmergencia: 0,
    IdTipoAcceso: 0,
    TipoAcceso: '',
    IdSubRed: '',
    Entrada: false,
    Salida: false,
    Personal: false,
    Peatonal: false,
    Vehicular: false,
    Servicio: false,
    RFID: false,
    Principales: false,
    Secundarios: false,
    Visitante: false,
    FechaUltActualizacion: Now(),
    IdUsuario: 0,
    Usuario: ''
};

export const RequestUnidadPersonaHorariosAction = 'REQUEST_PERSON_TIME';
const ReceiveUnidadPersonaHorariosAction = 'RECEIVE_CONFIG_TURNS';
export const UpdateUnidadPersonaHorarioAction = 'UPDATE_PERSON_TIME';
export const CreateUnidadPersonaHorarioAction = 'CREATE_PERSON_TIME';
export const CreateUnidadPersonaHorarioAccesoAction = 'CREATE_PERSON_TIME_ACCESS';
const DeleteUnidadPersonaHorarioAction = 'DELETE_CONFIG_TURN';
const GetUnidadPersonaHorariosAction = 'GET_CONFIG_TURNS';
export const GetUnidadPersonaHorarioAction = 'GET_PERSON_TIME';
const GetUnidadPersonaHorarioAccesoAction = 'GET_PERSON_TIME_ACCESS';
const GetAccessesAction = 'GET_ACCESSES';
const ErrorRequestAccessesAction = 'ERROR_REQUEST_ACCESSES';
const GetRequestUnidadPersonaHorarioAction = 'GET_REQUEST_PERSON_TIME';
const GetErrorRequestUnidadPersonaHorarioAction = 'ERROR_REQUEST_PERSON_TIME';
const ErrorRequestPersonTimeAccessAction = 'ERROR_REQUEST_PERSON_TIME_ACCESS';
export const CreatePersonTimeAccessByTimeAction = 'CREATE_PERSON_TIME_ACCESS_BY_TIME';
export const RequestAccessesAction = 'REQUEST_ACCESSES';

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const RequestAccessAction = 'REQUEST_ACCESS';
const ReceiveAccessesAction = 'RECEIVE_ACCESS';
const UpdateAccessAction = 'UPDATE_ACCESS';
const CreateAccessAction = 'CREATE_ACCESS';
const DeleteAccessAction = 'DELETE_ACCESS';
const GetSessionAction = 'GET_SESSION';
const GetAccessTypesAction = 'GET_ACCESS_TYPES';
const SetModeAction = 'SET_MODE';
const ErrorResponseAction = 'ERROR_RESPONSE';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

export const GetPersonTimeByPerson = (idUnit, idType, idPerson) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        let persontime = defaultUnidadPersonaHorario;
        if (!(persontime.IdPersona === idPerson && persontime.IdTipoPersona === idType && persontime.IdUnidad === idUnit)) {
            dispatch({ type: RequestUnidadPersonaHorariosAction, IdHorario: 0 });
            const response = await fetch(url + `api/Unit/GetPersonTimeByPerson/${idUnit}/${idType}/${idPerson}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            const data = await response.json();
            dispatch({ type: GetUnidadPersonaHorarioAction, idUnit: idUnit, idType: idType, idPerson: idPerson, persontime: data });
            /*        }).catch (reason => {
                dispatch({ type: 'ERROR_REQUEST_PERSON_TIME', idUnit: idUnit, idType: idType, idPerson: idPerson, response: reason });
            }).catch ();*/


        }
    }
};
export const GetPersonAccessByTime = id => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/Unit/GetPersonAccessByTime/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        const data = await response.json();
        dispatch({ type: 'GET_PERSON_TIME_ACCESS', persontimeaccess: data, id: id });
        /*    }).catch (reason => {
            dispatch({ type: 'ERROR_REQUEST_PERSON_TIME_ACCESS', response: reason });
        }).catch ();*/
        //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //dispatch({ type: RequestUnidadPersonaHorariosAction, idUnit: idUnit, idType: idType, idPerson: idPerson });
    }
};
export const GetAccessByContract = (idContract) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        dispatch({ type: 'REQUEST_ACCESSES', idContract });
        const response = await fetch(url + `api/Access/GetByContract/${idContract}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const accesses = await response.json();
            dispatch({ type: GetAccessesAction, accesses });
        }
        else {
            dispatch({ type: ErrorResponseAction, idContract, response });
        }
    }
};

export const create = (objeto, accesos) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');

        const response = await fetch(url + `api/Unit/AddPersonTime`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const IdHorario = await response.json();
            let persontimeaccess = defaultUnidadPersonaHorarioAcceso;
            //AddPersonTimeAccess()
            dispatch({ type: 'CREATE_PERSON_TIME', IdHorario, persontime: objeto, response });
        }
        else {
            dispatch({ type: ErrorRequestAccessesAction, response });
        }
    }
};


export const AddPersonTimeAccess_ = (objeto) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');
        const response = await fetch(url + `api/Unit/AddPersonTimeAccess`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ok) {
            const IdHorario = await response.json();
            dispatch({ type: 'CREATE_PERSON_TIME_ACCESS', IdHorario: IdHorario, IdAcceso: objeto.IdAcceso, response: defaultResponse });
        }
        else {
            dispatch({ type: 'CREATE_PERSON_TIME_ACCESS', IdHorario: objeto.IdHorario, IdAcceso: objeto.IdAcceso, response });
        }

    }
};

export const AddPersonTimeAccessByTime = async (objeto, access_token) => {
    if (access_token) {
        const url = Settings.default.key.url;
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');
        const response = await fetch(url + `api/Unit/AddPersonTimeAccessByTime`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        //const IdHorario = await response.json();
        return response;
        //return { type: CreatePersonTimeAccessByTimeAction, persontimeaccess: objeto };
        //return { type: RequestUnidadPersonaHorariosAction, IdHorario: objeto.IdHorario || 0 };
    }
    //return { type: RequestUnidadPersonaHorariosAction, IdHorario: objeto.IdHorario || 0 };
};

export const AddPersonTimeAccess = async (objeto, access_token) => {
    if (access_token) {
        const url = Settings.default.key.url;
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');
        const response = await fetch(url + `api/Unit/AddPersonTimeAccess`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        const IdHorario = await response.json();
        return { type: 'CREATE_PERSON_TIME_ACCESS', IdHorario, IdAcceso: objeto.IdAcceso, response: defaultResponse };
        /*}).catch(reason => {
            return { type: 'CREATE_PERSON_TIME_ACCESS', IdHorario: objeto.IdHorario, IdAcceso: objeto.IdAcceso, response: reason };
        }).catch();*/
        //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    }
};

export const DeletePersonTimeAccess = (objeto) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');
        const response = await fetch(url + `api/Unit/DeletePersonTimeAccess/${objeto.IdHorario}/${objeto.IdAcceso}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        //const data = await response.json();
        return response;
        //   dispatch({ type: 'DELETE_PERSON_TIME_ACCESS', IdHorario: IdHorario, IdAcceso: objeto.IdAcceso, response: defaultResponse });
        //}).catch (reason => {
        //     dispatch({ type: 'DELETE_PERSON_TIME_ACCESS', IdHorario: objeto.IdHorario, IdAcceso: objeto.IdAcceso, response: reason });
        //}).catch ();

    }
};

export const deletePersonTimeByTime = async (IDHorario, access_token) => {
    if (access_token) {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/Unit/DeletePersonTimeAccessbByTime/${IDHorario}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        return response;
        //const data = await response.json();
    }
};

export const createPersonTimeAccesses = async (IdHorario, accesos, access_token) => {
    let persontimeaccess = defaultUnidadPersonaHorarioAcceso;
    persontimeaccess.IdHorario = IdHorario;
    persontimeaccess.accesos = accesos.join(',');
    return AddPersonTimeAccessByTime(persontimeaccess, access_token);

};
export const createPersonTime = async (objeto, accesos, access_token) => {

    if (access_token) {
        const url = Settings.default.key.url;
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');
        const response = await fetch(url + `api/Unit/AddPersonTime`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        return response;

        //const IdHorario = await response.json();
        //return { type: CreatePersonTimeAccessByTimeAction, persontimeaccess: objeto };
        //return { type: 'CREATE_PERSON_TIME', IdHorario: IdHorario, persontime: objeto, response: defaultResponse };
        /*}).catch(reason => {
            return { type: 'CREATE_PERSON_TIME', IdHorario: 0, persontime: objeto, response: reason };
        }).catch();*/
        //return { type: RequestUnidadPersonaHorariosAction, IdHorario: 0 };
    }
    //return { type: RequestUnidadPersonaHorariosAction, IdHorario: 0 };
};

export const updatePersonTime = async (objeto, accesos, access_token) => {
    if (access_token) {
        const url = Settings.default.key.url;
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');
        const response = await fetch(url + `api/Unit/UpdatePersonTime`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ok) {
            //const data = await {
            let persontimeaccess = defaultUnidadPersonaHorarioAcceso;
            persontimeaccess.IdHorario = objeto.IdHorario;
            persontimeaccess.accesos = accesos.join(',');
            const response2 = await AddPersonTimeAccessByTime(persontimeaccess, access_token);
            if (response2.ok) {
                return response2;
            }
        }
        //return { type: UpdateUnidadPersonaHorarioAction, IdHorario: objeto.IdHorario, persontime: objeto, response: defaultResponse };
        /*  }).catch (reason => {
      return { type: UpdateUnidadPersonaHorarioAction, IdHorario: 0, persontime: objeto, response: reason };
  });*/
        //return { type: RequestUnidadPersonaHorariosAction, IdHorario: objeto.IdHorario };
    }
    //return { type: RequestUnidadPersonaHorariosAction, IdHorario: objeto.IdHorario };
};
/*
export interface paramsCommand {
    action: string, method: string, access_token: string, searchParams: string,
}*/
export const exec = async (params) => {
    const url = Settings.default.key.url;
    return await fetch(url + params.action, {
        method: params.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + params.access_token
        },
        body: params.searchParams
    }).then(function (res) {
        console.log('Resultado del exec: ' + res);
        return res;
    }).catch(function (ex) {
        console.log('Error en exec:' + ex);
        return ex;
    });
};

export const actionCreators = {
    requestContracts: (IdContract) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (IdContract !== getState().accesses.idContract) {
                const response = await fetch(`api/SampleData/Contracts?startDateIndex=${IdContract}`)
                const data = await response.json();

                dispatch({ type: 'RECEIVE_ACCESS', IdContract: IdContract, accesses: data });


                //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
                dispatch({ type: 'REQUEST_ACCESS', IdAccess: getState().accesses.idAccess });
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
            const response = await fetch(url + "api/Access/Create", {
                method: '´POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                dispatch({ type: 'CREATE_ACCESS', access: objeto, response: response });
            }
            else {
                dispatch({ type: 'CREATE_ACCESS', response });
            }
            //addTask(fetchTask);// Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_ACCESS', IdAccess: objeto.IdAccess });
        }
    },
    update: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            console.log('searchParams:' + searchParams);
            let params = {
                action: "api/Access/Update",
                method: "PUT",
                access_token: access_token,
                searchParams: searchParams
            };

            let response = defaultResponse;
            let fetchTask = exec(params).then(val => {
                response = val;
                console.log(response.status + ": " + response.statusText);
                dispatch({ type: 'UPDATE_ACCESS', access: objeto, response: response });
            }).catch(reason => {
                console.log('Error in create:' + reason);
                dispatch({ type: 'UPDATE_ACCESS', access: objeto, response: reason });
            });
            //addTask(fetchTask);// Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_ACCESS', IdAccess: objeto.IdAccess });
        }
    },

    delete: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            const args = `/${objeto.IdContrato}/${objeto.idVigitabletTipoLLamadas}/${objeto.TelefonoContactoVT}`;
            dispatch({ type: 'REQUEST_ACCESS', IdAccess: objeto.IdAccess });
            const response = await fetch(url + "api/Access/Delete" + args, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            //const data = await {
            dispatch({ type: 'DELETE_ACCESS', access: objeto, response });
            /*}).catch(reason => {
                console.log('Error in Delete:' + reason);
                dispatch({ type: 'DELETE_ACCESS', access: objeto, response: reason });
            });*/

        }

    },
    getAccesses: () => async (dispatch, getState) => {
        const url = Settings.default.key.url;
        const access_token = getState().login.login.access_token;
        if (access_token) {
            dispatch({ type: 'REQUEST_ACCESS', IdAccess: 0 });
            const response = await fetch(url + `api/Access/GetAll`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const accesses = await response.json();
                dispatch({ type: GetAccessesAction, accesses });
            }
            else {
                dispatch({ type: ErrorResponseAction, response });
            }
        }
        else {
            dispatch({ type: GetAccessesAction, accesses: [] });
        }
    },
    getAccessTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: 'REQUEST_ACCESS', IdAccess: 0 });
            const response = await fetch(url + `api/AccessType/GetAll`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const accesstypes = await response.json();
                dispatch({ type: GetAccessTypesAction, accesstypes });
            }
            else {

                dispatch({ type: ErrorResponseAction, response });
            }
        }
        else {
            dispatch({ type: GetAccessTypesAction, accesstypes: [] });
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: 'GET_SESSION',
            login: getState().login.login
        });
    },
    getContracts: getContracts,
    GetAccessByContract: GetAccessByContract,
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    access: defaultAccess,
    accesses: [],
    accesstypes: [],
    isLoading: false,
    idContract: 0,
    idAccess: 0,
    response: defaultResponse,
    login: defaultLogin
};

export const reducer = (state, incomingAction) => {
    const action = incomingAction;
    switch (action.type) {
        case 'REQUEST_ACCESSES':
            return {
                ...state,
                //response: defaultResponse,
                isLoading: true
            };
        case 'RECEIVE_ACCESS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (action.startDateIndex === state.startDateIndex) {
            return {
                ...state,
                accesses: action.accesses,
                isLoading: false
            };
        case 'UPDATE_ACCESS':
            return {
                ...state,
                response: action.response,
                access: action.access,
                isLoading: false
            };
        case 'CREATE_ACCESS':
            return {
                ...state,
                access: action.access,
                response: action.response,
                isLoading: false
            };
        case 'DELETE_ACCESS':
            return {
                ...state,
                access: action.access,
                response: action.response,
                isLoading: false
            };
        case 'GET_SESSION':
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        case GetAccessesAction:
            return {
                ...state,
                accesses: action.accesses,
                isLoading: false
            };
        case GetAccessTypesAction:
            return {
                ...state,
                accesstypes: action.accesstypes,
                isLoading: false
            };
        case 'SET_MODE':
            return {
                ...state,
                mode: action.mode,
                isLoading: false
            };
        case ErrorResponseAction:
            return {
                ...state,
                response: action.response,
                isLoading: false
            };
        case 'REQUEST_ACCESS':
            return {
                ...state,
                idAccess: action.IdAccess
            };
        case ErrorRequestAccessesAction:
            return {
                ...state,
                isLoading: false,
                //idAccess: action.IdAccess
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

    return state || unloadedState;
};
