<template>
  <div>
    <div class="encryption" @click="isOpenRestore">
      <div class="encryption-text">{{$t("language.one_click")}}</div>
      <div class="encryption-switch">
        <img src="../images/setting/more.png" />
      </div>
    </div>
    <div class="encryption-note">{{$t("language.one_click_note")}}</div>
    <RestoreDialog v-if="is_show_Restore" @close='closeRestore'></RestoreDialog>
  </div>
</template>

<script>
  import RestoreDialog from '@/components/RestoreDialog'
  export default {
    components:{
      RestoreDialog
    },
    data() {
      return {
        encryption_on: false,
        is_show_Restore:false
      }
    },
    mounted() {

    },
    methods: {
      isOpenRestore() {
        this.is_show_Restore=true
      },
      closeRestore(){
        this.is_show_Restore=false
      }
    }
  }
</script>

<style scoped="scoped">
  .encryption {
    width: 1466px;
    height: 90px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 30px;
    margin-left: 30px;
    line-height: 90px;
    font-size: 26px;
  }

  .encryption-text {
    float: left;
    margin-left: 32px;
  }

  .encryption-switch {
    float: right;
    margin-right: 32px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .encryption-note {
    color: red;
    font-size: 22px;
    margin-top: 20px;
    margin-left: 30px;
  }
</style>
<style>
  .encryption-switch .el-switch__core {
    height: 30px;
    border-radius: 21px;
  }

  .encryption-switch .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
  }

  .encryption-switch .is-checked .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
    -webkit-transform: translateX(-11px);
  }
</style>
