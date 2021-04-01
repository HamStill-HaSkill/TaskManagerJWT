import React from 'react';
import TaskAddContainer from './components/TaskAdd/TaskAddContainer';
import TaskTableContainer from "./components/TaskTable/TaskTableContainer";
import UserAuthContainer from './components/UserAuth/UserAuthContainer';
import "./custom.css"

const App = () => {

    return (
        <div >
            <UserAuthContainer />
            <TaskAddContainer className="header" />
            <TaskTableContainer className="content" />
        </div>
    );
}

export default App;