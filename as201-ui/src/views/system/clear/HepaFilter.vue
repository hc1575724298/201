<template>
  <div>
    <div class="hepa-title">
      <div class="hepa-icon"></div>
      <div class="hepa-text">{{$t("language.hepa")}}</div>
    </div>
    <div class="hepa-setting-div" @click="isHepa(1)">
      <div class="hepa-setting">{{$t("language.hepa_setting")}}</div>
      <div class="hepa-end-options">
        <img src="../../../images/system/drop_down.png" />
      </div>
      <div class="hepa-setting-options">{{hepa_filter}}</div>
    </div>
    <div v-if="this.switch_code==3||this.switch_code==4" class="hepa-setting-div" style="margin-top: 22px;"
      @click="isHepa(2)">
      {{switch_run}}
      <div class="hepa-end-options">
        <img src="../../../images/system/drop_down.png" />
      </div>
      <div class="hepa-setting-options">{{switch_off_after}}</div>
    </div>
    <HepaSetting :optionType="optionType" :option="hepa_option" @close='closeHepa' v-if="hepa_status">
    </HepaSetting>
  </div>
</template>

<script>
  import {
    searchSetting
  } from "@/api/setting"
  import HepaSetting from '@/components/HepaSetting'
  export default {
    components: {
      HepaSetting
    },
    data() {
      return {
        hepa_filter: null,
        switch_off_after: null,
        switch_on: this.$t("language.switch_on"),
        switch_off: this.$t("language.switch_off"),
        switch_during: this.$t("language.switch_during"),
        switch_during_immediately: this.$t("language.switch_during_immediately"),
        switch_during_open: this.$t("language.switch_during_open"),
        switch_run: this.$t("language.switch_run"),
        switch_code: 0,
        optionType: null,
        hepa_option: null,
        hepa_status: false
      }
    },
    mounted() {
      this.getHepaFilter()
    },
    methods: {
      getHepaFilter() {
        searchSetting().then((res) => {
          this.hepa_filter = res.data.hepa_filter;
          if (this.hepa_filter == 1) {
            this.switch_code = 0;
            this.hepa_filter = this.switch_on;
            this.hepa_option = 2
          } else if (this.hepa_filter == 2) {
            this.switch_code = 0;
            this.hepa_filter = this.switch_off;
            this.hepa_option = 3
          } else if (this.hepa_filter == 3) {
            this.switch_code = 3;
            this.hepa_filter = this.switch_during;
            this.switch_off_after = this.switch_during_immediately;
            this.hepa_option = 1
          } else if (this.hepa_filter == 4) {
            this.switch_code = 4;
            this.hepa_filter = this.switch_during;
            this.switch_off_after = this.switch_during_open;
            this.hepa_option = 4
          }
        })
      },
      isHepa(type) {
        this.hepa_status = true
        this.optionType = type;
      },
      closeHepa(data) {
        this.hepa_status = false
        this.getHepaFilter()
      }
    }
  }
</script>

<style scoped="scoped">
  .hepa-title {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 28px;
    color: black;
    margin-top: 41px;
    margin-left: 40px;
  }

  .hepa-icon {
    width: 5px;
    height: 28px;
    background-color: #4C7CB2;
  }

  .hepa-text {
    margin-left: 20px;
  }

  .hepa-setting-div {
    width: 1686px;
    height: 93px;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 33px;
    background-color: white;
    font-size: 26px;
    line-height: 93px;
    text-indent: 30px;
    margin-left: 40px;
  }

  .hepa-setting {
    height: 100%;
    width: fit-content;
    float: left;
    color: #282828;
  }

  .hepa-setting-options {
    height: 100%;
    font-size: 26px;
    width: fit-content;
    margin-right: 28px;
    line-height: 93px;
    float: right;
    color: #282828;
  }

  .hepa-end-options {
    height: 100%;
    float: right;
    width: fit-content;
    display: flex;
    align-items: center;
    margin-right: 34px
  }
</style>
