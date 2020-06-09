import * as Settings from '../store/MyConfig';
import { Now, Mode, defaultResponse } from '../store/Utils';
import { defaultLogin } from '../store/Login';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ContractsState {
    isLoading: boolean;
    idContract: number;
    contract: Contract;
    contracts: Contract[];
    contracttypes: ContractType[];
    //createMode: boolean;
    response: Resp;
    mode: Mode;
    login: LogIn,

}
export interface Contrato {
    [key: string]: any
    Id: number;
    IdTipoContrato: number;
    //TipoContrato: string;
    NroContrato: string;
    Contratante: string;
    NombreCompletoContrato: string;
    Direccion: string;
    IdPais: number;
    //Pais: string;
    //IdDivision: number;
    //Division: string;
    //GeoLocalizacion: string;
    //CodigoPostal: string;
    //FechaContrato: string;
    //RegistroFiscal: string;
    //FechaRegistro?: string;
    //NumeroRegistro: string;
    //IdAdministradora: number;
    //Administradora: string;
    //CorreoElectronicoJunta: string;
    //CorreoElectronicoComunidad: string;
    //PuertoPOPGeneral: number;
    //PuertoSMTPGeneral: number;
    //ServidorPOPGeneral: string;
    //ServidorSMTPGeneral: string;
    //PuertoPOPJC: number;
    //PuertoSMTPJC: number;
    //ServidorPOPJC: string;
    //ServidorSMTPJC: string;
    //UsuarioCorreoComunidad: string;
    //ContraseñaCorreoComunidad: string;
    //UsuarioCorreoJC: string;
    //ContraseñaCorreoJC: string;
    //NroRedesInstalacion: number;
    //DetieneSMS_Emergencia: boolean;
    //DetieneSMS_JC: boolean;
    //MesCorte: number;
    //AutoGestion_Aptos: boolean;
    //ImagenEdificio: string;
    //IdRedMiwi: string;
    //IdEstadoContrato: string;
    //FechaUltActualizacion: string;
    //IdUsuario: number;

}*/
export const defaultContrato = {
    Id: 0,
    IdTipoContrato: 0,
    TipoContrato: '',
    NroContrato: '',
    Contratante: '',
    NombreCompletoContrato: '',
    Direccion: '',
    IdPais: 0,
    Pais: ''
    //IdDivision: 0,
    //Division: '',
    //GeoLocalizacion: '',
    //CodigoPostal: '',
    //FechaContrato: '',
    //RegistroFiscal: '',
    //FechaRegistro: '',
    //NumeroRegistro: '',
    //IdAdministradora: 0,
    //Administradora: '',
    //CorreoElectronicoJunta: '',
    //CorreoElectronicoComunidad: '',
    //PuertoPOPGeneral: 0,
    //PuertoSMTPGeneral: 0,
    //ServidorPOPGeneral: '',
    //ServidorSMTPGeneral:'',
    //PuertoPOPJC: 0,
    //PuertoSMTPJC: 0,
    //ServidorPOPJC: '',
    //ServidorSMTPJC: '',
    //UsuarioCorreoComunidad: '',
    //ContraseñaCorreoComunidad: '',
    //UsuarioCorreoJC: '',
    //ContraseñaCorreoJC: '',
    //NroRedesInstalacion: 0,
    //DetieneSMS_Emergencia: false,
    //DetieneSMS_JC: false,
    //MesCorte: 0,
    //AutoGestion_Aptos: false,
    //ImagenEdificio: '',
    //IdRedMiwi: '',
    //IdEstadoContrato: '',
    //FechaUltActualizacion: '',
    //IdUsuario: 0,

};/*
export interface Contract {
    [key: string]: any
    Id: number;
    IdTipoContrato: number;
    IdAdministradora: number;
    TipoContrato: string;
    NroContrato: string;
    Contratante: string;
    NombreCompletoContrato: string;
    Direccion: string;
    IdPais: number;
    IdDivision: number;
    Pais: string;
    CorreoElectronicoJunta: string,
    CorreoElectronicoComunidad: string,
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
}*/
export const defaultContract = {
    Id: 0,
    IdTipoContrato: 0,
    TipoContrato: '',
    IdAdministradora: 1,
    NroContrato: '',
    Contratante: '',
    NombreCompletoContrato: '',
    Direccion: '',
    IdPais: 1,
    IdDivision: 1,
    Pais: '',
    CorreoElectronicoJunta: '',
    CorreoElectronicoComunidad: '',
    FechaUltActualizacion: Now(),
    IdUsuario: 0,
    Usuario: ''
};
/*const ContractType =
    [key: string]: any
    IdTipoContrato: number;
    DescTipoContrato: string;
}*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const RequestContractsAction = 'REQUEST_CONTRACT';
export const GetContractsAction = 'GET_CONTRACTS';
const ReceiveContractsAction = 'RECEIVE_CONTRACT';
const UpdateContractAction = 'UPDATE_CONTRACT';
const CreateContractAction = 'CREATE_CONTRACT';
const DeleteContractAction = 'DELETE_CONTRACT';
const GetSessionAction = 'GET_SESSION';
const GetContractTypesAction = 'GET_CONTRACT_TYPES';
const SetModeAction = 'SET_MODE';
const ErrorResponseAction = 'ERROR_RESPONSE';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestContractsAction | ReceiveContractsAction | GetSessionAction | GetContractTypesAction | ErrorResponseAction
    | UpdateContractAction | CreateContractAction | DeleteContractAction | GetContractsAction | SetModeAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
/*export interface paramsCommand {
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
    });
};
export const getContracts = () => async (dispatch, getState) => {
    const url = Settings.default.key.url;
    const access_token = getState().login.login.access_token;
    if (access_token) {
        if (getState().contract.contracts.length > 0) {
            dispatch({ type: GetContractsAction, contracts: getState().contract.contracts });
        }
        else {
            dispatch({ type: RequestContractsAction, IdContract: 0, response: defaultResponse });
            const response = await fetch(url + `api/Contract/GetAll`, {
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

                dispatch({ type: ErrorResponseAction, response });
            }
        }
    } else {
        dispatch({ type: GetContractsAction, contracts: [] });
    }
};

export const ContractsAction = (state, action) => {
    return ({
        ...state,
        response: action.response,
        contracts: action.contracts
    })
};

export const actionCreators = {
    create: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestContractsAction, IdContract: objeto.IdContract });
            const response = await fetch(url + "api/Contract/Create", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            dispatch({ type: CreateContractAction, contract: objeto, response });
            /**}).catch(reason => {
                console.log('Error in create:' + reason);
                dispatch({ type: CreateContractAction, contract: objeto, response: reason });
            });*/
        }
    },
    update: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            let params = {
                action: "api/Contract/Update",
                method: "PUT",
                access_token: access_token,
                searchParams: searchParams
            };

            dispatch({ type: RequestContractsAction, IdContract: objeto.IdContract });
            const response = await exec(params);
            if (response.ok) {
                dispatch({ type: UpdateContractAction, contract: objeto });
            }
            else {
                dispatch({ type: UpdateContractAction, contract: objeto, response });
            }

        }
    },

    delete: objeto => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            const args = `/${objeto.IdContrato}/${objeto.idVigitabletTipoLLamadas}/${objeto.TelefonoContactoVT}`;
            dispatch({ type: RequestContractsAction, IdContract: objeto.IdContract });
            const response = await fetch(url + "api/Contract/Delete" + args, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            dispatch({ type: DeleteContractAction, contract: objeto, response });
            /*}).catch(reason => {
                console.log('Error in Delete:' + reason);
                dispatch({ type: DeleteContractAction, contract: objeto, response: reason });
            });*/
        }
    },
    getContracts: getContracts,
    getContractTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestContractsAction, IdContract: /*getState().contracts.idContract ||*/ 0 });
            const response = await fetch(url + `api/ContractType/GetAll`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            const contracttypes = await response.json();
            dispatch({ type: GetContractTypesAction, contracttypes });
            /*}).catch(reason => {
                console.log(reason);
                dispatch({ type: ErrorResponseAction, response: reason });
            });*/
        }
        else {
            dispatch({ type: GetContractTypesAction, contracttypes: [] });
        }
    },
    setModeCreate: () => ({ type: SetModeAction, mode: Mode.Create }),
    setModeEdit: () => ({ type: SetModeAction, mode: Mode.Update }),
    setModeRead: () => ({ type: SetModeAction, mode: Mode.Read }),
    //setModeCreate_: () => async (dispatch, getState) => { dispatch({ type: SetModeAction, mode: Mode.Create }) },
    //setModeEdit: () => async (dispatch, getState) => { dispatch({ type: SetModeAction, mode: Mode.Update }) },
    //setModeRead: () => async (dispatch, getState) => { dispatch({ type: SetModeAction, mode: Mode.Read }) },
    getSession: () => (dispatch, getState) => {
        dispatch({
            type: GetSessionAction,
            login: getState().login.login
        });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    contract: defaultContract,
    contracts: [],
    contracttypes: [],
    isLoading: false,
    idContract: -1,
    mode: Mode.Read,
    response: defaultResponse,
    login: defaultLogin,
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestContractsAction:
            return {
                ...state,
                response: defaultResponse,
                idContract: action.IdContract,
                isLoading: true
            };
        case ReceiveContractsAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            //if (action.startDateIndex === state.startDateIndex) {
            return {
                ...state,
                IdContract: action.IdContract,
                contracts: action.contracts,
                isLoading: false
            };
        case UpdateContractAction:
            return {
                ...state,
                response: action.response,
                contract: action.contract,
                isLoading: false
            };
        case CreateContractAction:
            return {
                ...state,
                contract: action.contract,
                response: action.response,
                isLoading: false
            };
        case DeleteContractAction:
            return {
                ...state,
                contract: action.contract,
                response: action.response,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        case GetContractsAction:
            return {
                ...state,
                contracts: action.contracts,
                isLoading: false
            };
        case GetContractTypesAction:
            return {
                ...state,
                contracttypes: action.contracttypes,
                isLoading: false
            };
        case ErrorResponseAction:
            return {
                ...state,
                response: action.response,
                isLoading: false
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state;
};
