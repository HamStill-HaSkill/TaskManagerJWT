import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from "./TaskUploadFile.module.css"

const TaskUloadFile = (props) => {

    let [files, setFiles] = useState([]);
    let [chosenFiles, setChosenFiles] = useState();

    let config = {
        onUploadProgress: progressEvent => {
            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            props.updatePercent(percentCompleted);
        }
    }

    useEffect(() => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(
                "file",
                files[i],
                files[i].name
            );

            console.log(files[i]);
        }

        axios.post("api/tasks/upload", formData, config);
    }, [files]);

    let onFileChange = (e) => {
        setFiles(e.target.files);
        let files = Array.from(e.target.files).map(file => file.name);
        props.updateTaskFiles(files);
        props.setEditMode(false);
        setChosenFiles("");
    };



    return (
        <div className="form-group">
            <div className="col-md-6">
                <input type="file" name="fileUplaod" id="fileUpload" value={chosenFiles} multiple onChange={onFileChange} />
            </div>

            {/*<div class="form-group">
                <div class="row">
                    <button type="button" class="btn btn-primary" id="table-btn">Загрузить Все</button>
                </div>
            </div>*/}
        </div>
    );
}

export default TaskUloadFile;