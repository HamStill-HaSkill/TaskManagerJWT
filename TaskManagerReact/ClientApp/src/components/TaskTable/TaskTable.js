import React, { useState, useEffect } from 'react';
import httpSender from '../../services/httpSend-service'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import style from './TaskTable.module.css'


const TaskTable = (props) => {

    let [isDelete, setIsDelete] = useState(false);
    let [isChange, setIsChange] = useState(true);

    let updateTasks = () => {
        httpSender.getTasks(props.currentUsername).then(response => {
            props.updateTasks(response);
        }).catch(reason => {
            if (reason.response.status === 401) {
                props.changeAuth(true);
            } else {
                console.log(reason.message);
            }
          });
    }

    useEffect(() => {
       if(props.isSuccessAuth) updateTasks();
    }, [props.isChange, isDelete, props.tasks.length, props.isSuccessAuth]);


    let deleteTask = (id) => {
        httpSender.deleteTask(id);
        updateTasks();
        setIsDelete(isDelete => !isDelete);
    }

    let editTask = (task) => {
        props.editTask(task);
    }
    let download = (files) => {
        for (let i = 0; i < files.length; i++) {
            httpSender.downloadFile(files[i]);
        }     
    }
    let tasks = props.tasks.map(task => {
        return (
            <tr>
                <td>{task.taskName}</td>
                <td>{task.taskStatus}</td>
                <td>{moment(task.taskDate).format('MMMM Do YYYY')}</td>
                <td>{task.taskFiles != null ? task.taskFiles.map(file => <p>{file}</p>) : ""}</td>
                <td>
                    <NavLink to="/edit">
                        <button type="button" className="btn btn-primary" id={style.table_btn} onClick={() => editTask(task)}>
                            Изменить
                    </button>
                    </NavLink>
                    <button type="button" className="btn btn-danger" id={style.table_btn} onClick={() => deleteTask(task.id)} > Удалить</button >
                    <button type="button" className="btn btn-primary" id={style.table_btn} onClick={() => download(task.taskFiles)} > Скачать</button >
                </td >
            </tr >
        )
    });


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Задача</th>
                    <th className="filter-clm" >Статус</th>
                    <th>Дата завершения</th>
                    <th>Файл</th>

                </tr>
            </thead>
            <tbody>
                {props.isSuccessAuth && tasks}
            </tbody >
        </table >
    );
}

export default TaskTable;