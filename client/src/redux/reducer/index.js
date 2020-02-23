import { combineReducers } from "redux";
import todo from './todo'
import common from './common'
let reducer = combineReducers({
    todo,
    common
});
export default reducer;
