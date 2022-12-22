<template>
  <div class="interval-model">
    <div class="interval">
      <el-progress type="circle" :percentage="active_percentage" @click="changePercentage()" :width="254"
        :stroke-width="22" color="#645DCF" stroke-linecap="square" :show-text="false">
      </el-progress>
      <div class="interval-white-circle">
      </div>
      <div class="interval-in-circle" @click="isShowStopDialog = true">
        {{clear_time.hours}}:{{ clear_time.minutes}}:{{ clear_time.second}}
      </div>
    </div>
   <StopClearDialog :isShowStopDialog ="isShowStopDialog" @close="isShowStopDialog=false" @closeUv="$emit('intervalEnd')"/>
  </div>
</template>

<script>
import  StopClearDialog from "@/components/StopClearDialog.vue"
  export default {
    props: ['interval'],
    data() {
      return {
        active_percentage: 0,
        clear_time: {
          hours: '00',
          minutes: '00',
          second: '00'
        },
        timer: null,
        isShowStopDialog: false
      }
    },
    components:{
      StopClearDialog
    },
    mounted() {
      this.timer = setInterval(this.changePercentage, 1000);
    },
    methods: {
      changePercentage() {
        var seconds = Number(this.interval.hours) * 3600 + Number(this.interval.minutes) * 60;
        var current_seconds = Number(this.clear_time.hours) * 3600 + Number(this.clear_time.minutes) * 60 + Number(this
          .clear_time.second);
        this.active_percentage = current_seconds / (seconds + 0.0) * 100;
        if (this.clear_time.second == '59') {
          this.clear_time.second = '00';
          if (this.clear_time.minutes < '59') {
            this.clear_time.minutes++;
          } else {
            this.clear_time.minutes = '00';
            this.clear_time.hours++;
          }
          if (this.clear_time.minutes < 10 && this.clear_time.minutes > 0) {
            this.clear_time.minutes = "0" + this.clear_time.minutes;
          }
        } else {
          this.clear_time.second++;
          if (this.clear_time.second < 10 && this.clear_time.second > 0) {
            this.clear_time.second = "0" + this.clear_time.second;
          }
        }
        if (this.active_percentage == 100) {
          clearInterval(this.timer);
          this.$message({
            message: this.$t("language.clear_success"),
            type: 'success'
          });
          this.$emit('intervalEnd');
        }
      }
    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
  }
</script>

<style scoped="scoped">
  .interval-model {
    position: absolute;
    display: flex;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .interval {
    position: relative;
    margin-left: 170px;
    margin-top: 173px;
    width: 254px;
    height: 254px;
  }

  .interval-white-circle {
    width: 212px;
    height: 212px;
    border-radius: 106px;
    position: absolute;
    top: 21px;
    left: 21px;
    background-color: white;
  }

  .interval-in-circle {
    width: 184px;
    height: 184px;
    position: absolute;
    top: 35px;
    left: 35px;
    border-radius: 92px;
    line-height: 184px;
    text-align: center;
    font-size: 32px;
    color: white;
    background-image: linear-gradient(0deg,
        #645dcf 0%,
        #cfc3dc 100%);
  }
</style>
