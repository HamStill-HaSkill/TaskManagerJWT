import TaskAdd from "./TaskAdd";
import { connect} from "react-redux";
import { taskNameActionCreator } from "../../reducers/taskAdd-reducer";
import { taskDateActionCreator } from "../../reducers/taskAdd-reducer";
import { taskStatusActionCreator } from "../../reducers/taskAdd-reducer";
import { taskClearActionCreator } from "../../reducers/taskAdd-reducer";
import { taskAddActionCreator } from "../../reducers/taskAdd-reducer";
import { taskFilesActionCreator } from "../../reducers/taskAdd-reducer";
import { taskAddTableActionCreator } from "../../reducers/taskTable-reducer";
import { taskEditActionCreator} from "../../reducers/taskTable-reducer";
import { percentActionCreator } from "../../reducers/taskAdd-reducer";
import { editModeActionCreator } from "../../reducers/taskAdd-reducer";
import { authActionCreator } from "../../reducers/user-reducer";


let mapStateToProps = (state) => {
    return {
        task: state.taskAddReducer.task,
        id: state.taskAddReducer.id,
        percentCompleted: state.taskAddReducer.percentCompleted,
        isEditMode: state.taskAddReducer.isEditMode,
        user: state.userReducer,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        editTask: () => {
            dispatch(taskEditActionCreator());
            dispatch(taskClearActionCreator());
        },
        changeAuth: (data) => {
            dispatch(authActionCreator(data));
        },
        updateTaskFiles: (body) => {
            dispatch(taskFilesActionCreator(body));
        },
        canselTask: () => {
            dispatch(taskClearActionCreator());
        },
        updateTaskName: (body) => {
            dispatch(taskNameActionCreator(body));
        },
        updateTaskDate: (body) => {
            dispatch(taskDateActionCreator(body));
        },
        updateTaskStatus: (body) => {
            dispatch(taskStatusActionCreator(body));
        },
        addTask: () => {
            dispatch(taskAddActionCreator());
            dispatch(taskAddTableActionCreator());
        },
        setEditMode: (body) => {
            dispatch(editModeActionCreator(body));
        },
        updatePercent: (body) => {
            dispatch(percentActionCreator(body));
        },
    }
    
}

const TaskAddContainer = connect(mapStateToProps, mapDispatchToProps)(TaskAdd);

export default TaskAddContainer;