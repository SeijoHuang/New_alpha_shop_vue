<template>
  <main >
    <h1>結帳</h1>
    <div class="main-container">
      <section class="stepper-container">
        <Stepper
          :stepData="stepData"
          :nowStep="nowStep"
        />
      </section>
      <section class="form-wrapper">
        <div v-show="nowStep === 1">
          <StepAddress
             @after-complete-address-form="afterCompleteAddressForm"
          />
        </div>
        <div v-show="nowStep === 2">
          <StepDelivery
           @after-selected-shipment=" afterSelectedShipment"
          />
        </div>
        <div v-show="nowStep === 3"> 
          <StepPayment 
           @after-get-payment-info="afterGetPaymentInfo"
          />
        </div>
      </section>
      <section class="cart-content">
        <CartItems
          :fee="checkoutInfo.selectedShipment.fee"
          @get-cart-items="getCartItems"
        />
      </section>
      <section class="buttons-container">
        <Buttons
         :nowStep="nowStep"
         :checkOutInfo="checkoutInfo"
         @after-click-next="clickNext"
         @after-click-prev="clickPrev"
         @after-click-submit="clickSubmit"
        />
      </section>
      
    </div>
  </main>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import Buttons from '../components/Buttons.vue'
import Stepper from '../components/Stepper.vue'
import CartItems from '../components/CartItems.vue'
import StepAddress from '../components/StepAddress'
import StepDelivery from '../components/StepDelivery'
import StepPayment from '../components/StepPayment'

const dummyCartItems = {
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
  name:'CartPage',
  components:{
    CartItems,
    Stepper,
    StepAddress,
    StepDelivery,
    StepPayment,
    Buttons
  },
  data(){
    return{
      routerStep:'address',
      nowStep:1,
      stepData:[
        {
          id: 1,
          name:'address',
          title:'寄送地址',
          active:true,
          checked: false
        },
        {
          id: 2,
          name:'delivery',
          title:'運送方式',
          active:false,
          checked: false
        },
        {
          id: 3,
          name:'payment',
          title:'付款資訊',
          active:false,
          checked: false
        }
       ],
      items:[],
      checkoutInfo:{
        addresseeInfo:{},
        selectedShipment:{
          id:'',
          fee: 0
        },
        paymentInfo:{},
        cartItems:[]

      }
    }
  },
  methods:{
    fetchCartItems(){
      this.items = dummyCartItems.Items
    },
    afterCompleteAddressForm(addresseeInfo){
      console.log('send')
      this.checkoutInfo.addresseeInfo = addresseeInfo
    },
    afterSelectedShipment(payload){
      const {id, fee} = payload
      this.checkoutInfo.selectedShipment ={
        ...this.checkoutInfo.selectedShipment,
        id,
        fee 
      }
    },
    afterGetPaymentInfo(paymentInfo){
      this.checkoutInfo.paymentInfo = paymentInfo
    },
    getCartItems(payload){
      this.checkoutInfo.cartItems = payload
    },
    clickNext(step){
      this.nowStep = step
      let router = this.stepData.find(step => step.id === this.nowStep
      )
      this.$router.push({params:{step:router.name}})
    },  
    clickPrev(step){
      this.nowStep = step
      let router = this.stepData.find(step => step.id === this.nowStep)
      this.$router.push({params:{step:router.name}})
      
    },
    clickSubmit(){
      const order = JSON.parse(JSON.stringify(this.checkoutInfo))      
      console.log(order)

    }
  },
  created(){
    this.fetchCartItems()
  }
 
}
</script>
<style lang="scss" >
@import '../assets/scss/main.scss';
  .main-container{
    display: flex;
    flex-flow: column;
  }
  .form-wrapper{
    margin-bottom: 1rem;
  }
@media screen and (min-width: 376px) {
  .form {
      height: 320px;
    }
  .main-container{
    padding-top: 3rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 90px 300px 100px;
    .stepper-container{
       grid-column: 1/7;
       grid-row: 1/2;
    }
    .form-wrapper{
      grid-column: 1/7;
      grid-row: 2/3;
    }
    .cart-content{
      grid-column: 8/13;
      grid-row: 1/4;
    } 
    .buttons-container{
      grid-column: 1/7;
      grid-row: 3/4;
    }  
  }
}

</style>