import React from 'react';

const TaskDate = (props) => {

    let OnDateChange = (e) => {
        let body = e.target.value;
        props.updateTaskDate(body);
    }

    return (
        <div className="form-group">
            <div className="col-md-6">
                <input type="date" className="form-control" placeholder="Дата" value={props.taskDate} onChange={OnDateChange} required />
            </div>
        </div>
    );
}

export default TaskDate;