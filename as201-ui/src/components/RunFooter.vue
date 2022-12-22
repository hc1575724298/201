<template>
<div class="run-footer">
    <button :class="{'bg': isDisabledRunBtn}" :disabled="isDisabledRunBtn" v-if="$store.state.user.group!=='user'" class="run-footer-preview-btn" @click="clickPreViewBtn">

      <img src="../images/run/preview-btn.png" alt="">
    <span>{{$t("language.view")}}</span>
  </button>
    <button :class="{'bg': isDisabledRunBtn}" class="run-footer-run-btn" :disabled="isDisabledRunBtn" @click="clickRunBtn">
      <img src="../images/run/unRun.png" alt="" v-if="isDisabledRunBtn">
      <img src="../images/run/runbtn.png" alt="" v-else>
    <span class="run-color">{{$t("language.run")}}</span>
    </button>

    <OpenDoorDialog :isShowOpenDoorDialog="isShowOpenDoorDialog"/>
</div>
</template>

<script>
import { getProtocolDetail, openDoor } from "@/api/run";
import OpenDoorDialog from './OpenDoorDialog.vue'
import { mapState as mapProtocolsState } from "vuex";
export default {
  name: 'RunFooter',
  components: { OpenDoorDialog },
  props: {
    isDisabledRunBtn:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      runStepIds: '',
      isShowOpenDoorDialog: false,
    };
  },
  watch: {},
  computed: {
    ...mapProtocolsState("protocols", ["doorState",'initPathName','pathName'])
  },
  methods: {
   async clickRunBtn(){
    if(this.doorState===0){
      this.isShowOpenDoorDialog = true
      await openDoor()
       this.EventBus.on(this.Notify.CODE_FZB_DOOR_OPEN, (notify) => {
       if(notify.Code===this.Notify.CODE_FZB_DOOR_OPEN){
        this.isShowOpenDoorDialog=false
        setTimeout(()=>{
          this.$router.push ('/system/run/protocols/sampleSettings')}
        ,400)
       }
      })
    }
    else {
       this.$router.push ('/system/run/protocols/sampleSettings')
    }
    this. getProtocolDetail()
    },
    clickPreViewBtn(){
      this.$router.push ('/system/run/viewrunstep')
    },
    async getProtocolDetail() {
      const {
        data: { steps }
      } = await getProtocolDetail(this.$store.state.protocols.protocalInfo.id);
      this.runStepIds = steps.map(item=>item.id).join()
      this.$store.commit('protocols/updatedStepIds',[steps[0].id,this.runStepIds])
    },
  },
  created() {

  },
  mounted() {

  },
  destroyed() {
    // this.EventBus.unregisterAllCallbacks();
    this.EventBus.unregisterCallbacksForEvent(this.Notify.CODE_FZB_DOOR_CLOSE)
  }
};
</script>
<style scoped>
.bg {
  background-color: #d2d2d2 !important;
  background-image: unset!important;
  border: none !important;
}
.bg span {
  color: #000 !important;
}
.bg img{
  filter: grayscale(100%) !important;
}
.run-footer {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 26px;
  box-sizing: border-box;
}
button img {
  margin-right: 10px;
  vertical-align: middle;
}
button {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 210px;
	height: 70px;
  border-radius: 6px;
  font-size: 24px;
}
.run-footer-preview-btn {
	background-image: linear-gradient(0deg,
		#ffffff 0%,
		#f2f7ff 100%);
	border: solid 1px #496f9a;
  margin-right: 30px;
}
.run-footer-run-btn {
	background-image: linear-gradient(0deg,
		#5792d5 0%,
		#4c7cb2 100%);
	border-radius: 6px;
  border: none;
}
.run-color {
  color: #fff;
}
</style>
