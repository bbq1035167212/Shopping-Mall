import { ADD_COUNTER, ADD_TOCART, ALL_SELECT, BACK_SELECT, COUNT_PLUS, COUNT_REDUCE, DELETE_PRUDUCT } from './mutation-types'


export default {
    [ADD_COUNTER] (state, data) {
        data.count++
    },
    [ADD_TOCART] (state, data) {
        state.product.push(data)
    },
    [ALL_SELECT] (state) {
        state.product.forEach(item => {
            item.checked = true
        })
    },
    [BACK_SELECT] (state) {
        state.product.forEach(item => {
            item.checked = false
        })
    },
    [COUNT_PLUS] (state, data) {
        data.count++
    },
    [COUNT_REDUCE] (state, data) {
        if (data.count === 1) return
        data.count--
    },
    [DELETE_PRUDUCT] (state, id) {
        var index = null
        state.product.some((item, i) => {
            if (item.id === id) {
                index = i
            }
        })
        state.product.splice(index, 1)
    }
}
