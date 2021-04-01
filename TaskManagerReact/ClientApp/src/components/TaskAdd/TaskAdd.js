import React from 'react';
import style from "./TaskAdd.module.css"
import TaskStatus from './TaskStatus/TaskStatus';
import TaskUploadFile from './TaskUploadFile/TaskUploadFile';
import TaskDate from './TaskDate/TaskDate';
import TaskName from './TaskName/TaskName';
import { NavLink, Route } from 'react-router-dom';
import httpSender from '../../services/httpSend-service'


const TaskAdd = (props) => {
    
    let editTask = () => {
        httpSender.editTask({
            id: props.id,
            taskName: props.task.taskName,
            taskStatus: props.task.taskStatus,
            taskDate: props.task.taskDate,
            userName: props.user.currentUsername,
            taskFiles: props.task.taskFiles,
        });
        props.editTask();
        props.setEditMode(true);
    }
    let canselTask = () => {
        props.canselTask();
        props.setEditMode(true);
    }

    let addTask = () => {
        if (props.user.isSuccessAuth) {
            httpSender.postTask({taskName: props.task.taskName, taskDate: props.task.taskDate,
                taskStatus: props.task.taskStatus, taskFiles: props.task.taskFiles, userName: props.user.currentUsername});
            props.addTask();
        } else { 
            props.changeAuth(true);
        }
    }

    let EditBtn = () => {
        return (
            <div className="form-inline">
                <div className="form-group">
                    <div className="col-md-offset-2 col-md-8">
                        <NavLink to="/">
                            <input type="button" value="Сохранить" onClick={editTask} className="btn btn-success" />
                        </NavLink>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-2 col-md-8">
                        <NavLink to="/">
                            <input type="button" value="Отмена" onClick={canselTask} className="btn btn-warning" />
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }

    let AddBtn = () => {
        return (
            <div className="form-group">
                <div className="col-md-offset-2 col-md-8">
                    <button className="btn btn-default" id={style.border_btn} onClick={addTask} >Добавить</button>
                </div>
            </div>
        )
    }

    let progressFiles = props.task.taskFiles.map(file => {
        let progress = {
            'width': props.percentCompleted +'%'
          };

        return (
            <div class="row uploadList">
            <div class="col-sm-4">{file}</div>
            <div class="col-sm-4">
                <div class="progress">
                    <div class="progress-bar bg-success" style={progress}> </div>
                </div>
            </div>
        </div>
        )
    });


    return (
        <div>
            <div className="page-header">
                <h1> Менеджер задач </h1>
            </div>

            <div className="panel">
                <div className="form-inline">

                    <TaskName taskName={props.task.taskName} updateTaskName={props.updateTaskName} />
                    <TaskStatus taskStatus={props.task.taskStatus} updateTaskStatus={props.updateTaskStatus} />
                    <TaskDate taskDate={props.task.taskDate} updateTaskDate={props.updateTaskDate} />
                    <TaskUploadFile task={props.task} updateTaskFiles={props.updateTaskFiles} updatePercent={props.updatePercent} setEditMode={props.setEditMode} />

                    <Route path="/edit" render={EditBtn} />
                    <Route exact path="/" render={AddBtn} />
                </div>
            </div>
            <div>
                <br/>
                {!props.isEditMode && progressFiles}
            </div>
        </div>
    );
}

export default TaskAdd;