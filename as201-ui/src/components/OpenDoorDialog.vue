<template>
  <el-dialog
    append-to-body
    top="500px"
    class="openDoorDialog"
    width="600px"
    :show-close="false"
    :close-on-click-modal="false"
    :visible="isShowOpenDoorDialog"
    @closed="closeAfter"
  >
    <img src="@/images/run/wait.png" alt="" />
      <span  v-if="doorState === 0">{{$t('language.wait_open_door')}}</span>
      <span v-else-if="doorState === 1">{{$t('language.wait_close_door')}}</span>
  </el-dialog>
</template>

<script>
import { mapState as mapProtocolsState } from "vuex";
export default {
  props: {
    isShowOpenDoorDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapProtocolsState("protocols", ["doorState"])
  },
  data() {
    return {};
  },

  created() {},

  methods: {
    closeAfter(){
      this.$store.commit("protocols/updatedDoorState", this.doorState==1? 0 : 1);
    }
  }
};
</script>

<style scoped>
.openDoorDialog >>>.el-dialog__header {
  padding: 0;
}
.openDoorDialog >>>.el-dialog__body {
  padding: 47px 0 47px 60px;
  font-size: 26px;
  color: #333;
}
.openDoorDialog >>>.el-dialog__body img {
  margin-right: 25px;
  vertical-align: middle;
}
</style>
