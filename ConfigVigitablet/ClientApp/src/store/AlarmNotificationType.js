import * as Settings from '../store/MyConfig';


export const GetAlarmNotificationTypesAction = 'GET_ALARM_NOTIFICATION_TyPES';

export const getAlarmNotificationTypes = () => async (dispatch, getState) => {//(access_token: string): GetAlarmNotificationTypesAction | void => {
    const access_token = getState().login.login.access_token;
    if (access_token !== '') {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/VigitabletConfig/GetAlarmNotificationTypes`, {
            method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        const data = await response.json();
        dispatch({ type: GetAlarmNotificationTypesAction, alarmnotificationtypes: data });
    }
    else {
        dispatch({ type: GetAlarmNotificationTypesAction, alarmnotificationtypes: [] });
    }
};