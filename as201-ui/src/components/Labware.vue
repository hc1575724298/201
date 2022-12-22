<template>
  <div class="labware">
    <div class="labware-title">
      <div class="labware-icon labware-delete" :disabled="selectedIds.length === 0">
        <img src="../images/setting/delete.png" @click="deleteTube()" v-if="selectedIds.length != 0" />
        <img src="../images/protocols/undelete.png" v-else />
      </div>
      <div class="labware-icon">
        <img src="../images/setting/export.png" v-if="realIds.length != 0" @click="exportTubeList" />
        <img src="../images/protocols/unexport.png" v-else />
      </div>
      <div class="labware-icon"><img src="../images/setting/import.png" @click="importDialog" /></div>
      <div class="labware-icon" @click="addTube()"><img src="../images/setting/add_tube.png" /></div>
    </div>
    <div class="tube-table-div">
      <el-table :data="tubleData" class="tube-table" :header-cell-style="{ background: '#4C7CB2', color: '#ffffff'}"
        :row-style="{height:85+'px'}" style="width: 1408px" max-height="770" @select='selectRow' @select-all='selectRow'
        @selection-change='getSelection'>
        <el-table-column type="selection" width="100" align="center" :selectable="selectTable">
        </el-table-column>
        <el-table-column :label="$t('language.no_num')" width="80" align="center">
          <template slot-scope="scope">
            {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('language.brand')" width="150" align="center" :show-overflow-tooltip="true" prop="brand">
        </el-table-column>
        <el-table-column prop="volume" align="center" width="150">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.volume')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.ml')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.volume')}}{{$t('language.ml')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="buttom_diameter" align="center" width="300">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.buttom_diameter')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.mm')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.buttom_diameter')}}{{$t('language.mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="depth" align="center">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.depth_tube')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.mm')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.depth_tube')}}{{$t('language.mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="inner_height" align="center">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.inner_height')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.mm')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.inner_height')}}{{$t('language.mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cap_height" align="center">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.caps_height')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.mm')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.caps_height')}}{{$t('language.mm')}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tube-info-button">
      <div class="total">{{this.$t("language.total")}}{{tubleData.length}}</div>
      <div class="selected">{{this.$t("language.selected_labwares")}}{{selected_length}}</div>
      <div class="button-div save" @click="saveLabware()">{{this.$t("language.save")}}</div>
      <div class="button-div factory" @click="getFactory">{{this.$t("language.factory")}}</div>
      <div class="button-div factory" @click="editLabware()" :class="{'unedit':realIds.length!=1}">
        {{this.$t("language.edit")}}
      </div>
    </div>
    <AddTube @back='back' v-if="add_status" @addTempTube='addTemp' :edit_content='edit_labware' :edit='edit_status'>
    </AddTube>
    <ImportTube v-if="import_status" @cancleImport="closeImport" @closeImportDialog="importing"></ImportTube>
    <CheckU v-if="check_Status" @closeCheck='check_Status=false'></CheckU>
    <Exporting :img_type="export_import" v-if="export_status"></Exporting>
    <FileRepeat v-if="file_status" @close="closeFileRepeat"></FileRepeat>
    <ManageProtocol @closeManage='close' v-if="delete_status" :selectedIds='selectedIds' :type='"labwares"' :realIds='realIds'>
    </ManageProtocol>
  </div>
</template>

<script>
  import AddTube from '@/components/AddTube'
  import {
    saveInstruments
  } from '@/api/setting.js'
  import {
    getUsbStatus
  } from "@/api/protocols"
  import {
    exportTube
  } from "@/api/setting"
  import {
    instrumentGet
  } from '@/api/setting.js'
  import {
    factory
  } from '@/api/setting.js'
  import ImportTube from '@/components/ImportTube'
  import CheckU from '@/components/CheckU'
  import FileRepeat from '@/components/FileRepeat'
  import Exporting from '@/components/Exporting'
  import ManageProtocol from '@/components/ManageProtocol'
  export default {
    components: {
      AddTube,
      ImportTube,
      CheckU,
      Exporting,
      FileRepeat,
      ManageProtocol
    },
    data() {
      return {
        tube_type: 'elution_tube',
        selected: 0,
        selectedIds: [],
        selected_length: 0,
        add_status: false,
        timer: new Date().getTime(),
        tube: null,
        tubleData: [],
        edit_labware: null,
        edit_status: false,
        import_status: false,
        export_status: false,
        file_status: false,
        export_import: null,
        check_Status: false,
        realIds: [],
        delete_status: false
      }
    },
    mounted() {
      this.getlabware()
      this.EventBus.on(this.Notify.CODE_EXPORT_SUCCESS, (notify) => {
        this.export_status = false
        this.$message({
          type: 'success',
          message: this.$t("language.export_success")
        })
        this.flushSetting()
        this.selectedIds = []
      })
      this.EventBus.on(this.Notify.CODE_FILE_REAPT, (notify) => {
        this.file_status = true
      })
      this.EventBus.on(this.Notify.CODE_EXPORT_ERROR, (notify) => {
        this.$message({
          type: 'error',
          message: this.$t("language.export_error")
        })
        this.export_status = false
        this.flushSetting()
        this.selectedIds = []
      })
      this.EventBus.on(this.Notify.CODE_IMPORT_SUCCESS, (notify) => {
        this.$message({
          type: 'success',
          message: this.$t("language.import_success")
        })
        this.export_status = false
        this.selectedIds = []
      })
      this.EventBus.on(this.Notify.CODE_IMPORT_ERROR, (notify) => {
        this.$message({
          type: 'error',
          message: this.$t("language.import_error")
        })
        this.export_status = false
        this.flushSetting()
        this.selectedIds = []
      })
    },
    watch: {
    },
    methods: {
      getSelection(val) {
        this.selected_length = val.length
        this.realIds = [];
        for (let i = 0; i < val.length; i++) {
          this.realIds.push(val[i].id)
        }
      },
      selectTable(row, index) {
        if (row.status==1) {
          return false
        } else {
          return true
        }
      },
      getlabware() {
        this.tubleData = this.$store.getters.setting.labware
      },
      addTube() {
        this.add_status = true;
      },
      back() {
        this.add_status = false;
        this.edit_status = false;
        this.timer = new Date().getTime();
      },
      selectRow(selection, row) {
        this.selectedIds = [];
        for (let i = 0; i < selection.length; i++) {
          if (i == selection.length - 1) {
            this.selectedIds += "" + selection[i].id;
          } else {
            this.selectedIds += "" + selection[i].id + ",";
          }
        }
        this.edit_labware = selection;
      },
      deleteTube() {
        this.delete_status=true
      },
      addTemp(data, type) {
        this.edit_status = false;
        if (type == 'edit') {
          for (let i = 0; i < this.tubleData.length; i++) {
            if (this.tubleData[i].id == data.id) {
              this.tubleData.splice(i, 1, data)
            }
          }
        } else if (type == 'add') {
          data.id = this.$store.getters.setting.labware.length + 1;
          this.tubleData.push(data);
        }
        var settings = this.$store.getters.setting;
        settings.labware = this.tubleData;
        this.$store.commit('setSetting', settings)
        this.add_status = false;
      },
      saveLabware() {
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
        var real_setting = JSON.parse(JSON.stringify(settings))
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
            this.getlabware()
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
          this.getlabware()
        })
      },
      editLabware() {
        this.edit_status = true
        if (this.realIds.length == 1) {
          this.add_status = true
        }
      },
      closeImport() {
        this.import_status = false
      },
      importDialog() {
        getUsbStatus().then((res) => {
          if (res.data == true) {
            this.import_status = true
          } else {
            this.check_Status = true
          }
        })
      },
      closeFileRepeat() {
        this.file_status = false
      },
      importing() {
        this.export_import = 'import'
        this.export_status = true
        this.import_status = false
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
      exportTubeList() {
        getUsbStatus().then((res) => {
          if (res.data == true) {
            this.export_import = 'export'
            if (this.selectedIds.length == 0) {
              return
            }
            exportTube({
              'labware_ids': this.selectedIds,
              'labware_type': this.$store.getters.tubeType
            }).then((res) => {
              if (res.code == 0) {
                this.export_status = true
              }
            })
          } else {
            this.check_Status = true
          }
        })
      },
      close() {
        this.delete_status = false
        this.getlabware()
      },
    }
  }
