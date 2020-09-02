import toast from './Toast.vue'
import Vue from 'vue'

let obj = {
    install () {
        var c = Vue.extend(toast)
        new c().$mount(document.createElement("div"))
    }
}

export default obj