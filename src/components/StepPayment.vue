<template>
  <main class="form-container">
    <div class="form" id="step-payment"> 
      <h2>付款資訊</h2>
      <div class="form-row card-owner">
        <label for="owner-name">持卡人姓名</label>
        <input v-model="paymentInfo.cardOwner" type="text" name="owner-name" id="owner-name" placeholder="John Doe">
      </div>
      <div class="form-row number">
        <label for="card-number">卡號</label>
        <input v-model="paymentInfo.cardNumber" type="text" name="card-number" id="card-number" placeholder="1111 2222 3333 4444">
      </div>
      <div class="form-row card-detail-box d-flex">
        <div class="form-item">
          <label for="valid-date">有效期限</label>
          <input v-model="paymentInfo.cardValid" type="text" name="valid-date" id="valid-date" placeholder="MM/YY">
        </div>
        <div class="form-item">
          <label for="safety-num">CVC/CCV</label>
          <input v-model="paymentInfo.cardSafetyNum" type="text" name="safety-num" id="safety-num" placeholder="123">
        </div>
      </div>
    </div>   
  </main>
</template>

<script>
export default {
  data(){
    return {
      routerStep:'payment',
      paymentInfo:{
        cardOwner:'',
        cardNumber:'',
        cardValid:'',
        cardSafetyNum:''
      }
    }
  },
  watch:{
    paymentInfo:{
      deep: true,
      handler(){
        this.$emit('after-get-payment-info', this.paymentInfo)
      }
    }
  }
}
</script>
<style lang="scss">
 @import '~@/assets/scss/formStyle';
 #step-payment{
    .card-owner, .number{
      max-width: 350px;
    }
    .card-detail-box{
      justify-content: space-between;    
      .form-item {
        flex-basis: 45%;
        &:nth-child(1) > input{
          -webkit-appearance: none;
          &:invalid {
            color: $light-gray;
          }
        }
      }      
    }  
 }
</style>
