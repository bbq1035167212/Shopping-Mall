import { request } from './request';

export function getHomeMultidata(config) {
    return request({
        url: '/home/multidata',
    })
}

export function getHomeGoods(config) {
    return request({
        url: "/home/data",
        method:"get",
        params:config
    })
}