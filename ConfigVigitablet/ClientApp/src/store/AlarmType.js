import * as Settings from '../store/MyConfig';


export const GetAlarmTypesAction = 'GET_ALARM_TyPES';

export const getAlarmTypes = () => async (dispatch, getState) => {//(access_token: string): GetAlarmActivationTypesAction | void => {
    const access_token = getState().login.login.access_token;
    if (access_token !== '') {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/VigitabletConfig/GetAlarmTypes`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        const data = await response.json();
        dispatch({ type: GetAlarmTypesAction, alarmtypes: data });
    }
    else {
        dispatch({ type: GetAlarmTypesAction, alarmtypes: [] });
    }
};