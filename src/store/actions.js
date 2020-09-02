
import { ADD_COUNTER, ADD_TOCART } from './mutation-types'

export default {
    addCart (contex, data) {
        return new Promise((resolve, reject) => {
            var oldProduct = contex.state.product.find(item => {
                return item.id === data.id
            })
            if (oldProduct) {
                contex.commit(ADD_COUNTER, oldProduct)
                resolve("商品数量+1")
            } else {
                data.count = 1
                data.checked = true
                contex.commit(ADD_TOCART, data)
                resolve("加入购物车成功")
            }

        })



    }
}