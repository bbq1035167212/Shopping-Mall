import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

var store = new Vuex.Store({
    state: {
        product: []
    },
    mutations, getters, actions
})

export default store