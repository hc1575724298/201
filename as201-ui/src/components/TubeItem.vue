<template>
  <div :class="['container', 'flexClo',selected?'selected' :'']" :style="{
    marginRight:isGroup?'20px':0
  }">
    <div :class="['header','flexClo']">
       <div v-if="tubeNum===2">
          <img src="@/images/run/2ML 1.png" alt="" v-if="!selected&&!checked">
          <img src="@/images/run/2ML 2.png" alt="" v-if="selected&&!checked">
          <img src="@/images/run/2ML 3.png" alt="" v-if="checked">
       </div>
       <div v-if="tubeNum===8">
          <img src="@/images/run/8ML 1.png" alt="" v-if="!selected&&!checked">
          <img src="@/images/run/8ML 2.png" alt="" v-if="selected&&!checked">
          <img src="@/images/run/8ML 3.png" alt="" v-if="checked">
       </div>
       <div v-if="tubeNum===15">
          <img src="@/images/run/15ML 1.png" alt="" v-if="!selected&&!checked">
          <img src="@/images/run/15ML 2.png" alt="" v-if="selected&&!checked">
          <img src="@/images/run/15ML 3.png" alt="" v-if="checked">
       </div>
    </div>

    <div :class="['bottom', 'flexClo',isGroup?'bottomR':'']">
      <div class="A-well">
        <span :class="[lighhightList.includes('A')?'bg':'',checked? 'checked' : '',
      A==10?'A-10ml':'', A==5?'A-5ml':'', A==2?'A-2ml':'']"
        ></span>
        <!-- <img src="@/images/run/A孔10ML.png" alt=""> -->
        <!-- <img src="@/images/run/A孔1.5或2ML.png" alt=""> -->
        <!-- <img src="@/images/run/A孔5ML.png" alt=""> -->
      </div>
      <span :class="[lighhightList.includes('B')?'bg':'',checked? 'checked' : '']"></span>
      <span :class="[lighhightList.includes('C')?'bg':'',checked? 'checked' : '']"></span>
      <div :class="['DE-well',checked? 'checked' : '']">
        <span :class="[checked?'checked-white':'']"></span>
      </div>
      <div :class="['DE-well',checked? 'checked' : '']">
        <span :class="[checked?'checked-white':'']"></span>
      </div>

    </div>

    <!-- <div :class="['middle', 'flexClo',isGroup?'middleR':'']">
      <span :class="[lighhightList.includes('A')?'bg':'',checked? 'checked' : '']"></span>
      <span :class="[lighhightList.includes('B')?'bg':'',checked? 'checked' : '']"></span>
    </div> -->
    <!-- <div class="footer flexClo">
      <span :class="[lighhightList.includes('C')?'bg':'',checked? 'checked' : '']"></span>
      <section class="flexClo">
        <img src="@/images/run/组 8065.png" v-if="!(!!lighhightList.length)&&selected&&!checked">
        <img src="@/images/run/组 8135.png" v-else-if="!(!!lighhightList.length)&&!selected&&!checked">
        <img src="@/images/run/8.png" v-else-if="!!lighhightList.length &&lighhightList.includes('D')">
        <img src="@/images/run/9.png" v-else-if="!!lighhightList.length &&lighhightList.includes('E')">
        <img src="@/images/run/组 8136.png" v-else-if="!(!!lighhightList.length)&&checked"/> -->


        <!-- css画 -->
        <!-- <div><p :class="[lighhightList.includes('D')?'bg':'']"></p ></div>
        <div><p :class="[lighhightList.includes('E')?'bg':'']"></p ></div>
       <aside :class="['footerMiddle',selected?'selected' :'']">
        <div class="footerPosition"></div>
      </aside> -->
      <!-- </section> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState as mapProtocolsState } from 'vuex'
export default {
  name: 'TubeItem',
  components: {},
  props: {
    selected:{
      type:Boolean,
      default:false,
    },
    lighhightList:{
      type:Array,
      default:()=>[]
    },
    isGroup:true,
    checked:{
      type:Boolean,
      default:false,
    },
    tubeNum:{
      type: Number,
      default: 2
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapProtocolsState('protocols',['protocalInfo']),
    A(){
      if(this.protocalInfo.well_a==="10ml_Allsheng") {
        return 10
      }else if (this.protocalInfo.well_a==="5ml_Allsheng"){
        return 5
      }else {
        return 2
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped>
  div,
  span,
  section,
  p,
  img {
    box-sizing: border-box !important;
  }

.container{
  width: 54px;
	height: 700px;
	border-radius: 6px;
  align-items: center;
  justify-content: center;
}

.flexClo {
  display: flex;
  flex-direction: column;
}

.header {
  width: 40px;
  align-items: center;
  justify-content: center;
}
.bottom{
  margin-top: 15px;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.bottom::before,
.bottomR::before{
  content: '';
  position: relative;
  bottom: 0;
  height: 1px;
  background-color: #c2cbda;
}
.bottom::before {
  width: 54px;
}
.bottomR::before{
  width: 110px;
}
.bottom>span {
  width: 34px;
  height: 34px;
  margin-bottom: 10px;
}
.DE-well {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #8f9ba8;
  margin-bottom: 10px;
}
.DE-well span{
  width: 20px;
  height: 20px;
}
.A-well {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  width: 100%;
  height: 65px;
}
.A-10ml,
.A-5ml,
.A-2ml,
.DE-well span,
.bottom>span {
  border-radius: 50%;
  display: inline-block;
  border: 1px solid #8f9ba8;
}
.A-10ml {
  width: 46px;
  height: 46px;
}
.A-5ml{
  width: 40px;
  height: 40px;
}
.A-2ml{
  width: 34px;
  height: 34px;
}
.selected {
  background-color: #E6F2FF !important;
}

.bg{
  background-color: #F2E8B4 !important;
}
 .checked {
  background-color: #dfefff!important;
  border-color: #5691d3!important;
 }
 .checked-white {
  background-color: #fff!important;
  border-color: #5691d3 !important;
 }
</style>
