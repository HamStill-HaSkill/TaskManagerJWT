import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import style from '../UserAuth.module.css'


const ModalRegister = (props) => {
    let onLoginChange = (e) => {
        let body = e.target.value;
        props.setUsername(body);
    }

    let onPasswordChange = (e) => {
        let body = e.target.value;
        props.setPassword(body);
    }

    return (
        <div className={style.modal}>
            <div className={style.modal_content}>
                <div className={style.modal_header}>
                    <h1>Регистрация</h1>
                </div>
                <div className={style.modal_body}>
                    <div className="col-md-8">
                        <input className="form-control" placeholder="Логин" 
                        value={props.user.username} onChange={onLoginChange}  id={style.modal_input} required />
                    </div>
                    <div className="col-md-8">
                        <input className="form-control" type="password" placeholder="Пароль"
                         value={props.user.password} onChange={onPasswordChange} id={style.modal_input} required />
                    </div>
                    {/* <div className="col-md-8">
                        <input className="form-control" type="password" placeholder="Повторить пароль" id={style.modal_input} required />
                    </div> */}
                </div>
                <div className="modalFooter">
                    <div className="form-inline" id={style.modal_btn}>
                        <button type="button" className="btn btn-danger" id={style.table_btn} onClick={props.exit}> Назад </button>
                        <button type="button" className="btn btn-primary" id={style.table_btn_log} onClick={props.signUp}> Регистрация </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalRegister;