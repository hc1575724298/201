<template>
  <div>
    <div>
      <div class="parameters-parameters" v-for="(item,index) in parameters_setting" :key="index"
        @click="openModified(item.key)">
        <div style="float: left;" v-if="index==0">{{$t("language.horizontal_speed")}}</div>
        <div style="float: left;" v-if="index==1">{{$t("language.magnetic_lifting_speed")}}</div>
        <div style="float: left;" v-if="index==2">{{$t("language.magnetic_sleeve_speed")}}</div>
        <div class="img-div"><img src="../images/setting/more.png" /></div>
        <div style="float: right;">{{item.value}}</div>
      </div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="saveParameters()">{{this.$t("language.save")}}</div>
      <div class="button-div factory" @click="getFactory">{{this.$t("language.factory")}}</div>
    </div>
    <ModifiedParamters :paramters_name='paramter_name' v-if='modified_status' @ok='modifiedOk' @back='close'>
    </ModifiedParamters>
  </div>
</template>

<script>
  import {
    searchSetting
  } from '@/api/setting.js'
  import {
    saveInstruments
  } from '@/api/setting.js'
  import
  ModifiedParamters
  from '@/components/ModifiedParamters'
  import {
    instrumentGet
  } from '@/api/setting.js'
  import {
    factory
  } from '@/api/setting.js'
  export default {
    components: {
      ModifiedParamters
    },
    data() {
      return {
        modified_status: false,
        paramter_name: null,
        parameters_setting: [{
          key: 'horizontal_speed',
          value: null,
        }, {
          key: 'magnetic_rod_lifting_speed',
          value: null,
        }, {
          key: 'magnetic_rod_sleeve_lifting_speed',
          value: null,
        }],
      }
    },
    mounted() {
      this.getParameters()
    },
    methods: {
      close() {
        this.modified_status = false
      },
      openModified(type) {
        this.modified_status = true
        if (type == 'horizontal_speed') {
          this.paramter_name = this.$t("language.horizontal_speed")
          this.$store.getters.setting.parameters.horizontal_speed
        } else if (type == 'magnetic_rod_lifting_speed') {
          this.paramter_name = this.$t("language.magnetic_lifting_speed")
        } else if (type == 'magnetic_rod_sleeve_lifting_speed') {
          this.paramter_name = this.$t("language.magnetic_sleeve_speed")
        }
      },
      modifiedOk(data) {
        this.modified_status = false;
        let settings = this.$store.getters.setting;
        if (this.paramter_name == this.$t("language.horizontal_speed")) {
          settings.parameters.horizontal_speed = data;
          this.parameters_setting[0].value = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.magnetic_lifting_speed")) {
          this.parameters_setting[1].value = data;
          settings.parameters.magnetic_rod_lifting_speed = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.magnetic_sleeve_speed")) {
          this.parameters_setting[2].value = data;
          settings.parameters.magnetic_rod_sleeve_lifting_speed = data;
          this.$store.commit('setSetting', settings);
        }
      },
      changeParamter(type) {
        this.$store.commit('setPrameters', type)
      },
      getParameters() {
        this.parameters_setting[0].value = this.$store.getters.setting.parameters.horizontal_speed;
        this.parameters_setting[1].value = this.$store.getters.setting.parameters.magnetic_rod_lifting_speed;
        this.parameters_setting[2].value = this.$store.getters.setting.parameters.magnetic_rod_sleeve_lifting_speed;
      },
      saveParameters() {
        var instruments = JSON.parse(JSON.stringify(this.$store.getters.setting));
        instruments.oem[3] = this.$store.getters.selectedImg;
        if (this.$store.getters.selectedImg == 1) {
          this.$store.commit('setBackSrc', instruments.oem[0])
        } else if (this.$store.getters.selectedImg == 2) {
          this.$store.commit('setBackSrc', instruments.oem[1])
        } else if (this.$store.getters.selectedImg == 3) {
          this.$store.commit('setBackSrc', instruments.oem[2] + "?" + Math.random(100000000000))
        }
        for (var i = 0; i < instruments.transfer_liquid_calibration.length; i++) {
          for (var j = 0; j < 4; j++) {
            if (instruments.transfer_liquid_calibration[i].modified[j] == null) {
              instruments.transfer_liquid_calibration[i].modified[j] = 0
            }
            if (instruments.transfer_liquid_calibration[i].volume[j] == null) {
              instruments.transfer_liquid_calibration[i].volume[j] = 0
            }
          }
        }
        saveInstruments({
          'parameters': JSON.stringify(this.parameters_setting),
          'instruments': JSON.stringify(instruments)
        }).then((res) => {
          if (res.code == 0) {
            this.flushSetting()
            this.$message({
              type: 'success',
              message: this.$t("language.save_success")
            })
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
          this.getParameters()
        })
      },
      getFactory(){
        factory().then((res)=>{
          if(res.code==0){
            this.$message({
              type:'success',
              message:this.$t("language.factory_success")
            })
          }
           this.flushSetting()
        })
      },
    },
  }
</script>

<style scoped="scoped">
  .paramters-title {
    height: 58px;
    width: 60%;
    display: flex;
    margin-left: 30px;
    margin-top: 20px;
  }

  .paramter-buttons {
    width: 180px;
    height: 58px;
    font-size: 22px;
    line-height: 58px;
    text-align: center;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    background-color: white;
  }

  .parameters {
    border-radius: 4px 0px 0px 4px;
  }


  .magnet {
    border-radius: 0px 4px 4px 0px;
  }

  .selected-buttons {
    color: white;
    background-color: #548CCC;
  }

  .parameters-parameters {
    width: 1466px;
    height: 85px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 20px;
    margin-left: 30px;
    font-size: 26px;
    line-height: 85px;
    text-indent: 32px;
  }

  .parameters-parameters:first-child {
    margin-top: 78px;
  }

  .transfer-parameters {
    width: 1466px;
    height: 85px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 15px;
    margin-left: 30px;
    font-size: 26px;
    line-height: 85px;
    text-indent: 32px;
  }

  .img-div {
    float: right;
    margin-right: 32px;
    margin-top: 10px;
    width: fit-content;
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

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    background-color: white;
    box-sizing: border-box;
  }

  .tip {
    font-size: 26px;
    margin-top: 20px;
    margin-left: 30px;
  }
</style>
