<template>
  <div class="stepper-wrapper">
      <div 
        v-for="step in steps"
        :key="step.id"
        :class="{'step-active':step.active, checked:step.checked}"
        class="step-item" >
        <div class="circle "></div>
        <p class="step-title ">
          {{step.title}}
        </p>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    stepData:{
      type: Array,
      required: true
    },
    nowStep:{
      type: Number,
      required: true
    }
  },
  data(){
    return {
      steps:this.stepData
    }
  },
  methods:{
    toggleStatus(){
      this.steps = this.steps.map(step => {
        if( step.id === this.nowStep){
          return{
            ...step,
            active: true,
            checked: false
          }
        }
        if(step.id === this.nowStep+1){
          return {
            ...step,
            active:false,
            checked:false
          }
        }
        if( step.id === this.nowStep - 1) {
          return {
            ...step,
            active: true,
            checked: true
          }
        }
        return step
      })
    },
   
  },
  watch:{
    nowStep(){
      this.toggleStatus()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.stepper-wrapper {
    display: flex;
    justify-content: space-between;
    line-height: 100%;
    position: relative;
    .step-item::after{
      content: '';
      width: 60px;
      height: 3px;
      display: inline-block;
      background: black;  
      position: absolute;
      left: 60px;       
    }
    >div:last-child{
      justify-content: end;
    }
    > div:last-child::after{
      display: none;
    }
    > div:nth-child(2){
        justify-content: center;
      &::after{
        left: 90px;
      }  
    }
    .step-item{   
      display: flex;
      flex-basis: 25%;
      position: relative;
      align-items: center;
      @include stepperNum(3);
      color:  $label-font-color; 
      &.step-active {
        > .circle{
          background-color: $dark-dark-gray;
          color: $pale-gray;
        }
        > p {
          color:$title-font-color;
        }     
      } 
      &.checked {
        > .circle::after {
          content:"\2714";
          color:$pale-gray;
        }
        
      } 
    }
    .circle {  
      flex-shrink: 0;
      flex-basis: 30px;
      height: 30px;
      border: 1px solid $label-font-color;
      border-radius: 23px;
      text-align: center;
    }
    .step-title {
      display: none;
      flex:1;
      padding-left: 5px;
      color: $label-font-color;
    }
  }
  @media screen and (min-width:376px) { 
    .stepper-wrapper{
      > div:nth-child(2){
        justify-content: center;
      &::after{
        left: 110px;
       } 
      }
    
      .step-item::after{
        position: absolute;
        left: 110px;       
      }
      .step-title {
      display: block;
      color: $label-font-color;
    }
    }
    
  }
</style>
