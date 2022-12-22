<template>
  <div class="model">
    <div class="step-name">
      {{$t("language.step")}}:
      <input class="input-step-name" v-model="unload.step_name" @blur="saveData()" @input="unload.step_name=unload.step_name.replace(/[^\w\u4E00-\u9FA5_-]/g,'')" />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['order'],
    data() {
      return {
        unload: {
          step_name: null
        }
      }
    },
    mounted() {
      this.unload.step_name = this.$store.getters.protocol.steps[this.order - 1].step_name
    },
    methods: {
      saveData() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1].step_name = this.unload.step_name
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
      }
    }
  }
</script>

<style scoped="scoped">
  .model {
    font-size: 24px;
    margin-left: 37px;
    margin-top: 26px;
  }

  .step-name {
    position: relative;
    width: 100%;
    height: 54px;
    line-height: 54px;
    margin-bottom: 30px;
  }

  .input-step-name {
    position: absolute;
    width: 310px;
    height: 54px;
    left: 513px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 2px;
    box-sizing: border-box;
    border: solid 1px #c2cbda;
  }
</style>
