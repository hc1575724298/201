<template>
  <div>
    <div class="pn-number">
      <div class="pn-number-text">{{$t("language.pn")}}{{pn_number}}</div>
      <div class="pn-number-button" v-if="$store.getters.user.group!='admin'" @click="openScan('scan')">{{$t("language.scan")}}</div>
      <div class="pn-number-button" v-if="$store.getters.user.group!='admin'" @click="openScan('edit')">{{$t("language.edit")}}</div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="save">{{this.$t("language.save")}}</div>
    </div>
    <ScanCode @close='closeScan' v-if="Scan_Status" :text_type='type' @okChange="changePn"></ScanCode>
  </div>
</template>

<script>
  import {
    saveInstruments
  } from '@/api/setting.js'
  import ScanCode from '@/components/ScanCode'
  import {
    instrumentGet
  } from '@/api/setting.js'
  export default {
    components:{
      ScanCode
    },
    data() {
      return {
        pn_number: this.$store.getters.setting.pn_number,
        Scan_Status:false,
        type:null
      }
    },
    mounted() {

    },
    methods: {
      closeScan(){
        this.Scan_Status=false
      },
      openScan(type){
        this.type = type
        this.Scan_Status=true
      },
      changePn(data){
          this.pn_number = data;
          var settings = JSON.parse(JSON.stringify(this.$store.getters.setting))
          settings.pn_number = this.pn_number
          this.$store.commit('setSetting',settings)
          this.Scan_Status=false;
      },
      save() {
        var settings = this.$store.getters.setting;
        settings.oem[3] = this.$store.getters.selectedImg;
        this.$store.commit('setSetting', settings)
        if (this.$store.getters.selectedImg == 1) {
          this.$store.commit('setBackSrc', settings.oem[0])
        } else if (this.$store.getters.selectedImg == 2) {
          this.$store.commit('setBackSrc', settings.oem[1])
        } else if (this.$store.getters.selectedImg == 3) {
          this.$store.commit('setBackSrc', settings.oem[2] + "?" + Math.random(100000000000))
        }
        var setting_tmp = JSON.parse(JSON.stringify(this.$store.getters.saveParameters));
        for (let i = 0; i < setting_tmp.length; i++) {
          if (setting_tmp[i].key == 'aspirate_delay' || setting_tmp[i].key == 'dispense_delay' || setting_tmp[i].key ==
            'tip_dispense_delay') {
            setting_tmp[i].value *= 1000;
          }
        }
        var real_setting = JSON.parse(JSON.stringify(settings))
        for (var i = 0; i < real_setting.transfer_liquid_calibration.length; i++) {
          for (var j = 0; j < 4; j++) {
            if(real_setting.transfer_liquid_calibration[i].modified[j]==null){
              real_setting.transfer_liquid_calibration[i].modified[j] = 0
            }
            if(real_setting.transfer_liquid_calibration[i].volume[j]==null){
              real_setting.transfer_liquid_calibration[i].volume[j] = 0
            }
          }
        }
        saveInstruments({
          'parameters': JSON.stringify(setting_tmp),
          'instruments': JSON.stringify(real_setting)
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: this.$t("language.save_success")
            })
            this.flushSetting()
          }
        })
      },
      flushSetting() {
        instrumentGet().then((res) => {
          this.$store.commit('setSetting', res.data)
          var setting = JSON.parse(JSON.stringify(this.$store.getters.setting))
          for (var i = 0; i < setting.transfer_liquid_calibration.length; i++) {
            for (var j = 0; j < 4; j++) {
              if(setting.transfer_liquid_calibration[i].modified[j] == 0){
                setting.transfer_liquid_calibration[i].modified[j] = null
              }else if(setting.transfer_liquid_calibration[i].volume[j]==0){
                setting.transfer_liquid_calibration[i].volume[j] = null
              }
            }
          }
          this.$store.commit('setSetting', setting)
          this.$store.commit('setSelectedImg', res.data.oem[3])
          let param = [{
            key: 'horizontal_speed',
            value: res.data.parameters.horizontal_speed,
          }, {
            key: 'magnetic_rod_lifting_speed',
            value: res.data.parameters.magnetic_rod_lifting_speed,
          }, {
            key: 'magnetic_rod_sleeve_lifting_speed',
            value: res.data.parameters.magnetic_rod_sleeve_lifting_speed,
          }]
          this.$store.commit('setSaveParameters', param)
        })
      },
    }
  }
</script>

<style scoped="scoped">
  .pn-number {
    height: 64px;
    width: 100%;
    margin-top: 32px;
  }

  .pn-number-text {
    font-size: 28px;
    line-height: 64px;
    font-weight: 600;
    margin-left: 30px;
    float: left;
  }

  .pn-number-button {
    width: 193px;
    float: right;
    height: 64px;
    background-color: #F6F9FF;
    border-radius: 6px;
    margin-right: 30px;
    box-sizing: border-box;
    border: solid 1px #c2cbda;
    font-size: 24px;
    text-align: center;
    line-height: 64px;
    color: #4c7cb2;
  }

  .tube-info-button {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
  }

  .save {
    color: white;
    background-color: #5187C3;
  }
</style>
