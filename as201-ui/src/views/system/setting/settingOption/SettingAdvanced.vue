<template>
  <div class="setting-system-div">
    <div class="setting-system-siderbar">
      <div class="siderbar-div" :class="{'setting-system-siderbar-div': $store.getters.advancedSiderbar==item.id}"
        v-for="(item,index) in siderbar_lists" @click="changeSiderbar(item.id)" v-if="item.status">
        {{item.description}}
      </div>
    </div>
    <div class="advanced-content">
      <Upgrade v-if="$store.getters.advancedSiderbar==1"></Upgrade>
      <ErrorLog v-else-if="$store.getters.advancedSiderbar==2"></ErrorLog>
      <SystemInfo v-else-if="$store.getters.advancedSiderbar==3"></SystemInfo>
      <Encryption v-else-if="$store.getters.advancedSiderbar==4"></Encryption>
      <OneClick v-else-if="$store.getters.advancedSiderbar==5"></OneClick>
    </div>
  </div>
</template>

<script>
  import Upgrade from '@/components/Upgrade'
  import ErrorLog from '@/components/ErrorLog'
  import SystemInfo from '@/components/SystemInfo'
  import Encryption from '@/components/Encryption'
  import OneClick from '@/components/OneClick'
  export default {
    components: {
      Upgrade,
      ErrorLog,
      SystemInfo,
      Encryption,
      OneClick
    },
    data() {
      return {
        siderbar_lists: [{
          id: 1,
          description: this.$t("language.upgrade"),
          status:true
        }, {
          id: 2,
          description: this.$t("language.error_log"),
          status:true,
        }, {
          id: 3,
          description: this.$t("language.sys_info"),
          status:true
        }, {
          id: 4,
          description: this.$t("language.encryption"),
          status:true
        }, {
          id: 5,
          description: this.$t("language.one_click"),
          status:true
        }]
      }
    },
    mounted() {
      if(this.$store.getters.user.group=='advanced_user'){
        this.siderbar_lists[3].status=false;
        this.siderbar_lists[4].status=false;
      }
      if(this.$store.getters.user.group=='user'){
        this.siderbar_lists[1].status=false;
        this.siderbar_lists[2].status=false;
        this.siderbar_lists[3].status=false;
        this.siderbar_lists[4].status=false;
      }
    },
    methods: {
      changeSiderbar(type) {
        this.$store.commit('setAdvancedSiderbar', type)
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

  .advanced-content {
    width: 1528px;
    height: 100%;
  }
</style>
