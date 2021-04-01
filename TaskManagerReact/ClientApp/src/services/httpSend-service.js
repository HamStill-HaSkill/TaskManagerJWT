import * as axios from 'axios'

let httpSender = {
    url: "/api/tasks",
    userUrl: "/api/users",
    authUrl: "/api/users/token",
    outUrl: "/api/users/logout",

    getTasks(username) {
        return axios.post(this.url + "/all", {username: username}).then(response => response.data);
    },

    postTask(data) {
        axios.post(this.url, data);
    },
    deleteTask(id) {
        axios.delete(this.url + `/${id}`);
    },
    editTask(data) {
        axios.put(this.url, data);
    },

    downloadFile(filename) {
        const FileDownload = require('js-file-download');

        let body = { filename: filename };

        return axios.post(this.url + '/download', body, {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            FileDownload(response.data, filename);
        });
    },

    signIn(username, password, setSignIn) {
        
        let body = { username: username, password: password };
        axios.post(this.authUrl, body, {
            withCredentials: true
        }).then(response => {
            response && setSignIn(true, username);
            response && localStorage.setItem("username", username);
        }).catch(reason => {
            if (reason.response.status === 401) {
                console.log(reason.message);
            } else {
                console.log(reason.message);
            }
          })
    },
    check(setSignIn) {
        axios.post(this.url + "/all", {username: ""}).then(response => {
            response && setSignIn(true, localStorage.getItem("username"));
        });
    },
    logout(setSignIn) {
        axios.get(this.outUrl);
        setSignIn(false, "")
    },
    register(username, password) {
        let data = {username: username, password: password}
        axios.post(this.userUrl + "/register", data);
    },
}






export default httpSender;