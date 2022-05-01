<template>
  <div class="cart">
    <h1>購物籃</h1>
    <div class="cart-wrapper">
      <div class="cart-list d-flex flex-column ">
        <div 
          v-for="item in items"
          :key="item.id"
          class= "cart-item d-flex mb-4">
          <div class="item-img">
          <img :src="item.image" alt="">
          </div>
          <div class="item-detail d-flex ml-4">
            <div class="form-group">
              <label>{{item.name}}</label>
              <div class="input-container d-flex mt-4">
                <div 
                  @click="minusQuantity(item.id, item.quantity)"
                  class="input-quantity-control quantity-min"
                >
                  -
                </div>
                <div class="quantity-box">
                  {{item.quantity}}
                </div>
                <div
                  @click="addQuantity(item.id, item.quantity)"  
                  class="input-quantity-control quantity-plus"
                >
                  +
                </div>
              </div>
            </div>
        <div class="price-container d-flex">
          <span>$</span>
          <p class="price" >{{item.price * item.quantity}}</p>
        </div>                      
          </div>
        </div>
      </div>
      <div class="shipping d-flex justify-content-between">
        <p>運費</p>
        <p>{{fee | feeFilter}}</p>
      </div>
      <div class="total-container d-flex justify-content-between">
        <p>小計</p>
        <p class="total">{{'$'+ getTotal}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
const dummyData= {
  "Items":[
    {
      id: uuidv4(),
      name:'破壞補丁修身牛仔褲',
      price: 3999,
      image:'https://i.imgur.com/kzEnZuA.png',
      quantity: 1,
      itemTotal: 3999
    },
    {
      id:uuidv4(),
      name:'刷色直筒牛仔褲',
      price: 1299,
      image:'https://i.imgur.com/nV8dROD.png',
      quantity: 1,
      itemTotal: 1299
    }
  ]
}
export default {
  props:{
    fee:{
     type: Number,
     required: true,
     default: 0
    }
    
  },
  data(){
    return {
      items:[],
      shipping:0
    }
  },
  methods:{
    fetchItems(){
      this.items = dummyData.Items
    },
    addQuantity(itemId, quantity){
      console.log(itemId, quantity)
      this.items = this.items.map(item => {
        if(itemId !== item.id){
          return item
        }
        return {
          ...item,
          quantity: quantity+1 
        }
      })        
    },
     minusQuantity(itemId, quantity){
      console.log(itemId, quantity)
      this.items = this.items.map(item => {
        if(itemId !== item.id || item.quantity ===0 ){
          return item
        }
        return {
          ...item,
          quantity: quantity-1 
        }
      })        
    } 
  },
  filters:{
    feeFilter(fee){
      return fee? '$'+fee : '免費'
    }
  },
  computed:{
    getTotal(){
      let total = 0
      this.items.forEach(item=> {
        return total+= item.quantity*item.price
      })
       total+= this.fee
      return total
    }, 
  },
  watch:{
    items:{
      deep:true,
      handler: function(){
        this.$emit('get-cart-items', this.items)
      }
    }
  },
  created(){
    this.fetchItems()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.cart {
  border: 1px solid $cart-border;
  border-radius: 5px;
  padding: 1rem 1rem 0 1rem;
  background-color: var(--cart-background-color);
  width: 100%;
   .shipping, .total-container {
    border-top: 1px solid $pale-gray;
    height: 70px;
    padding-top: 16px;
  }
  .shipping {
    p:nth-child(2){
      font-weight: 600;
    }
  }

  span {
    color: var(--title-font-color);
  }
  h1 {
    line-height: 88px;
    font-size: 18px;
  }
  
  .cart-item{
    margin-bottom: 34px;
    .item-img{
      flex-basis: 100px;
      flex-shrink: 0;
      // width: 100px;
      height: 100px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .item-detail{
    flex: 1;
    align-items: center;
    .form-group{
      width: 100%;
    }
    .price {
      font-weight: 600;
    }   
  }
  .quantity-box{
    width: 2rem;
    text-align: center;
  }
  // quantity input form
  .input-container {
    justify-content: flex-star;
    > .input-quantity-control{
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: $quantity-btn;
      text-align: center;
      cursor: pointer;
      &:hover {
        box-shadow: 1px 1px 2px gray inset;
      }
    }
     input[type = "number"] {
      appearance: none;
      width: 53px;
      border: none;
      text-align: center;
      background: transparent;
      color: var(--title-font-color)
    }  
  }
 
}
</style>