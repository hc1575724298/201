<template>
  <div class="setting-system-div">
    <div class="setting-system-siderbar">
      <div class="siderbar-div" :class="{'setting-system-siderbar-div': $store.getters.settingTools==item.id}"
        v-for="(item,index) in tools_siderbar_lists" @click="changeSiderbar(item)">
        {{item.description}}
      </div>
    </div>
    <div class="setting-tools-content">
      <div class="setting-tools-content-title">
        <div>
          {{this.$t("language.lastExecuted")}}{{executed_time}}
        </div>
        <div style="margin-top: 28px;">
          {{this.$t("language.followSteps")}}
        </div>
      </div>
      <CleaningNeedles v-if="$store.getters.settingTools==1"></CleaningNeedles>
      <TightnessTest v-if="$store.getters.settingTools==2"></TightnessTest>
      <ORingsMaintenance v-if="$store.getters.settingTools==3"></ORingsMaintenance>
      <div class="setting-tools-button">
        <div v-if="$store.getters.settingTools==1||$store.getters.settingTools==3" class="move-icon tools-button"
          @click="operate('move')">
          {{this.$t("language.move")}}
        </div>
        <div v-if="$store.getters.settingTools==2" class="test-icon tools-button" @click="operate('test')">
          {{this.$t("language.test")}}
        </div>
        <div class="reset-icon tools-button" @click="operate('reset')">
          {{this.$t("language.reset")}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import CleaningNeedles from '@/components/CleaningNeedles'
  import TightnessTest from '@/components/TightnessTest'
  import ORingsMaintenance from '@/components/ORingsMaintenance'
  import {
    moveInstrument
  } from '@/api/setting.js'
  import {
    resetInstrument
  } from '@/api/setting.js'
  import {
    testInstrument
  } from '@/api/setting.js'
  import {
    searchSetting
  } from '@/api/setting.js'
  import moment from 'moment'
  export default {
    components: {
      CleaningNeedles,
      ORingsMaintenance,
      TightnessTest
    },
    data() {
      return {
        tools_siderbar_lists: [{
            id: 1,
            description: this.$t("language.cleaning_needles")
          }, {
            id: 2,
            description: this.$t("language.tightness")
          },
          {
            id: 3,
            description: this.$t("language.o_rings")
          }
        ],
        executed_time: null,
      }
    },
    mounted() {
      this.getExecutedTime()
    },
    methods: {
      changeSiderbar(item) {
        this.$store.commit('setSettingTools', item.id)
        this.getExecutedTime()
      },
      getExecutedTime() {
        searchSetting().then((res) => {
          if (this.$store.getters.settingTools == 1) {
            if(res.data.cleaning_piercing_needles_time==0){
               this.executed_time = null
            }else{
              this.executed_time = moment(res.data.cleaning_piercing_needles_time * 1000).format('MM/DD/YYYY HH:mm:ss');
            }
          } else if (this.$store.getters.settingTools == 2) {
            if(res.data.tightness_time * 1000==0){
               this.executed_time = null
            }else{
              this.executed_time = moment(res.data.tightness_time * 1000).format('MM/DD/YYYY HH:mm:ss');
            }
          } else if (this.$store.getters.settingTools == 3) {
            if(res.data.o_rings_maintenance_time==0){
              this.executed_time = null
            }else{
              this.executed_time = moment(res.data.o_rings_maintenance_time * 1000).format('MM/DD/YYYY HH:mm:ss');
            }
          }
        })
      },
      operate(type) {
        if (type == 'move') {
          moveInstrument().then((res) => {
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: this.$t("language.operate_success")
              })
            }
          })
        } else if (type == 'reset') {
          var type = null;
          if (this.$store.getters.settingTools == 1) {
            type = 'cleaning_piercing_needles_time';
          } else if (this.$store.getters.settingTools == 2) {
            type = 'tightness_time';
          } else if (this.$store.getters.settingTools == 3) {
            type = 'o_rings_maintenance_time';
          }
          resetInstrument({'type':type}).then((res) => {
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: this.$t("language.reset_success")
              })
            }
              this.getExecutedTime()
          })
        } else if (type == 'test') {
          testInstrument().then((res) => {
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: this.$t("language.test_success")
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .setting-system-div {
    height: 100%;
    width: 100%;
    background-color: #F3F4F6;
  }

  .setting-system-siderbar {
    float: left;
    width: 392px;
    height: 100%;
    border-right: 2px solid #DAE0E8;
    background-color: white;
    box-sizing: border-box;
  }

  .siderbar-div {
    width: 100%;
    height: 98px;
    font-size: 26px;
    line-height: 98px;
    text-indent: 38px;
    border: solid 1px transparent;
    box-sizing: border-box;
  }

  .setting-system-siderbar-div {
    background-color: #e5eff9;
    border-color: #4c7cb2;
    box-sizing: border-box;
    color: #4C7CB2;
  }

  .setting-tools-content {
    margin-top: 30px;
    margin-left: 30px;
    width: 1468px;
    height: 1048px;
    float: left;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #c2cbda;
  }

  .setting-tools-content-title>div {
    height: fit-content;
    width: 100%;
    margin-top: 32px;
    text-indent: 34px;
    font-size: 26px;
    color: #333333;
  }

  .setting-tools-button {
    float: left;
    width: 100%;
    height: 64px;
  }

  .tools-button {
    margin-top: 27px;
    height: 64px;
    width: 193px;
    font-size: 24px;
    line-height: 64px;
    text-align: center;
  }

  .reset-icon {
    float: right;
    color: #333333;
    margin-right: 29px;
    border-radius: 6px;
    border: solid 1px #2d60c7;
  }

  .move-icon,
  .test-icon {
    float: right;
    border-radius: 6px;
    color: white;
    margin-right: 33px;
    background-color: #538BCA;
  }
</style>
