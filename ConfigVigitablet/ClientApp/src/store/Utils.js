/*export interface paramsCommand {
    url: string,
    action: string,
    method: string,
    access_token: string,
    searchParams: string,
}

export interface Resp {
    status: string;
    statusText: string;
    description: string;
    message: string;
}


export interface HandleChangeImageAction {
    type: 'ON_CHANGE_IMAGE';
    file: RespImage;
}

export interface RespImage {
    [k: string]: string
    fileName: string
}*/


export const Resp = {
    status: '',
    statusText: '',
    description: '',
    message: '',
};
export const defaultResponse = {
    status: '',
    statusText: '',
    description: '',
    message: '',
};
export const NullImage = { fileName: '' };

export const defaultListDays = [0, 0, 0, 0, 0, 0, 0];

export const exec = async (params) => {
    return await fetch(params.url + params.action, {
        method: params.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + params.access_token
        },
        body: params.searchParams
    });
};

export const Now = () => new Date().toISOString().split('T')[0];
/*export enum Mode {
    Create = 1,
    Update,
    Read,
    Delete
}*/
export const Mode = {
    Create : 1,
    Update: 2,
    Read: 3,
    Delete: 4
};
//export const Mode = 1;
//interface GetSessionAction {
//    type: 'GET_SESSION';
//    login: Login;

//}
//export const getSession: () => (dispatch, getState) => {
//    dispatch({
//        type: 'GET_SESSION',
//        login: getState().login.login,
//    });

//    //getState().login.login.access_token ? history.push();
//},

export const GetWeekDays = arr => {
    let cad = '';
    for (let elem of arr) {
        cad = cad + elem.toString();
    }
    return cad;
};
export const SetWeekDays = cad => {
    let arr = [0, 0, 0, 0, 0, 0, 0];
    let i = 0;
    if(cad){
        for (let elem of cad) {
            arr[i++] = parseInt(elem);
        }
    } 
    else {

    }
    return arr;
};

export function onlyNumbers(e) {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
}

export const SetModeAction = 'SET_MODE';


export function setDate(date) {
    return date ? (date.split('T'))[0] : '';
}

export const AttrField = {
    errorMessage: '', isRequired: false, valid: false, isEmpty: false
};
/*
export interface Email {
    [key: string]: any
    _De: string;
    _NombreDe: string;
    _Para: string[];
    NombreCC: string[];
    ConCopia: string[];
    ConCopiaOculta: string[];
    _Asunto: string;
    RutaArchivosAdjuntos: string[];
    CuerpoEmail: string;
    CuerpoEmail_2: string;
    //AlternateView TipoDeVista;
    //LinkedResource IMG;
    TipoVistaEscogida: boolean;
    ServidorSMTP: string;
    _Prioridad: string;
    AcuseRecibo: boolean;
    _EmailRespuesta: string;
    Puerto: string;
    EnableSsl: boolean;
    UseDefaultCredentials: boolean;
    Login: string;
    Password: string;
}
*/
export const defaultEmail = {
    _De: 'seguricel.system@gmail.com',
    _NombreDe: '',
    _Para: ['horaciomarmoto@gmail.com'],
    NombreCC: [],
    ConCopia: [],
    ConCopiaOculta: [],
    _Asunto: 'Prueba',
    RutaArchivosAdjuntos: [],
    CuerpoEmail: 'Es una prueba',
    CuerpoEmail_2: '',
    //AlternateView TipoDeVista;
    //LinkedResource IMG;
    TipoVistaEscogida: false,
    ServidorSMTP: 'smtp.gmail.com',
    _Prioridad: '',
    AcuseRecibo: false,
    _EmailRespuesta: '',
    Puerto: '587',
    EnableSsl: true,
    UseDefaultCredentials: false,
    Login: 'seguricel.system',
    Password: 'Seguricel1234'
};
export const sendEmail = async(email) => {
    const email_ = email;
    const searchParams = Object.keys(email_).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(email_[key]);
    }).join('&');
    return await fetch('api/Email', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
        },
        body: searchParams
    });
    //            return true;
};


export const errorInit = {
    errorMessage: "",
    isRequired: false,
    valid: true,
    isEmpty: false
};

export const isEmpty = campo => {
    return campo ? campo.length === 0 : true;
};


//interface MyReturnTypeItem {
//    vars: [],
//    smps: string[];
//    data: string[];
//}
//interface MyReturnType {
//    [name: string]: MyReturnTypeItem;
//}

//const whatever2 = async (): Promise<number> => {
//    return await new Promise<number>((resolve) => {
//        resolve(4);
//    });
//};
//const execGet = async (params: Utils.paramsCommand): Promise<RelationshipType.RelationshipType[]> => {
//    const url = Settings.default.key.url;
//    return await fetch(url + params.action, {
//        method: params.method,
//        headers: {
//            'Accept': 'application/json',
//            'Authorization': 'bearer ' + params.access_token,
//        },
//    })const data = await response.json() as Promise<RelationshipType.RelationshipType[]>)
//        
//            return data
//        });
//}
/*.then(function (res) {
        alert(res);
        alert(JSON.stringify(res));
        return res
    }).catch(function (ex) {
        alert(ex);
        return ex
    });*/

//import { } from 'muicss/lib/react/appbar';
//import {  } from 'muicss/lib/react/button';
//import {  } from 'muicss/lib/react/container';
////import { Appbar, Button, Container } from 'muicss/react/';
//import {  } from 'qrcode.react';
//import { }  from 'node_modules/qr.js';
//var QRCode = require('qrcode.react');
// At runtime, Redux will merge together...
