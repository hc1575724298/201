<template>
  <div class="import-model">
    <div class="import-div">
      <div class="import-text">{{$t("language.import")}}</div>
      <div class="path">
        <div class="u-path">{{path}}</div>
      </div>
      <el-table :data="import_tubles" class="export-users" key="t1"
        :header-cell-style="{ background: '#dfe3eb', color: '#4c7cb2' ,borderColor:'#c2cbda'}" max-height="300"
        :cell-style="{borderColor:'#c2cbda'}" border @select='selectRow' @select-all='selectRow'
        v-if="protocols_users=='protocols'">
        <el-table-column type="selection" width="64" align="center">
        </el-table-column>
        <el-table-column prop="id" :label="$t('language.no_num')" align="center" width="73">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="brand" :label="$t('language.brand')" align="center" width="314">
        </el-table-column>
        <el-table-column prop="time" :label="$t('language.time')" align="center">
        </el-table-column>
      </el-table>
      <div class="total-selected">
        <div class="total">{{this.$t("language.total")}}{{import_tubles.length}}</div>
        <div class="selected">{{this.$t("language.selected_labwares")}}{{selected_length}}</div>
      </div>
      <div class="button-model">
        <div class="button-div cancel" @click="cancleImport">{{this.$t("language.cancel")}}</div>
        <div class="button-div ok" @click="okImport">{{this.$t("language.ok")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    importTube
  } from "@/api/setting.js"
  import {
    selectImportFile
  } from "@/api/user.js"
  import {
    getImportTube
  } from "@/api/setting.js"
  import moment from 'moment'
  export default {
    data() {
      return {
        import_tubles: [],
        path: null,
        selectedIds: [],
        selected_length: 0,
        protocols_users: "protocols",
        users: []
      }
    },
    mounted() {
      this.EventBus.on(this.Notify.CODE_DIR_PATH, (notify) => {
        this.path = notify.Data
      })
      this.getPath()
      this.EventBus.on(this.Notify.CODE_GET_FILES_SUCCESS, (notify) => {
        this.import_tubles = notify.Data
        for (var i = 0; i < this.import_tubles.length; i++) {
          this.import_tubles[i].time = moment(this.import_tubles[i].updated_at * 1000).format(
            'MM/DD/YYYY HH:mm:ss')
        }
      })
    },
    methods: {
      okImport() {
        if (this.selectedIds.length == 0) {
          this.$emit('cancleImport')
          this.$message({
            type: 'warning',
            message: this.$t("language.no_import_tubles")
          })
        } else {
          importTube({
            'labware_ids': this.selectedIds
          }).then((res) => {
            if (res.code == 0) {
              this.$emit('closeImportDialog')
            }
          })
        }
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
        this.selected_length = selection.length
      },
      getPath() {
        getImportTube({
          'labware_type': this.$store.getters.tubeType
        }).then((res) => {
        })
      },
      cancleImport() {
        this.$emit('cancleImport')
      },
      backAll() {
        this.path = "U disk > Leap-Pure S24 > Protocols"
        this.users = []
        returnDirectory().then((res) => {
          if (res.code == 0) {
            this.protocols_users = 'users'
            for (var i = 0; i < res.data.length; i++) {
              let user = {}
              user.name = res.data[i]
              this.users.push(user)
            }
          }
        })
      },
    }
  }
</script>

<style scoped="scoped">
  .import-model {
    position: absolute;
    display: flex;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .import-div {
    width: 740px;
    height: 580px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .import-text {
    height: 30px;
    font-size: 26px;
    margin-top: 26px;
    margin-left: 30px;
    margin-bottom: 20px;
    color: #5a89c7;
  }

  .path {
    height: 54px;
    width: 100%;
  }

  .u-path {
    float: left;
    height: 100%;
    width: 590px;
    height: 54px;
    background-color: #f1f1f1;
    border-radius: 4px;
    margin-left: 30px;
    margin-right: 10px;
    line-height: 54px;
    font-size: 24px;
    text-indent: 16px;
  }

  .return-path {
    float: left;
    margin-left: 10px;
    width: 80px;
    height: 54px;
    background-color: #abd0f5;
    border-radius: 4px;
  }

  .export-users {
    margin-top: 10px;
    width: 680px;
    height: 300px;
    margin-left: 30px;
    border: 1px solid #c2cbda;
    box-sizing: border-box;
    font-size: 21px;
    border-radius: 6px;
    touch-action: pan-y;
  }

  .users-table {
    margin-top: 10px;
    width: 680px;
    height: 300px;
    margin-left: 30px;
    border: 1px solid #c2cbda;
    box-sizing: border-box;
    font-size: 21px;
    border-radius: 6px;
    touch-action: pan-y;
  }

  .total-selected {
    margin-top: 10px;
    width: 100%;
  }

  .total {
    float: left;
    margin-left: 30px;
    margin-right: 36px;
    font-size: 20px;
  }

  .selected {
    font-size: 20px;
    float: left;
  }

  .button-model {
    margin-top: 28px;
    float: left;
    height: 50px;
    width: 100%;
  }

  .button-div {
    width: 150px;
    height: 100%;
    border-radius: 6px;
    text-align: center;
    line-height: 50px;
    font-size: 19px;
    border: solid 1px #4c7cb2;
  }

  .ok {
    float: right;
    margin-right: 64px;
    color: white;
    background-color: #538bca;
  }

  .cancel {
    float: left;
    margin-left: 64px;
  }

  .users-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    background-color: #dfe3eb;
    color: #4c7cb2;
    border-radius: 6px 6px 0px 0px;
  }

  .users-content {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #333333;
    overflow-y: auto;
    border-bottom: 1px solid #c2cbda;
  }

  .img-folder {
    height: 100%;
    margin-left: 26px;
    float: left;
    display: flex;
    align-items: center;
  }

  .folder-text {
    float: left;
    height: 100%;
    width: fit-content;
    line-height: 50px;
    margin-left: 20px;
  }
</style>
<style>
  .export-users .el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #ffffff;
    border-color: #5691d3;
    cursor: not-allowed;
    width: 26px;
    height: 26px;
  }

  .export-users .el-checkbox__inner {
    width: 26px;
    height: 26px;
  }

  .export-users .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    border: 1px solid #4171BB;
    border-left: 0;
    border-top: 0;
    width: 10px;
    height: 18px;
    left: 6px;
    position: absolute;
    top: -2px;
    transition: transform .01s ease-in .03s;
    transform-origin: center;
  }

  .export-users .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ffffff;
    border-color: #409EFF;
  }

  .users-content,
  .users-content div,
  .users-content,
  .users-content div,
  .img-folder,
  .folder-text,
  .img-folder img {
    touch-action: pan-y !important;
  }
</style>
