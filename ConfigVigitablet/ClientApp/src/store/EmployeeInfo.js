import { defaultLogin } from '../store/Login';
import { defaultErrors, Touched } from '../store/Errors';
import { defaultConfigTurn } from '../store/ConfigTurn';
import * as  RelationshipType from '../store/RelationshipType';
import { defaultMaintenanceCompany, GetMaintenanceCompanysAction } from '../store/MaintenanceCompany';
import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import * as Person from '../store/Person';
import * as Access from '../store/Access';
import * as UnidadPersonaStore from '../store/UnidadPersona';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface EmployeeState {
    [key: string]: any
    employee: Employee;
    IdPersonaEmp: number,
    login: Login;
    fileName: string;
    errorMessage: string;
    relationshipTypes: RelationshipType.RelationshipType[];
    company: MaintenanceCompany;
    configturn: ConfigTurn;
    employees: Employee[];
    mode: Utils.Mode;
    maintenancecompanys: MaintenanceCompany[];
    persontime: Access.UnidadPersonaHorario;
    accesses: Access.Access[];
    persontimeaccess: Access.UnidadPersonaHorarioAcceso[];
    IdHorario: number;
    occupations: Occupation[],

}*/
/*
export interface Employee {
    [k: string]: any
    ContactoEmp1: string;
    ContactoEmp2: string;
    IdParentescoEmp1: number;
    IdParentescoEmp2: number;
    TelefonosContactoEmp1: string;
    TelefonosContactoEmp2: string;
    EmailEmp: string;
    DireccionEmp: string;
    RutaImagenEmp: string;
    IdEmpresaMantenimiento: number;
    FechaUltActualizacion: string;
    IdUsuario: number;
    IdPersonaEmp: number;
    TipoParentesco1: string;
    TipoParentesco2: string;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    EmpresaMantenimiento: string;
    IdDocIdentidad: string;
    TelefonoMovil1: string;
    Usuario: string;
    FechaNacimiento: string;
    IdOficio: number;
    Oficio: string;
}
*/
export const defaultEmployee = {
    ContactoEmp1: '',
    ContactoEmp2: '',
    IdParentescoEmp1: 0,
    IdParentescoEmp2: 0,
    TelefonosContactoEmp1: '',
    TelefonosContactoEmp2: '',
    EmailEmp: '',
    DireccionEmp: '',
    RutaImagenEmp: '',
    IdEmpresaMantenimiento: 0,
    FechaUltActualizacion: new Date().toISOString().split('T')[0],
    IdUsuario: 0,
    IdPersonaEmp: 19773,
    TipoParentesco1: '',
    TipoParentesco2: '',
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    EmpresaMantenimiento: '',
    IdDocIdentidad: '',
    TelefonoMovil1: '',
    Usuario: '',
    FechaNacimiento: '',
    IdOficio: 0,
    Oficio: ''
};
/*
export interface Occupation {
    IdOficio: number;
    DescOficio: string;
}
*/
/*
export const defaultOccupation: Occupation = {
    IdOficio: 0,
    DescOficio: '',
}
*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.
const ErrorGetRelationshipAction = 'ERROR_GET_RELATIONSHIPS';
const UpdateEmployeeAction = 'UPDATE_EMPLOYEE';
const CreateEmployeeAction = 'CREATE_EMPLOYEE';
const GetRelationshipAction = 'GET_RELATIONSHIPS';
const GetEmployeeAction = 'GET_EMPLOYEE';
const UpdateEmployeeErrorAction = 'UPDATE_EMPLOYEE_ERROR';
const HandleChangeAction = 'ON_CHANGE';
const HandleChangeImageAction = 'ON_CHANGE_IMAGE';
const DeleteEmployeeAction = 'DELETE_EMPLOYEE';
const GetSessionAction = 'GET_SESSION';
const GetMaintenanceCompanyAction = 'GET_MAIMTENANCE_COMPANY';
const GetConfigTurnAction = 'GET_CONFIG_TURN';
const RequesfEmployeeInfoAction = 'REQUEST_EMPLOYEE';
const ErrorEmployeeAction = 'ERROR_EMPLOYEE';
export const GetEmployeesAction = 'GET_EMPLOYEES';
const GetOccupationspAction = 'GET_OCCUPATIONS';
////////////////////////////////////////////////////////////////////////////////////


export const ErrorsInit = {
    ContactoEmp1: defaultErrors,
    ContactoEmp2: defaultErrors,
    IdParentescoEmp1: defaultErrors,
    IdParentescoEmp2: defaultErrors,
    TelefonosContactoEmp1: defaultErrors,
    TelefonosContactoEmp2: defaultErrors,
    EmailEmp: defaultErrors,
    DireccionEmp: defaultErrors,
    RutaImagenEmp: defaultErrors,
    IdEmpresaMantenimiento: defaultErrors,
    FechaUltActualizacion: defaultErrors,
    IdUsuario: defaultErrors
};

export const touchedInit = {
    ContactoEmp1: false,
    ContactoEmp2: false,
    IdParentescoEmp1: false,
    IdParentescoEmp2: false,
    TelefonosContactoEmp1: false,
    TelefonosContactoEmp2: false,
    EmailEmp: false,
    DireccionEmp: false,
    RutaImagenEmp: false,
    IdEmpresaMantenimiento: false,
    FechaUltActualizacion: false,
    IdUsuario: false
};
/*
export interface Empl {
    [key: string]: any
    employee: Employee,
    listdays: number[],
    file: string, imagePreviewUrl: string | ArrayBuffer | null, fileName: string,// { fileName: string }, errorMessage: string[],
    errors: Errors,
    touched: Touched,
}*/
export const limitLength = (str, length) => str.substring(0, length);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*interface RespImage {
    [k: string]: string
    fileName: string
}*/

