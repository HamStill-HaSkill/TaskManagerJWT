import httpSender from '../services/httpSend-service'

const UPDATE_TEXT = 'UPDATE_TEXT';
const UPDATE_DATE = 'UPDATE_DATE';
const UPDATE_STATUS = 'UPDATE_STATUS';
const TASK_ADD = 'TASK_ADD';
const UPDATE_ID = 'UPDATE_ID';
const UPDATE_FILES = 'UPDATE_FILES';
const TASK_CLEAR = 'TASK_CLEAR';
const UPDATE_PERCENT = 'UPDATE_PERCENT';
const EDIT_MODE = 'EDIT_MODE';

let initialState = {
    id: 1,
    percentCompleted: 0,
    isEditMode: true,
    task: {
        id: 0,
        taskName: '',
        taskDate: '',
        taskStatus: '',
        taskFiles: [],
    }
};

const taskAddReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_TEXT: {
            let newState = {...state};
            newState.task = {...state.task};
            newState.task.taskName = action.text;
            return newState;
        }
        case UPDATE_ID: {
            let newState = {...state};
            newState.id = action.id;
            return newState;
        }
        case UPDATE_STATUS: {
            let newState = {...state};
            newState.task = {...state.task};
            newState.task.taskStatus = action.status;
            return newState;
        }
        case UPDATE_DATE: {
            let newState = {...state};
            newState.task = {...state.task};
            newState.task.taskDate = action.date;
            return newState;
        }
        case UPDATE_FILES: {
            let newState = {...state};
            newState.task = { ...state.task };
            newState.task.taskFiles = action.files;
            return newState;
        }
        case TASK_ADD: {
            let newState = {...state};
            newState.task = {...state.task};
            newState.task.taskName = "";
            newState.task.taskDate = "";
            newState.task.taskStatus = "";
            newState.percentCompleted = 0;
            newState.task.taskFiles = [];
            return newState;
        }
        case TASK_CLEAR: {
            let newState = {...state};
            newState.task = {...state.task};
            newState.task.taskName = "";
            newState.task.taskDate = "";
            newState.task.taskStatus = "";
            newState.percentCompleted = 0;
            newState.task.taskFiles = [];
            return newState;
        }
        case UPDATE_PERCENT: {
            let newState = {...state};
            newState.percentCompleted = action.percent;
            return newState;
        }
        case EDIT_MODE: {
            let newState = { ...state };
            newState.isEditMode = action.mode;
            return newState;
        }
        default:
            return state;
    }
}

export const taskNameActionCreator = (text) =>
    ({ type: UPDATE_TEXT, text: text });

export const taskDateActionCreator = (date) =>
    ({ type: UPDATE_DATE, date: date });

export const taskStatusActionCreator = (status) =>
    ({ type: UPDATE_STATUS, status: status });

export const taskIdActionCreator = (id) =>
    ({ type: UPDATE_ID, id: id });

export const taskAddActionCreator = () =>
    ({ type: TASK_ADD });

export const taskClearActionCreator = () =>
    ({ type: TASK_CLEAR });
    
export const taskFilesActionCreator = (files) =>
    ({ type: UPDATE_FILES, files: files });

export const percentActionCreator = (percent) =>
    ({ type: UPDATE_PERCENT, percent: percent });

export const editModeActionCreator = (mode) =>
    ({ type: EDIT_MODE, mode: mode});

export default taskAddReducer;