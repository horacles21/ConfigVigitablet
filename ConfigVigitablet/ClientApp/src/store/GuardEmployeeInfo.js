import * as Settings from '../store/MyConfig';
import { AddPerson, defaultUnidadPersona } from '../store/UnidadPersona';
import * as Utils from '../store/Utils';
import { NullImage, defaultResponse/*, HandleChangeImageAction*/ } from '../store/Utils';
import { defaultConfigTurn } from '../store/ConfigTurn';
import { defaultSurveillanceCompany, GetSurveillanceCompanysAction } from '../store/SurveillanceCompany';
import * as Person from '../store/Person';
import * as Access from '../store/Access';
import {
    defaultUnidadPersonaHorario, GetUnidadPersonaHorarioAction, RequestUnidadPersonaHorariosAction,
    CreateUnidadPersonaHorarioAction, UpdateUnidadPersonaHorarioAction, CreateUnidadPersonaHorarioAccesoAction
} from '../store/Access';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { defaultContrato } from '../store/Contracts';
import FetchData from '../components/FetchData';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface GuardEmployeeState {
    [key: string]: any
    guardemployee: GuardEmployee;
    guardemployees: GuardEmployee[];
    IdPersonaVig: number,
    login: Login;
    fileName: string;
    errorMessage: string;
    relationshipTypes: TipoParentesco[];
    surveillancecompany: SurveillanceCompany;
    configturn: ConfigTurn;
    configturns: ConfigTurn[];
    isLoading: boolean;
    mode: Utils.Mode;
    surveillancecompanys: SurveillanceCompany[];
    persontime: Access.UnidadPersonaHorario;
    accesses: Access.Access[];
    persontimeaccess: Access.UnidadPersonaHorarioAcceso[];
    IdHorario: number;
    contract: Contrato;
}

export interface Empresa {
    [key: string]: any
    IdEmpresaMantenimiento: number;
    descEmpresaMantenimiento: string;
    TelefonosEmpresaMantenimiento: string;
    EmailEmpresaMantenimiento: string;
    IdPais: number;
    Pais: string;
    DireccionEmpresaMantenimiento: string;
    PersonaContactoMant1: string;
    PersonaContactoMant2: string;
    TelefonosPersonaContactoMant1: string;
    TelefonosPersonaContactoMant2: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;

}*/
export const defaultEmpresa = {
    IdEmpresaMantenimiento: 0,
    descEmpresaMantenimiento: '',
    TelefonosEmpresaMantenimiento: '',
    EmailEmpresaMantenimiento: '',
    IdPais: 0,
    Pais: '',
    DireccionEmpresaMantenimiento: '',
    PersonaContactoMant1: '',
    PersonaContactoMant2: '',
    TelefonosPersonaContactoMant1: '',
    TelefonosPersonaContactoMant2: '',
    FechaUltActualizacion: '',
    IdUsuario: 0,
    Usuario: '',
    IdDocIdentidad: '',
    TelefonoMovil1: '',
    FechaNacimiento: ''
};
/*export interface TipoParentesco {
    [key: string]: any
    IdParentesco: number;
    DescParentesco: string;
}
export interface GuardEmployee {
    [key: string]: any
    IdPersonaVig: number;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    ContactoVig1: string;
    ContactoVig2: string;
    IdParentescoVig1: number;
    TipoParentesco1: string;
    IdParentescoVig2: number;
    TipoParentesco2: string;
    TelefonosContactoVig1: string;
    TelefonosContactoVig2: string;
    EmailVig: string;
    DireccionVig: string;
    RutaImagenVig: string;
    IdEmpresaVigilancia: number;
    EmpresaVigilancia: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
    IdDocIdentidad: string;
    TelefonoMovil1: string;
    FechaNacimiento: string;

}*/
export const defaultGuardEmployee = {
    IdPersonaVig: 0,
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    ContactoVig1: '',
    ContactoVig2: '',
    IdParentescoVig1: 0,
    TipoParentesco1: '',
    IdParentescoVig2: 0,
    TipoParentesco2: '',
    TelefonosContactoVig1: '',
    TelefonosContactoVig2: '',
    EmailVig: '',
    DireccionVig: '',
    RutaImagenVig: '',
    IdEmpresaVigilancia: 0,
    EmpresaVigilancia: '',
    FechaUltActualizacion: '',
    IdUsuario: 0,
    Usuario: '',
    IdDocIdentidad: '',
    TelefonoMovil1: '',
    FechaNacimiento: ''
};
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const RequestGuardEmployeeInfoAction = 'REQUEST_GUARD_EMPLOYEE';
const UpdateGuardEmployeeAction = 'UPDATE_GUARD_EMPLOYEE';
const CreateGuardEmployeeAction = 'CREATE_GUARD_EMPLOYEE';
const GetRelationshipAction = 'GET_RELATIONSHIPS';
const GetGuardEmployeeAction = 'GET_GUARD_EMPLOYEE';
const UpdateEmployeeErrorAction = 'UPDATE_GUARD_EMPLOYEE_ERROR';
const HandleChangeAction = 'ON_CHANGE';
const HandleChangeImageAction = 'ON_CHANGE_IMAGE';
const DeleteGuardEmployeeAction = 'DELETE_GUARD_EMPLOYEE';
const GetSurveillanceCompanyAction = 'GET_SURVEILLANCE_COMPANY';
const GetConfigTurnAction = 'GET_CONFIG_TURN';
const GetConfigTurnsAction = 'GET_CONFIG_TURNS';
export const GetGuardEmployeesAction = 'GET_GUARD_EMPLOYEES';

