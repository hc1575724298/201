<template>
  <div class="upgrade-progress-model">
    <div class="upgrade-progress-div">
      <div class="upgrade-progress-title">
        {{title}}
      </div>
      <div class="upgrade-progress-content-div upgrade-div1">
        <div class="upgrade-progress-text">
          {{$t("language.upgrade_filename")}}:
        </div>
        <div class="upgrade-content">
          {{ver}}
        </div>
      </div>
      <div class="upgrade-progress-content-div upgrade-div2">
        <div class="upgrade-progress-text">
          {{$t("language.upgrade_progress")}}:
        </div>
        <div class="el-pro">
          <el-progress :text-inside="true" :stroke-width="46" :type="'line'" :percentage="0"
            :stroke-linecap="'square'">
          </el-progress>
        </div>
      </div>
      <div class="button-div">
        <div class="button-model cancel" @click="cancel">{{$t("language.cancel")}}</div>
        <div class="button-model upgrade">{{$t("language.upgrade")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title',],
    data() {
      return {
        ver:null
      }
    },
    mounted() {

    },
    methods: {
      cancel() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped="scoped">
  .upgrade-progress-model {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
  }

  .upgrade-progress-div {
    width: 760px;
    height: 420px;
    background-color: #ffffff;
    border-radius: 10px;
  }

  .upgrade-progress-title {
    height: 70px;
    width: 720px;
    border-bottom: solid 1px #c2cbda;
    font-size: 26px;
    margin-left: 20px;
    line-height: 70px;
    color: #4c7cb2;
  }

  .upgrade-progress-content-div {
    font-size: 24px;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: relative;
  }

  .upgrade-progress-text {
    margin-left: 60px;
  }

  .upgrade-div1 {
    margin-top: 42px;
    margin-bottom: 60px;
  }

  .upgrade-div2 {
    margin-bottom: 52px;
  }

  .upgrade-content {
    position: absolute;
    width: 420px;
    height: 56px;
    background-color: #f5f5f5;
    border-radius: 4px;
    right: 60px;
    border: solid 1px #c2cbda;
    text-align: center;
    line-height:56px ;
  }

  .el-pro {
    position: absolute;
    width: 420px;
    height: 46px;
    right: 60px;
    /* border: solid 1px #c2cbda; */
  }

  .button-div {
    height: 62px;
    width: 100%;
  }

  .button-model {
    line-height: 62px;
    text-align: center;
    font-size: 24px;
  }

  .cancel {
    border: solid 1px #4c7cb2;
    margin-left: 130px;
    width: 190px;
    border-radius: 6px;
    float: left;
  }

  .upgrade {
    margin-right: 130px;
    width: 190px;
    border-radius: 6px;
    float: right;
    background-color: #5289C7;
    color: white;
  }
</style>
<style>
  .el-pro .el-progress-bar__outer {
    border-radius: 0px;
    border-radius: 10px;
    border: solid 1px #c2cbda;
    background-color: #ffffff;
  }

  .el-pro .el-progress-bar__inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #72A8DD;
    text-align: right;
    border-radius: 10px;
    line-height: 1;
    white-space: nowrap;
    -webkit-transition: width .6s ease;
    transition: width .6s ease;
  }

  .el-pro .el-progress-bar__innerText {
    font-size: 18px;
    color: #333333;
    background: transparent;
  }
</style>
