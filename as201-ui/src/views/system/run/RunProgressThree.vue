<template>
  <div class="container runProgressThree">
    <div class="header">
      <RunProgress :progressNum="3" />
      <div class="report" v-if="isShowReportbtn" @click="reportExport">
        <img src="@/images/run/reportExport.png" alt="" />
      </div>
    </div>
    <div class="run-info">
      <!-- 左侧 -->
      <div class="info-left">
        <div class="protocol-title flex-center">
          <div class="protocol" v-if="isShowtime">
            {{ $t("language.protocol") }}：<span>{{
              $store.state.protocols.protocalInfo.name
            }}</span>
          </div>
          <div v-if="isShowList" class="parameter">
            {{ $t("language.parameters") }}
          </div>
          <div class="pic">
            <div @click="clickTime">
              <img src="@/images/run/timechecked.png" v-if="isShowtime" />
              <img src="@/images/run/time_unselected.png" v-else />
            </div>
            <div
              @click="clickList"
              v-if="$store.state.user.group !== 'user' && $store.state.encryption==0"
            >
              <img src="@/images/run/list_select.png" v-if="isShowList" />
              <img src="@/images/run/list_unselect.png" v-else />
            </div>
          </div>
        </div>
        <!-- time -->
        <div v-if="isShowtime">
          <div class="protocol">
            {{ $t("language.run_started_at") }}：<span>{{
              startRunTime | handleTime
            }}</span>
          </div>
          <div class="protocol">
            {{ $t("language.sample_number") }}：<span>{{
              $store.state.protocols.selectedTubeList.length
            }}</span>
          </div>
          <!-- 温度 -->
          <div class="protocol temp">
            T1:
            <span>
              <i>{{ temperature[0] && temperature[0].sv1 }}</i
              >°C</span
            ><span
              ><i>{{ temperature[0] && temperature[0].sv2 }}</i
              >°C</span
            ><span
              ><i>{{ temperature[0] && temperature[0].sv3 }}</i
              >°C</span
            >
          </div>
          <div class="protocol temp">
            T2:
            <span>
              <i>{{ temperature[1] && temperature[1].sv1 }}</i
              >°C</span
            ><span
              ><i>{{ temperature[1] && temperature[1].sv2 }}</i
              >°C</span
            ><span
              ><i>{{ temperature[1] && temperature[1].sv3 }}</i
              >°C</span
            >
          </div>
          <div class="time flex-center">
            <RunTime :time="remainingTime" :progress="progress" />
          </div>
        </div>
        <!-- list -->
        <div v-if="isShowList" class="info-list">
          <IncubatorInfo
            v-if="activeStepInfo.type === 'incubator'"
            :info="activeStepInfo"
            :whitchStyle="'run'"
          />
          <TransferInfo
            v-else-if="activeStepInfo.type === 'transfer'"
            :info="activeStepInfo"
            :whitchStyle="'run'"
          />
          <DiscardInfo
            v-else-if="activeStepInfo.type === 'discard'"
            :info="activeStepInfo"
            :whitchStyle="'run'"
          />
          <PauseInfo
            v-else-if="activeStepInfo.type === 'pause'"
            :info="activeStepInfo"
            :whitchStyle="'run'"
          />
          <LoopInfo
            v-else-if="activeStepInfo.type === 'loop'"
            :info="activeStepInfo"
            :whitchStyle="'run'"
          />
          <div v-else-if="activeStepInfo.type === 'unload_labware'">
            <div class="parameter">{{ $t("language.basic") }}</div>
            <div class="info flex-center">
              <span class="info-title">{{ $t("language.step") }}:</span>
              <span class="info-content">{{
                stepList[stepList.length - 1].step_name
              }}</span>
            </div>
          </div>
          <LysisInfo v-else :info="activeStepInfo" :whitchStyle="'run'" />
        </div>
      </div>
      <!-- 右侧 -->
      <div class="info-right">
        <div class="step">{{ $t("language.step") }}</div>
        <div class="items">
          <div class="item flex-center" v-for="item in stepList" :key="item.order">
            <div class="stepImg flex-center">
              <img :src="require('@/images/run/' + item.type + '.png')" />
            </div>
            <span style="margin-right: 5px;"
              >{{ item.order >= 9 ? item.order + 1 : "0" + (item.order + 1) }}
            </span>
            <span>{{ item.step_name }}</span>
            <div class="line"></div>
            <img
              src="@/images/run/finish.png"
              alt=""
              v-if="item.order < activeOrder && stepIdArr.includes(item.id)"
            />
            <img
              src="@/images/run/underway.png"
              alt=""
              v-else-if="
                item.order === activeOrder && stepIdArr.includes(item.id)
              "
            />
            <img
              v-else-if="!stepIdArr.includes(item.id)"
              src="@/images/run/skip-step.png"
              alt=""
            />
            <img
              src="@/images/run/waitting.png"
              alt=""
              v-else-if="
                activeOrder === '' ||
                  (item.order > activeOrder && stepIdArr.includes(item.id))
              "
            />
          </div>
        </div>
        <div class="footer-btn flex-center">
          <button v-if="isShowReportbtn" class="pause" @click="clickRunBtn">
            {{ $t("language.run") }}
          </button>
          <template v-else>
            <el-button
              :disabled="isDisabledSkipIncubator"
              class="skip-incubator"
              @click.native="clickSkipIncubatorBtn"
            >
              {{ $t("language.skip_incubator") }}
            </el-button>
            <button class="abort" @click="clickAbortBtn">
              {{ $t("language.abort") }}
            </button>
            <button class="pause" @click="clickPauseBtn">
              {{ isPause ? $t("language.continue") : $t("language.pause") }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- 暂停步骤弹出层 -->
    <PauseStepDialog
      @close="isShowPauseStepDialog = false"
      width="580"
      :tips="tips"
      :isShowPauseStepDialog="isShowPauseStepDialog"
    />
    <!-- 开门弹框 -->
    <OpenDoorDialog :isShowOpenDoorDialog="isShowOpenDoorDialog" />
    <!-- 终止程序弹框 -->
    <AbortDialog
      :isShowAbortDialog="isShowAbortDialog"
      @close="isShowAbortDialog = false"
    />
    <!-- 检查u盘 -->
    <CheckU v-if="usbStatus" @closeCheck='usbStatus=false'></CheckU>
  </div>
</template>

<script>
import {
  getProtocolDetail,
  setRun,
  pauseRun,
  getRunReport,
  goOnRun,
  openDoor,
  skipIncubator,
} from "@/api/run";
import {
    getUsbStatus
  } from "@/api/protocols"
import { mapState as mapProtocolsState } from "vuex";
import RunProgress from "@/components/RunProgress.vue";
import PauseStepDialog from "@/components/PauseStepDialog.vue";
import RunTime from "./components/RunTime";
import IncubatorInfo from "./components/IncubatorInfo.vue";
import TransferInfo from "./components/TransferInfo.vue";
import LysisInfo from "./components/LysisInfo.vue";
import DiscardInfo from "./components/DiscardInfo.vue";
import PauseInfo from "./components/PauseInfo.vue";
import LoopInfo from "./components/LoopInfo.vue";
import OpenDoorDialog from "@/components/OpenDoorDialog.vue";
import AbortDialog from "@/components/AbortDialog.vue";
import CheckU from '@/components/CheckU'
export default {
  components: {
    RunProgress,
    RunTime,
    IncubatorInfo,
    TransferInfo,
    LysisInfo,
    DiscardInfo,
    PauseInfo,
    PauseStepDialog,
    OpenDoorDialog,
    AbortDialog,
    LoopInfo,
    CheckU
  },
  data() {
    return {
      isShowtime: true,
      isShowList: false,
      stepList: [],
      isShowPauseStepDialog: false,
      isShowOpenDoorDialog: false,
      isShowAbortDialog: false,
      isShowReportbtn: false, // 是否显示打印报告按钮
      activeOrder: "", //正在运行的步骤
      remainingTime: "", // 运行剩余时间
      progress: 0, //进度
      activeStepInfo: {}, // 当前运行步骤的信息
      tips: "", // 暂停弹框 tips
      stepIdArr: [], // 运行步骤id数组
      isPause: false, // 是否暂停
      fromPath: "",
      temperature: [], // 运行的实时温度
      activeIncubatorId: "", // 当前孵育id
      isDisabledSkipIncubator: true, //是否禁用跳过孵育按钮
      reportId: "", // 报告导出需要的id
      usbStatus:false
    };
  },

  created() {
    this.fromPath = this.initPathName;
    this.getProtocolDetail();
    this.setRunApi();
    this.stepIdArr = this.run_step_ids.split(",").map(item => Number(item));
    // this.stepIdArr.push(0) 手动添加手动添加卸载耗材的id
  },
  computed: {
    ...mapProtocolsState("protocols", [
      "pathName",
      "doorState",
      "protocalInfo",
      "start_step_id",
      "selectedTubeList",
      "sampleIdDataStore",
      "run_step_ids",
      "initPathName",
      "startRunTime"
    ])
  },
  methods: {
    //获取程序详情
    async getProtocolDetail() {
      const {
        data: { steps }
      } = await getProtocolDetail(this.protocalInfo.id);
      this.stepList = steps;
      this.activeStepInfo = this.stepList[0];
      // 手动添加卸载耗材步骤
      // this.stepList.push({
      //   order: steps.length,
      //   step_name: "Unload labware",
      //   type: "unload labware",
      //   id:0
      // });
    },
    // 运行程序
    async setRunApi() {
      this.$store.commit("protocols/updatedInitPathName", "");
      const res = await setRun({
        protocol_id: this.protocalInfo.id,
        start_step_id: this.start_step_id,
        sample_number: this.selectedTubeList.length,
        run_step_ids: this.run_step_ids,
        sample_info: JSON.stringify(this.sampleIdDataStore)
      });
    },
    clickTime() {
      this.isShowtime = true;
      this.isShowList = false;
    },
    clickList() {
      this.isShowList = true;
      this.isShowtime = false;
    },
    clickAbortBtn() {
      this.isShowAbortDialog = true;
    },
    async clickPauseBtn() {
      if (this.isPause) {
        await goOnRun();
        this.isPause = false;
      } else {
        await pauseRun();
        this.isPause = true;
      }
    },
    async clickSkipIncubatorBtn() {
      await skipIncubator(this.activeIncubatorId);
      this.isDisabledSkipIncubator = true;
    },
    async clickRunBtn() {
      this.isShowOpenDoorDialog = true;
      await openDoor();
      // 开门通知
      this.EventBus.on(this.Notify.CODE_FZB_DOOR_OPEN, notify => {
        if (notify.Code === this.Notify.CODE_FZB_DOOR_OPEN) {
          this.isShowOpenDoorDialog = false;
          this.$store.commit("protocols/updatedDoorState", 1);
          this.$store.commit("protocols/clearRecord", []);
          this.$router.push("/system/run/protocols/sampleSettings");
        }
      });
    },
    //导出运行报告
    async reportExport() {
      const {data} = await getUsbStatus()
      this.usbStatus = data
      if(!this.usbStatus){
        this.usbStatus = true
      }else{
        await getRunReport(this.reportId.toString());
      }
    }
  },
  mounted() {
    //程序运行完成
    this.EventBus.on(this.Notify.CODE_RUN_COMPLETE, notify => {
      if (notify.Code === this.Notify.CODE_RUN_COMPLETE) {
        if (this.fromPath === "viewrunstep") {
          this.$store.commit("protocols/updatedInitPathName", "viewrunstep");
        } else {
          this.$store.commit("protocols/updatedInitPathName", this.pathName);
        }
        this.isShowReportbtn = true;
        this.activeOrder = this.stepList.length;
        this.reportId = notify.Data;
        // 手动添加卸载耗材步骤需加
        // this.activeStepInfo = this.stepList[this.activeOrder - 1];
      }
    });
    //命令开始执行通知,data是步骤的[id,order]
    this.EventBus.on(this.Notify.CODE_RUN_COMMAND_START, notify => {
      if (notify.Code === this.Notify.CODE_RUN_COMMAND_START) {
        this.activeOrder = JSON.parse(notify.Data)[1];
        this.activeStepInfo = this.stepList[this.activeOrder];
        if (this.activeStepInfo.type == "incubator") {
          this.activeIncubatorId = this.activeStepInfo.id;
          this.isDisabledSkipIncubator = false;
        } else {
          this.isDisabledSkipIncubator = true;
        }
      }
    });
    //步骤暂停通知
    this.EventBus.on(this.Notify.CODE_RUN_PAUSE, notify => {
      if (notify.Code === this.Notify.CODE_RUN_PAUSE) {
        this.tips = this.activeStepInfo.tips;
        this.isShowPauseStepDialog = true;
      }
    });
    //程序运行剩余时间通知
    this.EventBus.on(this.Notify.CODE_RUN_TIME, notify => {
      if (notify.Code === this.Notify.CODE_RUN_TIME) {
        this.remainingTime = notify.Data["RemainingTime"];
        this.progress = Number(notify.Data["Progress"]);
      }
    });
    // 运行温度通知
    this.EventBus.on(this.Notify.CODE_RUNNING_TEMP, notify => {
      if (notify.Code === this.Notify.CODE_RUNNING_TEMP) {
        this.temperature = notify.Data;
      }
    });
  },
  destroyed() {
    this.EventBus.unregisterAllCallbacks();
    // this.EventBus.unregisterCallbacksForEvent(this.Notify.CODE_FZB_DOOR_CLOSE)
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box !important;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  padding: 20px 34px 30px;
  background-color: #f3f4f6;
}
.run-info {
  display: flex;
  width: 1851px;
  height: 967px;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #c2cbda;
  padding: 30px;
}
.info-left {
  width: 855px;
  height: 100%;
  border-right: solid 1px #c2cbda;
}
.protocol-title {
  justify-content: space-between;
  height: 50px;
}
.protocol {
  font-size: 22px;
  color: #666;
  margin-bottom: 20px;
}
.info-list {
  height: 855px;
}
.parameter {
  font-size: 24px;
  color: #333333;
  font-weight: 700;
}
.protocol span {
  color: #000;
}
.temp,
.pic {
  display: flex;
}
.temp span {
  display: flex;
  width: 70px;
  margin-right: 15px;
}
.temp span i {
  display: block;
  text-decoration: none;
  width: 60px;
  font-style: normal;
}
.pic img {
  width: 45px;
  height: 45px;
  margin-right: 30px;
}
.info {
  justify-content: space-between;
  font-size: 22px;
  margin: 15px 0;
}
.info-title {
  color: #666;
}
.info-content {
  margin-right: 26px;
  color: #333;
}
/* 右侧 */
.info-right {
  flex: 1;
  padding-left: 34px;
}
.step {
  font-size: 26px;
  color: #000;
  font-weight: 700;
  margin-bottom: 29px;
}
.items {
  width: 916px;
  height: 750px;
  overflow: auto;
}
.item {
  width: 904px;
  height: 50px;
  margin-bottom: 18px;
}
.item span {
  font-size: 24px;
  color: #333333;
}
.stepImg {
  width: 45px;
  height: 50px;
  margin-right: 30px;
}
.stepImg img {
  transform: scale(0.85);
}
.line {
  flex: 1;
  height: 1px;
  border-top: 1px dashed #707070;
  margin: 0 29px 0 27px;
}
.footer-btn {
  justify-content: end;
  margin-top: 30px;
  font-size: 24px;
}
.abort,
.pause,
.skip-incubator {
  width: 190px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  border-radius: 6px;
  color: #fff;
  border: none;
}
.skip-incubator {
  line-height: 40px;
  background-image: linear-gradient(0deg, #ffffff 0%, #f2f7ff 100%);
  border: solid 1px #5a89c7;
  margin-right: 26px;
  color: #666666;
}
.skip-incubator >>> span {
  text-align: center;
  font-size: 24px;
}
.abort {
  background-image: linear-gradient(0deg, #fe6e6e 0%, #de4a4a 100%);
  margin-right: 26px;
}
.pause {
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
}
.time {
  width: 100%;
  height: 550px;
}
.report {
  position: absolute;
  right: 5px;
  top: 15px;
}
.header {
  position: relative;
}
</style>
<style>
.runProgressThree .items,
.runProgressThree .items div,
.runProgressThree .items span,
.runProgressThree .items img ,
.runProgressThree .info-list,
.runProgressThree .info-list div,
.runProgressThree .info-list span
{
  touch-action: pan-y !important;
}
</style>
