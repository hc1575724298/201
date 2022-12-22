<template>
  <div :class="[whitchStyle==='view'?'info-view' : 'info-run']">
    <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.basic')}}</div>
    <div>
       <span>{{$t('language.step')}}:</span>  <span>{{ info.step_name }}</span>
    </div>
    <div>
        <span>{{$t('language.tip_pause')}}:</span> <span>{{ info.tips }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
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
