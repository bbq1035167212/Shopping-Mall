import axios from "axios"

export function request(config) {
    const instance = axios.create({
        timeou: 5000,
        baseURL:"http://123.207.32.32:8000"
    })

    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })
    return  instance(config)
}