import {combineReducers, createStore} from "redux";
import taskAddReducer from "./reducers/taskAdd-reducer";
import taskTableReducer from "./reducers/taskTable-reducer";
import userReducer from "./reducers/user-reducer";


let reducers = combineReducers({
    taskAddReducer: taskAddReducer,
    taskTableReducer: taskTableReducer,
    userReducer: userReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;