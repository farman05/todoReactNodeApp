import { SET_ERROR,SET_SUCCESS_ERR_MSGG,HIDE_MSG } from "./type";



export function setSuccessErrMsg(payload) {
    return { type: SET_SUCCESS_ERR_MSGG, payload };
}

export function setErrorMsg(payload) {
    return { type: SET_ERROR, payload };
}

export function hideMsg(payload){
    return { type: HIDE_MSG, payload };

}
