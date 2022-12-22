<template>
  <div :class="[whitchStyle==='view'?'info-view' : 'info-run']">
    <!-- basic -->
    <template v-if="isBasic||whitchStyle==='run'">
      <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.basic')}}</div>
      <div>
        <span>{{$t('language.step')}}:</span>  <span>{{ info.step_name }}</span>
      </div>
      <div>
        <span> {{$t('language.well')}}(1-C):</span> <span>{{ info.well }}</span>
      </div>
      <div>
        <span>{{$t('language.basic_labware')}}:</span>  <span>{{basicLabware}}</span>
      </div>
      <div>
        <span>{{$t('language.volume')}}(5-{{volume.v}}μl):</span>  <span>{{ info.volume }}</span>
      </div>
      <template v-if="info.basic_labware==2">
        <div>
        <span>{{$t('language.mix_time')}}(1-999s):</span> <span>{{ info.mix_time }}</span>
      </div>
      <div>
        <span>{{$t('language.mix_speed')}}(1-10Hz):</span>  <span>{{ info.mix_speed }}</span>
      </div>
      <div>
       <span>{{$t('language.mix_position')}}(0-20mm):</span>   <span>{{ info.mix_position }}</span>
      </div>
      <div>
        <span>{{$t('language.mix_volume')}}(5-{{volume.mixV}}μl):</span>  <span>{{ info.mix_volume }}</span>
      </div>
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
          <span>{{$t('language.mix_speed')}}(1%-150%):</span>  <span>{{ info.mix_speed }}</span>
        </div>
        <div v-if="info.well==1&&protocalInfo.cartridge !=2">
          <span>{{$t('language.mix_moving_speed')}}(1%-150%):</span>  <span>{{ info.mix_moving_speed }}</span>
        </div>
      </template>
      <template v-if="info.type !== 'wash'&&temp">
        <div>
          <span>{{$t('language.temperature_switch')}}:</span>
          <span>{{ info.temperature_on ? "On" : "Off" }}</span>
        </div>
        <template v-if="info.temperature_on">
          <div>
            <span>{{$t('language.temperature')}}（37-120℃):</span>  <span>{{ info.temperature }}</span>
          </div>
          <div>
            <span>{{$t('language.heating_setup')}}:</span>
            <span>{{ info.pre_heating==1 ? $t('language.preheating') : $t('language.heating_sync') }}</span>
          </div>
          <div v-if="info.pre_heating">
            <span>{{$t('language.elution_well_preheated_advance_seconds')}}(1-999s):</span>
            <span>{{ info.pre_heating_seconds }}</span>
          </div>
          <div>
            <span>{{$t('language.cooling_setup')}}:</span>
            <span>{{ info.pre_cooling==1 ? $t('language.precooling') : $t('language.precooling') }}</span>
          </div>
        </template>
      </template>
    </template>
    <!-- Magnetic -->
    <template v-if="!isBasic||whitchStyle==='run'">
      <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.magnetic')}}</div>
      <div>
        <span>{{$t('language.magnet')}}:</span>  <span>{{ info.magnet_on ? $t('language.yes') : $t('language.no') }}</span>
      </div>
      <template v-if="info.magnet_on">
        <div>
          <span>{{$t('language.basic_labware')}}:</span> <span>{{ magnetLabware }}</span>
        </div>
        <div>
          <span>{{$t('language.segments')}}(1-5):</span>  <span>{{ info.segments }}</span>
        </div>
        <template v-if="info.magnet_labware !== 2">
          <div>
            <span> {{$t('language.interval_stay_time')}}(1-999s):</span>
            <span>{{ info.interval_stay_time }}</span>
          </div>
          <div>
            <span>{{$t('language.cycle')}}(1-99):</span>  <span>{{ info.cycle }}</span>
          </div>
          <div>
            <span>{{$t('language.aspirate_speed')}}(1%-150%):</span> <span>{{ info.aspirate_speed }}</span>
          </div>
          <div>
            <span>{{$t('language.magnetic_speed')}}(1%-150%):</span> <span>{{ info.magnetic_speed }}</span>
          </div>
        </template>
        <template v-else>
          <div>
            <span>{{$t('language.every_magnetic_times')}}(1-99):</span>
            <span>{{ info.every_magnetic_times }}</span>
          </div>
          <div>
           <span>{{$t('language.liquid_level_magnetic_times')}}(0-99):</span>
            <span>{{ info.liquid_level_magnetic_times }}</span>
          </div>
          <div>
            <span>{{$t('language.cycle')}}(1-99):</span>  <span>{{ info.cycle }}</span>
          </div>
          <div>
            <span>{{$t('language.magnetic_speed')}}(1-15mm/s):</span>  <span>{{ info.magnetic_speed }}</span>
          </div>
          <div>
            <span>{{$t('language.lowest_magnetic_position')}}(0-20mm):</span>
            <span>{{ info.lowest_magnetic_position }}</span>
          </div>
        </template>
         <!-- drying -->
          <div>
            <span>{{$t('language.drying_on')}}:</span>  <span>{{ info.drying_on? "On" :'Off' }}</span>
          </div>
          <template v-if="info.drying_on">
            <div>
              <span>{{$t('language.drying_time')}}(1-999s):</span>  <span>{{ info.drying_time }}</span>
            </div>
            <template v-if="info.magnet_labware===2">
              <div>
                <span>{{$t('language.drying_position')}}:</span>  <span>{{ info.drying_position ? $t('language.tube_outside'):$t('language.tube_inside')}}</span>
              </div>
            </template>
            <template v-else>
              <div>
                <span>{{$t('language.drying_speed')}}(1-10):</span>  <span>{{ info.drying_speed }}</span>
              </div>
              <div>
                <span>{{$t('language.drying_volume')}}(5-1000μl):</span>  <span>{{ info.drying_volume }}</span>
              </div>
            </template>
          </template>
      </template>
    </template>
  </div>
</template>

<script>
import MixinChangeVolume from '@/mixins/changeVolume.js'
export default {
  name: "lysis",
  data() {
    return {};
  },
  mixins: [MixinChangeVolume],
  props: {
    isBasic: {
      type: Number,
      default: 1
    },
  },
  computed:{
      magnetLabware(){
        if(this.info.magnet_labware===0){
          return this.$t('language.d_tip')
        }else if(this.info.magnet_labware===1){
          return this.$t('language.e_tip')
        }else {
          return this.$t('language.e_sleeve')
        }
      },
      temp(){
        if (this.protocalInfo.cartridge == 2){
         return (this.info.well == 1 || this.info.well == 2|| this.info.well == 12)? true: false
        }else  if (this.protocalInfo.cartridge == 8) {
          return (this.info.well == 1 || this.info.well == 10)? true: false
        }else  if (this.protocalInfo.cartridge == 15) {
          return (this.info.well == 1 || this.info.well == 8)? true: false
        }
      }
    },
    created(){
    },
  methods: {}
};
</script>

<style scoped>
 @import url(../../../../style/stepInfo.css);
</style>
