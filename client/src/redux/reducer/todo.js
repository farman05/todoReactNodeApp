import { GET_TODO_LIST,ADD_TODO_SUCCESS } from "../action/type";

const initialState = {
    todoList: []
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TODO_LIST:
            return { todoList: action.payload };
        case ADD_TODO_SUCCESS:
            return {...state,success:true}
        default:
            return state;
    }
}
export default reducer;
