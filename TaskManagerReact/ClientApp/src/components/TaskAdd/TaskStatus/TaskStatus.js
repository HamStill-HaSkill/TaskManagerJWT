import React from 'react';
import style from "../TaskAdd.module.css"

const TaskStatus = (props) => {

    const start = "Ожидание начала";
    const progress = "В процессе";
    const complete = "Готово";

    let onStatusClick = (text) => {
        props.updateTaskStatus(text);
    }

    let onStatusChange = (e) => {
        let text = e.target.value
        props.updateTaskStatus(text);
    }

    return (
        <div className="form-inline">
            <div className="form-group">
                <div className="col-md-6">
                    <div className={style.dropdown}>
                        <button className="btn btn-default" id="border-btn">Статус</button>
                        <div className={style.dropdown_content}>
                            <a onClick={() => onStatusClick(start)}>Ожидание начала</a>
                            <a onClick={() => onStatusClick(progress)}>В процессе</a>
                            <a onClick={() => onStatusClick(complete)}>Готово</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-6">
                    <input className="form-control" placeholder="Статус" value={props.taskStatus} onChange={onStatusChange} required />
                </div>
            </div>
        </div>
    );
}

export default TaskStatus;