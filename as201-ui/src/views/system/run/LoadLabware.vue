<template>
  <div class="container">
    <RunProgress :progressNum="2"/>

    <div class="container-bottom">
      <!-- 左侧 -->
      <div class="container-bottom-left">
        <div class="title-left">{{$t("language.labware_list")}}</div>
        <div class="left">
          <div class="item">
            <div class="pic">
              <img src="@/images/run/运行缩略图2ML.png" v-if="protocalInfo.cartridge===2">
              <img src="@/images/run/运行缩略图8ML.png" v-if="protocalInfo.cartridge===8">
              <img src="@/images/run/运行缩略图15ML.png" v-if="protocalInfo.cartridge===15">
            </div>
            <div class="info">
              <div class="ellipsis">{{$t("language.well")}}：1-{{cartridgeWell}}</div>
              <div class="ellipsis">{{$t("language.cartridge_rack")}}:<span>{{protocalInfo.cartridge+'ml'}}</span></div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/运行缩略图 2ml.png" v-if="protocalInfo.well_a.substr(0,1)==2">
              <img src="@/images/run/运行缩略图1.5ml.png" v-else-if="protocalInfo.well_a.substr(0,3)==1.5">
              <img src="@/images/run/运行缩略图5ML.png" v-else>
            </div>
            <div class="info-abc">
              <div class="ellipsis">{{$t("language.well")}}：A</div>
              <div class="ellipsis">{{protocalInfo.well_a}}</div>
              <div class="ellipsis">{{ $t('language.volume')+(protocalInfo.a_volume !=0? `≥${protocalInfo.a_volume}μl` :  `:${protocalInfo.a_volume}` )}}</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/运行缩略图 2ml.png" v-if="protocalInfo.well_b.substr(0,1)==2">
              <img src="@/images/run/运行缩略图1.5ml.png" v-else>
            </div>
            <div class="info-abc">
              <div class="ellipsis">{{$t("language.well")}}：B</div>
              <div class="ellipsis">{{protocalInfo.well_b}}</div>
              <div class="ellipsis">{{ $t('language.volume')+(protocalInfo.b_volume !=0? `≥${protocalInfo.b_volume}μl` :  `:${protocalInfo.b_volume}` )}}</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/运行缩略图 2ml.png" v-if="protocalInfo.well_c.substr(0,1)==2">
              <img src="@/images/run/运行缩略图1.5ml.png" v-else>
            </div>
            <div class="info-abc">
              <div class="ellipsis">{{$t("language.well")}}：C</div>
              <div class="ellipsis">{{protocalInfo.well_c}}</div>
              <div class="ellipsis">{{ $t('language.volume')+(protocalInfo.c_volume !=0? `≥${protocalInfo.c_volume}μl` :  `:${protocalInfo.c_volume}` )}}</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/tip_1000ul.png">
            </div>
            <div class="info">
              <div class="ellipsis">{{$t("language.well")}}：D</div>
              <div class="ellipsis">{{$t('language.tip_1')}}</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/图像 44.png" v-if="protocalInfo.well_e===2">
              <img src="@/images/run/tip_1000ul.png" v-else>
            </div>
            <div class="info">
              <div class="ellipsis">{{$t("language.well")}}：E</div>
              <div class="ellipsis">{{protocalInfo.well_e===1? $t('language.tip_2') : $t('language.sleeve')}}</div>
            </div>
          </div>
        </div>
      </div>
         <!-- 右侧 -->
      <div class="container-bottom-right">
        <div class="title">
         <div style="font-weight: 700;">{{$t('language.place_the_labware_in_the_same_positions_with_list_and_click_Run_for_start')}}</div>
         <div style="color: #666666;">{{$t('language.pre_packaged')}}：<span>{{$store.state.protocols.protocalInfo.pre_packaged ? $t('language.yes'):$t('language.no')}}</span></div>
        </div>
        <TubeGroup
        :isDisabled="isDisabled"
        :checkedList="$store.state.protocols.selectedTubeList"
        />
        <div class="bottom">
          <div class="bottom-left">
            <div>
              {{$t('language.selected')}}：<span>{{ $store.state.protocols.selectedTubeList.length }}</span>
            </div>
          </div>
          <div class="bottom-right">
            <button class="sampleId" @click="clickBack">{{$t('language.back')}}</button>
            <button class="next" @click="clickRun">{{$t('language.run')}}</button>
          </div>
        </div>
      </div>
    </div>

    <OpenDoorDialog :isShowOpenDoorDialog="isShowOpenDoorDialog"/>
  </div>
