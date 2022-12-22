<template>
  <el-dialog
    append-to-body
    top="450px"
    class="abortDialog"
    width="600px"
    :show-close="false"
    :close-on-click-modal="false"
    :visible="isShowStopDialog"
    @close="handleClose"
  >
    <img src="@/images/run/query.png" alt="" />
    <div>是否停止紫外消毒？</div>
    <template slot="footer" class="dialog-footer">
      <button class="cancel" @click="clickCancelBtn">
        {{ $t("language.cancel") }}
      </button>
      <button class="ok" @click="clickOkBtn">{{ $t("language.ok") }}</button>
    </template>
  </el-dialog>
</template>

<script>
import { closeUV } from "../api/run";
export default {
  data() {
    return {};
  },
  props: {
    isShowStopDialog: {
      type: Boolean,
      default: false
    }
  },
  created() {},

  methods: {
    //关闭弹窗
    handleClose() {
      this.$emit("close");
    },
    clickCancelBtn() {
      this.handleClose();
    },
    async clickOkBtn() {
      await closeUV();
      this.handleClose();
      this.$emit("closeUv");
    }
  }
};
</script>

<style scoped>
@import url(../style/dialog.css);
</style>
