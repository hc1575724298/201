<template>
  <div class="system-info">
    <div class="system-info-content">
      <div class="Instrument-info">
        <div class="info-text">{{$t("language.instrument_info")}}</div>
        <div class="info-content">
          <div class="info-first">
            <span>{{$t("language.name")}}</span>
            <span class="info-type">{{$t("language.type")}}</span>
          </div>
          <div class="info-first">
            <span style="color: #4171bb;">{{info.instrument_name}}</span>
            <span class="info-type" style="color: #4171bb;">{{info.instrument_type}}</span>
          </div>
          <div class="info-first">
            <span>{{$t("language.pn_code")}}</span>
          </div>
          <div class="info-first">
            <span style="color: #4171bb;">{{info.pn_code}}</span>
          </div>
        </div>
      </div>
      <div class="Instrument-info">
        <div class="info-text">{{$t("language.total_info")}}</div>
        <div class="info-content">
          <div class="info-first">
            <span>{{$t("language.total_time")}}</span>
            <span class="info-type">{{$t("language.total_run_time")}}</span>
          </div>
          <div class="info-first">
            <span style="color: #4171bb;">{{info.total_time}}</span>
            <span class="info-type" style="color: #4171bb;">{{info.total_run_time}}</span>
          </div>
          <div class="info-first">
            <span>{{$t("language.total_run_number")}}</span>
          </div>
          <div class="info-first">
            <span style="color: #4171bb;">{{info.total_run_number}}</span>
          </div>
        </div>
      </div>
      <div class="Instrument-Rom">
        <div class="info-text">{{$t("language.rom")}}</div>
        <div class="info-content">
          <div class="info-first">
            <span>{{$t("language.remainder")}}</span>
            <span class="info-type">{{$t("language.used")}}</span>
          </div>
          <div class="info-first">
            <span style="color: #4171bb;">{{info.remainder}}&nbsp;GB</span>
            <span class="info-type" style="color: #4171bb;">{{info.rom_used}}&nbsp;GB</span>
          </div>
        </div>
      </div>
      <div class="Instrument-Rom">
        <div class="info-text" style="margin-top: 51px;">{{$t("language.user_info")}}</div>
        <div class="info-content" style="margin-top: 51px;">
          <div class="info-first">
            <span>{{$t("language.table_username")}}</span>
            <span class="info-type">{{$t("language.protocol_number")}}</span>
          </div>
          <div class="info-first" v-for="(item,index) in info.user_info" :key="index">
            <span style="color: #4171bb;">{{item.username}}</span>
            <span class="info-type" style="color: #4171bb;">{{item.protocol_number}}</span>
          </div>
        </div>
      </div>
      <div class="Instrument-version" >
        <div class="version-div" style="padding-top: 51px;">
          <div class="version-first" style="margin-bottom: 0;"></div>
          <div class="version-second">{{$t("language.upgrade_time")}}</div>
          <div class="version-third"> {{$t("language.upgrade_version")}}</div>
        </div>
        <div class="version-div" style="padding-top: 33px;margin-top: 33px;">
          <div class="version-first">{{$t("language.system_ui")}}</div>
          <div>
            <div style="display: flex;" v-for="(item,index) in info.upgrade" :key="index" v-if="item.type=='ui'"
              class="info-show">
              <div class="version-second" style="color: #4171bb;">{{item.updated_at}}</div>
              <div class="version-third" style="color: #4171bb;">{{item.version}}</div>
            </div>
          </div>
        </div>
        <div class="version-div">
          <div class="version-first">{{$t("language.mix_motion")}}</div>
          <div>
            <div style="display: flex;" v-for="(item,index) in info.upgrade" :key="index" v-if="item.type=='mix_motion'"
              class="info-show">
              <div class="version-second" style="color: #4171bb;">{{item.updated_at}}</div>
              <div class="version-third" style="color: #4171bb;">{{item.version}}</div>
            </div>
          </div>
        </div>
        <div class="version-div">
          <div class="version-first">{{$t("language.temperature_control")}}</div>
          <div>
            <div style="display: flex;" v-for="(item,index) in info.upgrade" :key="index"
              v-if="item.type=='temperature_control'" class="info-show">
              <div class="version-second" style="color: #4171bb;">{{item.updated_at}}</div>
              <div class="version-third" style="color: #4171bb;">{{item.version}}</div>
            </div>
          </div>
        </div>
        <div class="version-div">
          <div class="version-first">{{$t("language.Auxiliary")}}</div>
          <div>
            <div style="display: flex;" v-for="(item,index) in info.upgrade" :key="index" v-if="item.type=='auxiliary'"
              class="info-show">
              <div class="version-second" style="color: #4171bb;">{{item.updated_at}}</div>
              <div class="version-third" style="color: #4171bb;">{{item.version}}</div>
            </div>
          </div>
          <div class="bottom-div"></div>
        </div>
      </div>
    </div>
    <div class="export">
      <div class="export-div" @click="exportSys">
        {{$t("language.export")}}
      </div>
    </div>
    <CheckU v-if="check_Status" @closeCheck='check_Status=false'></CheckU>
    <Exporting :img_type="export_import" v-if="export_status"></Exporting>
  </div>
