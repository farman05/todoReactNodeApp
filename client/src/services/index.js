import axios from 'axios';

const BASE_URL = "http://localhost:3001/";
export const postRequest = async (apiName, data) => {
    const url =  apiName;
    const headers = {};
    try {
        const result = await axios.post(url, data, { headers: headers });
        return result.data
    } catch (error) {
        console.log(error)
        const { response } = error
        const responseData = generateErrMsg(error)
        throw new Error((responseData.message));
    }
}

export const putRequest = async (apiName, data) => {
    const url =   apiName;
    const headers = {};
 

    try {
        const result = await axios.put(url, data, { headers: headers });
        return result.data
    } catch (error) {
        const { response } = error
        const responseData = generateErrMsg(error)
        console.log(responseData)
        throw new Error((responseData.message));
    }
}

export const getRequest = async (apiName, params = '') => {
    const url =   apiName;
    let headers = {};
    try {
        const result = await axios.get(url, { params: params, headers: headers });
        return result.data
        // console.log(headers)
    } catch (error) {
        const { response } = error
       
        const responseData = generateErrMsg(error)
        throw new Error((responseData.message));
    }
}

export const deleteRequest = async (apiName, data) => {
    const url =   apiName;
    const headers = {};

    try {
        const result = await axios.delete(url, { data: data, headers: headers });
        return result.data
    } catch (error) {
        const { response } = error
        const responseData = generateErrMsg(error)
        throw new Error((responseData.message));
    }
}

const generateErrMsg = (error) => {

    const { response } = error
    if (response) {
        const { data } = response;
        if (data) {
            const { msg, status, statusCode } = data
            const returnMsg = {
                statusCode: statusCode ? statusCode : 400,
                message: msg ? msg : "Something Went Wrong ! Please Try again later"
            }

            return returnMsg
        }
    } else {
        const returnMsg = {
            message: "Something Went Wrong ! Please Try again later"
        }
        return returnMsg;
    }

}