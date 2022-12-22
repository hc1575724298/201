<template>
  <div>
    <div class="language-div language-div-first" @click="changeLanguage(1)">
      English
      <div class="img-div">
        <img src="../images/setting/setting_selected.png" v-if="$store.getters.languageCode==1" />
      </div>
    </div>
    <div class="language-div" @click="changeLanguage(0)">
      中文
      <div class="img-div" v-if="$store.getters.languageCode==0">
        <img src="../images/setting/setting_selected.png" />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    saveSetting
  } from '@/api/setting.js'
  export default {
    data() {
      return {
        setting: [{
          key: 'language',
          value: null
        }]
      }
    },
    mounted() {
    },
    methods: {
      changeLanguage(code) {
        if (code == 1) {
          this.setting[0].value = 1;
          this.$store.commit('setLanguageCode', 1);
           this.$i18n.locale = 'en-US'
        } else if (code == 0) {
          this.setting[0].value = 0;
          this.$store.commit('setLanguageCode', 0);
           this.$i18n.locale = 'zh-CN'
        }
        saveSetting({
          setting: JSON.stringify(this.setting)
        }).then((res) => {
          if (res.code == 0) {}
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .language-div {
    width: 1466px;
    height: 90px;
    line-height: 90px;
    font-size: 26px;
    text-indent: 32px;
    color: #333333;
    background-color: white;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 22px;
    margin-left: 30px;
  }

  .language-div-first {
    margin-top: 30px;
  }

  .img-div {
    display: flex;
    height: 100%;
    float: right;
    align-items: center;
    margin-right: 32px;
  }
</style>
