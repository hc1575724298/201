<template>
  <div>
    <UserHead :page_name="protocalInfo.name" :path_router="pathName"/>
    <div class="view-container">
    <!-- 左侧 -->
    <div class="view-step">
      <div class="step">{{ $t("language.step") }}</div>
      <div class="every-step">
        <div
          @click="clickEveryStep(step.order)"
          :class="['item', step.order === activeStep ? 'active' : '']"
          v-for="step in steps"
          :key="step.order"
        >
          <span>{{
            step.order >= 9 ? step.order + 1 : "0" + (step.order + 1)
          }}</span>
          <div class="pic">
            <img :src="require('@/images/run/' + step.type + '.png')" alt="" />
          </div>
          <span class="step-name ellipsis">{{ step.step_name }}</span>
        </div>
      </div>
      <div class="btn">
        <button @click="clickRun" class="buleBtn">
          {{ $t("language.run") }}
        </button>
        <button @click="clickStepRun" class="whiteBtn">
          {{ $t("language.step_run") }}
        </button>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="view-info">
      <div>
        <div class="toggleBtn">
          <button
            :class="['whiteBtn', currentBtn === 1 ? 'buleBtn' : '']"
            @click="clickBasicBtn"
          >
            {{ $t("language.basic") }}
          </button>
          <button
            v-if="
              activeStepInfo.type === 'custom' ||
                activeStepInfo.type === 'wash' ||
                activeStepInfo.type === 'lysis' ||
                activeStepInfo.type === 'elution' ||
                activeStepInfo.type === 'bind'
            "
            :class="['whiteBtn', currentBtn === 0 ? 'buleBtn' : '']"
            @click="clickMageticBtn"
          >
            {{ $t("language.magnetic") }}
          </button>
        </div>
        <div class="view-info-bottom">
          <IncubatorInfo
            :info="activeStepInfo"
            v-if="activeStepInfo.type === 'incubator'"
          />
          <TransferInfo
            :info="activeStepInfo"
            v-else-if="activeStepInfo.type === 'transfer'"
          />
          <DiscardInfo
            :info="activeStepInfo"
            v-else-if="activeStepInfo.type === 'discard'"
          />
          <PauseInfo
            :info="activeStepInfo"
            v-else-if="activeStepInfo.type === 'pause'"
          />
          <LoopInfo
            :info="activeStepInfo"
            v-else-if="activeStepInfo.type === 'loop'"
          />
          <div
            v-else-if="activeStepInfo.type === 'unload_labware'"
            class="info-item"
          >
            {{ $t("language.step") }}:
            <span>{{ activeStepInfo.step_name }}</span>
          </div>
          <LysisInfo
            :info="activeStepInfo"
            :isBasic="currentBtn"
            v-else-if="activeStepInfo.type === 'lysis'
            ||activeStepInfo.type === 'bind'
            ||activeStepInfo.type === 'custom'
            ||activeStepInfo.type==='elution'
            ||activeStepInfo.type === 'wash'" />
        </div>
      </div>
    </div>

    <OpenDoorDialog :isShowOpenDoorDialog="isShowOpenDoorDialog" />
  </div>
  </div>
</template>

