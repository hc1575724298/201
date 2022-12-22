<template>
   <div class="container-top">
      <img src="@/images/run/progress1.png" alt="" v-if="progressNum===1"/>
      <img src="@/images/run/progress2.png" alt="" v-else-if="progressNum===2"/>
      <img src="@/images/run/progress3.png" alt="" v-else-if="progressNum===3"/>
      <span class="progress-one">{{$t("language.sample_settings")}}</span>
      <span class="progress-two" :class="{'font-color': progressNum===2||progressNum===3}">{{$t("language.load_labware")}}</span>
      <span class="progress-three" :class="{'font-color': progressNum===3}">{{$t("language.run")}}</span>
    </div>
</template>

<script>
export default {
  props: {
    progressNum: {
      type: Number,
      default:1
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped>
.container-top .font-color {
  color: #fff !important;
}
.container-top {
  width: 1259px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.progress-one,
.progress-two,
.progress-three {
  position: absolute;
  font-size: 24px;
  color: #333333;
}
.progress-one {
  left: 150px;
  top: 20px;
  color: #fff;
}
.progress-two {
  left: 595px;
  top: 20px;
}
.progress-three {
  left: 1045px;
  top: 20px;
}

</style>
