<template>
  <div :class="[whitchStyle==='view'?'info-view' : 'info-run']">
    <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.basic')}}</div>
    <div> <span>{{$t('language.step')}}:</span>  <span>{{ info.step_name }}</span></div>
    <div> <span>{{$t('language.basic_labware')}}:</span>  <span>{{basicLabware}}</span></div>
    <div> <span>{{$t('language.source_well')}}(1-C):</span>  <span>{{info.well}}</span></div>
    <div> <span>{{$t('language.destination_well')}}(1-C):</span>  <span>{{info.destination_well}}</span></div>
    <div> <span>{{$t('language.volume')}}(5-{{minVolume}}μl):</span>  <span>{{info.volume}}</span></div>
    <div>
      <span>{{$t('language.liquid')}}:</span>
      <span>{{info.liquid.type}}</span>
      <img v-if="whitchStyle==='view'" style="margin-left: 20px;" src="@/images/run/liquid.png" alt="" @click="isShowLiquidDialog=true">
    </div>

    <LiquidDialogVue
      v-if="isShowLiquidDialog"
      :isShowLiquidDialog="isShowLiquidDialog"
      :liquidInfo="info.liquid"
      :volume="volume.mixV"
      @close="isShowLiquidDialog=false"/>
  </div>
</template>

<script>
import LiquidDialogVue from './LiquidDialog.vue';
import MixinChangeVolume from '@/mixins/changeVolume.js'
export default {
  name: 'transfer',
  data () {
    return {
      isShowLiquidDialog: false
    }
  },
  components:{ LiquidDialogVue },
  mixins: [MixinChangeVolume],
    computed:{
      volumeDestination () {
      if (this.info.destination_well == 'A') {
        return {
          v: 10000,
          mixV: 1000
        }
      } else if (this.info.destination_well == 'B' || this.info.destination_well == 'C') {
        return {
          v: 1000,
          mixV: 600
        }
      }
      if (this.protocalInfo.cartridge == 2) {
        if (this.info.destination_well == 1 || this.info.destination_well == 2) {
          return {
            v: 2000,
            mixV: 1000
          };
        } else if (this.info.destination_well >= 3 && this.info.destination_well <= 10) {
          return {
            v: 1000,
            mixV: 600
          }
        } else if (this.info.destination_well == 11 || this.info.destination_well == 12) {
          return {
            v: 200,
            mixV: 120
          }
        } else if (this.info.destination_well == 'A') {
          return {
            v: 10000,
            mixV: 1000
          }
        } else {
          return {
            v: 1000,
            mixV: 600
          }
        }
      } else if (this.protocalInfo.cartridge == 8) {
        if (this.info.destination_well == 1) {
          return {
            v: 8000,
            mixV: 1000
          };
        } else if (this.info.destination_well >= 2 && this.info.destination_well <= 9) {
          return {
            v: 1000,
            mixV: 600
          }
        } else if (this.info.destination_well == 10) {
          return {
            v: 200,
            mixV: 120
          }
        }
      } else if (this.protocalInfo.cartridge == 15) {
        if (this.info.destination_well == 1) {
          return {
            v: 15000,
            mixV: 1000
          };
        } else if (this.info.destination_well >= 2 && this.info.destination_well <= 7) {
          return {
            v: 1000,
            mixV: 600
          }
        } else if (this.info.destination_well == 8) {
          return {
            v: 200,
            mixV: 120
          }
        }
      }
     },
     minVolume(){
      if(this.volumeDestination.v>=this.volume.v){
        return this.volume.v
      }else {
        return this.volumeDestination.v
      }
     }
    },
created(){
  console.log(this.info.liquid);
},
mounted(){

},
  methods: {

  }
}
</script>

<style scoped>

@import url(../../../../style/stepInfo.css);
</style>