///////////////////////////////////////////////////////////////////////////////////
/*export interface AttrField {
    [key: string]: any
    errorMessage: string, isRequired: boolean, valid: boolean, isEmpty: boolean,
}

export interface Errors {
    [key: string]: AttrField
    ContactoVig1: AttrField,
    ContactoVig2: AttrField,
    IdParentescoVig1: AttrField,
    IdParentescoVig2: AttrField,
    TelefonosContactoVig1: AttrField,
    TelefonosContactoVig2: AttrField,
    EmailVig: AttrField,
    DireccionVig: AttrField,
    RutaImagenVig: AttrField,
    IdEmpresaVigilancia: AttrField,
    FechaUltActualizacion: AttrField,
    IdUsuario: AttrField
}
*/


export const errorInit = { errorMessage: "", isRequired: false, valid: true, isEmpty: false };
export const ErrorsInit = {
    ContactoVig1: errorInit,
    ContactoVig2: errorInit,
    IdParentescoVig1: errorInit,
    IdParentescoVig2: errorInit,
    TelefonosContactoVig1: errorInit,
    TelefonosContactoVig2: errorInit,
    EmailVig: errorInit,
    DireccionVig: errorInit,
    RutaImagenVig: errorInit,
    IdEmpresaVigilancia: errorInit,
    FechaUltActualizacion: errorInit,
    IdUsuario: errorInit
};
/*export interface Touched {
    [key: string]: boolean
    ContactoVig1: boolean,
    ContactoVig2: boolean,
    IdParentescoVig1: boolean,
    IdParentescoVig2: boolean,
    TelefonosContactoVig1: boolean,
    TelefonosContactoVig2: boolean,
    EmailVig: boolean,
    DireccionVig: boolean,
    RutaImagenVig: boolean,
    IdEmpresaVigilancia: boolean,
    FechaUltActualizacion: boolean,
    IdUsuario: boolean
}*/
/*
export interface GuardEmpl {
    [key: string]: any
    guardemployee: GuardEmployee,
    listdays: number[],
    file: string, imagePreviewUrl: string | ArrayBuffer | null, fileName: string,// { fileName: string }, errorMessage: string[],
    errors: Errors,
    touched: Touched,
    relationshipTypes: TipoParentesco[],
    surveillancecompany: Empresa,
    persontimeaccess: Access.UnidadPersonaHorarioAcceso[],
}*/
export const limitLength = (str, length) => str.substring(0, length);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = CreateGuardEmployeeAction | UpdateGuardEmployeeAction | UpdateEmployeeErrorAction | DeleteGuardEmployeeAction | GetConfigTurnAction
    | HandleChangeAction | HandleChangeImageAction | GetRelationshipAction | GetGuardEmployeeAction | GetSessionAction | GetSurveillanceCompanyAction
    | RequestGuardEmployeeInfoAction | GetGuardEmployeesAction | Utils.SetModeAction | GetSurveillanceCompanysAction | GetConfigTurnsAction
    | Access.KnownPersonTimeAction | Access.CreateUnidadPersonaHorarioAction | Access.UpdateUnidadPersonaHorarioAction | Access.AccessesAction | Access.CreateUnidadPersonaHorarioAccesoAction
    | Access.KnownPersonTimeAccessAction | Access.RequestUnidadPersonaHorariosAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
