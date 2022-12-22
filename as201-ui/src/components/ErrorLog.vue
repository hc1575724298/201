<template>
  <div class="error-log-model">
    <div class="error-div">
      <el-table ref="protocolsTable" :data="error_lists" class="error-list" :header-cell-style="{
               background: '#4C7CB2',
               color: '#ffffff',
               width: '100%',
               height: '69px',
               fontSize: '24px',
               boxSizing: 'border-box'
             }" max-height="894" @select='selectRow' @select-all='selectRow'>
        <el-table-column type="sort_id" :label="$t('language.no_num')" width="130" align="center">
          <template slot-scope="scope">
            {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column type="selection" width="200" align="center">
        </el-table-column>
        <el-table-column prop="error_code" :label="$t('language.error_code')" align="center">
        </el-table-column>
        <el-table-column prop="updated_at" :label="$t('language.time')" align="center">
        </el-table-column>
        <el-table-column prop="details" :label="$t('language.details')" align="center">
          <template slot-scope="scope">
            <img src="../images/setting/error_log.png" @click="openErrorInfo(scope.$index,scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tube-info-button">
      <div class="button-div factory">{{this.$t("language.export")}}</div>
      <div class="button-div save" @click="delErrorLog()" v-if="$store.getters.user.group!='advanced_user'">
        {{this.$t("language.delete")}}
      </div>
    </div>
    <ErrorInfo v-if="error_status" :errorInfo='error' @close='closeErrorInfo'></ErrorInfo>
    <ManageProtocol @closeManage='close' v-if="delete_Status" :selectedIds='selectedIds' :type='"errorLog"'></ManageProtocol>
  </div>
</template>

<script>
  import moment from "moment"
  import ErrorInfo from "@/components/ErrorInfo"
  import {
    searchLog
  } from '@/api/setting.js'
  import ManageProtocol from '@/components/ManageProtocol'
  export default {
    components: {
      ErrorInfo,
      ManageProtocol
    },
    data() {
      return {
        error_lists: [],
        selectedIds: null,
        error_status: false,
        error: null,
        delete_Status:false
      }
    },
    mounted() {
      this.getErrorLog()
    },
    methods: {
      getErrorLog() {
        searchLog().then((res) => {
          var data = res.data
          for (var i = 0; i < data.length; i++) {
            data[i].updated_at = moment(data[i].updated_at * 1000).format('MM/DD/YYYY HH:mm:ss');
          }
          this.error_lists = data
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
      delErrorLog() {
        this.delete_Status=true
      },
      openErrorInfo(index, row) {
        this.error_status = true
        this.error = row
      },
      closeErrorInfo() {
        this.error_status = false
      },
      close(){
        this.delete_Status = false
        this.getErrorLog()
      }
    }
  }
</script>

<style scoped="scoped">
  .error-log-model {
    width: 1468px;
    height: 1048px;
    margin-left: 30px;
    margin-top: 30px;
    background-color: #ffffff;
  }

  .error-div {
    width: fit-content;
    height: fit-content;
    background-color: #ffffff;
    border-radius: 10px;
    font-size: 24px;
    margin-left: 26px;
    padding-top: 30px;
  }

  .error-list {
    width: 1414px;
    height: 902px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #c2cbda;
    color: #333333;
    font-size: 24px;
    box-sizing: border-box;
    touch-action: pan-y;
  }

  .tube-info-button {
    margin-top: 26px;
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
    margin-right: 30px;
  }

  .save {
    border: solid 1px #496f9a;
    margin-right: 30px;
  }
</style>
<style>
  .error-list .el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #edf2fc;
    border-color: #DCDFE6;
    cursor: not-allowed;
    width: 40px;
    height: 40px;
  }

  .error-list .el-checkbox__inner {
    width: 40px;
    height: 40px;
  }

  .error-list .el-checkbox__inner::after {
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

  .error-list .el-checkbox__input.is-checked .el-checkbox__inner,
  .error-list .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: white;
  }

  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #4171BB;
  }

  .error-list,
  .error-list div,
  .error-list span,
  .error-list table,
  .error-list tbody,
  .error-list td,
  .error-list tr,
  .error-list img {
    touch-action: pan-y !important;
  }
</style>
