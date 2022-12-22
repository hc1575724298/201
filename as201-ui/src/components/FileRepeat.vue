<template>
  <div class="restore-div">
    <div class="restore-model">
      <div class="restore-note">
        {{$t("language.cover_warning")}}
      </div>
      <div class="ok-cancel">
        <div class="button-div cancel" @click="cancelCover">{{$t("language.no_button")}}</div>
        <div class="button-div ok" @click="okCover">{{$t("language.yes")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {coverFile} from '@/api/user.js'
  export default {
    data() {
      return {
      }
    },
    mounted() {

    },
    methods: {
      cancelCover() {
        coverFile({'is_cover':0}).then((res)=>{
          this.$emit('close')
        })

      },
      okCover() {
        coverFile({'is_cover':1}).then((res)=>{
          this.$emit('close')
        })

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
