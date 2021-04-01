import TaskTable from "./TaskTable";
import {connect} from "react-redux";
import { taskUpdateActionCreator } from "../../reducers/taskTable-reducer";
import { taskIdActionCreator } from "../../reducers/taskAdd-reducer";
import { taskNameActionCreator } from "../../reducers/taskAdd-reducer";
import { taskDateActionCreator } from "../../reducers/taskAdd-reducer";
import { taskStatusActionCreator } from "../../reducers/taskAdd-reducer";
import { taskFilesActionCreator } from "../../reducers/taskAdd-reducer";
import { editModeActionCreator } from "../../reducers/taskAdd-reducer";
import { authActionCreator } from "../../reducers/user-reducer";

let mapStateToProps = (state) => {
    return {
        tasks: state.taskTableReducer.tasks,
        isChange: state.taskTableReducer.isChange,
        isSuccessAuth: state.userReducer.isSuccessAuth,
        currentUsername: state.userReducer.currentUsername,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateTasks: (data) => {
            dispatch(taskUpdateActionCreator(data));
        },
        changeAuth: (data) => {
            dispatch(authActionCreator(data));
        },
        editTask: (task) => {
            dispatch(taskNameActionCreator(task.taskName));
            dispatch(taskDateActionCreator(task.taskDate));
            dispatch(taskStatusActionCreator(task.taskStatus));
            dispatch(taskFilesActionCreator(task.taskFiles));
            dispatch(taskIdActionCreator(task.id));
            dispatch(editModeActionCreator(true));
        }
    }
    
}

const TaskTableContainer = connect(mapStateToProps, mapDispatchToProps)(TaskTable);

export default TaskTableContainer;