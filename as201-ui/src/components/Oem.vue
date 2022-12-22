<template>
  <div>
    <div v-for="(item,index) in img_lists" class="img-lists"
      :class="{'selected-text':$store.getters.selectedImg==item.id}" @click="changeImg(item.id)">
      <div class="img-lists-text">{{item.text}}</div>
      <div><img :src="item.src" class="back-img-model" /></div>
      <div v-if="item.id==3" class="input-div">
        <span style="margin-left: 10%;margin-right: 2%;">{{$t("language.type")}}:</span>
        <input class="input-type" v-model="$store.getters.setting.oem[4]" @click.stop />
      </div>
      <div class="import-img" v-if="item.id==3" @click.stop="importImage()">{{$t("language.import_img")}}</div>
      <div class="circle-option" :class="{'selected-circle':$store.getters.selectedImg==item.id}">
        <div class="circle-option-inner"></div>
      </div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="save">{{this.$t("language.save")}}</div>
    </div>
    <CheckU v-if="check_status" @closeCheck='check_status=false'></CheckU>
    <ImportImg v-if="import_status" @cancleImport='import_status=false'></ImportImg>
  </div>
</template>

<script>
  import {
    saveInstruments
  } from '@/api/setting.js'
  import {
    instrumentGet
  } from '@/api/setting.js'
  import ImportImg from '@/components/ImportImg'
  import CheckU from '@/components/CheckU'
  import {
    getUsbStatus
  } from "@/api/protocols"
  export default {
    components: {
      ImportImg,
      CheckU
    },
    data() {
      return {
        img_lists: [{
          id: 1,
          text: this.$t("language.allsheng"),
          src: this.$store.getters.setting.oem[0],
        }, {
          id: 2,
          text: this.$t("language.neutral"),
          src: this.$store.getters.setting.oem[1],
        }, {
          id: 3,
          text: this.$t("language.other"),
          src: this.$store.getters.setting.oem[2] + "?" + Math.random(100000000000),
        }],
        checkCircle: 1,
        import_status: false,
        check_status: false
      }
    },
    mounted() {
      this.EventBus.on(this.Notify.CODE_IMPORT_SUCCESS, (notify) => {
        this.img_lists[2].src = this.$store.getters.setting.oem[2] + "?" + Math.random(100000000)
        this.$store.commit('setBackSrc', this.img_lists[2].src)
      })
    },
    methods: {
      changeImg(type) {
        this.$store.commit('setSelectedImg', type)
      },
      save() {
        var settings = this.$store.getters.setting;
        settings.oem[3] = this.$store.getters.selectedImg;
        this.$store.commit('setSetting', settings)
        this.$store.commit('setBackSrc', this.img_lists[this.$store.getters.selectedImg - 1].src)
        var real_setting = JSON.parse(JSON.stringify(settings))
        var setting_tmp = JSON.parse(JSON.stringify(this.$store.getters.saveParameters));
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
      importImage() {
        getUsbStatus().then((res) => {
          if (res.data == true) {
            this.import_status = true
          } else {
            this.check_status = true
          }
        })
      },
      flushSetting() {
        instrumentGet().then((res) => {
          this.$store.commit('setSetting', res.data)
          var setting = JSON.parse(JSON.stringify(this.$store.getters.setting))
          for (var i = 0; i < setting.transfer_liquid_calibration.length; i++) {
            for (var j = 0; j < 4; j++) {
              if (setting.transfer_liquid_calibration[i].modified[j] == 0) {
                setting.transfer_liquid_calibration[i].modified[j] = null
              } else if (setting.transfer_liquid_calibration[i].volume[j] == 0) {
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
  .back-img-model {
    width: 355px;
    height: 222px;
    border-radius: 4px;
    margin-left: 45px;
    margin-bottom: 49.5px;
  }

  .img-lists {
    position: relative;
    float: left;
    font-size: 24px;
    width: 442px;
    height: 550px;
    background-color: #ffffff;
    border-radius: 9px;
    margin-left: 50px;
    margin-top: 248px;
  }

  .img-lists-text {
    margin-top: 40px;
    margin-bottom: 71.5px;
    width: 100%;
    text-align: center;
  }

  .circle-option {
    position: absolute;
    width: 36px;
    height: 36px;
    border: 1px solid #4c7cb2;
    background-color: white;
    border-radius: 18px;
    bottom: -62px;
    left: 203px;
  }

  .selected-circle {
    background-color: #4C7CB2;
  }

  .selected-text {
    color: #5a89c7;
    border: solid 2px #5a89c7;
    box-sizing: border-box;
  }

  .circle-option-inner {
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #ffffff;
    margin: 10px 10px;
  }

  .import-img {
    width: 157px;
    height: 46px;
    background-color: #5a89c7;
    border-radius: 4px;
    color: white;
    float: right;
    margin-top: 4%;
    margin-right: 20px;
    text-align: center;
    line-height: 46px;
    font-size: 20px;
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

  .input-div {
    height: 42px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .input-type {
    width: 250px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    text-indent: 10px;
    font-size: 19px;
  }
</style>
