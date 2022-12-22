<template>
  <div :class="[whitchStyle==='view'?'info-view' : 'info-run']">
    <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.basic')}}</div>
    <div> <span>{{$t('language.step')}}:</span>  <span>{{ info.step_name}}</span></div>
    <div> <span>{{$t('language.well')}}:</span>  <span>{{info.well}}</span></div>
    <div> <span>{{$t('language.basic_labware')}}:</span>  <span>{{basicLabware}}</span></div>
    <div> <span>{{$t('language.volume')}}(5-{{volume.v}}μl):</span>  <span>{{info.volume}}</span></div>
    <template v-if="info.basic_labware===2">
      <div> <span>{{$t('language.mix_time')}}(1-999s):</span>  <span>{{info.mix_time}}</span></div>
      <div> <span>{{$t('language.mix_speed')}}(1-10Hz):</span>  <span>{{info.mix_speed}}</span></div>
      <div> <span>{{$t('language.mix_position')}}(0-20mm):</span>  <span>{{info.mix_position}}</span></div>
      <div> <span>{{$t('language.mix_volume')}}(5-{{volume.mixV}}μl):</span>  <span>{{info.mix_volume}}</span></div>
    </template>
    <template v-else>
      <div>
        <span>{{$t('language.segments')}}(1-5):</span>  <span>{{ info.mix_segments }}</span>
      </div>
      <div>
        <span>{{$t('language.every_mix_times')}}(1-999):</span>  <span>{{ info.every_mix_times }}</span>
      </div>
      <div>
          <span>{{$t('language.mix_type')}}:</span>  <span>{{ info.mix_type? $t('language.bottom_top') :$t('language.top_bottom')}}</span>
      </div>
      <div>
        <span>{{$t('language.mix_volume')}}(5-{{volume.mixV}}μl):</span>  <span>{{ info.mix_volume }}</span>
      </div>
      <div>
        <span>{{$t('language.mix_speed')}}(50%-150%):</span>  <span>{{ info.mix_speed }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import MixinChangeVolume from '@/mixins/changeVolume.js'
export default {
  data () {
    return {
    }
  },
  mixins: [MixinChangeVolume],
  created () {
  },

  methods: {
  }
}
</script>

<style scoped>
 @import url(../../../../style/stepInfo.css);
</style>