<script>
import UserHead from '@/components/UserHead.vue'
import { getProtocolDetail, openDoor, closeDoor } from "@/api/run";
import { mapState as mapProtocolsState } from "vuex";
import IncubatorInfo from "./components/IncubatorInfo.vue";
import TransferInfo from "./components/TransferInfo.vue";
import LysisInfo from "./components/LysisInfo.vue";
import DiscardInfo from "./components/DiscardInfo.vue";
import PauseInfo from "./components/PauseInfo.vue";
import OpenDoorDialog from "@/components/OpenDoorDialog.vue";
import LoopInfo from './components/LoopInfo.vue'
export default {
  data() {
    return {
      activeStepType: "",
      activeStep: "",
      currentBtn: 1, // 1 ；Basic按钮  0： Magetic按钮
      steps: [],
      runStepIds: "",
      activeStepInfo: {},
      isShowOpenDoorDialog: false
    };
  },
  components: {
    IncubatorInfo,
    TransferInfo,
    LysisInfo,
    DiscardInfo,
    PauseInfo,
    OpenDoorDialog,
    UserHead,
    LoopInfo
  },
  async created() {
    await this.getProtocolDetail();
    this.clickEveryStep(0);
  },
  computed: {
    ...mapProtocolsState("protocols", [
      "pathName",
      "protocalInfo",
      "doorState"
    ]),
    labware(){
        if(this.info.basic_labware===0){
          return 'D(Tip 1)'
        }else if(this.info.basic_labware===1 ){
          return 'E(Tip 2)'
        }else {
          return 'E(Sleeve)'
        }
      },
  },
  methods: {
    //获取程序详情
    async getProtocolDetail() {
      const {
        data: { steps }
      } = await getProtocolDetail(this.protocalInfo.id);
      this.steps = steps;
      //#endregion
      // 处理左侧显示数据
      // const maps = new Map();
      // steps.forEach(item => {
      //   item.name = item.type
      //    item.name=item.name.charAt(0).toUpperCase() + item.name.slice(1)
      // });
      // const list = steps.filter(
      //   val => !maps.has(val.name) && maps.set(val.name, 1)
      // );
      // let List = JSON.parse(JSON.stringify(list));
      // for (let i = 0; i < list.length; i++) {
      //   let num = 0;
      //   for (let j = 0; j < steps.length; j++) {
      //     if (steps[j].name === list[i].name) {
      //       num += 1;
      //     }
      //   }
      //   if (num === 1) {
      //     let index = List.findIndex(item => item.name === list[i].name);
      //     List.splice(index, 1);
      //   }
      // }
      // for (let i = 0; i < List.length; i++) {
      //   let num = 0;
      //   for (let j = 0; j < steps.length; j++) {
      //     if (steps[j].name === List[i].name) {
      //       num += 1;
      //       steps[j].name = steps[j].name + num;
      //     }
      //   }
      // }
      //#endregion
      // 手动添加卸载耗材步骤
      // steps.push({
      //   order: this.steps.length,
      //   step_name: "Unload labware",
      //   type: "unload labware"
      // });
    },
    clickEveryStep(order) {
      this.currentBtn = 1;
      this.activeStep = order;
      this.activeStepInfo = this.steps[order];
    },
    async clickRun() {
      this.runStepIds = this.steps.map(item => item.id).join();
      this.$store.commit("protocols/updatedStepIds", [
        this.steps[0].id,
        this.runStepIds
      ]);
      this.$store.commit("protocols/updatedInitPathName", "viewrunstep");
      if (!this.doorState) {
        this.isShowOpenDoorDialog = true;
        await openDoor();
      } else {
        this.$router.push("/system/run/protocols/sampleSettings");
      }
    },
    async clickStepRun() {
      const index = this.steps.findIndex(
        item => item.order === this.activeStep
      );
      this.runStepIds = this.steps
        .slice(index)
        .map(item => item.id)
        .join();
      this.$store.commit("protocols/updatedStepIds", [
        this.activeStepInfo.id,
        this.runStepIds
      ]);
      this.$store.commit("protocols/updatedInitPathName", "viewrunstep");
      if (!this.doorState) {
        this.isShowOpenDoorDialog = true;
        await openDoor();
      } else {
        this.$router.push("/system/run/protocols/sampleSettings");
      }
    },
    clickBasicBtn() {
      this.currentBtn = 1;
    },
    clickMageticBtn() {
      this.currentBtn = 0;
    }
  },
  mounted() {
    this.EventBus.on(this.Notify.CODE_FZB_DOOR_OPEN, notify => {
      if (notify.Code === this.Notify.CODE_FZB_DOOR_OPEN) {
        this.isShowOpenDoorDialog = false;
        setTimeout(() => {
          this.$router.push("/system/run/protocols/sampleSettings");
        }, 400);
      }
    });
  },
  destroyed() {
    this.EventBus.unregisterCallbacksForEvent(this.Notify.CODE_FZB_DOOR_OPEN);
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box !important;
}
.active {
  background-color: #e1f0ff;
  border: solid 1px #4171bb;
}
.view-container {
  display: flex;
  background-color: #f3f4f6;
}
.view-step {
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 1108px;
  background-color: #fff;
  border-right: solid 1px #c2cbda;
}
.step {
  height: 80px;
  line-height: 80px;
  color: #333333;
  font-size: 28px;
  border-bottom: solid 1px #c2cbda;
  padding-left: 30px;
}
.every-step {
  flex: 1;
  overflow: auto;
}
.every-step .item {
  padding-left: 30px;
  height: 102px;
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 26px;
}
.pic,
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pic {
  width: 45px;
  height: 50px;
  margin: 0 22px 0 25px;
}
.pic img {
  transform: scale(0.9);
}
.btn {
  height: 110px;
  border-top: solid 1px #c2cbda;
}
.btn button {
  width: 160px;
  height: 64px;
  border-radius: 6px;
  font-size: 22px;
}
.btn button:nth-child(1) {
  margin-right: 28px;
}
.whiteBtn {
  background-color: #fff;
  border: solid 1px #4c7cb2;
}
.buleBtn {
  color: #fff;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border: none;
}

/* 右侧 */
.view-info {
  flex: 1;
  padding: 30px;
}
.view-info > div {
  padding: 30px 30px 0;
  border-radius: 6px;
  border: solid 1px #c2cbda;
  background-color: #fff;
}
.toggleBtn {
  font-size: 0;
  margin-bottom: 60px;
}
.toggleBtn button {
  width: 200px;
  height: 64px;
  border-radius: 3px;
  font-size: 28px;
}
.info-item {
  width: 50%;
  margin-bottom: 70px;
  font-size: 26px;
}
.info-item:nth-child(8n) {
  margin-bottom: 30px;
}
.info-item span {
  margin-left: 20px;
  color: #4171bb;
}
.view-info-bottom {
  height: 890px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
<style>
.view-container .every-step,
.view-container .every-step div,
.view-container .every-step span,
.view-container .every-step img {
  touch-action: pan-y !important;
}
</style>
