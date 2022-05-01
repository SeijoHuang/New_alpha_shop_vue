<template>
  <div class="button-group mt-9">
    <button 
      v-show="step !== 1"
       @click.stop.prevent = "prevStep"
      class="btn-item pre-btn">
    上一步 
    </button> 
          
    <button 
      v-show="step !== 3"
      @click.stop.prevent = "nextStep"
      class="btn-item next-btn">
    下一步 
    </button >
    <button 
      v-show="step === 3"
      type="submit" class="btn-item submit-btn"
      @click.stop.prevent="submitOder"
    >
      確認下單
    </button>
  </div>
</template>
<script>
export default {
  props:{
    nowStep:{
      type: Number,
      required: true
    },
    checkOutInfo:{
      type: Object,
      required: true
    }
  },
  data(){
    return {
      step: this.nowStep,
      order: {...this.checkOutInfo}
      
    }
  },
  methods:{
    nextStep(){
      console.log('next')
      if(this.step > 3) return
      this.step+=1
      this.$emit('after-click-next', this.step)
    },
    prevStep(){
      if(this.step === 0) return
      this.step -= 1
      this.$emit('after-click-prev', this.step)

    },
    submitOder(){
      this.$emit('after-click-submit')
    }
  }
}
</script>

<style lang="scss" >
  @import '../assets/scss/main.scss';
   .button-group{
    width: 100%;
    display: flex;
    border-top: 1px solid $pale-gray;
    height: 70px;
    padding-top: 24px;
    button{
      @extend %button-style;
      width: 100%;
      &.pre-btn {
        text-align: left;
        color: var(--title-font-color);
      }
      
      &.next-btn, &.submit-btn{
        background: $step-btn-color;
        color: $white;
      }
    } 
   
  
  }
  @media screen and (min-width: 376px) {
    .button-group{
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      border-top: 1px solid $pale-gray;
        button{
          &.pre-btn {
          grid-column: 1/2;
          text-align: left;
          color: var(--title-font-color);
        }
        
        &.next-btn, &.submit-btn{
          grid-column: 3/4;
          background: $step-btn-color;
          color: $white;
        }
      }
    }
  }
</style>