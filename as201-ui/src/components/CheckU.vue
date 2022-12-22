<template>
  <div class="check-u-model">
    <div class="clear-warn-div">
      <div class="content-div">
        <div class="clear-warning-img">
          <img src="../images/setting/sug.png" />
        </div>
        <div class="clear-warning-text">
          {{$t("language.check_u")}}
        </div>
      </div>
      <div class="warning-button">
        <div class="ok-button" @click="closeWarning">
          {{$t("language.ok")}}
        </div>
      </div>
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
      closeWarning() {
        this.$emit('closeCheck')
      }
    }
  }
</script>

<style scoped="scoped">
  .check-u-model {
    position: absolute;
    display: flex;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .clear-warn-div {
    width: 666px;
    height: 356px;
    background-color: white;
  }

  .clear-warning-text {
    font-size: 30px;
  }

  .content-div {
    width: 100%;
    height: 86px;
    margin-top: 90px;
    display: flex;
    justify-content: center;
  }

  .clear-warning-img {

    margin-right: 40px;
  }

  .clear-warning-text {
    width: fit-content;
    line-height: 86px;
    height: 100%;
  }

  .warning-button {
    width: 100%;
    height: 64px;
    margin-top: 86px;
    display: flex;
    justify-content: center;
  }

  .ok-button {
    width: 266px;
    height: 100%;
    text-align: center;
    line-height: 64px;
    background-color: #4E81BB;
    color: white;
    font-size: 26px;
    border-radius: 6px;
  }
</style>