</script>

<style scoped="scoped">
  .labware-title {
    width: 100%;
    height: 58px;
    margin-top: 12px;
  }

  .labware-div {
    float: left;
    width: 180px;
    height: 58px;
    font-size: 22px;
    text-align: center;
    line-height: 58px;
    box-sizing: border-box;
  }

  .selected-tube {
    background-color: #548DCD;
    color: white;
  }

  .elution-tube {
    margin-left: 31px;
    border-radius: 4px 0px 0px 4px;
    border: solid 1px #c2cbda;
  }

  .reagent-tube {
    border: solid 1px #c2cbda;
  }

  .sample-tube {
    border-radius: 0px 4px 4px 0px;
    border: solid 1px #c2cbda;
  }

  .labware-icon {
    float: right;
    width: fit-content;
    height: fit-content;
    margin-right: 19px;
    margin-top: 2px;
  }

  .labware-delete {
    margin-right: 30px;
  }

  .tube-info-button {
    margin-top: 41px;
    height: 64px;
    line-height: 64px;
    width: 100%;
    font-size: 24px;
  }

  .total {
    float: left;
    margin-left: 30px;
  }

  .selected {
    float: left;
    margin-left: 34px;
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
    margin-right: 26px;
  }

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    box-sizing: border-box;
  }

  .tube-table-div {
    margin-top: 22px;
    margin-left: 30px;
  }

  .tube-table {
    height: 711px;
    margin-right: 30px;
    font-size: 24px;
    border: solid 1px #c2cbda;
    touch-action: pan-y;
  }

  .brand-span {
    height: 30px;
    display: inline-block;
    font-size: 26px;
    line-height: 30px;
  }

  .unedit {
    background-color: #d4d4d4;
    border: solid 1px #c2cbda;
  }
</style>
<style>
  .tube-table .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #4171BB;
    border-left: 0;
    border-top: 0;
    height: 25px;
    width: 14px;
    left: 9px;
    position: absolute;
    top: -3px;
    transform: rotate(40deg) scaleY(0);
    transition: transform .01s ease-in .03s;
    transform-origin: center;
  }

  .tube-table .el-checkbox__input.is-checked .el-checkbox__inner,
  .tube-table .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: white;
  }

  .tube-table .el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: solid 1px #5a89c7;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    background-color: #FFF;
    z-index: 1;
  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #E8EEF3 !important;
    border: 1px solid #DCDCDC;
  }

  *::-webkit-scrollbar-track {
    background: #FFFFFF;
  }

  .el-table th.el-table__cell>.cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    font-weight: 400;
  }

  .tube-table,
  .tube-table div,
  .tube-table span,
  .tube-table table,
  .tube-table tbody,
  .tube-table td,
  .tube-table tr,
  .tube-table img {
    touch-action: pan-y !important;
  }
  .tube-table .cell.el-tooltip{
    height:30px;
    line-height: 30px;
  }
</style>
