<template>
  <main>
     <div class='form-container'>
      <div class="form" id="step-address">
        <h2>寄送地址</h2>
        <div class="input-form-group">
          <div class="form-row name-box">
            <div class="form-item ">
              <label for="title">稱謂</label>
              <div class="select-wrapper">
                <select v-model="addresseeInfo.gender" name="title" id="title">
                  <option disabled value="" selected>請選擇稱謂</option>
                  <option value="man" >先生</option>
                  <option value="woman">小姐</option>
                </select>
              </div>
            </div>
            <div class="form-item">
              <label for="">姓名</label>
              <input v-model="addresseeInfo.name" type="text" name=" name" id="name" placeholder="請輸入姓名">
            </div>
          </div>
          <div class="form-row phone">
            <label for="phone">電話</label>
            <input v-model="addresseeInfo.tel" type="number" name="phone" id="phone" placeholder="請輸入行動電話">
          </div>
          <div class="form-row email">
            <label for="email">Email</label>
            <input v-model="addresseeInfo.email" type="email" name="email" id="email" placeholder="請輸入電子郵件">
          </div>
          <div class="form-row city">
            <label for="city">縣市</label>
            <div class="select-wrapper">
              <select v-model="addresseeInfo.selectedCity" name="city" id="city" class="city-select" required>
                <option disabled value="" selected >請選擇縣市</option>
                <option 
                  v-for ="city in cities"
                  :key="city.id"
                  :value="city.id"            
                >
                {{city.name}}
                </option>
              </select>
            </div>
          </div>
          <div class="form-row address-box">
            <label for="address">地址</label>
            <input v-model="addresseeInfo.address" type="text" name="address" id="address" placeholder="請輸入地址">
          </div>
        </div>       
      </div>  
    
  </div>

  </main>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
const cities = [
 {
  id: uuidv4(),
  name: '臺北市'
},
  {
    id: uuidv4(),
      name: '新北市'
  },
{
  id: uuidv4(),
    name: '桃園市'
},
{
  id: uuidv4(),
    name: '臺中市'
},
{
  id: uuidv4(),
    name: '臺南市'
},
{
  id: uuidv4(),
    name: '高雄市'
},
{
  id: uuidv4(),
    name: '基隆市'
},
{
  id: uuidv4(),
    name: '新竹市'
},
{
  id: uuidv4(),
    name: '新竹縣'
},
{
  id: uuidv4(),
    name: '嘉義市'
},
{
  id: uuidv4(),
    name: '嘉義縣'
},
{
  id: uuidv4(),
    name: '苗栗縣'
},
{
  id: uuidv4(),
    name: '彰化縣'
},
{
  id: uuidv4(),
    name: '南投縣'
},
{
  id: uuidv4(),
    name: '雲林縣'
},
{
  id: uuidv4(),
    name: '南投縣'
},
{
  id: uuidv4(),
    name: '宜蘭縣'
},
{
  id: uuidv4(),
    name: '花蓮縣'
},
{
  id: uuidv4(),
    name: '臺東縣'
},
{
  id: uuidv4(),
    name: '澎湖縣'
},
{
  id: uuidv4(),
    name: '金門縣'
},
{
  id: uuidv4(),
    name: '連江縣'
},

]

export default {
  
  data(){
    return{
      routerStep:this.$route.name,
      cities: cities,
      addresseeInfo:{   
      gender:'',
      name:'',
      tel:'',
      email:'',
      selectedCity:'',
      address:''
      }
    }    
  },
  methods:{
    getAddresseeInfo(){
      this.$emit('after-complete-addressee-info', this.addresseeInfo)
    }
  },
  watch:{
    addresseeInfo:{
      deep: true,
      handler: function(){
        this.$emit('after-complete-address-form', this.addresseeInfo)
        
      }
    }
  }
  // updated(){
  //   this.getAddresseeInfo()
  // }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/formStyle';   
   .input-form-group {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 0.5rem 1rem;
    .form-row {
      &.name-box {
        grid-column: 1/7;
      }
      &.phone {
        grid-column: 1/7;
      }
      &.email {
        grid-column: 1/7;
      }
      &.city {
        grid-column: 1/7;
      }
      &.address-box {
        grid-column: 1/7;

      }
    }
  }
  @media screen and (min-width: 376px) {
    .input-form-group {
      .form-row {
        &.name-box {
          grid-column: 1/7;
        }
        &.phone {
          grid-column: 1/4;
        }
        &.email {
          grid-column: 4/7;
        }
        &.city {
          grid-column: 1/3;
        }
        &.address-box {
          grid-column: 3/7;

        }
      }
    }
  }
   
</style>