<template>
  <div class="help">
    <div class="view-div view-QR" v-if="$store.getters.languageCode==0">
      <img src="../../../../images/system/helpCode.png" class="img-help" />
      <div class="view-text">扫码获得更多技术支持</div>
    </div>
    <div class="view-div view" @click="openHelper">
      <img src="../../../../images/setting/help-pdf.png" class="img-help" />
      <div class="view-text">{{$t("language.view_instruction")}}</div>
    </div>
  </div>

</template>

<script>
  import {getHelper} from '@/api/setting.js'
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      openHelper(){
        getHelper().then((res)=>{
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .help {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F3F4F6;
  }

  .view-div {
    width: 386px;
    height: 410px;
    border-radius: 10px;
    border: solid 1px #c2cbda;
    background: white;
  }

  .view-QR {
    margin-right: 113px;
  }

  .img-help {
    margin-top: 58px;
    margin-left: 94px;
  }

  .view-text {
    width: 275px;
    height: 51px;
    margin-top: 38px;
    margin-left: 56px;
    border-radius: 30px;
    border: solid 1px #c2cbda;
    font-size: 21px;
    line-height: 51px;
    text-align: center;
    color: #333333;
  }
</style>