const NullImage = { fileName: '' };


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = CreateEmployeeAction | UpdateEmployeeAction | UpdateEmployeeErrorAction | DeleteEmployeeAction | GetConfigTurnAction
    | HandleChangeAction | HandleChangeImageAction | GetRelationshipAction | GetEmployeeAction | GetSessionAction | GetMaintenanceCompanyAction
    | RequesfEmployeeInfoAction | ErrorAction | ErrorGetRelationshipAction | GetEmployeesAction | Utils.SetModeAction | GetMaintenanceCompanysAction
    | Access.KnownPersonTimeAction | Access.CreateUnidadPersonaHorarioAction | Access.AccessesAction | Access.CreateUnidadPersonaHorarioAccesoAction
    | Access.KnownPersonTimeAccessAction | GetOccupationspAction;
    */
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    createPersonTime: Access.create,
    getHorarios: Access.GetPersonTimeByPerson,
    getAccesos: Access.GetAccessByContract,
    AddPersonTimeAccess: Access.AddPersonTimeAccess,
    GetPersonTimeByPerson: Access.GetPersonTimeByPerson,
    GetPersonAccessByTime: Access.GetPersonAccessByTime,
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    },
    getEmployee: (IdPersonaEmp) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            if (IdPersonaEmp !== getState().employee.IdPersonaEmp) {
                const url = Settings.default.key.url;
                const objeto = Object.assign({}, getState().employee.employee);
                dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: IdPersonaEmp });
                const response = await fetch(url + `api/VigitabletConfig/GetEmployeeInfo/${IdPersonaEmp}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                });
                const data = await response.json();
                dispatch({ type: GetEmployeeAction, employee: data, IdPersonaEmp: IdPersonaEmp });
                /*}).catch(reason => {
                    console.log('Error in EmployeeInfo getEmployee:' + reason);
                    dispatch({ type: GetEmployeeAction, employee: objeto, IdPersonaEmp: IdPersonaEmp });
                });*/
                //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            }
        }
    },
    getCompany: (IdEmpresaMantenimiento) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            if (IdEmpresaMantenimiento !== -1) {
                dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
                const response = await fetch(url + `api/MaintenanceCompany/GetById/${IdEmpresaMantenimiento}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: GetMaintenanceCompanyAction, company: data });
                }
                else {
                    dispatch({ type: GetMaintenanceCompanyAction, company: defaultMaintenanceCompany });
                }
            } else {
                dispatch({ type: GetMaintenanceCompanyAction, company: defaultMaintenanceCompany });
            }
        } else {
            dispatch({ type: GetMaintenanceCompanyAction, company: defaultMaintenanceCompany });
        }

    },
    getConfigTurn: (IdGuardia) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
            const response = await fetch(url + `api/MaintenanceCompany/GetById/${IdGuardia}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            const data = await response.json();
            dispatch({ type: GetConfigTurnAction, configturn: data });
            /*}).catch (reason => {
        console.log(reason);
        dispatch({ type: GetConfigTurnAction, configturn: defaultConfigTurn });
    });*/
        } else {
            dispatch({ type: GetConfigTurnAction, configturn: defaultConfigTurn });
        }

    },
    getConfigTurns: (IdPersonaVig) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigTurnsByIdPersonaVig/${IdPersonaVig}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            const data = await response.json();
            dispatch({ type: GetConfigTurnAction, configturn: data });
            /* }).catch(reason => {
                 console.log(reason);
                 dispatch({ type: GetConfigTurnAction, configturn: defaultConfigTurn });
             });*/
            //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        } else {
            dispatch({ type: GetConfigTurnAction, configturn: defaultConfigTurn });
        }

    },
    getRelationship: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            let fetchTask = RelationshipType.getRelationship(getState().login.login.access_token).then(data => {
                dispatch({ type: GetRelationshipAction, relationshipTypes: data });
            }).catch(reason => {
                console.log('Error in GET_RELATIONSHIPS:' + reason);
                dispatch({ type: ErrorGetRelationshipAction, response: reason });
            });
            //addTask(fetchTask);// Ensure server-side prerendering waits for this to complete
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
        } else {
            dispatch({ type: GetRelationshipAction, relationshipTypes: [] });
        }
    },
    changeImage: (file) => async (dispatch, getState) => {
        const response = await fetch('api/Upload', {
            credentials: 'same-origin',
            method: 'post',
            headers: {
                'Content-Type': 'false',
                'processData': 'false'
            },
            body: file//e.target.files[0]
        });
        dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
        const file = await response.json();
        if (response.ok) {
            dispatch({ type: 'ON_CHANGE_IMAGE', file });
        } else {
            dispatch({ type: 'ON_CHANGE_IMAGE', file: NullImage });
        }
    },
    create: (objeto, persontime, accesos) => (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');

            let person = {
                ...Person.defaultPerson,
                PrimerApellido: objeto.PrimerApellido,
                PrimerNombre: objeto.PrimerNombre,
                SegundoApellido: objeto.SegundoApellido,
                SegundoNombre: objeto.SegundoNombre,
                DireccionHabitacion: objeto.DireccionEmp || ' ',
                Email: objeto.EmailEmp || ' ',
                IdDocIdentidad: objeto.IdDocIdentidad,
                TelefonoMovil1: objeto.TelefonoMovil1,
                FechaNacimiento: objeto.FechaNacimiento
            };
            let fetchPerson = Person.create(person, access_token).then(idPersona => {
                objeto.IdPersonaEmp = idPersona;
                const searchParams2 = Object.keys(objeto).map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
                }).join('&');
                let params = {
                    url: Settings.default.key.url,
                    action: "api/VigitabletConfig/CreateEmployeeInfo",
                    method: "PUT",
                    access_token: access_token,
                    searchParams: searchParams2
                };

                let response = Utils.defaultResponse;
                const IdUnidad = 10;

                let fetchTask = Utils.exec(params).then(val => {
                    let unidadpersona = UnidadPersonaStore.defaultUnidadPersona;
                    unidadpersona.IdPersona = objeto.IdPersonaEmp;
                    unidadpersona.IdUnidad = IdUnidad;
                    unidadpersona.Telefono = objeto.TelefonoMovil1;
                    unidadpersona.IdUsuario = objeto.IdUsuario;
                    UnidadPersonaStore.AddPerson(unidadpersona, access_token);
                    persontime.IdPersona = objeto.IdPersonaEmp;
                    persontime.IdUnidad = IdUnidad;
                    Access.createPersonTime(persontime, accesos, access_token);
                    response = val;
                    console.log(response.status + ": " + response.statusText);
                    dispatch({ type: CreateEmployeeAction, employee: objeto, IdPersonaEmp: objeto.IdPersonaEmp });
                }).catch(reason => {
                    console.log('Error in create:' + reason);
                    dispatch({ type: UpdateEmployeeErrorAction, employee: objeto });
                });
                //addTask(fetchTask);// Ensure server-side prerendering waits for this to complete
                dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
            });
            //addTask(fetchPerson);
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: objeto.IdPersonaEmp });
        }
    },
    update: (objeto, persontime, accesos) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            if (getState().employee.fileName) {
                let obj = JSON.parse(String(getState().employee.fileName));
                objeto.RutaImagenEmp = obj.fileName;
            }
            let person = {
                ...Person.defaultPerson,
                IdPersona: objeto.IdPersonaEmp,
                PrimerApellido: objeto.PrimerApellido,
                PrimerNombre: objeto.PrimerNombre,
                SegundoApellido: objeto.SegundoApellido,
                SegundoNombre: objeto.SegundoNombre,
                DireccionHabitacion: objeto.DireccionEmp || ' ',
                Email: objeto.EmailEmp || ' ',
                IdDocIdentidad: objeto.IdDocIdentidad,
                TelefonoMovil1: objeto.TelefonoMovil1,
                FechaNacimiento: objeto.FechaNacimiento
            };
            let fetchPerson = Person.update(person, access_token).then(response => {
                // objeto.IdPersonaEmp = idPersona;
            }).catch(reason => { });
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');

            let url = Settings.default.key.url;
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: objeto.IdPersonaEmp });
            const response = await fetch(url + "api/VigitabletConfig/UpdateEmployeeInfo", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            const data = await response.json();
            dispatch(Access.updatePersonTime(persontime, accesos, access_token));
            dispatch({ type: UpdateEmployeeAction, IdPersonaEmp: objeto.IdPersonaEm, employee: objeto });
            /*    }).catch(reason => {
                    console.log('Error in Update:' + reason);
                    dispatch({ type: UpdateEmployeeErrorAction, employee: objeto });
                });*/
            //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        }
    },
    delete: (IdPersonaEmp) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = '';
            const url = Settings.default.key.url;
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: IdPersonaEmp });
            const response = await fetch(url + `api/VigitabletConfig/DeleteEmployeeInfo/${IdPersonaEmp}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            const data = await response.json();
            dispatch({ type: DeleteEmployeeAction, response: data });
            /* }).catch(reason => {
                 console.log('Error in Deñete:' + reason);
                 dispatch({ type: DeleteEmployeeAction, response: reason });
             });*/
        }
    },
    getEmployees: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
            const response = await fetch(url + 'api/VigitabletConfig/GetAllEmployeeInfo', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            const employees = await response.json();
            dispatch({ type: GetEmployeesAction, employees });
            /*  }).catch(reason =>
                  dispatch({ type: GetEmployeesAction, employees: [] }));*/
        }
    },
    getMaintenanceCompanys: () => async (dispatch, getState) => {
        const token = getState().login.login.access_token;
        if (token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
            const response = await fetch(url + "api/MaintenanceCompany/GetAll", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + getState().login.login.access_token
                }
            });
            const maintenancecompanys = await response.json();
            dispatch({ type: GetMaintenanceCompanysAction, maintenancecompanys });
            /*}).catch(reason => {
                console.log(reason);
                dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.IdPersonaEmp });
            });*/
        }

    },
    getOccupations: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            const objeto = Object.assign({}, getState().employee.employee);
            dispatch({ type: RequesfEmployeeInfoAction, IdPersonaEmp: getState().employee.employee.IdPersonaEmp });
            const response = await fetch(url + `api/Occupation/GetAll`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const occupations = await response.json();
                dispatch({ type: GetOccupationspAction, occupations });
            }
            else {
                dispatch({ type: GetOccupationspAction, occupations: [] });
            }
        }

    },
    handleChange: () => (dispatch, getState) => dispatch({ type: 'ON_CHANGE' }),
    setModeCreate: () => (dispatch, getState) => dispatch({ type: 'SET_MODE', mode: Utils.Mode.Create }),
    setModeEdit: () => (dispatch, getState) => dispatch({ type: 'SET_MODE', mode: Utils.Mode.Update }),
    setModeRead: () => (dispatch, getState) => dispatch({ type: 'SET_MODE', mode: Utils.Mode.Read })
};

