<template>
    <div class="shopList">
        <h3>Vuex购物车demo</h3>
        <h4>商品信息</h4>
        <table class="table table-hover table-bordered table-shop">
            <thead>
                <tr>
                    <th>id</th>
                    <th>名称</th>
                    <th>价格</th>
                    <th>数量</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.num || ''}}</td>
                    <td>
                        <div @click="add_shop(item)" class="btn btn-info">{{item.num ? '+' : '加入购物车'}}</div>
                        <div @click="reduce_shop(item)" class="btn btn-warning" v-if='item.num && item.num>0'>-</div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="shop-list">
            <h4>购物车信息</h4>
            <table class="table table-hover table-shop">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>名称</th>
                        <th>价格</th>
                        <th>数量</th>
                        <th>总价</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(cart,index) in cartList' :key="cart.id">
                        <td>{{cart.id}}</td>
                        <td>{{cart.name}}</td>
                        <td>{{cart.price}}</td>
                        <td>{{cart.num}}</td>
                        <td>{{cart.price*cart.num}}</td>
                        <td>
                            <div @click="action_cartAdd(index)" class="btn btn-info">+</div>
                            <div @click="action_cartReduce(index)" class="btn btn-warning">-</div>
                            <div @click="action_cartDelete(index)" class="btn btn-danger" title='删除'>x</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="cart-info">
        <div>
            <div class='item'>总数：<strong>{{cartInfos.total_nums}}</strong></span></div>
            <div class='item'>总价：<strong>{{cartInfos.total_price}}</strong></span></div>

            <div class="item pull-right btn btn-danger" @click='clear_db'>清空购物车</div>
        </div>
    </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default{
        name:"shop",
        computed:mapGetters([
            'cartList','cartInfos'
        ]),
        data(){
            return {
                items: [{
                    id: 1,
                    name: '鱼香肉丝',
                    price: 12,
                }, {
                    id: 2,
                    name: '宫保鸡丁',
                    price: 14
                }, {
                    id: 3,
                    name: '土豆丝',
                    price: 10
                }, {
                    id: 4,
                    name: '米饭',
                    price: 2
                }]
            }
        },
        mounted(){
            var list = this.$store.state.cartList;
            for(var i = 0;i<this.items.length;i++){
                for(var j = 0;j<list.length;j++){
                    if(list[j].id == this.items[i].id){
                        this.$set(this.items,i,list[j]);
                        break;
                    }
                }
            }
        },
        methods:{
            add_shop(item){
                var id = item.id;
                this.$store.dispatch("check_shop",{
                    id
                })

                if(this.$store.state.curIndex != -1){
                    this.$store.dispatch("add_shop");
                } else {
                    this.$set(item,'num',1);
                    this.$store.dispatch("create_shop",{
                        item
                    });
                }

                
            },
            reduce_shop(item){
                var id = item.id;
                this.$store.dispatch("check_shop",{
                    id
                });
                item.num = parseInt(item.num);
                this.$store.dispatch("reduce_shop");
            },
            action_cartAdd(index){
                this.$store.dispatch("update_cur_shop_status",{
                    index
                })
                this.$store.dispatch("add_shop");
            },
            action_cartReduce(index){
                this.$store.dispatch("update_cur_shop_status",{
                    index
                })
                this.$store.dispatch("reduce_shop");
            },
            action_cartDelete(index){
                this.$store.dispatch("update_cur_shop_status",{
                    index
                })
                this.$store.dispatch("delete_shop");
            },
            clear_db(){
                this.$store.dispatch('clear_local');
            }
        }
    }
</script>

<style scoped>
    .table-shop th{
        text-align: center;
    }
    .cart-info{
        font-size: 20px;
        text-align: left;
    }
    .item{
            display: inline-block;
            margin-right: 20px;
        }
</style>
