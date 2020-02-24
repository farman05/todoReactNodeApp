import { GET_TODO_LIST } from "./type"
import {postRequest,getRequest, putRequest,deleteRequest} from '../../services'
import {ADD_TODO,GET_TODO,MARK_COMPLETE_API,DELETE_TODO} from '../../constant'
import {setSuccessErrMsg,hideMsg} from './common';
import {commonSuccErrMsg,commonFatalErrMsg} from '../../helpers'

export function getTodoList(payload) {
    return { type: GET_TODO_LIST, payload };
}



export const addTodoApi = payload => {
    return async dispatch => {
        function onSuccess(data) {
            dispatch(getTodoApi([]))
            dispatch(setSuccessErrMsg(commonSuccErrMsg(data,'addTodo')))

            // dispatch(showLoader(false));
        }
        let apiResp;
        try {
            apiResp = await postRequest(ADD_TODO, payload, {});
            //console.log(apiResp.data, "resp");
            return onSuccess(apiResp);
        } catch (error) {
            return error;
        }
    };
};


export const getTodoApi = payload =>{
        return async dispatch =>{
                function onSuccess(data){
                    dispatch(getTodoList(data));
                }
                let apiResp;
                try {
                    apiResp = await getRequest(GET_TODO, payload, {});
                    return onSuccess(apiResp.data);
                } catch (error) {
                    return error;
                }

        }
}

export const markCompleteApi = payload =>{
    return async dispatch => {
        function onSuccess(result) {
            dispatch(getTodoApi([]))
            dispatch(setSuccessErrMsg(commonSuccErrMsg(result,'complete')))
        }
        let apiResp;
        try {
            apiResp = await putRequest(MARK_COMPLETE_API + payload.id, payload, {});
            return onSuccess(apiResp);
        } catch (error) {

            return error;
        }
    };
}

export const deleteTodoApi = payload =>{
    return async dispatch => {
        function onSuccess(data) {
            dispatch(getTodoApi([]))
            dispatch(setSuccessErrMsg(commonSuccErrMsg(data,'delete')))
            
            // dispatch(showLoader(false));
        }
        let apiResp;
        try {
            apiResp = await deleteRequest(DELETE_TODO + payload.id, payload, {});
            //console.log(apiResp.data, "resp");
            return onSuccess(apiResp);
        } catch (error) {
            dispatch(setSuccessErrMsg(commonFatalErrMsg(error,'delete')))
        }
    };
}

