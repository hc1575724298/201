<template>
  <div class="scan-code-model">
    <div class="scan-code-div">
      <div class="error-div">
        <div class="info">
          {{description}}
        </div>
      </div>
      <div class="input-info">
        <input class="input-code" v-model="pn"/>
      </div>
      <div class="buttons">
        <div class="cancel" @click="backToParent()">{{$t("language.cancel")}}</div>
        <div class="ok" @click="changeScanCode()">{{$t("language.ok")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['text_type'],
    data() {
      return {
        description: null,
        pn:null
      }
    },
    mounted() {
      if (this.text_type == 'scan') {
        this.description = this.$t("language.scan_code")
      }else if(this.text_type == 'edit'){
        this.description = this.$t("language.edit_code")
      }
    },
    methods: {
      backToParent() {
        this.$emit('close')
      },
      changeScanCode(){
        this.$emit('okChange',this.pn)
      }
    }
  }
</script>

<style scoped="scoped">
  .scan-code-model {
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

  .scan-code-div {
    position: absolute;
    width: 633px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
  }

  .error-div {
    width: 100%;
    margin-top: 100px;
    text-align: center;
  }

  .info {
    width: 100%;
    height: 100%;
    font-size: 30px;
    color: #333333;
    word-break: break-all;
    line-height: 50px;
    text-align: center;
  }

  .input-info {
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .input-code {
    width: 400px;
    height: 50px;
    font-size: 28px;
    text-align: center;
    border: solid 1px #bcbcbc;
  }

  .buttons {
    position: absolute;
    width: 100%;
    font-size: 22px;
    right: 0;
    bottom: 26px;
  }

  .cancel,
  .ok {
    width: 150px;
    height: 50px;
    margin-right: 30px;
    line-height: 50px;
    flex-shrink: 0;
    border-radius: 8px;
    text-align: center;

  }

  .cancel {
    float: left;
    margin-left: 100px;
    border: 2px solid #93ADE2;
    color: black;
  }

  .ok {
    float: right;
    margin-right: 100px;
    background-image: linear-gradient(to bottom, #588DCF, #4D7DB4);
    color: white;
  }
</style>
