import { SET_SUCCESS_ERR_MSGG,SET_ERROR,HIDE_MSG } from "../action/type";

const initialState = {
    success: null,
    msg:'',
    variant:'',
    type:''
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SUCCESS_ERR_MSGG:
            return { 
                ...action.payload,
             };
         case HIDE_MSG:
         return { 
             ...initialState
          };
        default:
            return state;
    }
}
export default reducer;
