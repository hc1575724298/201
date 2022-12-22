<template>
  <div class="aspirate-dispense-div">
    <div class="aspirate-dispense-div-model">
      <img src="../images/run/query.png" style="margin-right:27px ;"/>
      {{text}}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['start_type'],
    data() {
      return {
        text:null
      }
    },
    mounted() {
      if (this.start_type == 'aspirate') {
        this.text = this.$t("language.aspirating")
      } else if (this.start_type == 'dispense') {
        this.text = this.$t("language.dispensing")
      }
    },
    methods: {

    }
  }
</script>

<style scoped="scoped">
  .aspirate-dispense-div {
    position: absolute;
    z-index: 1000;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
    margin-top: 0;
  }

  .aspirate-dispense-div-model {
    width: 518px;
    height: 167px;
    background-color: #ffffff;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
  }
</style>
