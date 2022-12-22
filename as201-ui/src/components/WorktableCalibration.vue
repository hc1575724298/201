<template>
  <div class="worktable-model">
    <div class="worktable-menu">
      <template v-if="$store.getters.languageCode==1">
        <div class="worktable-menu-option" v-for="(item,index) in menu_lists" :key="index"
          :class="{'selected-worktable-menu':$store.getters.selectedWorktableStatus==item.id,'uncalibration':!item.selected_status}"
          @click="changeMenu(item.id)">{{item.description}}</div>
      </template>
      <template v-if="$store.getters.languageCode==0">
        <div class="worktable-menu-option-chinese" v-for="(item,index) in menu_lists" :key="index"
          :class="{'selected-worktable-menu':$store.getters.selectedWorktableStatus==item.id,'uncalibration':!item.selected_status}"
          @click="changeMenu(item.id)">{{item.description}}</div>
      </template>
    </div>
    <div class="worktable-img-div">
      <img class="worktable-img" src="../images/setting/tips.png" v-if="$store.getters.selectedWorktableStatus==1" />
      <img class="worktable-img" src="../images/setting/sample_tube.png"
        v-if="$store.getters.selectedWorktableStatus==2" />
      <img class="worktable-img" src="../images/setting/7_cartridege_rack_tips.png"
        v-if="$store.getters.selectedWorktableStatus==3" />
      <img class="worktable-img" src="../images/setting/7_cartridege_rack_tips.png"
        v-if="$store.getters.selectedWorktableStatus==4" />
      <img class="worktable-img" src="../images/setting/7_cartridege_rack_tips.png"
        v-if="$store.getters.selectedWorktableStatus==5" />
      <img class="worktable-img" src="../images/setting/7_cartridege_rack_sleeve.png"
        v-if="$store.getters.selectedWorktableStatus==6" />
      <img class="worktable-img" src="../images/setting/elution_tube.png"
        v-if="$store.getters.selectedWorktableStatus==7" />
      <img class="worktable-img" src="../images/setting/reagent_tube.png"
        v-if="$store.getters.selectedWorktableStatus==8" />
    </div>
    <div class="worktable-content">
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==1">
        <div class="circle"></div>
        <div>{{$t("language.tips")}}</div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==2">
        <div class="circle"></div>
        <div>{{$t("language.magnetic_sleeve")}}</div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==3">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.cartridege_rack")}}</div>
        </div>
        <div>
          <div class="select-well" style="background-color:#ebebeb ;">
            8ml
          </div>
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==4">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.cartridege_rack")}}</div>
        </div>
        <div>
          <div class="select-well" style="background-color:#ebebeb ;">
            8ml
          </div>
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==6">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.elution_tube")}}</div>
        </div>
        <div class="worktable-tube-div">
          10ml
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==7">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.reagent_tube")}}</div>
        </div>
        <div class="worktable-tube-div">
          1.5ml
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==8">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.sample_tube")}}</div>
        </div>
       <div class="worktable-tube-div">
          1.5ml
        </div>
      </div>
      <div class="option-div">
        <div class="circle"></div>
        <div v-if="$store.getters.selectedWorktableStatus==1 ||$store.getters.selectedWorktableStatus==2
          ||$store.getters.selectedWorktableStatus==3||$store.getters.selectedWorktableStatus==6
          ||$store.getters.selectedWorktableStatus==7||$store.getters.selectedWorktableStatus==8">
          {{$t("language.load")+'&nbsp;'+$t("language.tip")}}
        </div>
        <div v-if="$store.getters.selectedWorktableStatus==4||$store.getters.selectedWorktableStatus==5">
          {{$t("language.load")+'&nbsp;'+$t("language.sleeve")}}
        </div>
      </div>
      <div class="load-div" v-if="option==1||option==3||option==6||option==7||option==8">
        <div class="load" :class="{'no-load':load_status}" @click="loadInstrument">{{$t("language.load")}}</div>
        <div class="load unload" :class="{'no-load':load_status}" @click="unloadInstrument">{{$t("language.unload")}}
        </div>
      </div>
      <div class="load-div" v-if="option==2||option==4||option==5">
        <div class="load" :class="{'no-load':sleeve_load_status}" @click="loadInstrument">{{$t("language.load")}}</div>
        <div class="load unload" :class="{'no-load':sleeve_load_status}" @click="unloadInstrument">
          {{$t("language.unload")}}
        </div>
      </div>
      <div class="option-div">
        <div class="circle"></div>
        <div>{{$t("language.zero_calibration")}}</div>
      </div>
      <div class="load-div">
        <div class="load" @click="preCa">{{$t("language.pre_calibration")}}</div>
        <div class="load unload" @click="release">{{$t("language.release")}}</div>
      </div>
      <div class="load-div">
        <div class="load" @click="zeroCalibration">{{$t("language.zero_calibration")}}</div>
      </div>
      <div class="option-div">
        <div class="circle"></div>
        <div>{{$t("language.compensation")}}</div>
      </div>
      <div class="load-div">
        <div class="load" @click="returnCali">{{$t("language.return_calibration")}}</div>
        <div class="load unload" @click="resetCali">{{$t("language.reset")}}</div>
      </div>
      <div class="option-div" style="position: relative;">
        <span v-if="$store.getters.selectedWorktableStatus==1 ||$store.getters.selectedWorktableStatus==2
          ||$store.getters.selectedWorktableStatus==3||$store.getters.selectedWorktableStatus==6
          ||$store.getters.selectedWorktableStatus==7||$store.getters.selectedWorktableStatus==8" class="position-div">
          {{$t("language.tip_position")}}</span>
        <span v-if="$store.getters.selectedWorktableStatus==4" class="position-div">
          {{$t("language.sleeve_position")}}</span>
        <span v-if="$store.getters.selectedWorktableStatus==5" class="position-div">
          {{$t("language.Magnetic_rod_postion")}}</span>
        <span v-if="$store.getters.selectedWorktableStatus!=5"
          class="span-yz">({{Number(y).toFixed(1)}},{{Number(z).toFixed(1)}})</span>
        <span v-else>({{z}})</span>
      </div>
      <div class="y-z" v-if="$store.getters.selectedWorktableStatus!=5">
        <div class="y">Y(mm) :</div>
        <div>
          <input
            @focus="onfocusNum(y_data,$event)"
            class="y-z-data"
            v-model="y_data"
            @blur="dealYZData"
            onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))">
        </div>
        <div class="y-img"><img src="../images/setting/Y_left.png" @click="dealY('add')"></div>
        <div class="y-img"><img src="../images/setting/Y_right.png" @click="dealY('sub')"></div>
      </div>
      <div class="y-z">
        <div class="y">Z(mm) :</div>
        <div>
          <input
            @focus="onfocusNum(z_data,$event)"
            class="y-z-data"
            v-model="z_data"
            @blur="dealYZData"
            onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))">
        </div>
        <div class="y-img" style="margin-left: 45px;"><img src="../images/setting/Z_down.png" @click="dealZ('add')">
        </div>
        <div class="y-img" style="margin-left: 40px;"><img src="../images/setting/Z_top.png" @click="dealZ('sub')">
        </div>
      </div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="saveAll()">{{this.$t("language.save")}}</div>
      <div class="button-div factory" @click="getFactory">{{this.$t("language.factory")}}</div>
      <div class="button-div factory" v-if="door_status==0" @click="dealSettingDoor('open')">
        {{this.$t("language.open_door")}}
      </div>
      <div class="button-div factory" v-if="door_status==1" @click="dealSettingDoor('close')">
        {{this.$t("language.close_door")}}
      </div>
    </div>
    <OpenDoorDialog :isShowOpenDoorDialog='is_show_dialog'></OpenDoorDialog>

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
import NumberKeyboard from "@/components/NumberKeyboard.vue";
import MixinNumberKeyboard from "@/mixins/numberkeyboard.js";
  import {
    saveInstruments,
    moveYZ,
    closeSettingDoor,
    openSettingDoor,
    preCalibration,
    lwjz,
    ReturnCalibration,
    resetData,
    sfdj,
    load,
    unload,
    instrumentGet
  } from '@/api/setting.js'
  import {
    getDoorState
  } from '@/api/run.js'
  import OpenDoorDialog from '@/components/OpenDoorDialog'
  import {
    factory
  } from '@/api/setting.js'
  export default {
    components: {
      OpenDoorDialog,
      NumberKeyboard
    },
    mixins:[MixinNumberKeyboard],
    data() {
      return {
        menu_lists: [{
          id: 1,
          description: this.$t("language.tips"),
          selected_status: true,
        }, {
          id: 2,
          description: this.$t("language.magnetic_sleeve"),
          selected_status: true,
        }, {
          id: 3,
          description: this.$t("language.cartridege_rack_tips"),
          selected_status: false,
        }, {
          id: 4,
          description: this.$t("language.cartridege_rack_sleeve"),
          selected_status: false,
        }, {
          id: 5,
          description: this.$t("language.cartridege_rack_rod"),
          selected_status: false,
        }, {
          id: 6,
          description: this.$t("language.wellA"),
          selected_status: false,
        }, {
          id: 7,
          description: this.$t("language.wellB"),
          selected_status: false,
        }, {
          id: 8,
          description: this.$t("language.wellC"),
          selected_status: false,
        }, ],
        door_status: null,
        is_show_dialog: false,
        y: null,
        z: null,
        y_data: '0.1',
        z_data: '0.1',
        load_status: true,
        sleeve_load_status: true,
        option: 1
      }
    },
    mounted() {
      this.getFirstData()
      this.getDoorStatus()
    },
    methods: {
      onChangeNum (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/[^\d.\d]/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.');
      this.inputValue(inputNew)
    },
      dealYZData(){
        if(this.y_data<0.1){
          this.y_data = 0.1
        } else if (this.y_data > 10.0) {
          this.y_data = 10.0
        }
        if (this.z_data < 0.1) {
          this.z_data = 0.1
        } else if (this.z_data > 10.0) {
          this.z_data = 10.0
        }
        this.y_data = Number(this.y_data).toFixed(1)
        this.z_data = Number(this.z_data).toFixed(1)
        this.isShowNumberKeyboard = false
      },
      returnCali() {
        var i = this.option - 1
        ReturnCalibration({
          'worktable_id': this.$store.getters.yzlists[i].id
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              message: this.$t("language.operate_success"),
              type: 'success'
            })
          }
        })
      },
      resetCali() {
        resetData().then((res) => {
          if (res.code == 0) {
            this.$message({
              message: this.$t("language.reset_success"),
              type: 'success'
            })
          }
        })
      },
      loadInstrument() {
        var type;
        if (this.$store.getters.yzlists[0].is_ok == 0 && this.option == 1) {
          return
        }
        if (this.$store.getters.yzlists[1].is_ok == 0 && this.option == 2) {
          return
        }
        if (this.option == 1 || this.option == 3 || this.option == 6 || this.option == 7 || this.option == 8) {
          type = 'tip'
        } else if (this.option == 2 || this.option == 4 || this.option == 5) {
          type = 'sleeve'
        }
        load({
          'type': type
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              message: this.$t("language.load_success"),
              type: 'success'
            })
          }
        })
      },
      unloadInstrument() {
        var type;
        if (this.$store.getters.yzlists[0].is_ok == 0 && this.option == 1) {
          return
        }
        if (this.$store.getters.yzlists[1].is_ok == 0 && this.option == 2) {
          return
        }
        if (this.option == 1 || this.option == 3 || this.option == 6 || this.option == 7 || this.option == 8) {
          type = 'tip'
        } else if (this.option == 2 || this.option == 4 || this.option == 5) {
          type = 'sleeve'
        }
        unload({
          'type': type
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              message: this.$t("language.unload_success"),
              type: 'success'
            })
          }
        })
      },
      zeroCalibration() {
        var i = this.option - 1
        lwjz({
          'worktable_id': this.$store.getters.yzlists[i].id
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              message: this.$t("language.operate_success"),
              type: 'success'
            })
            this.y = res.data[0]
            this.z = res.data[1]
            var yz = JSON.parse(JSON.stringify(this.$store.getters.yzlists));
              yz[this.option - 1].y = res.data[0]
              yz[this.option - 1].z = res.data[1]
            this.$store.commit('setYzlists', yz)
            var setting_temp = JSON.parse(JSON.stringify(this.$store.getters.setting))
            setting_temp.worktable_calibration = yz
            this.$store.commit('setSetting', setting_temp)
          }
        })
      },
      release() {
        sfdj().then((res) => {
          this.$message({
            message: this.$t("language.operate_success"),
            type: 'success'
          })
        })
      },
      preCa() {
        var i = this.option - 1
        preCalibration({
          'worktable_id': this.$store.getters.yzlists[i].id
        }).then((res) => {
          this.$message({
            type: 'success',
            message: this.$t("language.operate_success")
          })
          this.y = res.data[0]
          this.z = res.data[1]
          var yz = JSON.parse(JSON.stringify(this.$store.getters.yzlists));
            yz[this.option - 1].y = res.data[0]
            yz[this.option - 1].z = res.data[1]
          this.$store.commit('setYzlists', yz)
          var setting_temp = JSON.parse(JSON.stringify(this.$store.getters.setting))
          setting_temp.worktable_calibration = yz
          this.$store.commit('setSetting', setting_temp)
        })
      },
      getDoorStatus() {
        getDoorState().then((res) => {
          this.door_status = res.data
        })
      },
      dealSettingDoor(type) {
        this.is_show_dialog = true;
        if (type == 'open') {
          const type = 'CODE_FZB_DOOR_OPEN'
          openSettingDoor().then((res) => {})
          this.EventBus.on(this.Notify[type], notify => {
            if (notify.Code === this.Notify[type]) {
              this.is_show_dialog = false
              this.door_status = 1;
            }
          });
          this.$store.commit('protocols/updatedDoorState', 0)
        } else if (type == 'close') {
          const type = 'CODE_FZB_DOOR_CLOSE'
          closeSettingDoor().then((res) => {})
          this.EventBus.on(this.Notify[type], notify => {
            if (notify.Code === this.Notify[type]) {
              this.is_show_dialog = false
              this.door_status = 0;
            }
          });
          this.$store.commit('protocols/updatedDoorState', 1)
        }
      },
      changeMenu(id) {
        this.y_data = '0.0';
        this.z_data = '0.0';
        var temp = this.option;
        this.option = id;
        if (this.$store.getters.yzlists[0].is_ok == 0 && id == 3) {
          this.option = temp;
          return
        }
        if (this.$store.getters.yzlists[1].is_ok == 0 && id == 4) {
          this.option = temp;
          return
        }
        if (this.$store.getters.yzlists[1].is_ok == 0 && id == 5) {
          this.option = temp;
          return
        }
        if (this.$store.getters.yzlists[0].is_ok == 0 && id == 6) {
          this.option = temp;
          return
        }
        if (this.$store.getters.yzlists[0].is_ok == 0 && id == 7) {
          this.option = temp;
          return
        }
        if (this.$store.getters.yzlists[0].is_ok == 0 && id == 8) {
          this.option = temp;
          return
        }
        if (this.$store.getters.yzlists[1].is_ok == 0) {
          this.sleeve_load_status = true
        } else if (this.$store.getters.yzlists[1].is_ok == 1) {
          this.sleeve_load_status = false
        }
        if (this.$store.getters.yzlists[0].is_ok == 0) {
          this.load_status = true
        } else if (this.$store.getters.yzlists[0].is_ok == 1) {
          this.load_status = false
        }

        if (id == 1) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'tips') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 2) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'magnetic_sleeve') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 3) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'cartridge_rack_tips') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 4) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'cartridge_rack_sleeve') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 5) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'cartridge_rack_rod') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 6) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'elution_tube') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
              this.load_status = false
            }
          }
        } else if (id == 7) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'reagent_tube') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
              this.load_status = false
            }
          }
        } else if (id == 8) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'sample_tube') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
              this.load_status = false
            }
          }
        }
        this.$store.commit('setSelectedWorktableStatus', id)
      },
      getTipWell(type) {
        for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
          if (this.$store.getters.yzlists[i].type == 'cartridge_rack_tips') {
            this.y = this.$store.getters.yzlists[i].y;
            this.z = this.$store.getters.yzlists[i].z;
          }
        }
      },
      getSleeveWell(type) {
        for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
          if (this.$store.getters.yzlists[i].type == 'cartridge_rack_sleeve') {
            this.y = this.$store.getters.yzlists[i].y;
            this.z = this.$store.getters.yzlists[i].z;
          }
        }
      },
      getFirstData() {
        this.$store.commit('setYzlists', this.$store.getters.setting.worktable_calibration)
        for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
          if (this.$store.getters.yzlists[i].type == 'tips') {
            this.y = this.$store.getters.yzlists[i].y;
            this.z = this.$store.getters.yzlists[i].z;
            if (this.$store.getters.yzlists[i].is_ok == 0) {
              this.load_status = true
            } else if (this.$store.getters.yzlists[i].is_ok == 1) {
              this.load_status = false
              this.menu_lists[2].selected_status = true
              this.menu_lists[5].selected_status = true
              this.menu_lists[6].selected_status = true
              this.menu_lists[7].selected_status = true
            }
          }
          if (this.$store.getters.yzlists[i].type == 'magnetic_sleeve') {
            if (this.$store.getters.yzlists[i].is_ok == 0) {
              this.sleeve_load_status = true
            } else if (this.$store.getters.yzlists[i].is_ok == 1) {
              this.sleeve_load_status = false
              this.menu_lists[3].selected_status = true
              this.menu_lists[4].selected_status = true
            }
          }
        }
      },
      dealZ(type) {
        var yz = JSON.parse(JSON.stringify(this.$store.getters.yzlists));
        if (this.$store.getters.selectedWorktableStatus == 1) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'tips') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({
                'axis_type': "z",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.z_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 2) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'magnetic_sleeve') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({
                'axis_type': "z",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.z_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 3) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'cartridge_rack_tips') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({
                'axis_type': "z",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.z_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 4) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'cartridge_rack_sleeve') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({
                'axis_type': "z",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.z_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 5) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'cartridge_rack_rod') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({
                'axis_type': "z",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.z_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 6) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'elution_tube') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({
                'axis_type': "z",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.z_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 7) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'reagent_tube') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({
                'axis_type': "z",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.z_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 8) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'sample_tube') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({
                'axis_type': "z",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.z_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        }
        this.$store.commit('setYzlists', yz)
        var setting_temp = JSON.parse(JSON.stringify(this.$store.getters.setting))
        setting_temp.worktable_calibration = yz
        this.$store.commit('setSetting', setting_temp)
      },
      dealY(type) {
        var yz = JSON.parse(JSON.stringify(this.$store.getters.yzlists));
        if (this.$store.getters.selectedWorktableStatus == 1) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'tips') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({
                'axis_type': "y",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.y_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 2) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'magnetic_sleeve') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({
                'axis_type': "y",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.y_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 3) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'cartridge_rack_tips') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({
                'axis_type': "y",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.y_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 4) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'cartridge_rack_sleeve') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({
                'axis_type': "y",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.y_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 6) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'elution_tube') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({
                'axis_type': "y",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.y_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 7) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'reagent_tube') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({
                'axis_type': "y",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.y_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 8) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'sample_tube') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({
                'axis_type': "y",
                'type': yz[i].type,
                'symbol': type == "add" ? 1 : 0,
                'step_size': Number(this.y_data)
              }).then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.$t("language.move_success")
                  })
                }
              })
            }
          }
        }
        this.$store.commit('setYzlists', yz)
        var setting_temp = JSON.parse(JSON.stringify(this.$store.getters.setting))
        setting_temp.worktable_calibration = yz
        this.$store.commit('setSetting', setting_temp)
      },
      saveAll() {
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
            this.$store.commit('setSetting', res.data)
            this.$store.commit('setYzlists', res.data.worktable_calibration)
            this.flushSetting()
            this.changeMenu(this.option)
            if (this.option == 1 && res.data.worktable_calibration[0].is_ok == 1) {
              this.menu_lists[2].selected_status = true
              this.menu_lists[5].selected_status = true
              this.menu_lists[6].selected_status = true
              this.menu_lists[7].selected_status = true
            } else if (this.option == 2 && res.data.worktable_calibration[1].is_ok == 1) {
              this.menu_lists[3].selected_status = true
              this.menu_lists[4].selected_status = true
            }
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
    },
  }
