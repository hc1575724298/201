<template>
  <div class="setting-system-div">
    <div class="setting-system-siderbar">
      <div class="siderbar-div" :class="{'setting-system-siderbar-div': $store.getters.settingSystemSiderbar==item.id}"
        v-for="(item,index) in siderbar_lists" @click="changeSiderbar(item)">
        {{item.description}}
      </div>
    </div>
    <div class="setting-system-content">
      <ChangeLanguage v-if="$store.getters.settingSystemSiderbar==1"></ChangeLanguage>
      <ChangeTime v-if="$store.getters.settingSystemSiderbar==2" class='time-change'></ChangeTime>
    </div>
  </div>
</template>

<script>
  import ChangeLanguage from '@/components/ChangeLanguage';
  import ChangeTime from '@/components/ChangeTime';
  export default {
    components: {
      ChangeLanguage,
      ChangeTime
    },
    data() {
      return {
        siderbar_lists: [{
            id: 1,
            description: this.$t("language.lan")
          },
          {
            id: 2,
            description: this.$t("language.time")
          }
        ]
      }
    },
    watch: {
      '$store.getters.languageCode': {
        immediate: true,
        handler(newval, oldval) {
          this.siderbar_lists = [{
              id: 1,
              description: this.$t("language.lan")
            },
            {
              id: 2,
              description: this.$t("language.time")
            }
          ]
        }
      }
    },
    mounted() {

    },
    methods: {
      changeSiderbar(item) {
        this.$store.commit('setSettingSystemSiderbar', item.id)
      }
    }
  }
</script>

<style scoped="scoped">
  .setting-system-div {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #F3F4F6;
  }

  .setting-system-siderbar {
    width: 392px;
    height: 100%;
    border-right: 2px solid #DAE0E8;
    background-color: white;
    box-sizing: border-box;
  }

  .siderbar-div {
    width: 100%;
    height: 98px;
    font-size: 26px;
    line-height: 98px;
    text-indent: 38px;
    border: solid 1px transparent;
    box-sizing: border-box;
  }

  .setting-system-siderbar-div {
    background-color: #e5eff9;
    border-color: #4c7cb2;
    box-sizing: border-box;
    color: #4C7CB2;
  }

  .setting-system-content {
    width: 1528px;
    height: 100%;
  }

  /*  .time-change {
    width: 100%;
     height: 100%;
  } */
</style>
