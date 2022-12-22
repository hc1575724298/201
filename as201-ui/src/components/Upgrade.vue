<template>
  <div class="content">
    <ContentTitle1 :title="$t('language.software')"></ContentTitle1>
    <div class="advanced-list" @click="openUpgrade('1')">
      <div class="list-name">{{$t("language.ui")}}</div>
      <div class="advanced-list-img"><img src="../images/system/drop_down.png" /></div>
      <div class="system-version">{{ui_version}}</div>
    </div>
    <ContentTitle2 :title="$t('language.firmware')"></ContentTitle2>
    <div class="advanced-list" @click="openUpgrade('2')">
      <div class="list-name">{{$t("language.mix_motion")}}</div>
      <div class="advanced-list-img"><img src="../images/system/drop_down.png" /></div>
      <div class="system-version">{{mix_version}}</div>
    </div>
    <div class="advanced-list" @click="openUpgrade('3')">
      <div class="list-name">{{$t("language.temp_control")}}</div>
      <div class="advanced-list-img"><img src="../images/system/drop_down.png" /></div>
      <div class="system-version">{{temp_version}}</div>
      <div></div>
    </div>
    <div class="advanced-list" @click="openUpgrade('4')">
      <div class="list-name">{{$t("language.Auxiliary")}}</div>
      <div class="advanced-list-img"><img src="../images/system/drop_down.png" /></div>
      <div class="system-version">{{auxiliary_version}}</div>
    </div>
    <div class="help" @click="openHelp">{{$t("language.help")}}</div>
    <AdvancedHelp @closeHelp="closeHelpDiv" v-if="help_status"></AdvancedHelp>
    <UpgradeProgress @close='closeUpgrade' v-if="upgade_status" :title='title_name' :ver='version'></UpgradeProgress>
  </div>
</template>

<script>
  import ContentTitle1 from '@/components/ContentTitle'
  import ContentTitle2 from '@/components/ContentTitle'
  import AdvancedHelp from '@/components/AdvancedHelp'
  import UpgradeProgress from '@/components/UpgradeProgress'
  import {
    getUpgradeInfo
  } from '@/api/setting.js'
  export default {
    components: {
      ContentTitle1,
      ContentTitle2,
      AdvancedHelp,
      UpgradeProgress
    },
    data() {
      return {
        version: "a1.0.0 20220719",
        ui_version: null,
        mix_version: null,
        temp_version: null,
        auxiliary_version: null,
        help_status: false,
        upgade_status: false,
        title_name: null
      }
    },
    mounted() {
      this.getUpgrade()
    },
    methods: {
      getUpgrade() {
        getUpgradeInfo().then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].type == 'ui') {
              this.ui_version = res.data[i].version
            } else if (res.data[i].type == 'mix_motion') {
              this.mix_version = res.data[i].version
            } else if (res.data[i].type == 'temperature_control') {
              this.temp_version = res.data[i].version
            } else if (res.data[i].type == 'auxiliary') {
              this.auxiliary_version = res.data[i].version
            }
          }
        })
      },
      openHelp() {
        this.help_status = true
      },
      closeHelpDiv() {
        this.help_status = false
      },
      closeUpgrade() {
        this.upgade_status = false
      },
      openUpgrade(type) {
        if (type == '1') {
          this.title_name = this.$t("language.ui")
        } else if (type == '2') {
          this.title_name = this.$t("language.mix_motion")
        }else if (type == '3') {
          this.title_name = this.$t("language.temp_control")
        }else if (type == '4') {
          this.title_name = this.$t("language.Auxiliary")
        }
        this.upgade_status = true
      }
    }
  }
</script>

<style scoped="scoped">
  .content {
    margin-top: 30px;
    margin-left: 30px;
  }

  .advanced-list {
    width: 1466px;
    height: 90px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 30px;
    margin-bottom: 28px;
  }

  .list-name {
    float: left;
    height: 100%;
    line-height: 90px;
    font-size: 26px;
    margin-left: 32px;
  }

  .system-version {
    float: right;
    font-size: 26px;
    line-height: 90px;
    margin-right: 35px;
    height: 100%;
    width: fit-content;
  }

  .advanced-list-img {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: fit-content;
    margin-right: 32px;
  }

  .help {
    position: absolute;
    width: 193px;
    height: 64px;
    background-color: #5187C4;
    border-radius: 6px;
    bottom: 30px;
    right: 30px;
    font-size: 24px;
    line-height: 64px;
    text-align: center;
    color: white;
  }
</style>
