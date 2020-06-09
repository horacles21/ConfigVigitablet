import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
import { defaultLogin, GetSessionAction } from '../store/Login';
import { GetJobTitlesAction, getJobTitles } from '../store/JobTitle';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ServiceUnitManagementsState {
    isLoading: boolean;
    IdContract?: number;
    ServiceUnitManagements: ServiceUnitManagement[];
    ServiceUnitManagement: ServiceUnitManagement;
    login: LogIn;
    IdUnit: number
    jobtitles: JobTitle[];
}

export interface ServiceUnitManagement {
    [key: string]: any
    IdContrato: number;
    Contrato: string;
    IdUnidad: number;
    Unidad: string;
    DescServicio: string;
    GestionRequiereConfirmacion: boolean;
    GestionNotificacionSMS: boolean;
    GestionNotificacionEmail: boolean;
    GestionContacto1: string;
    GestionContacto2: string;
    GestionCargoContacto1: number;
    GestionCargoContacto2: number;
    GestionTelefonoContacto1: string;
    GestionTelefonoContacto2: string;
    GestionEmailContacto1: string;
    GestionEmailContacto2: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}
*/
export const defaultServiceUnitManagement = {
    IdContrato: 0,
    Contrato: '',
    IdUnidad: 0,
    Unidad: '',
    DescServicio: '',
    GestionRequiereConfirmacion: false,
    GestionNotificacionSMS: false,
    GestionNotificacionEmail: false,
    GestionContacto1: '',
    GestionContacto2: '',
    GestionCargoContacto1: 0,
    GestionCargoContacto2: 0,
    GestionTelefonoContacto1: '',
    GestionTelefonoContacto2: '',
    GestionEmailContacto1: '',
    GestionEmailContacto2: '',
    FechaUltActualizacion: '',
    IdUsuario: 0,
    Usuario: ''
};

/*
export interface Unit {
    [key: string]: any
    IdUnidad: number;
    IdContrato: number;
    Contrato: string;
    Nombre: string;
    Torre: string;
    Piso: string;
    CodigoTeclado: string;
    CodigoAutorizacionAcceso: number;
    ModoVacaciones: boolean;
    Activa: boolean;
    IdUnidadMaestra: number;
    UnidadMaestra: string;
    Seguridad: boolean;
    MaxSecundarios: number;
    AceptaInvitados: boolean;
    Image: string;
    JuntaCondominio: boolean;
    Vigilancia: boolean;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}
*/
export const defaultUnit = {
    IdUnidad: 0,
    IdContrato: 22,
    Contrato: '',
    Nombre: '',
    Torre: '',
    Piso: '',
    CodigoTeclado: '',
    CodigoAutorizacionAcceso: 0,
    ModoVacaciones: false,
    Activa: false,
    IdUnidadMaestra: 0,
    UnidadMaestra: '',
    Seguridad: false,
    MaxSecundarios: 0,
    AceptaInvitados: false,
    Image: '',
    JuntaCondominio: false,
    Vigilancia: false,
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 0,
    Usuario: ''
};

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export const RequestServiceUnitManagementsAction = 'REQUEST_SERVICE_UNIT_MANAGEMENT';
export const GetServiceUnitManagementAction = 'GET_SERVICE_UNIT_MANAGEMENT';
export const ReceiveServiceUnitManagementsAction = 'RECEIVE_SERVICE_UNIT_MANAGEMENT';
export const UpdateServiceUnitManagementAction = 'UPDATE_SERVICE_UNIT_MANAGEMENT';
export const CreateServiceUnitManagementAction = 'CREATE_SERVICE_UNIT_MANAGEMENT';
export const DeleteServiceUnitManagementAction = 'DELETE_SERVICE_UNIT_MANAGEMENT';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestServiceUnitManagementsAction | ReceiveServiceUnitManagementsAction | GetSessionAction | GetServiceUnitManagementAction
    | UpdateServiceUnitManagementAction | CreateServiceUnitManagementAction | DeleteServiceUnitManagementAction
    | GetJobTitlesAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
