<template>
  <main id="alpha-shop">
   
    <router-view/>
  </main>
</template>
<script>
// import {cities} from '../assets/DummyData/cities'
export default {
  data(){
    return {
    
    }
  }
}

</script>

<style lang="scss" scoped>
main{
  box-sizing: border-box;
  // margin: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.5rem;

}
@media screen and (min-width:376px) {
  main{
    padding: 3rem;
  }
}
</style>

