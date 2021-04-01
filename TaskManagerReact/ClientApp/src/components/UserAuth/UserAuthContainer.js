import UserAuth from "./UserAuth";
import {connect} from "react-redux";
import { authActionCreator, regActionCreator, passActionCreator, usernameActionCreator, signInActionCreator } from "../../reducers/user-reducer";

let mapStateToProps = (state) => {
    return {
        isAuth: state.userReducer.isAuth,
        isReg: state.userReducer.isReg,
        user: state.userReducer,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeAuth: (data) => {
            dispatch(authActionCreator(data));
        },
        changeReg: (data) => {
            dispatch(regActionCreator(data));
        },
        setUsername: (data) => {
            dispatch(usernameActionCreator(data));
        },
        setPassword: (data) => {
            dispatch(passActionCreator(data));
        },
        setSignIn: (success, username) => {
            dispatch(signInActionCreator(success, username));
        },
    }
    
}

const UserAuthContainer = connect(mapStateToProps, mapDispatchToProps)(UserAuth);

export default UserAuthContainer;