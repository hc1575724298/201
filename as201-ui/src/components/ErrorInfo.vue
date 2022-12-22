<template>
  <div class="error-info-model">
    <div class="error-info-div">
      <div class="error-div">
        <div class="error-img">
          <img src="../../src/images/setting/error.png" />
        </div>
        <div class="info">
          {{data}}
        </div>
      </div>
      <div class="ok-button-div">
        <div class="ok-button" @click="okReturn">{{this.$t("language.ok")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['errorInfo'],
    data() {
      return {
        data: null
      }
    },
    mounted() {
      this.data = this.errorInfo.error_code + "(" + this.errorInfo.error_info + ")"
    },
    methods: {
      okReturn() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped="scoped">
  .error-info-model {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
  }

  .error-info-div {
    width: 699px;
    height: 388px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .error-div {
    width: 499px;
    height: 96px;
    margin-top: 108px;
    margin-left: 100px;
  }

  .error-img {
    height: 100%;
    width: 96px;
    float: left;
    margin-right: 30px;
  }

  .info {
    width: 373px;
    height: 100%;
    float: left;
    font-size: 30px;
    color: #333333;
    word-break: break-all;
    line-height: 50px;
  }

  .ok-button-div {
    width: 100%;
    height: 64px;
    margin-top: 90px;
    display: flex;
    justify-content: center;
  }

  .ok-button {
    width: 267px;
    height: 100%;
    text-align: center;
    line-height: 64px;
    background-color: #4E81BB;
    color: white;
    font-size: 26px;
    border-radius: 6px;
  }
</style>
