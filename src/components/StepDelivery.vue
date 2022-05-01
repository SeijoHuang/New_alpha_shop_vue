<template>
  <div class="form-container">
    <div class="form" id="step-delivery" >
          <h2>運送方式</h2>
          <div 
            v-for=" option in options"
            :key=" option.id"
            class="form-row mt-6 d-flex">
            <div class="input-wrapper">
              <input 
                type="radio" 
                name="delivery-option" 
                :id="option.id" 
                :value="option.id"
                v-model="selectedOption.id"
                @change="getDeliveryOption(option.fee)"
                >
            </div>
            <div class="label-wrapper">
              <label :for="option.id"> 
                {{option.method}}
              </label>
              <label :for="option.id">
                {{option.transitTime}}
              </label>
            </div>
            <label class="fee" :for="option.id">
              {{option.fee | feeFilter}}
            </label>
          </div>   
        </div>
   

  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  
  data(){
    return{
      options:[      
      {
        id: uuidv4(),
        method:'標準運送',
        fee: 0,
        transitTime: '約3~7個工作天',
      },
      {
        id:uuidv4(),
        method:'DHL貨運',
        fee: 500,
        transitTime: '48小時內送達',
      }
      ],
      selectedOption:{
        id:'',
        fee:0
      },
      routerStep:'delivery',     
    }
  },
  methods:{
    getDeliveryOption(fee){
      this.selectedOption.fee = fee 
       this.$emit('after-selected-shipment', this.selectedOption)
    }
  },
  filters:{
    feeFilter(fee){
      return fee? '$'+fee : '免費'
    }
  }
 
}
</script>

<style lang="scss" >
  @import '../assets/scss/main.scss';
   #step-delivery {
    .label-wrapper{
      display: flex;
      flex-flow: column;
    }   
    .form-row {
      border: 1px solid $label-font-color;
      border-radius: 5px;
      max-width: 465px;
      height: 60px;
      align-items: center;
      
     //input radio樣式
      input[type = "radio"]{
        -webkit-appearance: none;
        width: 10px;
        height: 10px;
        border:  1px solid var(--radio-border);
        border-radius: 50%; 
        background-color: var(--input-radio);
        cursor: pointer;       
        &:checked {     
          border: 5px solid var(--radio-border);
          background-color:white;
        }
      } 
      .label-wrapper{
        flex: 1;
        label{
          cursor: pointer;
          padding-bottom: 0;
          font-size: 1rem;
          color: black;
          &:nth-child(2){
            font-size: 12px;
          }
        }       
      }
      .input-wrapper{
        display: flex;
        justify-content: center;
      }
      .fee, .input-wrapper{
        flex-basis: 50px;
      }
      .fee {
        color: black;
      }
      &:hover {
        border-color: var(--title-font-color);
        border-width: 2px;
      }
      // dhl粗體
      &:nth-child(3){
        .label-wrapper{
          label:nth-child(1){
            font-weight: 700;
          }
        }
      }
    }
  }
</style>
