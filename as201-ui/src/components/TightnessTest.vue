<template>
  <div class="clearning-needles-div">
    <div class="clearning-needles-div-content">
      <div class="steps">
        <span>
          {{this.$t("language.tightness_steps_first")}}
        </span>
        <span>
          {{this.$t("language.tightness_steps_second")}}
        </span>
        <span>
          {{this.$t("language.tightness_steps_third")}}
        </span>
        <span>
          {{this.$t("language.tightness_steps_fourth")}}
        </span>
        <span>
          {{this.$t("language.tightness_steps_fifth")}}
        </span>
        <span>
          {{this.$t("language.tightness_steps_sixth")}}
        </span>
      </div>
      <img src="../images/setting/operate.png" class="operate-img">
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

    }
  }
</script>

<style scoped="scoped">
  .clearning-needles-div {
    width: 1401px;
    height: 772px;
    margin-top: 28px;
    margin-left: 33px;
    background-color: #f6faff;
    border-radius: 6px;
    border: solid 1px #7b96be;
  }

  .clearning-needles-warning {
    float: left;
    margin-top: 308px;
    display: flex;
    align-items: center;
    font-size: 24px;
  }

  .clearning-needles-warning>img {
    margin-right: 10px;
    margin-left: 33px;
  }

  .steps {
    float: left;
    width: 812px;
  }

  .steps>span:first-child {
    margin-top: 14px;
  }

  .steps>span {
    text-indent: 34px;
    display: inline-block;
    width: 100%;
    font-size: 26px;
    line-height: 70px;
  }

  .operate-img {
    margin-top: 34px;
    margin-right: 34px;
  }
</style>
