<template>
  <div>
    <div class="temperture-title">
      <div class="t t1" :class="{'selected':temperture_option==1}" @click="changeOption('t1')">T1</div>
      <div class="t t2" :class="{'selected':temperture_option==2}" @click="changeOption('t2')">T2</div>
    </div>
    <div class="temperture-model" v-if="temperture_option==1">
      <Temperature1 class="temperture-div" :degree='40' :type='"T1"' @getTemperature='getSv'></Temperature1>
      <div class="divider"><img src="../images/setting/divider.png" /></div>
      <Temperature1 class="temperture-div" :degree='100' :type='"T1"' @getTemperature='getSv'></Temperature1>
      <div class="divider"><img src="../images/setting/divider.png" /></div>
      <Temperature1 class="temperture-div" :degree='120' :type='"T1"' @getTemperature='getSv'></Temperature1>
    </div>
    <div class="temperture-model" v-if="temperture_option==2">
      <Temperature2 class="temperture-div" :degree='40' :type='"T2"' @getTemperature='getSv'></Temperature2>
      <div class="divider"><img src="../images/setting/divider.png" /></div>
      <Temperature2 class="temperture-div" :degree='100' :type='"T2"' @getTemperature='getSv'></Temperature2>
      <div class="divider"><img src="../images/setting/divider.png" /></div>
      <Temperature2 class="temperture-div" :degree='120' :type='"T2"' @getTemperature='getSv'></Temperature2>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="save">{{this.$t("language.save")}}</div>
      <div class="button-div factory" @click="getFactory">{{this.$t("language.factory")}}</div>
    </div>
  </div>
</template>

<script>
  import Temperature1 from '@/components/Temperature'
  import Temperature2 from '@/components/Temperature'
  import {
    saveInstruments,instrumentGet
  } from '@/api/setting.js'
  import {
    factory
  } from '@/api/setting.js'
  export default {
    components: {
      Temperature1,
      Temperature2
    },
    data() {
      return {
        temperture_option: 1,
        Temperture_Sv: [{
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }, {
          value: '--',
        }]
      }
    },
    mounted() {

    },
    methods: {
      changeOption(type) {
        if (type == 't1') {
          this.temperture_option = 1
        } else if (type == 't2') {
          this.temperture_option = 2
        }
      },
      getSv(data,degree,type) {
        if (degree == '40' && type == "T1") {
          this.Temperture_Sv[0].value = data[0].value
          this.Temperture_Sv[1].value = data[1].value
          this.Temperture_Sv[2].value = data[2].value
        }else if(degree == '100' && type == "T1"){
          this.Temperture_Sv[3].value = data[0].value
          this.Temperture_Sv[4].value = data[1].value
          this.Temperture_Sv[5].value = data[2].value
        }else if(degree == '120' && type == "T1"){
          this.Temperture_Sv[6].value = data[0].value
          this.Temperture_Sv[7].value = data[1].value
          this.Temperture_Sv[8].value = data[2].value
        }else if (degree == '40' && type == "T2") {
          this.Temperture_Sv[9].value = data[0].value
          this.Temperture_Sv[10].value = data[1].value
          this.Temperture_Sv[11].value = data[2].value
        }else if(degree == '100' && type == "T2"){
          this.Temperture_Sv[12].value = data[0].value
          this.Temperture_Sv[13].value = data[1].value
          this.Temperture_Sv[14].value = data[2].value
        }else if(degree == '120' && type == "T2"){
          this.Temperture_Sv[15].value = data[0].value
          this.Temperture_Sv[16].value = data[1].value
          this.Temperture_Sv[17].value = data[2].value
        }
        this.$store.commit('setTemperatureSv',this.Temperture_Sv)
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
        var real_setting = JSON.parse(JSON.stringify(this.$store.getters.setting))
        for (var i = 0; i < real_setting.transfer_liquid_calibration.length; i++) {
          for (var j = 0; j < 4; j++) {
            if (real_setting.transfer_liquid_calibration[i].modified[j] == null) {
              real_setting.transfer_liquid_calibration[i].modified[j] = 0
            }
            if (real_setting.transfer_liquid_calibration[i].volume[j] == null) {
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
    }
  }
</script>

<style scoped="scoped">
  .temperture-title {
    width: fit-content;
    height: 50px;
    margin-top: 30px;
    margin-left: 30px;
    display: flex;
  }

  .t {
    width: 130px;
    height: 50px;
    background-color: #ceddf1;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
  }

  .t1 {
    border-radius: 4px 0px 0px 4px;
  }

  .t2 {
    border-radius: 0px 4px 4px 0px;
  }

  .selected {
    background-color: #4c7cb2;
    color: white;
  }

  .temperture-model {
    width: 1466px;
    display: flex;
    margin-top: 15px;
    margin-left: 30px;
    height: 792px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
  }

  .tube-info-button {
    margin-top: 22px;
    height: 64px;
    line-height: 64px;
    width: 100%;
    font-size: 24px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 100%;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
  }

  .save {
    color: white;
    background-color: #5187C3;
    margin-right: 30px;
  }

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    box-sizing: border-box;
  }

  .temperture-div {
    margin-top: 30px;
  }

  .divider {
    margin-top: 49px;
  }
</style>
