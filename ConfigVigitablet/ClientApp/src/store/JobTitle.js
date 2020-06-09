import * as Utils from '../store/Utils';
import { GuardEmployee, GetGuardEmployeesAction } from '../store/GuardEmployeeInfo';
import * as Settings from '../store/MyConfig';
import { Login, defaultLogin } from '../store/Login';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface JobTitle {
    IdCargo: number;
    DescCargo: string;
}
*/
export const GetJobTitlesAction = 'GET_JOB_TITLES';

export const getJobTitles = () => async (dispatch, getState) => {//(access_token: string): GetJobTitlesAction | void => {
    const access_token = getState().login.login.access_token;
    if (access_token !== '') {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/JobTitle/GetAll`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const jobtitles = await response.json();
            dispatch({ type: GetJobTitlesAction, jobtitles });
        }
        else {
            dispatch({ type: GetJobTitlesAction, jobtitles: [] });
        }
    }
    else {
        dispatch({ type: GetJobTitlesAction, jobtitles: [] });
    }
};




