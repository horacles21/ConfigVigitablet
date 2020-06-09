import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
/*
export interface UnidadPersona {
    [key: string]: any
    IdUnidad: number;
    Unidad: string;
    IdTipoPersona: number;
    TipoPersona: string;
    IdPersona: number;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    Telefono: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    Usuario: string;
//    Horarios: number[];
}*/
export const defaultUnidadPersona = {
    IdUnidad: 0,
    Unidad: '',
    IdTipoPersona: 7,
    TipoPersona: '',
    IdPersona: 0,
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    Telefono: '',
    FechaUltActualizacion: Utils.Now(),
    IdUsuario: 0,
    Usuario: ''
    //   Horarios: [],
};

export const AddPerson = async (objeto, access_token) => {
    if (access_token) {
        const url = Settings.default.key.url;
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');
        const response = await fetch(url + 'api/Unit/AddPerson', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        return response;
        //const data = await response.json();
        //return { type: 'ADD_PERSON_UNIT', response: data };

        //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //dispatch({ type: 'GET_RELATIONSHIPS', relationships: [] });
        //return ({ type: 'REQUEST_GUARD_EMPLOYEE', IdPersonaVig: 0 });
    }
};