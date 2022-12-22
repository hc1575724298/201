<template>
  <div>
    <div class="pipettor-title">
      <div class="title-circle"></div>
      {{this.$t("language.pipettor")}}
    </div>
    <div class="use-time">
      <div class="use-time-text">{{this.$t("language.usedTimes")}}</div>
      <div class="use-time-number">{{setting[0].value}}</div>
      <div class="use-time-clear" v-if="$store.getters.user.group=='factory'" @click="clearUsed">{{this.$t("language.clear")}}</div>
    </div>
    <div class="life-time">
      <div class="life-time-text">{{this.$t("language.lifeTimes")}}</div>
      <div class="life-time-number" v-if="$store.getters.user.group!='factory'&&$store.getters.user.group!='admin'">
        {{setting[1].value}}
      </div>
      <input
        class="life-time-number" v-if="$store.getters.user.group=='factory'"
        @focus="onfocusNum(setting[1].value, $event)"
        v-model="setting[1].value"
        @input="setting[1].value = setting[1].value.replace(/[^[0-9]\d*$/g, '')"
        style="background-color: white;"
        @blur="saveAlarm"
        onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))"/>
      <div class="life-time-number" v-if="$store.getters.user.group=='admin'" style="background-color: #e1e1e1;">
        {{setting[1].value}}
      </div>
    </div>
    <div class="alarm">
      <div class="alarm-text">{{this.$t("language.alarm")}}</div>
      <div class="alarm-model">
        <el-switch v-model="setting[2].value" active-color="#13ce66" inactive-color="#DCDFE6" :width="66"
          @change="saveAlarm">
        </el-switch>
      </div>
    </div>
    <div class="alarm-remain">
      <div class="alarm-remain-text">{{this.$t("language.alarm_remain")}}</div>
      <input
        class="alarm-time-number"
        @focus="onfocusNum(setting[3].value, $event)"
        v-model="setting[3].value"
        style="background-color: white;"
        @blur="saveAlarm"
        onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))"
       />
    </div>

     <!-- 键盘 -->
     <NumberKeyboard
      class="searchKeyboard"
      v-if="isShowNumberKeyboard"
      :input="input"
      @onChange="onChangeNum"
      @onKeyPress="onKeyPressNum"
      @colseKeyboard="colseKeyboardNum"
      @mousedown.native="$event.preventDefault();"
    />
  </div>
</template>

<script>
  import {
    searchSetting,
    saveSetting,
    clearUsedTime
  } from '@/api/setting.js'
  import NumberKeyboard from "@/components/NumberKeyboard.vue";
  import MixinNumberKeyboard from "@/mixins/numberkeyboard.js";
  export default {
    components: { NumberKeyboard },
    mixins:[MixinNumberKeyboard],
    data() {
      return {
        setting: [{
          key: 'pipettor_used_number',
          value: null
        }, {
          key: 'pipettor_total_number',
          value: null
        }, {
          key: 'pipettor_alarm',
          value: null
        }, {
          key: 'pipettor_remain_number',
          value: null
        }]

      }
    },
    mounted() {
      this.getSystemSetting()
    },
    methods: {
      getSystemSetting() {
        searchSetting().then((res) => {
          this.setting[0].value = res.data.pipettor_used_number;
          this.setting[1].value = res.data.pipettor_total_number;
          this.setting[2].value = res.data.pipettor_alarm ? true : false;
          this.setting[3].value = res.data.pipettor_remain_number;
        })
      },
      clearUsed(){
        clearUsedTime({'key':'pipettor_used_number'}).then((res)=>{
          this.$message({
            type:"success",
            message:this.$t("language.operate_success")
          })
        })
        this.getSystemSetting()
      },
      saveAlarm() {
        this.isShowNumberKeyboard = false;
          if (this.setting[1].value > 200000) {
            this.setting[1].value = 200000
          } else if (this.setting[1].value < 1) {
            this.setting[1].value = 1
          }
          if (this.setting[3].value > this.setting[1].value) {
            this.setting[3].value = this.setting[1].value
          } else if (this.setting[3].value < 1  ) {
            this.setting[1].value = 1
          }
        let param = JSON.parse(JSON.stringify(this.setting));
        param[2].value = this.setting[2].value ? 1 : 0;
        param[0].pipettor_used_number = this.setting[0].pipettor_used_number;
        param[1].pipettor_total_number = this.setting[1].pipettor_total_number;
        param[3].pipettor_remain_number = this.setting[3].pipettor_remain_number;
        saveSetting({
          setting: JSON.stringify(param)
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: this.$t("language.save_success")
            })
          }
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .pipettor-title {
    width: 100%;
    height: 27px;
    display: flex;
    font-size: 24px;
    margin-top: 40px;
    margin-bottom: 34px;
    align-items: center;
    color: #333333;
  }

  .title-circle {
    margin-left: 50px;
    margin-right: 13px;
    width: 14px;
    border-radius: 7px;
    height: 14px;
    background-color: #4c7cb2;
  }

  .use-time,
  .life-time {
    width: 100%;
    height: 69px;
    font-size: 24px;
    display: flex;
    align-items: center;
  }

  .use-time-text,
  .life-time-text {
    margin-left: 50px;
    margin-right: 149px;
  }

  .life-time {
    margin-top: 40px;
  }

  .use-time-number,
  .life-time-number {
    width: 288px;
    height: 100%;
    background-color: #e1e1e1;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    color: #333333;
    line-height: 69px;
    text-align: center;
    box-sizing: border-box;
  }

  .life-time-number {
    margin-left: 17px;
  }

  .use-time-clear {
    width: 200px;
    height: 100%;
    background-color: #548CCC;
    color: white;
    margin-left: 40px;
    border-radius: 4px;
    text-align: center;
    line-height: 69px;
  }

  .alarm {
    height: 30px;
    display: flex;
    margin-left: 50px;
    font-size: 24px;
    margin-top: 40px;
  }

  .alarm-text {
    height: 100%;
    line-height: 30px;
  }

  .alarm-model {
    margin-left: 500px;
  }

  .alarm-remain {
    height: 68px;
    display: flex;
    margin-left: 50px;
    font-size: 24px;
    margin-top: 40px;
    align-items: center;
  }

  .alarm-time-number {
    width: 288px;
    height: 68px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    margin-left: 62px;
  }
</style>
<style>
  .alarm .el-switch__core {
    height: 30px;
    border-radius: 21px;
  }

  .alarm .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
  }

  .alarm .is-checked .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
    -webkit-transform: translateX(-11px);
  }
</style>
