const AUTH = 'AUTH';
const REG = 'REG';
const PASSWORD = 'PASSWORD';
const USERNAME = 'USERNAME';
const SIGNIN = 'SIGNIN';

let initialState = {
    isAuth: false,
    isReg: false,
    username: "",
    password: "",
    isSuccessAuth: false,
    currentUsername: "",

};

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH: {
            return {
                ...state,
                isAuth: action.data,
            }
        }
        case REG: {
            return {
                ...state,
                isReg: action.data,
            }
        }
        case PASSWORD: {
            return {
                ...state,
                password: action.data,
            }
        }
        case USERNAME: {
            return {
                ...state,
                username: action.data,
            }
        }
        case SIGNIN: {
            return {
                ...state,
                isSuccessAuth: action.isSuccessAuth,
                currentUsername: action.currentUsername,
            }
        }
        default:
            return state;
    }
}

export const authActionCreator = (data) =>
    ({ type: AUTH, data: data});

export const regActionCreator = (data) =>
    ({ type: REG, data: data});
export const passActionCreator = (data) =>
    ({ type: PASSWORD, data: data});
export const usernameActionCreator = (data) =>
    ({ type: USERNAME, data: data});
export const signInActionCreator = (isSuccessAuth, currentUsername) =>
    ({ type: SIGNIN, isSuccessAuth: isSuccessAuth, currentUsername: currentUsername});


export default userReducer;