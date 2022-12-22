<template>
  <div class="setting-head">
    <div class="back">
      <div @click="backToParent()" class="back-div">
        <img src="../images/system/back.png" class="back-img" />
      </div>
      <div class="setting-name">
        {{Setting}} > {{title_name}}
      </div>
    </div>
    <TimeLight></TimeLight>
    <img src="../images/setting/two-code.png" class="two-code" v-if="title_name==$t('language.instrument')"/>
  </div>
</template>

<script>
  import TimeLight from "@/components/TimeLight"
  import WarnBack from "@/components/WarnBack"
  export default {
    components: {
      TimeLight
    },
    data() {
      return {
        title_name: null,
        Setting:null
      }
    },
    mounted() {
      this.title_name = this.$store.getters.settingOption
    },
    watch: {
      '$store.getters.languageCode': {
        immediate: true,
        handler(newval, oldval) {
          if (newval == 0) {
            this.title_name = '系统'
            this.Setting = '设置'
          }
           else if (newval == 1) {
            this.title_name = 'English'
             this.Setting = 'Setting'
          }
        }
      },
    },
    methods: {
      backToParent() {
        this.$router.push({
          name: "setting"
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .setting-head {
    width: 1920px;
    height: 92px;
    background-color: #274261;
  }

  .back {
    float: left;
    width: 20%;
    height: 100%;
  }

  .back-div {
    float: left;
    display: flex;
    margin-left: 30px;
    height: 100%;
    width: 50px;
    align-items: center;
    justify-content: center;
  }

  .setting-name {
    float: left;
    font-size: 28px;
    margin-left: 20px;
    height: 100%;
    line-height: 92px;
    width: fit-content;
    color: white;
  }
 .two-code{
    margin-top: 25px;
    float: right;
    margin-right: 31px;
  }
</style>
