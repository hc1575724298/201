<template>
  <div class="import-model">
    <div class="import-div">
      <div class="import-text">{{$t("language.import")}}</div>
      <div class="path">
        <div class="u-path">{{path}}</div>
      </div>
     <el-table :data="oems" class="import-oems" key="t1"
        :header-cell-style="{ background: '#dfe3eb', color: '#4c7cb2' ,borderColor:'#c2cbda'}" max-height="300"
        :cell-style="{borderColor:'#c2cbda'}" @row-click="clickTable" highlight-current-row>
        <el-table-column prop="id" :label="$t('language.no_num')" align="center" width="73">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('language.name')" align="center" width="314">
        </el-table-column>
        <el-table-column prop="time" :label="$t('language.time')" align="center">
        </el-table-column>
      </el-table>
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
  import {getOems} from '@/api/setting.js'
  import {
    importOem
  } from '@/api/setting.js'
  import moment from 'moment'
  export default {
    data() {
      return {
        select_name:null,
        oems: [],
        path: null,
        selectedIds: null,
      }
    },
    mounted() {
      this.getPath()
      this.EventBus.on(this.Notify.CODE_DIR_PATH, (notify) => {
        this.path = notify.Data
      })
    },
    methods: {
      okImport() {
        if (this.select_name == null) {
          this.$emit('cancleImport')
          this.$message({
            type: 'warning',
            message: this.$t("language.no_photo")
          })
        } else {
          importOem({'img_name':this.select_name}).then((res)=>{
            this.$emit('cancleImport')
          })
        }
      },
      getPath() {
        getOems().then((res)=>{
          this.oems = res.data
        })
      },
      clickTable(row, column, event){
        this.select_name = row.name
      },
      cancleImport() {
        this.$emit('cancleImport')
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

  .import-oems {
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
    display: flex;
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

</style>
<style>
  .users-content,
  .users-content div,
  .users-content,
  .users-content div,
  .img-folder,
  .folder-text,
  .img-folder img {
    touch-action: pan-y !important;
  }
.import-oems .cell{
   height: 30px;
   line-height: 30px;
}
.el-table__body tr.current-row > td {
    background-color: #cee1f5 !important;
}
</style>