</template>

<script>
import TubeGroup from "@/components/TubeGroup.vue";
import RunProgress from "@/components/RunProgress.vue";
import OpenDoorDialog from '@/components/OpenDoorDialog.vue'
import { mapState as mapProtocolsState } from 'vuex'
import {closeDoor} from "@/api/run";
export default {
  components:{
    RunProgress,
    TubeGroup,
    OpenDoorDialog
  },
  data () {
    return {
      isShowOpenDoorDialog: false,
      isDisabled: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
    }
  },
  created () {
  console.log(this.protocalInfo);
  },
  computed:{
      ...mapProtocolsState('protocols',['doorState','protocalInfo',]),
      cartridgeWell(){
        if(this.protocalInfo.cartridge===2){
          return 12
        }else if(this.protocalInfo.cartridge===8){
          return 10
        }else {
          return 8
        }
      }
    },
  methods: {
    clickBack() {
      this.$router.push('sampleSettings')
    },
    async clickRun() {
      this.$store.commit("protocols/updatedStartRunTime", Date.now()/1000);
      if(this.doorState){
        this.isShowOpenDoorDialog=true
        await closeDoor()
        this.EventBus.on(this.Notify.CODE_FZB_DOOR_CLOSE,async (notify) => {
       if(notify.Code===this.Notify.CODE_FZB_DOOR_CLOSE){
        this.isShowOpenDoorDialog=false
        setTimeout(()=>{
          this.$router.push('runprogressthree')
        },400)
       }
    })
       }else {
        this.$router.push('runprogressthree')
       }
    },
  },
  mounted(){

  },
  destroyed() {
    // this.EventBus.unregisterAllCallbacks();
    this.EventBus.unregisterCallbacksForEvent(this.Notify.CODE_FZB_DOOR_CLOSE)
  }
}
</script>

<style scoped>
  div {
    box-sizing: border-box !important;
  }
.container {
  padding: 20px 34px 30px;
  background-color: #f3f4f6;
}
.container-bottom {
  display: flex;
}
.container-bottom-left,
.container-bottom-right{
  height: 967px;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #c2cbda;
}
.container-bottom-left {
  flex: 1;
  margin-right: 30px;
}
.container-bottom-right {
  width: 1418px;
}

.title,
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
}
.title {
  font-size: 26px;
  margin: 22px 38px 19px 29px;
}
.bottom {
  font-size: 24px;
  padding: 40px 30px 0 52px;
}
.bottom-left {
  display: flex;
  align-items: center;
}
.sampleId,
.next {
  width: 190px;
  height: 64px;
  border-radius: 6px;
}
.sampleId {
  background-image: linear-gradient(0deg, #ffffff 0%, #f2f7ff 100%);
  border: solid 1px #c2cbda;
  margin-right: 25px;
}
.next {
  float: right;
  color: #ffffff;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border: none;
}

/* 左侧 */
.title-left {
  height: 74px;
  padding:22px 0 0 26px;
  font-size: 26px;
  color: #333333;
  border-bottom: solid 1px #c2cbda;
  font-weight: 700;
}
.left {
  padding: 31px 25px 0;
}
 .item {
  display:flex;
  /* width: 354px;
   */
   width: 100%;
	height: 110px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #4c7cb2;
  /* color: #4171bb; */
  color: #666;
  font-size: 22px;
  margin-bottom: 20px;
 }
 .pic {
   width:130px;
   height: 100%;
   display:flex;
   align-items: center;
  justify-content: center;

 }
 .info {
  padding-top: 23px;
 }
 .info div {
   margin-bottom: 16px;
 }
 .info div:nth-child(1),
 .info-abc div:nth-child(1){

 color: #4171bb;
 }
 .info-abc {
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
 }
</style>