/*interface RespImage {
    [k: string]: string
    fileName: string
}
*/
//const NullImage = { fileName: '' };
/*
interface MyReturnTypeItem {
    vars: string[];
    smps: string[];
    data: string[];
}
interface MyReturnType {
    [name: string]: MyReturnTypeItem;
}
*/
/*const whatever2 = async () => {
    return await ((resolve) => {
        resolve(4);
    });
};*/


const execGet = async (params) => {
    const url = Settings.default.key.url;
    return await fetch(url + params.action, {
        method: params.method,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'bearer ' + params.access_token
        }
    });
};


export const actionCreators = {
    createPersonTime: Access.create,
    getHorarios: Access.GetPersonTimeByPerson,
    getAccesos: Access.GetAccessByContract,
    AddPersonTimeAccess: Access.AddPersonTimeAccess,
    GetPersonTimeByPerson: Access.GetPersonTimeByPerson,
    GetPersonAccessByTime: Access.GetPersonAccessByTime,
    getGuardEmployee: IdPersonaVig => async (dispatch, getState) => {
        const token = getState().login.login.access_token;
        if (token) {
            if (IdPersonaVig !== getState().guardemployee.IdPersonaVig) {
                const url = Settings.default.key.url;
                const objeto = Object.assign({}, getState().guardemployee.guardemployee);
                dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: IdPersonaVig });
                const response = await fetch(url + `api/VigitabletConfig/GetGuardEmployeeInfo/${IdPersonaVig}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + token
                    }
                });
                if (response.ok) {
                    const guardemployee = await response.json();
                    dispatch({ type: GetGuardEmployeeAction, guardemployee, IdPersonaVig });
                }
                else {

                    dispatch({ type: GetGuardEmployeeAction, guardemployee: objeto, IdPersonaVig: IdPersonaVig });
                }
            }
        }
    },
    getCompany: IdEmpresaVigilancia => async (dispatch, getState) => {
        const token = getState().login.login.access_token;
        if (token) {
            const url = Settings.default.key.url;
            //const objeto: Empresa = Object.assign({}, getState().guardemployee)
            dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: getState().guardemployee.IdPersonaVig });
            const response = await fetch(url + `api/SurveillanceCompany/GetById/${IdEmpresaVigilancia}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + token
                }
            });
            if (response.ok) {
                const surveillancecompany = await response.json();
                dispatch({ type: GetSurveillanceCompanyAction, surveillancecompany });
            }
            else {
                dispatch({ type: GetSurveillanceCompanyAction, surveillancecompany: defaultSurveillanceCompany });
            }
        }
    },
    getConfigTurn: IdGuardia => async (dispatch, getState) => {
        const token = getState().login.login.access_token;
        if (token) {
            const url = Settings.default.key.url;
            //const objeto: Empresa = Object.assign({}, getState().guardemployee)
            dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: getState().guardemployee.IdPersonaVig });
            const response = await fetch(url + `api/SurveillanceCompany/GetById/${IdGuardia}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + token
                }
            });
            if (response.ok) {
                const configturn = await response.json();
                console.log("DATA: " + configturn);
                dispatch({ type: GetConfigTurnAction, configturn });
            }
            else {
                dispatch({ type: GetConfigTurnAction, configturn: defaultConfigTurn });
            }
        }
    },
    getRelationship: () => async (dispatch, getState) => {
        const token = getState().login.login.access_token;
        if (token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: getState().guardemployee.IdPersonaVig });
            const response = await fetch(url + 'api/RelationshipType/GetAll', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + token
                }
            });
            if (response.ok) {
                const relationships = await response.json();
                dispatch({ type: GetRelationshipAction, relationships });
            }
            else {
                dispatch({ type: GetRelationshipAction, relationships: [] });
            }
        }
    },
    changeImage: file => async (dispatch, getState) => {
        dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: getState().guardemployee.IdPersonaVig });
        const response = await fetch('api/Upload', {
            credentials: 'same-origin',
            method: 'post',
            headers: {
                'Content-Type': 'false',
                'processData': 'false'
            },
            body: file//e.target.files[0]
        });
        if (response.ok) {
            const file = await response.json();
            dispatch({ type: HandleChangeImageAction, file });
        }
        else {
            console.log('Error en Change Image:' + response.statusText);
            dispatch({ type: HandleChangeImageAction, file: NullImage });
        }
    },

    create: (objeto, persontime, accesos) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            objeto.IdUsuario = getState().login.user.Id;
            let person = {
                ...Person.defaultPerson,
                PrimerApellido: objeto.PrimerApellido,
                PrimerNombre: objeto.PrimerNombre,
                SegundoApellido: objeto.SegundoApellido,
                SegundoNombre: objeto.SegundoNombre,
                DireccionHabitacion: objeto.DireccionVig || ' ',
                Email: objeto.EmailVig || ' ',
                IdDocIdentidad: objeto.IdDocIdentidad,
                TelefonoMovil1: objeto.TelefonoMovil1,
                FechaNacimiento: objeto.FechaNacimiento
            };
            const fetchPerson = await Person.create(person, access_token);
            if (fetchPerson.ok) {
                const IdPersona = await fetchPerson.json();
                objeto.IdPersonaVig = IdPersona;
                const searchParams2 = Object.keys(objeto).map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
                }).join('&');
                let params = {
                    url: Settings.default.key.url,
                    action: "api/VigitabletConfig/CreateGuardEmployeeInfo",
                    method: "PUT",
                    access_token: access_token,
                    searchParams: searchParams2
                };
                const IdUnidad = 10;
                dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: getState().guardemployee.IdPersonVig });
                const response = await Utils.exec(params);
                if (response.ok) {
                    let unidadpersona = defaultUnidadPersona;
                    unidadpersona.IdPersona = objeto.IdPersonaVig;
                    unidadpersona.IdUnidad = IdUnidad;
                    unidadpersona.Telefono = objeto.TelefonoMovil1;
                    unidadpersona.IdUsuario = objeto.IdUsuario;
                    const fetchUnidadPerson = await AddPerson(unidadpersona, access_token);
                    if (fetchUnidadPerson.ok) {
                        //fetchUnidadPerson.json()
                        persontime.IdPersona = objeto.IdPersonaVig;
                        persontime.IdUnidad = IdUnidad;
                        const fetchPersonTime = await Access.createPersonTime(persontime, accesos, access_token);
                        if (fetchPersonTime.ok) {
                            const IdHorario = await fetchPersonTime.json();
                            let persontimeaccess = Access.defaultUnidadPersonaHorarioAcceso;
                            persontimeaccess.IdHorario = IdHorario;
                            persontimeaccess.accesos = accesos.join(',');
                            const searchParams2 = Object.keys(persontimeaccess).map((key) => {
                                return encodeURIComponent(key) + '=' + encodeURIComponent(persontimeaccess[key]);
                            }).join('&');
                            const fetchTask2 = await fetch(url + `api/Unit/AddPersonTimeAccessByTime`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': "application/x-www-form-urlencoded",
                                    'Authorization': 'bearer ' + access_token
                                },
                                body: searchParams2
                            });
                            //return fetchTask2;


                            persontime.IdHorario = IdHorario;//await fetchAccess.json();
                            unidadpersona = persontime.IdHorario;
                            dispatch({ type: CreateGuardEmployeeAction, guardemployee: objeto, persontime, persontimeaccess });
                        }
                        else {
                            dispatch({ type: UpdateEmployeeErrorAction, response: fetchPersonTime });
                        }
                        //console.log(response.status + ": " + response.statusText);
                    }
                    else {
                        dispatch({ type: UpdateEmployeeErrorAction, response: fetchUnidadPerson });
                    }
                }
                else {
                    //console.log('Error in create:' + reason);
                    dispatch({ type: UpdateEmployeeErrorAction, response });
                }
            }
            else {
                //console.log('Error in create:' + reason);
                dispatch({ type: UpdateEmployeeErrorAction, response: fetchPerson });
            }
        }
    },
    update: (objeto, persontime, accesos) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const person = {
                ...Person.defaultPerson,
                IdPersona: objeto.IdPersonaVig,
                PrimerApellido: objeto.PrimerApellido,
                PrimerNombre: objeto.PrimerNombre,
                SegundoApellido: objeto.SegundoApellido,
                SegundoNombre: objeto.SegundoNombre,
                DireccionHabitacion: objeto.DireccionVig || ' ',
                Email: objeto.EmailVig || ' ',
                IdDocIdentidad: objeto.IdDocIdentidad,
                TelefonoMovil1: objeto.TelefonoMovil1,
                FechaNacimiento: objeto.FechaNacimiento,
                IdUsuarioCrea: Settings.default.key.user,
            };
            dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: objeto.IdPersonaVig });
            let fetchPerson = await Person.update(person, access_token);
            if (fetchPerson.ok) {
                const searchParams = Object.keys(objeto).map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
                }).join('&');
                const url = Settings.default.key.url;
                const response = await fetch(url + "api/VigitabletConfig/UpdateGuardEmployeeInfo", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    },
                    body: searchParams
                });

                if (response.ok) {
                    //var result = await response.json();
                    //dispatch(Access.updatePersonTime(persontime, accesos, token));
                    Access.updatePersonTime(persontime, accesos, access_token);
                    dispatch({ type: UpdateGuardEmployeeAction, guardemployee: objeto });
                }
                else {
                    console.log('Error in Update:' + response.statusText);
                    dispatch({ type: UpdateEmployeeErrorAction, response });
                }
            }
            else {
                dispatch({ type: UpdateEmployeeErrorAction, response: fetchPerson });
            }
        }
    },
    delete: (IdPersonaVig) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = '';
            const url = Settings.default.key.url;

            //dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: IdPersonaVig });
            const response_ = await fetch(url + `api/VigitabletConfig/DeleteConfigTurnGuardsByGuardEmployee/${IdPersonaVig}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response_.ok) {
                const response = await fetch(url + `api/VigitabletConfig/DeleteGuardEmployeeInfo/${IdPersonaVig}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    },
                    body: searchParams
                });
                if (response.ok) {
                    //const data = await {
                    dispatch({ type: DeleteGuardEmployeeAction, guardemployee: defaultGuardEmployee });
                }
                else {
                    console.log('Error in Update:' + response.statusText);
                    dispatch({ type: UpdateEmployeeErrorAction, response });
                }
            }
            else {
                dispatch({ type: UpdateEmployeeErrorAction, response: response_ });
            }
        }
    },
    handleChange: () => async (dispatch, getState) => dispatch({ type: HandleChangeAction }),
    getGuardEmployees: () => async (dispatch, getState) => {
        const token = getState().login.login.access_token;
        if (token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: 0/* getState().guardemployee.IdPersonaVig*/ });
            const response = await fetch(url + 'api/VigitabletConfig/GetAllGuardEmployeeInfo', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + token
                }
            })
            if (response.ok) {
                const guardemployees = await response.json();
                dispatch({ type: GetGuardEmployeesAction, guardemployees });
            } else {
                dispatch({ type: UpdateEmployeeErrorAction, response });
            }
        } else {
            dispatch({ type: GetGuardEmployeesAction, guardemployees: [] });
        }
    },
    getSurveillanceCompanys: () => async (dispatch, getState) => {
        const token = getState().login.login.access_token;
        if (token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: getState().guardemployee.IdPersonaVig });
            const response = await fetch(url + "api/SurveillanceCompany/GetAll", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + token
                }
            });
            if (response.ok) {
                const surveillancecompanys = await response.json();
                dispatch({ type: GetSurveillanceCompanysAction, surveillancecompanys });
            } else {
                console.log(response);
                dispatch({ type: UpdateEmployeeErrorAction, response });
            }
        }
    },
    getConfigTurns: (IdPersonaVig) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestGuardEmployeeInfoAction, IdPersonaVig: IdPersonaVig });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigTurnsByIdPersonaVig/${IdPersonaVig}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const configturns = await response.json();
                dispatch({ type: GetConfigTurnsAction, configturns });
            }
            else {
                dispatch({ type: GetConfigTurnsAction, configturns: [] });
            }
        } else {
            dispatch({ type: GetConfigTurnsAction, configturns: [] });
        }

    },
    getSession: getSession,
};
const unloadedState = {
    login: defaultLogin,
    guardemployee: defaultGuardEmployee,
    guardemployees: [],
    IdPersonaVig: 0,
    response: defaultResponse,
    fileName: '',
    errorMessage: '',
    relationshipTypes: [],
    configturn: defaultConfigTurn,
    configturns: [],
    isLoading: false,
    mode: Utils.Mode.Read,
    surveillancecompanys: [],
    surveillancecompany: defaultSurveillanceCompany,
    persontime: defaultUnidadPersonaHorario,
    accesses: [],
    persontimeaccess: [],
    IdHorario: 0,
    //contract: defaultContrato
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    switch (action.type) {
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
        case GetGuardEmployeeAction:
            if (action.IdPersonaVig === state.IdPersonaVig) {
                return {
                    ...state,
                    guardemployee: action.guardemployee,
                    IdPersonaVig: action.IdPersonaVig,
                    isLoading: false
                };
            }
            break;
        case GetRelationshipAction:
            return {
                ...state,
                isLoading: false,
                relationshipTypes: action.relationships

            };
        case HandleChangeImageAction:
            return {
                ...state,
                isLoading: false,
                fileName: JSON.parse(String(action.file)).fileName
            };
        case HandleChangeAction:
            return {
                ...state,
                isLoading: false
            };
        case CreateGuardEmployeeAction:
            return {
                ...state,
                guardemployee: action.guardemployee,
                persontime: action.persontime,
                persontimeaccess: action.persontimeaccess,
                isLoading: false
            };
        case UpdateGuardEmployeeAction:
            return {
                ...state,
                isLoading: false,
                guardemployee: action.guardemployee
            };
        case UpdateEmployeeErrorAction:
            //console.log("Error al actualizar");
            return {
                ...state,
                isLoading: false,
                errorMessage: action.response.statusText
            };
        case DeleteGuardEmployeeAction:
            return {
                ...state,
                guardemployee: action.guardemployee,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false,
                //contract: action.contract
            };
        case GetSurveillanceCompanyAction:
            return {
                ...state,
                surveillancecompany: action.surveillancecompany,
                isLoading: false
            };
        case GetConfigTurnAction:
            return {
                ...state,
                configturn: action.configturn,
                isLoading: false
            };
        case GetConfigTurnsAction:
            return {
                ...state,
                configturns: action.configturns,
                isLoading: false
            };
        case RequestGuardEmployeeInfoAction:
            return {
                ...state,
                IdPersonaVig: action.IdPersonaVig,
                isLoading: true
            };
        case 'SET_MODE':
            return {
                ...state,
                mode: action.mode,
                //IdPersonaVig: action.mode == Utils.Mode.Update ? state.IdPersonaVig : 0,
                //guardemployee: action.mode == Utils.Mode.Create ? defaultGuardEmployee : state.guardemployee,
                isLoading: false
            };
        case GetUnidadPersonaHorarioAction:
            return {
                ...state,
                //isLoading: false,
                persontime: action.persontime
            };
        case 'ERROR_REQUEST_PERSON_TIME':
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case RequestUnidadPersonaHorariosAction:
            return {
                ...state,
                //isLoading: true
            };
        case CreateUnidadPersonaHorarioAction:
            return {
                ...state,
                isLoading: false,
                persontime: action.persontime,
                IdHorario: action.IdHorario
            };
        case UpdateUnidadPersonaHorarioAction:
            return {
                ...state,
                isLoading: false,
                persontime: action.persontime,
                IdHorario: action.IdHorario
            };
        case 'GET_ACCESSES':
            return {
                ...state,
                //isLoading: false,
                accesses: action.accesses
            };
        case 'ERROR_REQUEST_ACCESSES':
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case 'CREATE_PERSON_TIME_ACCESS':
            return {
                ...state,
                isLoading: false,
                IdHorario: action.IdHorario
            };
        case 'GET_PERSON_TIME_ACCESS':
            return {
                ...state,
                //isLoading: false,
                persontimeaccess: action.persontimeaccess
            };
        case 'ERROR_REQUEST_PERSON_TIME_ACCESS':
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case 'GET_REQUEST_PERSON_TIME':
            return {
                ...state,
                //isLoading: true
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};