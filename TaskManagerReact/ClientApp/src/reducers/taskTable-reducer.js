const UPDATE_TASKS_TABLE = 'UPDATE_TASKS_TABLE';
const EDIT_TASKS = 'EDIT_TASKS';
const TASK_ADD_TABLE = 'TASK_ADD_TABLE';

let initialState = {
    isChange: true,
    tasks: [],

};

const taskTableReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_TASKS_TABLE: {
            return {
                ...state,
                tasks: action.tasks,
                isChange: true,
            }
        }
        case TASK_ADD_TABLE: {
            return {
                ...state,
                isChange: !state.isChange,
            }
        }
        case EDIT_TASKS: {
            return {
                ...state,
                isChange: !state.isChange,
            }
        }
        default:
            return state;
    }
}

export const taskUpdateActionCreator = (tasks) =>
    ({ type: UPDATE_TASKS_TABLE, tasks: tasks });

export const taskEditActionCreator = () =>
    ({ type: EDIT_TASKS});

export const taskAddTableActionCreator= () =>
    ({ type: TASK_ADD_TABLE});


export default taskTableReducer;