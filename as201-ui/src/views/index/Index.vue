<template>
  <div class="start-page" :style="{background: 'url('+src+') no-repeat'}">
    <!-- {{$t('language.index', [$t('language.word')])}} -->
    <!-- 过渡球动画 -->
    <img src="../../images/index/company_name.png" class="company-name" />
    <img src="../../images/index/company_all_name.png" class="company-all-name" />
    <div class="edition">a.0.0 220722</div>
    <div class="circles">
      <div v-for="item in circles" :key="item.id" :class="{'circle-change':item.code==1}" class="single-circle"></div>
    </div>

    <!-- error弹框 -->
    <ErrorDialog/>
  </div>
</template>

<script>
import ErrorDialog from '@/components/ErrorDialog.vue'
  import {
    searchSetting
  } from '@/api/setting.js'
  import {
    instrumentGet
  } from '@/api/setting.js'
  import {
    getLightState
  } from '@/api/system.js'
  export default {
    data() {
      return {
        circles: [{
          id: 1,
          code: 0
        }, {
          id: 2,
          code: 0
        }, {
          id: 3,
          code: 0
        }, {
          id: 4,
          code: 0
        }, {
          id: 5,
          code: 0
        }, {
          id: 6,
          code: 0
        }, {
          id: 7,
          code: 0
        }, {
          id: 8,
          code: 1
        }],
        timer: null,
        circle_count: 7,
        src: null
      }
    },
    components:{
      ErrorDialog
    },
    mounted() {
      this.timer = setInterval(this.changeCircle, 200);
      this.getInstrumentSetting()
      this.getLight()
    },
    methods: {
      changeCircle() {
        this.circle_count--;
        if (this.circle_count >= 0) {
          for (var i = 7; i >= 0; i--) {
            this.circles[i].code = 0;
          }
          this.circles[this.circle_count].code = 1;
        } else {
          clearInterval(this.timer);
          this.$router.push({
            name: 'login'
          });
        }
      },
      getSetting() {
        searchSetting().then((res) => {
          this.$store.commit("setEncryption", res.data.encryption);
          this.$store.commit("setLanguageCode", res.data.language);
          if (res.data.language == 0) {
            this.$i18n.locale = 'zh-CN'
          } else if (res.data.language == 1) {
            this.$i18n.locale = 'en-US'
          }
          if (res.data.oem_img == 1) {
            this.src = this.$store.getters.setting.oem[0]
          } else if (res.data.oem_img == 2) {
            this.src = this.$store.getters.setting.oem[1]
          } else if (res.data.oem_img == 3) {
            this.src = this.$store.getters.setting.oem[2]
          }
          this.src += "?" + Math.random(100000);
          this.$store.commit('setBackSrc', this.src)
        })
      },
      getInstrumentSetting() {
        instrumentGet().then((res) => {
          this.$store.commit('setSetting', res.data)
          this.getSetting()
        })
      },
      getLight() {
        getLightState().then((res) => {
          this.$store.commit('setLightstatus', res.data)
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .start-page {
    width: 100%;
    height: 1200px;
    background-size: 100% 100% !important;
  }

  .company-name {
    position: fixed;
    display: block;
    width: 650px;
    bottom: 280px;
    right: 70px;
    height: 119px;
  }

  .company-all-name {
    position: fixed;
    display: block;
    width: 649px;
    height: 43px;
    right: 70px;
    bottom: 209px;
  }

  .edition {
    position: fixed;
    width: fit-content;
    height: 36px;
    font-family: Arial;
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 2px;
    color: #ffffff;
    right: 69px;
    bottom: 144px;
  }

  .circles {
    position: fixed;
    bottom: 63px;
    width: 100%;
    height: 40px;

  }

  .single-circle {
    float: right;
    margin-right: 40px;
    height: 38px;
    width: 38px;
    border-radius: 19px;
    background-color: white;
  }

  .single-circle:first-child {
    margin-right: 72px;

  }

  .circle-change {
    background-color: #8EC41F;
  }
</style>
