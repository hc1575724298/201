<template>
  <div>
    <div class="encryption">
      <div class="encryption-text">{{$t("language.encryption")}}</div>
      <div class="encryption-switch">
        <el-switch active-color="#13ce66" inactive-color="#DCDFE6" :width="66" @change="dealEncryption"
          v-model="setting[0].value">
        </el-switch>
      </div>
    </div>
    <div class="encryption-note">{{$t("language.encryption_note")}}</div>
  </div>
</template>

<script>
  import {
    searchSetting
  } from '@/api/setting.js'
  import {
    saveSetting
  } from '@/api/setting.js'
  export default {
    data() {
      return {
        setting: [{
          key: 'encryption',
          value: null
        }]
      }
    },
    mounted() {
      this.getEncryption()
    },
    methods: {
      getEncryption() {
        if (this.$store.getters.encryption == 1) {
          this.setting[0].value = true
        } else if (this.$store.getters.encryption == 0) {
          this.setting[0].value = false
        }
      },
      dealEncryption(value) {
        var temp_setting = this.setting
        temp_setting[0].value = value ? 1 : 0
        saveSetting({
          'setting': JSON.stringify(temp_setting)
        }).then((res) => {
          searchSetting().then((res) => {
            this.$store.commit("setEncryption", res.data.encryption);
            this.getEncryption()
          })
        })
      },
    }
  }
</script>

<style scoped="scoped">
  .encryption {
    width: 1466px;
    height: 90px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 30px;
    margin-left: 30px;
    line-height: 90px;
    font-size: 26px;
  }

  .encryption-text {
    float: left;
    margin-left: 32px;
  }

  .encryption-switch {
    float: right;
    margin-right: 32px;
  }

  .encryption-note {
    color: red;
    font-size: 22px;
    margin-top: 20px;
    margin-left: 30px;
  }
</style>
<style>
  .encryption-switch .el-switch__core {
    height: 30px;
    border-radius: 21px;
  }

  .encryption-switch .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
  }

  .encryption-switch .is-checked .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
    -webkit-transform: translateX(-11px);
  }
</style>
