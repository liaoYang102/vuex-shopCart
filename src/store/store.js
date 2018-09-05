import Vue from 'vue'
import Vuex from 'vuex'
// import * as mutations from './mutations-types'


Vue.use(Vuex)

const state = {
    //购物车列表
    cartList: [],
    //当前菜品是否在购物车的状态。在则是对应的索引，不在则是-1
    curIndex: -1,
    //当前购物车信息
    cartInfos: {
        total_price: 0,
        total_nums: 0
    },
}

const actions = {
    create_shop: ({commit},{item}) =>commit('create_shop',item),
    check_shop: ({commit},{id}) =>commit('check_shop',id),
    add_shop: ({commit}) =>commit('add_shop'),
    reduce_shop: ({commit}) =>commit('reduce_shop'),
    update_cur_shop_status: ({commit},{index}) =>commit('update_cur_shop_status',index),
    delete_shop:({commit}) =>commit("delete_shop"),
    clear_local:({commit}) =>commit("clear_local"),
}

const mutations = {
    create_shop(state,shop){
        state.cartList.push(shop);
    },
    check_shop(state,id){
        state.curIndex = -1;
        var list = state.cartList;
        for(var i = 0;i<list.length;i++){
            if(list[i].id == id){
                state.curIndex = i;
                break;
            }
        }
    },
    add_shop(state){
        state.cartList[state.curIndex].num = parseInt(state.cartList[state.curIndex].num);
        state.cartList[state.curIndex].num++;
    },
    reduce_shop(state){
        state.cartList[state.curIndex].num = parseInt(state.cartList[state.curIndex].num);
        state.cartList[state.curIndex].num--;
        if(state.cartList[state.curIndex].num==0){
            state.cartList.splice(state.curIndex, 1);
        }
    },
    update_cur_shop_status(state,index){
        state.curIndex = index;
    },
    delete_shop(state){
        state.cartList[state.curIndex].num = 0;
        state.cartList.splice(state.curIndex, 1);
    },
    clear_local(state){
        for(var i =0;i<state.cartList.length;i++){
            state.cartList[i].num = 0;
        }
        state.cartList = [];
    }
}

const getters = {
    cartList:state => state.cartList,
    cartInfos:state => {
        state.cartInfos.total_price = 0;
        state.cartInfos.total_nums = 0;
        var list = state.cartList;
        for(var i = 0;i<list.length;i++){
            var price = parseInt(list[i].price),
                num = parseInt(list[i].num);
                state.cartInfos.total_price += price*num;
                state.cartInfos.total_nums += num;
        }
        return state.cartInfos;
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})