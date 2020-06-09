import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';

export const RequestJobActionTypeAction = 'REQUEST_JOB_ACTION_TYPE';
export const ReceiveJobActionTypeAction = 'RECEIVE_JOB_ACTION_TYPES';
const ReceiveJobActionTypeNewsAction = 'GET_JOB_ACTION_TYPE_NEWS';
const ReceiveJobActionTypeJobsAction = 'GET_JOB_ACTION_TYPE_JOBS';
const UpdateJobActionTypeAction = 'UPDATE_JOB_ACTION_TYPE';
const UpdateJobActionTypeNewsAction = 'UPDATE_JOB_ACTION_TYPE_NEWS';
const UpdateJobActionTypeJobsAction = 'UPDATE_JOB_ACTION_TYPE_JOBS';
const CreateJobActionTypeAction = 'CREATE_JOB_ACTION_TYPE';
const DeleteJobActionTypeAction = 'DELETE_JOB_ACTION_TYPE';
const GetJobsAction = 'GET_JOBS';
const GetNewsAction = 'GET_NEWS';
const ErrorResponseAction = 'ERROR_RESPONSE';
const GetSessionAction = 'GET_SESSION';

export const GetJobActionTypes = () => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        //dispatch({ type: RequestJobActionTypeAction });
        const response = await fetch(`${url}api/VigitabletConfig/GetJobActionTypes`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            }
        );
        if (response.ok) {
            const jobactiontypes = await response.json();
            dispatch({ type: ReceiveJobActionTypeAction, jobactiontypes });
        } else {
            dispatch({ type: ErrorResponseAction, response });
        }
    }
    else {
        dispatch({ type: ReceiveJobActionTypeAction, jobactiontypes: [] });
    }
}