</script>

<style scoped="scoped">
.searchKeyboard {
  transform: scale(.9);
  bottom: 120px !important;
  left: 647px !important;
}
  .worktable-model {
    width: 1467px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-left: 30px;
    margin-top: 30px;
  }

  .worktable-menu {
    height: 74px;
    width: 100%;
    font-size: 24px;
    border-bottom: solid 1px #c2cbda;
  }

  .worktable-menu-option {
    float: left;
    width: fit-content;
    height: 100%;
    line-height: 74px;
    margin-left: 45px;
  }

  .worktable-menu-option-chinese {
    float: left;
    width: fit-content;
    height: 100%;
    line-height: 74px;
    margin-left: 80px;
  }

  .selected-worktable-menu {
    color: #5a89c7;
    border-bottom: 3px solid #5a89c7;
    box-sizing: border-box;

  }

  .worktable-img-div {
    float: left;
    width: 1060px;
    height: 864px;
    border-right: solid 1px #c2cbda;
    border-bottom: solid 1px #c2cbda;
  }

  .worktable-content {
    float: left;
    height: 864px;
    width: 406px;
    border-bottom: solid 1px #c2cbda;
  }

  .worktable-img {
    margin-top: 183px;
    margin-left: 33px;
  }

  .option-div {
    width: 100%;
    height: fit-content;
    margin-top: 25px;
    font-size: 22px;
    line-height: 18px;
    margin-bottom: 20px;
  }

  .circle {
    float: left;
    width: 18px;
    margin-left: 30px;
    height: 18px;
    border-radius: 9px;
    background-color: #5a89c7;
    margin-right: 14px;
  }

  .select-well {
    position: relative;
    width: 347px;
    height: 50px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    margin-left: 30px;
    line-height: 50px;
    text-align: center;
    text-align-last: center;
  }

  .select-well-option-div:first {
    border-top: none;
  }

  .select-well-option-div {
    position: absolute;
    border: solid 1px #c2cbda;
    border-bottom: none;
    margin-left: 30px;
    width: 347px;
  }

  .img-span {
    position: absolute;
    /* padding-left: 65px; */
    right: 22px;
  }

  .select-well-option {
    width: 100%;
    height: 50px;
    background-color: #ffffff;
    border-bottom: solid 1px #c2cbda;
    text-align: center;
    line-height: 50px;
    border-radius: 4px;
  }

  .select-well-option:hover {
    color: #5a89c7 !important;
  }

  .worktable-tube-div {
    width: 347px;
    height: 55px;
    text-align: center;
    background-color: #ebebeb;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    margin-left: 30px;
    line-height: 55px;
  }

  .load-div {
    width: 100%;
    height: 53px;
    margin-bottom: 20px;
  }

  .load {
    width: 160px;
    height: 100%;
    float: left;
    text-align: center;
    line-height: 53px;
    font-size: 20px;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    margin-left: 30px;
    background-color: #F9FBFF;

  }

  .unload {
    margin-left: 28px;
  }

  .position-div {
    display: inline-block;
    width: 222px;
    margin-left: 31px;
  }

  .y-z {
    height: 40px;
    width: 100%;
    margin-bottom: 14px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .y {
    margin-left: 31px;
    line-height: 40px;
    width: 81px;
    height: 100%;
    flex-shrink: 0;
  }

  .y-z-data {
    margin-left: 13px;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    lex-shrink: 0;
  }

  .y-img {
    height: 100%;
    lex-shrink: 0;
    margin-left: 35px;
    display: flex;
    align-items: center;
  }

  .span-yz {
    position: absolute;
    display: inline-block;
    width: fit-content;
    left: 204px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
    margin-top: 23px;
    margin-right: 28px;
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

  .no-load {
    background-color: #d4d4d4;
  }

  .uncalibration {
    color: #999999;
  }
</style>
