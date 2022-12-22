<template>
  <div>
    <div class="report-content-title">
      <ContentTitle :title="title_name"></ContentTitle>
    </div>
    <div class="reports-div">
      <el-table :data="reports" :default-sort="{prop: 'date', order: 'descending'}" class="reports-all"
        :header-cell-style="{ background: '#4C7CB2', color: '#ffffff',height:'69px'}" height="894" width="100%"
        @select='selectRow' @select-all='selectRow'>
        <el-table-column prop="sort_id" :label="$t('language.no_num')" width="150" align="center">
          <template slot-scope="scope">
            {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column type="selection" width="200" align="center">
        </el-table-column>
        <el-table-column prop="protocol_name" width="300" align="center" :show-overflow-tooltip="true">
          <template slot="header">
            <div v-if="name_sort==true">
              <div v-if="name_flag==true">
                {{$t('language.name_az')}}
                <img src='../../../../images/users/sort_down.png' @click="changeSort(1)" class="sort-icon" />
              </div>
              <div v-if="name_flag==false">
                {{$t('language.name_za')}}
                <img src='../../../../images/users/sort_top.png' @click="changeSort(2)" class="sort-icon" />
              </div>
            </div>
            <div v-if="name_sort==false">
              {{$t('language.name_az')}}
              <img src='../../../../images/setting/unselected.png' @click="changeSort(3)" class="sort-icon" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cartridge" :label="$t('language.cartridge')" width="300" align="center">
        </el-table-column>
        <el-table-column prop="pre_packaged" :label="$t('language.pre_packaged')" width="200" align="center">
        </el-table-column>
        <el-table-column prop="creator_name" :label="$t('language.user_A_Z')" align="center" width="300">
          <template slot="header">
            <div v-if="user_sort==true">
              <div v-if="user_flag==true">
                {{$t('language.user_A_Z')}}
                <img src='../../../../images/users/sort_down.png' @click="changeSort(4)" class="sort-icon" />
              </div>
              <div v-if="user_flag==false">
                {{$t('language.user_Z_A')}}
                <img src='../../../../images/users/sort_top.png' @click="changeSort(5)" class="sort-icon" />
              </div>
            </div>
            <div v-if="user_sort==false">
              {{$t('language.user_A_Z')}}
              <img src='../../../../images/setting/unselected.png' @click="changeSort(6)" class="sort-icon" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" align="center">
          <template slot="header">
            <div v-if="time_sort==true">
              <div v-if="time_flag==true">
                {{$t('language.finished')}}
                <img src='../../../../images/users/sort_down.png' @click="changeSort(7)" class="sort-icon" />
              </div>
              <div v-if="time_flag==false">
                {{$t('language.finished')}}
                <img src='../../../../images/users/sort_top.png' @click="changeSort(8)" class="sort-icon" />
              </div>
            </div>
            <div v-if="time_sort==false">
              {{$t('language.finished')}}
              <img src='../../../../images/setting/unselected.png' @click="changeSort(9)" class="sort-icon" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tube-info-button">
      <div class="button-div factory" @click="exportReport" :class="{'unselectedExport':selectedIds.length==0}">
        {{this.$t("language.export")}}
      </div>
      <div class="button-div save" @click="delRunningLog()" v-if="$store.getters.user.group!='advanced_user'">
        {{this.$t("language.delete")}}
      </div>
    </div>
    <CheckU v-if="check_Status" @closeCheck='check_Status=false'></CheckU>
    <Exporting :img_type="export_import" v-if="export_status"></Exporting>
    <ManageProtocol @closeManage='close' v-if="delete_status" :selectedIds='selectedIds' :type='"reports"'>
    </ManageProtocol>
  </div>
</template>

<script>
  import ContentTitle from '@/components/ContentTitle'
  import {
    searchReport
  } from '@/api/setting.js'
  import {
    exportRun
  } from '@/api/setting.js'
  import {
    getUsbStatus
  } from '@/api/protocols.js'
  import moment from 'moment'
  import CheckU from '@/components/CheckU'
  import Exporting from '@/components/Exporting'
  import ManageProtocol from '@/components/ManageProtocol'
  export default {
    components: {
      ContentTitle,
      CheckU,
      Exporting,
      ManageProtocol
    },
    data() {
      return {
        title_name: this.$t("language.list"),
        reports: [],
        user_sort: false,
        name_sort: false,
        time_sort: true,
        name_flag: false,
        time_flag: true,
        user_flag: false,
        selectedIds: [],
        export_status: false,
        export_import: null,
        check_Status: false,
        delete_status: false
      }
    },
    mounted() {
      this.getRunningLog()
      this.EventBus.on(this.Notify.CODE_EXPORT_SUCCESS, (notify) => {
        this.export_status = false
        this.$message({
          type: 'success',
          message: this.$t("language.export_success")
        })
        this.getRunningLog();
        this.selectedIds = []
      })
      this.EventBus.on(this.Notify.CODE_EXPORT_ERROR, (notify) => {
        this.$message({
          type: 'error',
          message: this.$t("language.export_error")
        })
        this.export_status = false
        this.getRunningLog();
        this.selectedIds = []
      })
    },
    methods: {
      changeSort(type) {
        if (type == 1) {
          this.name_sort = true
          this.user_sort = false
          this.time_sort = false
          this.name_flag = false
          this.order = 0
          this.collation = 'protocol_name'
        } else if (type == 2) {
          this.name_sort = true
          this.user_sort = false
          this.time_sort = false
          this.name_flag = true
          this.order = 1
          this.collation = 'protocol_name'
        } else if (type == 3) {
          this.name_sort = true
          this.time_sort = false
          this.time_sort = false
          this.name_flag = true
          this.order = 1
          this.collation = 'protocol_name'
        } else if (type == 4) {
          this.name_sort = false
          this.user_sort = true
          this.time_sort = false
          this.user_flag = false
          this.collation = 'creator_name'
          this.order = 0
        } else if (type == 5) {
          this.name_sort = false
          this.user_sort = true
          this.time_sort = false
          this.user_flag = true
          this.collation = 'creator_name'
          this.order = 1
        } else if (type == 6) {
          this.name_sort = false
          this.user_sort = true
          this.time_sort = false
          this.user_flag = true
          this.collation = 'creator_name'
          this.order = 1
        } else if (type == 7) {
          this.name_sort = false
          this.user_sort = false
          this.time_sort = true
          this.time_flag = false
          this.collation = 'updated_at'
          this.order = 1
        } else if (type == 8) {
          this.name_sort = false
          this.user_sort = false
          this.time_sort = true
          this.time_flag = true
          this.collation = 'updated_at'
          this.order = 0
        } else if (type == 9) {
          this.name_sort = false
          this.user_sort = false
          this.time_sort = true
          this.time_flag = true
          this.collation = 'updated_at'
          this.order = 0
        }
      },
      getRunningLog() {
        searchReport().then((res) => {
          this.reports = res.data
          for (var i = 0; i < this.reports.length; i++) {
            this.reports[i].updated_at = moment(this.reports[i].updated_at * 1000).format(
              'MM/DD/YYYY HH:mm:ss')
          }
        })
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
      },
      delRunningLog() {
        this.delete_status = true
      },
      exportReport() {
        this.export_import = 'export'
        if (this.selectedIds.length == 0) {
          return
        }
        getUsbStatus().then((res) => {
          if (res.data == true) {
            exportRun({
              'run_ids': this.selectedIds
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
        this.getRunningLog()
      },
    }
  }
</script>

<style scoped="scoped">
  .report-content-title {
    height: 31px;
    width: fit-content;
    margin-left: 38px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .reports-div {
    width: 1850px;
    height: 69px;
  }

  .reports-all {
    width: 1852px;
    margin-left: 35px;
    border-radius: 5px;
    border: solid 1px #c2cbda;
    font-size: 24px;
    touch-action: pan-y;
  }

  .tube-info-button {
    position: absolute;
    bottom: 26px;
    width: 100%;
    height: 70px;
  }

  .button-div {
    width: 210px;
    height: 70px;
    float: right;
    border-radius: 6px;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
  }

  .factory {
    background-color: #4F83BD;
    color: white;
    margin-right: 34px;
  }

  .save {
    border: solid 1px #496f9a;
    margin-right: 30px;
  }

  .unselectedExport {
    background-color: #d4d4d4;
    border: solid 1px #c2cbda;
    color: #333333;
  }
</style>
<style>
  .reports-all .el-checkbox__inner {
    background-color: #FFFFFF;
    border-color: #DCDFE6;
    width: 40px;
    height: 40px;
  }

  .reports-all .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #4171BB;
    border-left: 0;
    border-top: 0;
    height: 30px;
    width: 16px;
    left: 9px;
    position: absolute;
    top: -3px;
    transition: transform .01s ease-in .03s;
    transform-origin: center;
  }

  .reports-all .el-checkbox__input.is-checked .el-checkbox__inner,
  .reports-all .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: white;
  }

  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #4171BB;
  }

  .reports-all,
  .reports-all div,
  .reports-all span,
  .reports-all table,
  .reports-all tbody,
  .reports-all td,
  .reports-all tr,
  .reports-all img {
    touch-action: pan-y !important;
  }
</style>
