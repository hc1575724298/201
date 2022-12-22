<template>
  <el-dialog
  class="liauidDialolog"
  :title="$t('language.liquid')"
  :visible="isShowLiquidDialog"
  append-to-body
  @close="close"
  width="77%"
  >
    <div class="info">
      <div> <span>{{$t('language.aspirate_speed')}}(20-200ul/s):</span>  <span>{{liquidInfo.aspirate_speed}}</span></div>
      <div> <span>{{$t('language.aspirate_acceleration')}}:</span>  <span>{{liquidInfo.aspirate_acceleration}}</span></div>
      <div> <span>{{$t('language.aspiration_delay')}}:</span>  <span>{{liquidInfo.aspirate_delay}}</span></div>
      <div> <span>{{$t('language.aspiration_position')}}(0-20mm):</span>  <span>{{liquidInfo.aspirate_position}}</span></div>
      <div> <span>{{$t('language.prewetting')}}:</span>  <span>{{liquidInfo.prewetting}}</span></div>
      <div> <span>{{$t('language.blow_liquid')}}:</span>  <span>{{liquidInfo.blow_liquid_volume}}</span></div>
      <div> <span>{{$t('language.air_gap')}}:</span>  <span>{{liquidInfo.air_gap_volume}}</span></div>
      <div> <span>{{$t('language.mix_before_aspirating')}}:</span>  <span>{{liquidInfo.mix_before_aspirating_on? 'On' : 'Off'}}</span></div>
      <div> <span>{{$t('language.dispense_speed')}}:</span>  <span>{{liquidInfo.dispense_speed}}</span></div>
      <div> <span>{{$t('language.dispense_acceleration')}}:</span>  <span>{{liquidInfo.dispense_acceleration}}</span></div>
      <div> <span>{{$t('language.dispense_delay')}}:</span>  <span>{{liquidInfo.dispense_delay}}</span></div>
      <div> <span>{{$t('language.dispense_position')}}(0-20mm):</span>  <span>{{liquidInfo.dispense_position}}</span></div>
    </div>
    <div class="info" style="height: 276px;padding-left: 15px;" v-if="liquidInfo.mix_before_aspirating_on">
      <div> <span>{{$t('language.segments')}}(1-5):</span>  <span>{{liquidInfo.segments}}</span></div>
      <div> <span>{{$t('language.every_mix_times')}}(1-999):</span>  <span>{{liquidInfo.every_mix_times}}</span></div>
      <div> <span>{{$t('language.mix_volume')}}(5-{{volume}}μl):</span>  <span>{{liquidInfo.mix_volume}}</span></div>
      <div> <span>{{$t('language.mix_speed')}}(1-10):</span>  <span>{{liquidInfo.mix_speed}}</span></div>
    </div>

  </el-dialog>
</template>

<script>
export default {
  data () {
    return {

    }
  },
props:{
  isShowLiquidDialog:{
    type: Boolean,
    default: false,
  },
  liquidInfo:{
    type: Object,
    default: ()=>([])
  },
  volume:{
    type: Number | String,
  }
},
  created () {
  },

  methods: {
    close(){
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.info {
  height: 558px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.info div{
  width: 50%;
  margin-bottom: 34px;
  font-size: 26px;
}
.info div span:nth-child(2) {
  margin-left: 20px;
  color: #4171bb;
}
.liauidDialolog >>>.el-dialog__header {
  margin: 0 20px;
  border-bottom: 1px solid #909399;

}
.liauidDialolog >>>.el-dialog__header span {
  font-size: 28px;
  color: #4171bb;
}
.liauidDialolog >>>.el-dialog__body {
  padding: 30px 50px;
}
.liauidDialolog >>>.el-dialog__headerbtn .el-dialog__close {
  font-size: 28px;
}
</style>
