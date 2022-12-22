<template>
  <div>
    <div :class="[whitchStyle==='view'?'info-view' : 'info-run']">
    <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.basic')}}</div>
    <div> <span>{{$t('language.from')}}:</span> <span>S{{info.loop_from+1}}</span></div>
    <div> <span>{{$t('language.to')}}:</span> <span>S{{info.loop_to+1}}</span></div>
    <div> <span>{{$t('language.cycle')}}(1-99):</span> <span>{{info.loop_cycle}}</span></div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'loop',
  data () {
    return {

    }
  },
  props:{
    info:{
      type: Object,
      default:()=>{}
    },
    whitchStyle:{
      type: String,
      default: 'view'
    }
    },
  created () {

  },

  methods: {

  }
}
</script>

<style scoped>
 @import url(../../../../style/stepInfo.css);
</style>
