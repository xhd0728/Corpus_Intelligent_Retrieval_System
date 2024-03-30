import router from "@/router";
import axios from "axios";
import ElementUI from 'element-ui';
// import { Store } from "vuex";

const aaxios = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 60000
})

aaxios.interceptors.request.use((config) => {
    let access_token = localStorage.getItem('token');
    // console.log(access_token);
    if (access_token) {
        config.headers.token = localStorage.getItem('token')
    }

    return config;
});

aaxios.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response.status == 402) {
        localStorage.removeItem('token')
        ElementUI.Message({
            message: err.response.data.detail,
            type: 'error'
        })
        router.push('/login')
    } else if (err.response.status == 400) {
        ElementUI.Message({
            message: err.response.data.detail,
            type: 'error'
        })
    } else if (err.response.status == 500) {
        ElementUI.Message({
            message: "信息格式有误",
            type: 'error'
        })
    }
});
// aaxios.defaults.withCredentials=true;
export default aaxios;
