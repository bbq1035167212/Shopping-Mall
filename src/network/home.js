import { request } from './request';

export function getHomeMultidata(config) {
    return request({
        url: '/home/multidata',
    })
}