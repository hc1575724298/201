<template>
  <div class="setting-system-div">
    <div class="setting-system-siderbar">
      <div class="siderbar-div" :class="{'setting-system-siderbar-div': $store.getters.maintenanceSiderbar==item.id}"
        v-for="(item,index) in tools_siderbar_lists" @click="changeSiderbar(item.id)">
        {{item.description}}
      </div>
      <div class="siderbar-div" :class="{'setting-system-siderbar-div': $store.getters.maintenanceSiderbar==4}"
        v-if="$store.getters.user.group=='factory'" @click="changeSiderbar(4)">
        {{this.$t("language.aging")}}
      </div>
    </div>
    <div class="setting-maintenance" v-if="$store.getters.maintenanceSiderbar!=4">
      <Pipettor v-if="$store.getters.maintenanceSiderbar==1"></Pipettor>
      <UvSterilizer v-if="$store.getters.maintenanceSiderbar==2"></UvSterilizer>
      <Hepa v-if="$store.getters.maintenanceSiderbar==3"></Hepa>
    </div>
    <Aging v-if="$store.getters.maintenanceSiderbar==4"></Aging>
  </div>
</template>

<script>
  import Pipettor from '@/components/Pipettor'
  import UvSterilizer from '@/components/UvSterilizer'
  import Hepa from '@/components/Hepa'
  import Aging from '@/components/Aging'
  export default {
    components: {
      Pipettor,
      UvSterilizer,
      Hepa,
      Aging
    },
    data() {
      return {
        tools_siderbar_lists: [{
            id: 1,
            description: this.$t("language.pipettor")
          }, {
            id: 2,
            description: this.$t("language.uv_sterilizer")
          },
          {
            id: 3,
            description: this.$t("language.maintenance_hepa")
          },
        ],

      }
    },
    mounted() {

    },
    methods: {
      changeSiderbar(id) {
        this.$store.commit('setMaintenanceSiderbar', id)
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

  .setting-maintenance {
    margin-top: 30px;
    margin-left: 30px;
    width: 1466px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
  }
</style>
