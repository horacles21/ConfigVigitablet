import * as Utils from '../store/Utils';
import * as Settings from '../store/MyConfig';
import { defaultLogin } from '../store/Login';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface Period {
    IdPeriodo: string;
    DescPeriodo: string;
}
*/
export const defaultPeriod = {
    IdPeriodo: 0,
    DescPeriodo: ''
};
/*
export interface  PeriodsAction {
    type: 'GET_PERIODS';
    periods: Period[];
}*/
export const getPeriods = () => async (dispatch, getState) => {//(access_token: string): GetJobTitlesAction | void => {
    const access_token = getState().login.login.access_token;
    if (access_token !== '') {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/Period/GetAll`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        const data = await response.json();
        
                dispatch({ type: 'GET_PERIODS', periods: data });
        }
    else {
        dispatch({ type: 'GET_PERIODS', periods: [] });
    }
};




