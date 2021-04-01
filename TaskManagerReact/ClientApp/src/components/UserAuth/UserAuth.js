import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import style from './UserAuth.module.css'
import httpSender from '../../services/httpSend-service'
import ModalLogin from './ModalLogin/ModalLogin';
import ModalRegister from './ModalRegister/ModalRegister';


const UserAuth = (props) => {

    useEffect(() => {
          httpSender.check(props.setSignIn);
    }, []);


    let login = () => {
        props.changeAuth(true);
        props.changeReg(false);

    }

    let signIn = () => {
        props.changeAuth(false);
        //send mess to server
        httpSender.signIn(props.user.username, props.user.password, props.setSignIn);
    }

    let signUp = () => {
        props.changeReg(false);
        //send mess to server
        httpSender.register(props.user.username, props.user.password);
        signIn();
    }

    let register = () => {
        props.changeAuth(false);
        props.changeReg(true);
    }

    let exit = () => {
        props.changeAuth(false);
        props.changeReg(false);
    }

    let Logout = () => {
        httpSender.logout(props.setSignIn);
        props.setSignIn(false, "");
    }

    return (

        <div>
            <div className="form-inline" id={style.auth_btn}>
                {!props.user.isSuccessAuth && <button type="button" className="btn btn-primary" id={style.table_btn} onClick={register}> Регистрация </button>}
                {!props.user.isSuccessAuth && <button type="button" className="btn btn-success" id={style.table_btn} onClick={login}> Вход </button>}
                {props.user.isSuccessAuth && <button type="button" className="btn btn-danger" id={style.table_btn} onClick={Logout}> Выход </button>}
            </div>
            {props.isAuth && <ModalLogin user={props.user} setUsername={props.setUsername}
                setPassword={props.setPassword} register={register} signIn={signIn} />}

            {props.isReg && <ModalRegister user={props.user} setUsername={props.setUsername} 
                setPassword={props.setPassword} exit={exit} signUp={signUp} />}


        </div>
    );
}

export default UserAuth;