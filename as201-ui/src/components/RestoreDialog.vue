<template>
  <div class="restore-div">
    <div class="restore-model">
      <div class="restore-note">
        {{$t("language.restore_note")}}
      </div>
      <div class="ok-cancel">
        <div class="button-div ok" @click="okRestore">{{$t("language.ok")}}</div>
        <div class="button-div cancel" @click="cancelRestore">{{$t("language.cancel")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    clearRestore
  } from '@/api/setting.js'
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      okRestore() {
        clearRestore().then((res) => {
          if(res.code==0){
            this.$message({
              type:'success',
              message:this.$t("language.operate_success")
            })
          }
           this.$emit('close')
        })
      },
      cancelRestore() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped="scoped">
  .restore-div {
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

  .restore-model {
    width: 704px;
    height: 310px;
    background-color: #ffffff;
    border-radius: 8px;
    font-size: 26px;
    position: relative;
  }

  .restore-note {
    width: 100%;
    text-align: center;
    margin-top: 100px;
  }

  .ok-cancel {
    position: absolute;
    bottom: 26px;
    width: 100%;
  }

  .button-div {
    width: 190px;
    height: 62px;
    border-radius: 6px;
    text-align: center;
    line-height: 62px;
  }

  .ok {
    color: white;
    background-color: #5187C3;
    float: right;
    margin-right: 102px;
  }

  .cancel {
    float: left;
    margin-left: 102px;
    border: solid 1px #4c7cb2;
  }
</style>
