import React from 'react';

const TaskName = (props) => {

    let onTaskNameChange = (e) => {
        let body = e.target.value;
        props.updateTaskName(body);
    }

    return (
        <div className="form-group">
            <div className="col-md-8">
                <input className="form-control" placeholder="Задача" value={props.taskName} onChange={onTaskNameChange} required />
            </div>
        </div>
    );
}

export default TaskName;