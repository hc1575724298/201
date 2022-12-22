<template>
   <el-dialog
    append-to-body
    top="450px"
    class="abortDialog"
    width="665px"
    :show-close="false"
    :close-on-click-modal="false"
    :visible="isShowErrorDialog"
    @close="handleClose"
  >
    <img src="@/images/login/error.png" alt="" />
    <div>E001</div>
    <template slot="footer" class="dialog-footer">
      <button class="ok" @click="clickOkBtn">{{$t('language.ok')}}</button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    isShowErrorDialog: {
      type: Boolean,
      default: false
    }
  },
  created () {

  },

  methods: {
    handleClose(){},
    clickOkBtn(){

    }
  }
}
</script>

<style scoped>
@import url(../style/dialog.css);
.ok {
  width: 265px !important;
  height: 64px !important;
}
.abortDialog >>>.el-dialog__footer,
.abortDialog >>>.el-dialog__body {
  justify-content: center;
}
.abortDialog .el-dialog__body div {
  flex: unset;
}
</style>