</template>

<script>
  import moment from "moment"
  import {
    getSystemInfo
  } from '@/api/setting.js'
  import {
    exportSysInfo
  } from '@/api/setting.js'
  import CheckU from '@/components/CheckU'
  import Exporting from '@/components/Exporting'
  import {
    getUsbStatus
  } from "@/api/protocols"
  export default {
    components: {
      CheckU,
      Exporting,
    },
    data() {
      return {
        info: [],
        export_status: false,
        export_import: null,
        check_Status: false,
      }
    },
    mounted() {
      this.getData()
      this.EventBus.on(this.Notify.CODE_EXPORT_SUCCESS, (notify) => {
        this.$message({
          type: 'success',
          message: this.$t("language.export_success")
        })
        this.export_status = false
      })
      this.EventBus.on(this.Notify.CODE_EXPORT_ERROR, (notify) => {
        this.$message({
          type: 'error',
          message: this.$t("language.export_error")
        })
        this.export_status = false
      })
    },
    methods: {
      getData() {
        getSystemInfo().then((res) => {
          if (res.code == 0) {
            this.info = res.data
            for (var i = 0; i < this.info.upgrade.length; i++) {
              this.info.upgrade[i].updated_at = moment(this.info.upgrade[i].updated_at * 1000).format(
                'MM/DD/YYYY HH:mm:ss');
            }
          }
        })
      },
      exportSys(){
        getUsbStatus().then((res) => {
          if (res.data == true) {
            this.export_import = 'export'
            exportSysInfo({}).then((res) => {
              if (res.code == 0) {
                this.export_status = true
              }
            })
          } else {
            this.check_Status = true
          }
        })
      },
    }
  }
</script>

<style scoped="scoped">
  .system-info {
    /* position: relative; */
    width: 1468px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #c2cbda;
    margin-left: 30px;
    margin-top: 30px;
  }

  .export {
    /* position: absolute; */
    margin-top: 30px;
    height: 64px;
    bottom: 30px;
    width: 100%;
  }

  .export-div {
    height: 100%;
    width: 200px;
    background-color: #538AC9;
    color: white;
    text-align: center;
    line-height: 64px;
    font-size: 24px;
    float: right;
    margin-right: 30px;
    border-radius: 6px;
  }

  .system-info-content {
    height: 921px;
    width: 100%;
    overflow-y: auto;
  }

  .system-info-content,
  .system-info-content div {
    touch-action: pan-y !important;
  }

  .Instrument-info {
    position: relative;
    width: 100%;
    height: 250px;
    margin-top: 51px;
  }

  .Instrument-Rom {
    position: relative;
    width: 100%;
    height: fit-content;
    margin-top: 51px;
    margin-bottom: 51px;
  }

  .Instrument-version {
    position: relative;
    font-size: 26px;
    width: 100%;
    height: fit-content;
  }

  .version-div {
    position: relative;
    display: flex;
    height: fit-content;
    width: 100%;
  }

  .info-show {
    height: 30px;
    margin-bottom: 33px;
  }

  .version-first {
    float: left;
    height: 30px;
    margin-left: 60px;
    width: fit-content;
    left: 60px;
    color: #282828;
    font-weight: 550;
    margin-bottom: 33px;
  }

  .version-second {
    position: absolute;
    height: 30px;
    width: fit-content;
    left: 329px;
  }

  .version-third {
    position: absolute;
    height: 30px;
    width: fit-content;
    left: 946px;
  }

  .info-text {
    float: left;
    margin-left: 60px;
    width: 18.4%;
    font-size: 26px;
    height: 100%;
    color: #282828;
    font-weight: 550;
  }

  .info-content {
    float: left;
    width: 76%;
    height: 100%;
    border-bottom: solid 1px #c2cbda;
  }

  .info-first {
    position: relative;
    height: 30px;
    margin-bottom: 35px;
    font-size: 26px;
    width: 100%;
  }

  .info-type {
    position: absolute;
    left: 621px;
  }

  .info {
    margin-left: 60px;
  }

  .upgrade-list {
    margin-top: 33px;
  }

   .bottom-div{
    position: absolute;
    height: 1px;
    background-color: #c2cbda;
    width: 1108px;
    right: 30px;
    bottom:0;
  }
</style>