const unloadedState = {
    IdPersonaEmp: 0,
    configturn: defaultConfigTurn,
    isLoading: false,
    employees: [],
    employee: defaultEmployee,
    login: defaultLogin,
    fileName: '',
    errorMessage: '',
    relationshipTypes: [],
    company: defaultMaintenanceCompany,
    mode: Utils.Mode.Read,
    maintenancecompanys: [],
    persontime: Access.defaultUnidadPersonaHorario,
    accesses: [],
    persontimeaccess: [],
    IdHorario: 0,
    occupations: []

};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.


export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case ErrorGetRelationshipAction:
            return {
                ...state,
                isLoading: false,
                relationshipTypes: [],
                errorMessage: action.response.statusText
            };
        case RequesfEmployeeInfoAction:
            return {
                ...state,
                IdPersonaEmp: action.IdPersonaEmp,
                isLoading: true
            };
        case GetEmployeeAction:
            console.log(action.employee.FechaNacimiento);
            if (action.IdPersonaEmp === state.IdPersonaEmp) {
                return {
                    ...state,
                    employee: action.employee,
                    IdPersonaEmp: action.IdPersonaEmp,
                    isLoading: false
                };
            }
            break;
        case "GET_RELATIONSHIPS":
            return {
                ...state,
                relationshipTypes: action.relationshipTypes,
                isLoading: false
            };
        case "ON_CHANGE_IMAGE":
            return {
                ...state,
                employee: {
                    ...state.employee,
                    ['RutaImagenEmp']: JSON.parse(String(action.file)).fileName
                },
                fileName: JSON.parse(String(action.file)).fileName,
                isLoading: false
            };
        case 'ON_CHANGE':
            return {
                ...state,
                isLoading: false
            };
        case CreateEmployeeAction:
            return {
                ...state,
                IdPersonaEmp: action.IdPersonaEmp,
                employee: action.employee,
                isLoading: false

            };
        case UpdateEmployeeAction:
            return {
                ...state,
                employee: action.employee,
                IdPersonaEmp: action.IdPersonaEmp,
                isLoading: false

            };
        case UpdateEmployeeErrorAction:
            //alert("Error al actualizar");
            return {
                ...state,
                action: action.employee,
                isLoading: false
            };
        case DeleteEmployeeAction:
            return {
                ...state,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case GetMaintenanceCompanyAction:
            return {
                ...state,
                company: action.company,
                isLoading: false
            };
        case GetConfigTurnAction:
            return {
                ...state,
                configturn: action.configturn,
                isLoading: false
            };
        case ErrorEmployeeAction:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.response.statusText
            };
        case GetEmployeesAction:
            return {
                ...state,
                isLoading: false,
                employees: action.employees
            };
        case 'SET_MODE':
            return {
                ...state,
                mode: action.mode,
                //IdPersonaEmp: action.mode == Utils.Mode.Update ? state.IdPersonaEmp : 0,
                //employee: action.mode == Utils.Mode.Create ? defaultEmployee : state.employee,
                isLoading: false
            };
        case GetMaintenanceCompanysAction:
            return {
                ...state,
                isLoading: false,
                maintenancecompanys: action.maintenancecompanys
            };
        case Access.GetUnidadPersonaHorarioAction:
            return {
                ...state,
                isLoading: false,
                persontime: action.persontime
            };
        case 'ERROR_REQUEST_PERSON_TIME':
            return {
                ...state
            };
        case Access.RequestUnidadPersonaHorariosAction:
            return {
                ...state,
                isLoading: true
            };
        case 'CREATE_PERSON_TIME':
            return {
                ...state,
                persontime: action.persontime,
                IdHorario: action.IdHorario
            };
        case Access.UpdateUnidadPersonaHorarioAction:
            return {
                ...state,
                persontime: action.persontime,
                IdHorario: action.IdHorario
            };
        case 'GET_ACCESSES':
            return {
                ...state,
                accesses: action.accesses
            };
        case 'ERROR_REQUEST_ACCESSES':
            return {
                ...state,
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
                isLoading: false,
                persontimeaccess: action.persontimeaccess
            };
        case 'ERROR_REQUEST_PERSON_TIME_ACCESS':
            return {
                ...state,
                isLoading: false,
                response: action.response

            };
        case GetOccupationspAction:
            return {
                ...state,
                isLoading: false,
                occupations: action.occupations
            };
        case 'GET_REQUEST_PERSON_TIME':
            return {
                ...state
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};