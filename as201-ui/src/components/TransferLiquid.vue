<template>
  <div>
    <div class="aspirate-dispense-model">
      <div class="aspirate-dispense-div">
        <div class="content-div" v-for="(item,index) in contents" :key="index">
          <div class="content-title" :class="{'color-title':item.id==1}">{{item.description}}</div>
          <div class="aspirate-modified">
            <div class="aspirate-modified-div">{{$t("language.aspirate")}}</div>
            <div class="aspirate-modified-div">{{$t("language.modified")}}</div>
          </div>
          <div class="aspirate-modified-input">
            <div class="aspirate-modified" v-for="(items,index) in item.transfer_lists" :key="index">
              <div class="aspirate-modified-sort">{{items.description}}</div>
              <div style="float: left;">
                <input
                  class="aspirate-modified-input-div"
                  @focus="onfocusNum('bottom',items.aspirate,$event)"
                  v-model="items.aspirate"
                  @blur="dealAspirateData(item.id-1,items.id-1)"
                  onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))"
                  @input="items.aspirate = items.aspirate.replace(/[^[0-9]\d*$/g, '')"
                  maxlength="4"
                  />
              </div>
              <div style="float: left;">
                <input
                  class="aspirate-modified-input-div"
                  @focus="onfocusNum('bottom',items.modified,$event)"
                  v-model="items.modified"
                  @blur="dealData(item.id-1,items.id-1)"
                  onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))"
                  @input="items.modified = items.modified.replace(/[^[0-9]\d*$/g, '')"
                  maxlength="4"/>
              </div>
            </div>
          </div>
          <div class="img-divid"><img src="../images/setting/divide.png" /></div>
        </div>
      </div>
      <div class="suggetion">
        <div class="suggetion-div">
          <div style="margin-bottom: 10px;">{{$t("language.transfer_step1")}}</div>
          <div>{{$t("language.transfer_step2")}}<span style="color: red;">{{$t("language.position_a")}}</span></div>
        </div>
        <div class="blow">{{$t("language.blow")}}</div>
      </div>
      <div class="operate">
        <div style="margin-left: 63px;">{{$t("language.aspirate_volume")}}</div>
        <div>
          <input
            class="operate-input"
            maxlength="4"
            @focus="onfocusNum('right',aspirate_volume,$event)"
            v-model="aspirate_volume"
            @blur="dealOperate('aspirate_volume')"
            @input="aspirate_volume = aspirate_volume.replace(/[^[0-9]\d*$/g, '')"
            onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" />
        </div>
        <div style="margin-right:154px ;" class="operate-start" @click="StartYy('aspirate')">
          {{$t("language.Interval_start")}}
        </div>
        <div class="dispense-div">
          <div>{{$t("language.dispense_volume")}}</div>
          <div>
            <input
              maxlength="4"
              class="operate-input"
              v-model="dispense_volume"
              @focus="onfocusNum('left',dispense_volume,$event)"
              @blur="dealOperate('dispense_volume')"
              @input="dispense_volume = dispense_volume.replace(/[^[0-9]\d*$/g, '')"
              onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" />
          </div>
          <div class="operate-start" @click="StartYy('dispense')">{{$t("language.Interval_start")}}</div>
        </div>
      </div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="save">{{this.$t("language.save")}}</div>
      <div class="button-div factory" @click="getFactory">{{this.$t("language.factory")}}</div>
    </div>
    <aspirateDispense v-if="aspirateDispense_status" :start_type='startType'></aspirateDispense>

     <!-- 键盘 -->
     <NumberKeyboard
      :class="[position=='bottom'? 'bottomKeyboard':'',position=='right'? 'rightKeyboard':'',position=='left'? 'leftKeyboard':'']"
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
import NumberKeyboard from "@/components/NumberKeyboard.vue";
import MixinNumberKeyboard from "@/mixins/numberkeyboard.js";
  import {
    startYyjz
  } from '@/api/setting.js'
  import aspirateDispense from '@/components/aspirateDispense'
  import {
    saveInstruments
  } from '@/api/setting.js'
  import {
    instrumentGet
  } from '@/api/setting.js'
  import {
    factory
  } from '@/api/setting.js'
  export default {
    components: {
      aspirateDispense,
      NumberKeyboard
    },
    mixins:[MixinNumberKeyboard],
    data() {
      return {
        contents: [{
          id: 1,
          description: this.$t("language.aspirate_ul"),
          transfer_lists: [{
            id: 1,
            description: "1.",
            aspirate: null,
            modified: null
          }, {
            id: 2,
            description: "2.",
            aspirate: null,
            modified: null
          }, {
            id: 3,
            description: "3.",
            aspirate: null,
            modified: null
          }, {
            id: 4,
            description: "4.",
            aspirate: null,
            modified: null
          }]
        }, {
          id: 2,
          description: this.$t("language.dispense_ul"),
          transfer_lists: [{
            id: 1,
            description: "1.",
            aspirate: null,
            modified: null
          }, {
            id: 2,
            description: "2.",
            aspirate: null,
            modified: null
          }, {
            id: 3,
            description: "3.",
            aspirate: null,
            modified: null
          }, {
            id: 4,
            description: "4.",
            aspirate: null,
            modified: null
          }]
        }],
        aspirate_volume: null,
        dispense_volume: null,
        aspirateDispense_status: false,
        startType: null,
        contents_id: 0,
        transfer_id: 0,
        position: 'bottom',//键盘位置
      }
    },
    watch: {
      'contents': {
        deep: true,
        handler(newval, oldval) {
          var setting = JSON.parse(JSON.stringify(this.$store.getters.setting))
          for (var i = 0; i < setting.transfer_liquid_calibration.length; i++) {
            for (var j = 0; j < 4; j++) {
              setting.transfer_liquid_calibration[i].modified[j] = newval[i].transfer_lists[j].modified
              setting.transfer_liquid_calibration[i].volume[j] = newval[i].transfer_lists[j].aspirate
            }
          }
          this.$store.commit('setSetting', setting)
        }
      }
    },
    mounted() {
      this.getTransfer()
    },
    methods: {
      onfocusNum (position,val, e) {
      this.position = position
      this.isShowNumberKeyboard = true
      this.input = val
      this.event = e;
    },
    onChangeNum (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/[^\d]/g, '')
      if(inputNew.length> 4) return
      this.inputValue(inputNew)
    },
      StartYy(type) {
        var volume;
        if (type == 'aspirate') {
          volume = this.aspirate_volume
          this.startType = 'aspirate'
        } else if (type == 'dispense') {
          volume = this.dispense_volume
          this.startType = 'dispense'
        }
        this.aspirateDispense_status = true
        startYyjz({
          'type': type,
          'volume': volume
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: this.$t("language.operate_success")
            })
          }
        })
      },
      getTransfer() {
        var setting = JSON.parse(JSON.stringify(this.$store.getters.setting))
        for (var i = 0; i < setting.transfer_liquid_calibration.length; i++) {
          for (var j = 0; j < 4; j++) {
            this.contents[i].transfer_lists[j].modified = setting.transfer_liquid_calibration[i].modified[j]
            this.contents[i].transfer_lists[j].aspirate = setting.transfer_liquid_calibration[i].volume[j]
          }
        }
      },
      dealAspirateData(contents_id, transfer_id) {
        this.isShowNumberKeyboard= false;
        if (this.contents[contents_id].transfer_lists[transfer_id].aspirate === '') {
          this.contents[contents_id].transfer_lists[transfer_id].aspirate = null
          return
        }
        if (this.contents[contents_id].transfer_lists[transfer_id].aspirate == null) {
          this.contents[contents_id].transfer_lists[transfer_id].aspirate = null
          return
        }
        if (this.contents[contents_id].transfer_lists[transfer_id].aspirate < 1) {
          this.contents[contents_id].transfer_lists[transfer_id].aspirate = 1
        } else if (this.contents[contents_id].transfer_lists[transfer_id].aspirate > 1020) {
          this.contents[contents_id].transfer_lists[transfer_id].aspirate = 1020
        }
        if (this.contents[contents_id].transfer_lists[transfer_id].aspirate != null && this.contents[contents_id]
          .transfer_lists[transfer_id].modified != null) {
          if (!((this.contents[contents_id].transfer_lists[transfer_id].aspirate - 15) <= this.contents[contents_id]
              .transfer_lists[transfer_id].modified && (Number(this.contents[contents_id].transfer_lists[transfer_id]
                .aspirate) + 15) >= this.contents[contents_id].transfer_lists[transfer_id].modified)) {
            this.contents[contents_id].transfer_lists[transfer_id].modified = this.contents[contents_id]
              .transfer_lists[transfer_id].aspirate
          }
        }
      },
      dealData(contents_id, transfer_id) {
        this.isShowNumberKeyboard= false;
        if (this.contents[contents_id].transfer_lists[transfer_id].modified == '') {
          return this.contents[contents_id].transfer_lists[transfer_id].modified = null
        }
        if (this.contents[contents_id].transfer_lists[transfer_id].modified == null) {
          this.contents[contents_id].transfer_lists[transfer_id].modified = null
          return
        }
        if (this.contents[contents_id].transfer_lists[transfer_id].aspirate == null) {
          if (this.contents[contents_id].transfer_lists[transfer_id].modified < 1) {
            this.contents[contents_id].transfer_lists[transfer_id].modified = 1
          } else if (this.contents[contents_id].transfer_lists[transfer_id].modified > 1020) {
            this.contents[contents_id].transfer_lists[transfer_id].modified = 1020
          }
        } else {
          if (this.contents[contents_id].transfer_lists[transfer_id].aspirate != null && this.contents[contents_id]
            .transfer_lists[transfer_id].modified != null) {
            if (!((this.contents[contents_id].transfer_lists[transfer_id].aspirate - 15) <= this.contents[contents_id]
                .transfer_lists[transfer_id].modified && (Number(this.contents[contents_id].transfer_lists[transfer_id]
                  .aspirate) + 15) >= this.contents[contents_id].transfer_lists[transfer_id].modified)) {
              this.contents[contents_id].transfer_lists[transfer_id].modified = this.contents[contents_id]
                .transfer_lists[transfer_id].aspirate
            }
          }
        }
      },
      dealOperate(type) {
        this.isShowNumberKeyboard= false;
        if (type == 'aspirate_volume') {
          if(this.aspirate_volume==''||this.aspirate_volume==null){
            return this.aspirate_volume=null
          }
          if (this.aspirate_volume > 1020) {
            this.aspirate_volume = 1020
          } else if (this.aspirate_volume < 1) {
            this.aspirate_volume = 1
          }
        }else if(type == 'dispense_volume'){
          if(this.dispense_volume==''||this.dispense_volume==null){
            return this.dispense_volume=null
          }
          if (this.dispense_volume > 1020) {
            this.dispense_volume = 1020
          } else if (this.dispense_volume < 1) {
            this.dispense_volume = 1
          }
        }
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
          this.getTransfer()
        })
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
 .bottomKeyboard {
  transform: scale(.9);
  bottom: 10px !important;
 }
 .rightKeyboard {
  transform: scale(.9);
  left: 1014px !important;
  bottom: 80px !important;
 }
 .leftKeyboard {
  transform: scale(.9);
  left: 444px !important;
  bottom: 80px !important;
 }
  .aspirate-dispense-model {
    position: relative;
    width: 1468px;
    height: 950px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 30px;
    margin-left: 30px;
  }

  .aspirate-dispense-div {
    height: 488px;
    width: 100%;
    margin-top: 43px;
  }

  .content-div {
    float: left;
    height: 488px;
    width: 50%;
  }

  .content-title {
    width: 100%;
    text-align: center;
    font-size: 26px;
    color: #d2a516;
    margin-bottom: 32px;
  }

  .color-title {
    color: #4c7cb2;
  }

  .aspirate-modified {
    width: 622px;
    height: 64px;
    margin-left: 63px;
    margin-bottom: 16px;
  }

  .aspirate-modified-div:nth-child(1) {
    margin-left: 98px;
  }

  .aspirate-modified-div {
    float: left;
    width: 220px;
    height: 64px;
    font-size: 26px;
    text-align: center;
    line-height: 64px;
    margin-left: 80px;
  }

  .aspirate-modified-input {
    height: 358px;
    width: 100%;
  }

  .aspirate-modified-sort {
    height: 100%;
    line-height: 64px;
    font-size: 26px;
    float: left;
  }

  .aspirate-modified-input-div {
    margin-bottom: 34px;
    width: 220px;
    height: 64px;
    font-size: 26px;
    text-align: center;
    line-height: 64px;
    margin-left: 80px;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
  }

  .img-divid {
    position: absolute;
    top: 56px;
    left: 50.5%;
  }

  .suggetion {
    margin-top: 77px;
    font-size: 26px;
    height: 70px;
    width: 100%;
    margin-bottom: 50px;
  }

  .suggetion-div {
    float: left;
    margin-left: 63px;
  }

  .blow {
    float: right;
    margin-right: 50px;
    color: white;
    width: 177px;
    height: 56px;
    background-color: #5691d3;
    border-radius: 4px;
    text-align: center;
    line-height: 56px;
  }

  .operate {
    display: flex;
    line-height: 60px;
    height: 60px;
    width: 100%;
    font-size: 26px;
    flex-shrink: 0;
  }

  .operate-input {
    width: 177px;
    height: 100%;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    margin-right: 20px;
    text-align: center;
  }

  .operate-start {
    width: 120px;
    height: 60px;
    background-color: #5691d3;
    border-radius: 4px;
    color: white;
    text-align: center;
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

  .dispense-div {
    display: flex;
    position: absolute;
    right: 50px;
  }
</style>
