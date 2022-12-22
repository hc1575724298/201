<template>
  <div class="advanced-help-div">
    <div class="mix-motion">
      <div class="mix-motion-div">{{$t("language.mix_motion")}}</div>
      <div class="help-steps"><span>1.</span><div class="step-div">{{$t("language.insert_disk")}}</div></div>
      <div class="help-steps"><span>2.</span><div class="step-div">{{$t("language.select_what")}}</div></div>
      <div class="help-steps"><span>3.</span><div class="step-div">{{$t("language.upgrade")}}</div></div>
      <div class="help-steps"><span>4.</span><div class="step-div">{{$t("language.restart_instrument")}}</div></div>
      <div class="ok-div"><div class="ok" @click="okBack">{{$t("language.ok")}}</div></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      okBack(){
        this.$emit('closeHelp')
      }
    }
  }
</script>

<style scoped="scoped">
  .advanced-help-div {
    z-index: 1000;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .mix-motion {
    width: 824px;
    height: 560px;
    background-color: #ffffff;
    border-radius: 10px;
  }
  .mix-motion-div{
    height: 70px;
    width: 784px;
    margin-left: 20px;
    font-size: 26px;
    line-height: 70px;
    border-bottom: solid 1px #c2cbda;
    color: #4c7cb2;
    margin-bottom: 44px;
  }
  .help-steps{
    font-size: 28px;
    height: fit-content;
    width:749px;
    margin-left: 75px;
    position: relative;
    margin-bottom: 45px;
  }
  .step-div{
    position: absolute;
    top: 0;
    left: 86px;
  }
  .ok-div{
    margin-top: 92px;
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
  }
  .ok{
    	width: 304px;
    	height: 64px;
    	background-color: #5289C7;
    	border-radius: 6px;
      text-align: center;
      line-height: 64px;
      color: white;
      font-size: 26px;
    	border: solid 1px #5a89c7;
  }
</style>
