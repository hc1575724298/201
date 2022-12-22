<template>
  <div class="progress-container">
    <el-progress type="circle" :percentage="progress" :show-text="false" color="#4c7cb2">
    </el-progress>
    <div class="content">
      <p>{{$t('language.remaining_time')}}</p>
      <p class="time">{{time}}</p>
    </div>
    <div class="line">
      <div class="lineContainer">
        <div class="dot" :style="{
          transform: `translate(-50%, 0) rotate(${deg}deg)`
        }"></div>
      </div>
    </div>
    <div class="status">{{$t('language.status')}}：<span>{{status ? $t('language.finished_run') : $t('language.running')}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'runTime',
  components: {},
  props:{
    time:{
      type: String,
      default: 0
    },
    progress:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      value:0,
      status: false // true 结束  false 运行中
    }
  },
  computed: {
    deg(){
      if(this.progress===100){
        this.status = true
      }
      return this.progress/100 * 360

    }
  },
  created() {
  },
  methods: {
  },
}
</script>

<style scoped>
.progress-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.progress-container,
.el-progress>>>.el-progress-circle {
  width: 295px !important;
  height: 295px !important;
}
.line,
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 18px;
  color: #666;
}
.content .time {
    font-size: 34px;
    margin-top: 10px;
    color: #333;
    font-weight: 700;
  }
.line {
  width: 233px;
  height: 233px;
  border-radius: 50%;
  border: 1px solid #e5e9f2;
}
.lineContainer{
  position: relative;
   width: 233px;
  height: 233px;
   border-radius: 50%;
}
.lineContainer .dot {
  width: 1px;
  height: 116px;
  position: absolute;
  top: 0;
  left: 50%;
  transition: all .5s ease-out;
  transform-origin:bottom;
}
.lineContainer .dot::after{
    content: '';
    position: absolute;
    top: -6px;
    left: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #4c7cb2;
  }
  .status {
    font-size: 28px;
    color: #333;
    margin-top: 34px;
  }
</style>