/*export const paramsCommand {
    action: string, method: string, access_token: string, searchParams: string,
}*/
export const exec = async (params) => {
    let url = Settings.default.key.url;
    return await fetch(url + params.action, {
        method: params.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + params.access_token,
        },
        body: params.searchParams
    });
    //.then(function (res) {
    //console.log('Resultado del exec: ' + res);
    //return await res
    //}).catch(function (ex) {
    //console.log('Error en exec:' + ex);
    //return ex
    //});
}
export const actionCreators = {
    getServiceUnitManagements: IdContract => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (IdContract !== getState().serviceunitmanagements.IdContract) {
                let url = Settings.default.key.url;
                dispatch({ type: RequestServiceUnitManagementsAction, IdContract: IdContract, IdUnit: 0 });
                let response = await fetch(`${url}api/VigitabletConfig/GetServiceUnitManagement/${IdContract}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token,
                    }
                });
                const data = await response.json();
                dispatch({ type: ReceiveServiceUnitManagementsAction, IdContract: IdContract, ServiceUnitManagements: data });


            }
        }
    },
    create: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let objUnit = defaultUnit;
            objUnit.IdContrato = 22;
            objUnit.Nombre = objeto.DescServicio;
            objUnit.Torre = "1";
            objUnit.Piso = "1";
            objUnit.CodigoTeclado = "998";
            objUnit.IdUnidadMaestra = 10;
            objUnit.IdUsuario = 12;

            const searchParams = Object.keys(objUnit).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objUnit[key]);
            }).join('&');

            let url = Settings.default.key.url;

            let response = await fetch(url + "api/Unit/Create", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
                body: searchParams
            });
            const data = await response.json();

            objeto.FechaUltActualizacion = Utils.Now();
            objeto.IdContrato = 22;
            objeto.IdUnidad = data;
            const searchParams_ = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            let params = {

                action: "api/VigitabletConfig/AddServiceUnitManagement",
                method: "PUT",
                access_token: access_token,
                searchParams: searchParams_
            };
            dispatch({ type: RequestServiceUnitManagementsAction, IdContract: objeto.IdContrato, IdUnit: objeto.IdUnidad })
            response = await exec(params);
            //alert(JSON.stringify(val));
            //response = JSON.parse(JSON.stringify(val));
            console.log(response.status + ": " + response.statusText);
            dispatch({ type: CreateServiceUnitManagementAction, ServiceUnitManagement: objeto, response });


        }

    },
    create_: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.FechaUltActualizacion = Utils.Now();
            objeto.IdContrato = 22;
            objeto.IdUnidad = 10;
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            let params = {

                action: "api/VigitabletConfig/AddServiceUnitManagement",
                method: "PUT",
                access_token: access_token,
                searchParams: searchParams
            };
            dispatch({ type: RequestServiceUnitManagementsAction, IdContract: objeto.IdContrato, IdUnit: objeto.IdUnidad });
            let response = await exec(params);
            //alert(JSON.stringify(val));
            //response = JSON.parse(JSON.stringify(val));
            console.log(response.status + ": " + response.statusText);
            dispatch({ type: CreateServiceUnitManagementAction, ServiceUnitManagement: objeto, response });

            //console.log('Error in create:' + reason);
            //dispatch({ type: CreateServiceUnitManagementAction, ServiceUnitManagement: objeto, response: reason });


        }

    },
    createUnit: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            objeto.FechaUltActualizacion = Utils.Now();
            objeto.IdContrato = 22;
            objeto.IdUnidad = 10;
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            let params = {

                action: "api/VigitabletConfig/AddServiceUnitManagement",
                method: "PUT",
                access_token: access_token,
                searchParams: searchParams
            };
            dispatch({ type: RequestServiceUnitManagementsAction, IdContract: objeto.IdContrato, IdUnit: objeto.IdUnidad });
            let response = await exec(params);
            //alert(JSON.stringify(val));
            //response = JSON.parse(JSON.stringify(val));
            //console.log(response.status + ": " + response.statusText);
            dispatch({ type: CreateServiceUnitManagementAction, ServiceUnitManagement: objeto, response });
            //console.log('Error in create:' + reason);
            //dispatch({ type: CreateServiceUnitManagementAction, ServiceUnitManagement: objeto, response: reason });



        }

    },
    update: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {

            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');

            let url = Settings.default.key.url;
            dispatch({ type: RequestServiceUnitManagementsAction, IdContract: objeto.IdContrato, IdUnit: objeto.IdUnidad });
            const response = await fetch(url + "api/VigitabletConfig/UpdateServiceUnitManagement", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
                body: searchParams,
            });
            const json = await response.json();
            dispatch({ type: UpdateServiceUnitManagementAction, ServiceUnitManagement: objeto, response });
            //console.log('Error in Update:' + reason);
            //dispatch({ type: UpdateServiceUnitManagementAction, ServiceUnitManagement: objeto, response: reason });


        }
    },
    delete: (idContract, idUnit) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let url = Settings.default.key.url;
            const objeto = defaultServiceUnitManagement;
            dispatch({ type: RequestServiceUnitManagementsAction, IdContract: idContract, IdUnit: idUnit });
            const response = await fetch(`${url}api/VigitabletConfig/DeleteServiceUnitManagement/${/*objeto.*/idContract}/${/*objeto.*/idUnit}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token,
                },
            });
            //console.log(json);
            dispatch({ type: DeleteServiceUnitManagementAction, ServiceUnitManagement: objeto, response });
        }
    },
    getServiceUnitManagement: (idContract, idUnit) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            if (/*idContract !== getState().serviceunitmanagements.IdContract &&*/ idUnit !== getState().serviceunitmanagements.IdUnit) {
                let url = Settings.default.key.url;
                dispatch({ type: RequestServiceUnitManagementsAction, IdContract: idContract, IdUnit: idUnit });
                let response = await fetch(url + `api/VigitabletConfig/GetServiceUnitManagement/${idContract}/${idUnit}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token,
                    }
                });
                const ServiceUnitManagement = await response.json();
                dispatch({ type: GetServiceUnitManagementAction, ServiceUnitManagement, IdContract: idContract, IdUnit: idUnit, response: Utils.defaultResponse });
                //console.log('Error in Update:' + reason);
                //dispatch({ type: GetServiceUnitManagementAction, ServiceUnitManagement: defaultServiceUnitManagement, IdContract: idContract, IdUnit: idUnit, response: reason });
            }
        }
    },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    },
    setDefault: (serviceUnitManagements) => (dispatch, getState) => {
        dispatch({
            type: ReceiveServiceUnitManagementsAction,
            IdContract: getState().serviceunitmanagements.IdContract || 0,
            ServiceUnitManagements: serviceUnitManagements,
        });
    },
    getJobTitles: getJobTitles,

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    ServiceUnitManagements: [],
    isLoading: false,
    login: defaultLogin,
    ServiceUnitManagement: defaultServiceUnitManagement,
    IdContract: 0,
    IdUnit: 0,
    jobtitles: [],
};
/*
export interface AttrField {
    errorMessage: string, isRequired: boolean, valid: boolean, isEmpty: boolean, isTouched: boolean,
}
*/
export const defaultAttrField = {
    errorMessage: '', isRequired: false, valid: true, isEmpty: false, isTouched: false,
}
function validateEmail(value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}
/*
export interface Errors {
    [key: string]: AttrField
    //   IdContrato: AttrField,
    //   IdUnidad: AttrField,
    DescServicio: AttrField,
    //GestionRequiereConfirmacion: AttrField,
    //GestionNotificacionSMS: AttrField,
    //GestionNotificacionEmail: AttrField,
    GestionContacto1: AttrField,
    GestionContacto2: AttrField,
    GestionCargoContacto1: AttrField,
    GestionCargoContacto2: AttrField
    GestionTelefonoContacto1: AttrField,
    GestionTelefonoContacto2: AttrField,
    GestionEmailContacto1: AttrField,
    GestionEmailContacto2: AttrField,
    //  IdUsuario: AttrField
}
export interface Touched {
    [key: string]: boolean
    //   IdContrato: boolean,
    //   IdUnidad: boolean,
    DescServicio: boolean,
    //GestionRequiereConfirmacion: boolean,
    //GestionNotificacionSMS: boolean,
    //GestionNotificacionEmail: boolean,
    GestionContacto1: boolean,
    GestionContacto2: boolean,
    GestionCargoContacto1: boolean,
    GestionCargoContacto2: boolean
    GestionTelefonoContacto1: boolean,
    GestionTelefonoContacto2: boolean,
    GestionEmailContacto1: boolean,
    GestionEmailContacto2: boolean,
    //  IdUsuario: boolean
}
*/
export const defaultTouched = {
    //   IdContrato: boolean,
    //   IdUnidad: boolean,
    DescServicio: false,
    //GestionRequiereConfirmacion: false,
    //GestionNotificacionSMS: false,
    //GestionNotificacionEmail: false,
    GestionContacto1: false,
    GestionContacto2: false,
    GestionCargoContacto1: false,
    GestionCargoContacto2: false,
    GestionTelefonoContacto1: false,
    GestionTelefonoContacto2: false,
    GestionEmailContacto1: false,
    GestionEmailContacto2: false,
    //  IdUsuario: false
}
export const defaultErrors = {

    //   IdContrato: AttrField,
    //   IdUnidad: AttrField,
    DescServicio: defaultAttrField,
    //GestionRequiereConfirmacion: AttrField,
    //GestionNotificacionSMS: AttrField,
    //GestionNotificacionEmail: AttrField,
    GestionContacto1: defaultAttrField,
    GestionContacto2: defaultAttrField,
    GestionCargoContacto1: defaultAttrField,
    GestionCargoContacto2: defaultAttrField,
    GestionTelefonoContacto1: defaultAttrField,
    GestionTelefonoContacto2: defaultAttrField,
    GestionEmailContacto1: defaultAttrField,
    GestionEmailContacto2: defaultAttrField,
    //  IdUsuario: AttrField
}

//export const defaultErrors = { errorMessage: "", isRequired: false, valid: true, isEmpty: false, isTouched: false  }
export function validate(serviceUnitManagement) {
    return {
        //       IdContrato: { errorMessage: '', isRequired: true, valid: true, isEmpty: serviceUnitManagement.IdContrato===0) },
        //       IdUnidad: { errorMessage: '', isRequired: true, valid: true, isEmpty: serviceUnitManagement.IdUnidad===0 },
        DescServicio: { errorMessage: 'Falta Descripion Servicio', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.DescServicio), isTouched: false },
        // GestionRequiereConfirmacion: { errorMessage: '', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionRequiereConfirmacion) },
        //GestionNotificacionSMS: { errorMessage: '', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionNotificacionSMS) },
        // GestionNotificacionEmail: { errorMessage: '', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionNotificacionEmail},
        GestionContacto1: { errorMessage: 'Falta Gestion Contacto', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionContacto1), isTouched: false },
        GestionContacto2: { errorMessage: 'Falta Gestion Contacto', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionContacto2), isTouched: false },
        GestionCargoContacto1: { errorMessage: 'Falta Gestion Cargo Contacto', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionCargoContacto1), isTouched: false },
        GestionCargoContacto2: { errorMessage: 'Falta Gestion Cargo Contacto', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionCargoContacto2), isTouched: false },
        GestionTelefonoContacto1: { errorMessage: 'Falta Gestion Telefono Contacto', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionTelefonoContacto1), isTouched: false },
        GestionTelefonoContacto2: { errorMessage: 'Falta Gestion Telefono Contacto', isRequired: true, valid: true, isEmpty: Utils.isEmpty(serviceUnitManagement.GestionTelefonoContacto2), isTouched: false },
        GestionEmailContacto1: { errorMessage: 'Falta Gestion Email Contacto', isRequired: true, valid: validateEmail(serviceUnitManagement.GestionEmailContacto1), isEmpty: Utils.isEmpty(serviceUnitManagement.GestionEmailContacto1), isTouched: false },
        GestionEmailContacto2: { errorMessage: 'Falta Gestion Email Contacto', isRequired: true, valid: validateEmail(serviceUnitManagement.GestionEmailContacto2), isEmpty: Utils.isEmpty(serviceUnitManagement.GestionEmailContacto2), isTouched: false },
        //  IdUsuario: { errorMessage: '', isRequired: true, valid: true, isEmpty: serviceUnitManagement.IdUnidad === 0 },
    };

}
export const reducer = (state, incomingAction) => {
    const action = incomingAction;
    switch (action.type) {
        case RequestServiceUnitManagementsAction:
            return {
                ...state,
                IdContract: action.IdContract,
                IdUnit: action.IdUnit,
                isLoading: true
            };
        case ReceiveServiceUnitManagementsAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.IdContract === state.IdContract) {
                return {
                    ...state,
                    IdContract: action.IdContract,
                    ServiceUnitManagements: action.ServiceUnitManagements,
                    isLoading: false
                };
            }
            break;
        case UpdateServiceUnitManagementAction:
            return {
                ...state,
                ServiceUnitManagement: action.ServiceUnitManagement,
                response: action.response,
                isLoading: false
            };
        case CreateServiceUnitManagementAction:
            return {
                ...state,
                ServiceUnitManagement: action.ServiceUnitManagement,
                response: action.response,
                isLoading: false
            };
        case DeleteServiceUnitManagementAction:
            return {
                ...state,
                ServiceUnitManagement: action.ServiceUnitManagement,
                response: action.response,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                login: action.login,
                isLoading: false
            };
        case GetServiceUnitManagementAction:
            if (action.IdContract === state.IdContract && action.IdUnit === state.IdUnit) {
                return {
                    ...state,
                    isLoading: false,
                    IdContract: action.IdContract,
                    IdUnit: action.IdUnit,
                    ServiceUnitManagement: action.ServiceUnitManagement,
                    response: action.response
                };
            }
            break;
        case GetJobTitlesAction:
            return {
                ...state,
                isLoading: false,
                jobtitles: action.jobtitles,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state || unloadedState;
};
