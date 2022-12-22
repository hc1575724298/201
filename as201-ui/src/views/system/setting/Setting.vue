<template>
  <div>
    <div class="setting-div">
      <div v-for="(item,index) in setting_lists" :key="index" class="single-setting" @click="ToRouter(item)"
        v-if="item.status">
        <div class="setting-img">
          <div>
            <img :src="item.src" />
          </div>
          <div class="setting-text">
            {{item.description}}
          </div>
        </div>
      </div>
    </div>
    <ClearLogin @close='closeClear' v-if="clear_status"></ClearLogin>
  </div>
</template>

<script>
  import {
    instrumentGet
  } from '@/api/setting.js'
  import ClearLogin from '@/components/ClearLogin'
  export default {
    components: {
      ClearLogin
    },
    data() {
      return {
        clear_status: false,
        setting_lists: [{
            id: 1,
            description: this.$t("language.system"),
            src: require("../../../images/setting/system.png"),
            router: "settingSystem",
            status: true
          },
          {
            id: 2,
            description: this.$t("language.instrument"),
            src: require("../../../images/setting/instrument.png"),
            router: "instrument",
            status: true
          },
          {
            id: 3,
            description: this.$t("language.tools"),
            src: require("../../../images/setting/tools.png"),
            router: "settingTools",
            status: true
          },
          {
            id: 4,
            description: this.$t("language.maintenance"),
            src: require("../../../images/setting/maintenance.png"),
            router: "maintenance",
            status: true
          },
          {
            id: 5,
            description: this.$t("language.reports"),
            src: require("../../../images/setting/reports.png"),
            router: "report",
            status: true
          },
          {
            id: 6,
            description: this.$t("language.advanced"),
            src: require("../../../images/setting/advanced.png"),
            router: "advanced",
            status: true
          }, {
            id: 7,
            description: this.$t("language.clear_login"),
            src: require("../../../images/setting/clearlogin.png"),
            router: "",
            status: true
          }, {
            id: 8,
            description: this.$t("language.help"),
            src: require("../../../images/setting/help.png"),
            router: "help",
            status: true
          }
        ]
      }
    },
    mounted() {
      this.getInstrumentSetting()
      if (this.$store.getters.user.group == 'user' || this.$store.getters.user.group == 'advanced_user') {
        this.setting_lists[1].status = false
        this.setting_lists[3].status = false
        this.setting_lists[6].status = false
      }
    },
    methods: {
      ToRouter(item) {
        if (item.id == 1) {
          this.$store.commit('setSettingOption', this.$t("language.system"));
          this.$store.commit('setSettingSystemSiderbar', 1);
        } else if (item.id == 2) {
          this.$store.commit('setSettingOption', this.$t("language.instrument"));
          this.$store.commit('setInstrumentSiderbar', 1);
          this.$store.commit('setTemOption', null)
        } else if (item.id == 3) {
          this.$store.commit('setSettingOption', this.$t("language.tools"));
          this.$store.commit('setSettingTools', 1);
        } else if (item.id == 4) {
          this.$store.commit('setMaintenanceSiderbar', 1);
          this.$store.commit('setSettingOption', this.$t("language.maintenance"));
        } else if (item.id == 5) {
          this.$store.commit('setSettingOption', this.$t("language.reports"));
        } else if (item.id == 6) {
          this.$store.commit('setAdvancedSiderbar', 1);
          this.$store.commit('setSettingOption', this.$t("language.advanced"));
        } else if (item.id == 7) {
          this.clear_status = true
        } else if (item.id == 8) {
          this.$store.commit('setSettingOption', this.$t("language.help"));
        }
        this.$router.push({
          name: item.router
        })
      },
      getInstrumentSetting() {
        instrumentGet().then((res) => {
          this.$store.commit('setSetting', res.data)
          var setting = JSON.parse(JSON.stringify(this.$store.getters.setting))
          for (var i = 0; i < setting.transfer_liquid_calibration.length; i++) {
            for (var j = 0; j < 4; j++) {
              setting.transfer_liquid_calibration[i].modified[j] = null
              setting.transfer_liquid_calibration[i].volume[j] = null
            }
          }
          this.$store.commit('setSetting', setting)
          var elution = [];
          var reagent = [];
          var sample = [];
          for (let i = 0; i < setting.labware.length; i++) {
            if (this.$store.getters.setting.labware[i].type == 'elution_tube') {
              elution.push(this.$store.getters.setting.labware[i]);
            } else if (this.$store.getters.setting.labware[i].type == 'reagent_tube') {
              reagent.push(this.$store.getters.setting.labware[i]);
            } else if (this.$store.getters.setting.labware[i].type == 'sample_tube') {
              sample.push(this.$store.getters.setting.labware[i]);
            }
          }
          this.$store.commit('setElutionData', elution)
          this.$store.commit('setReagentData', reagent)
          this.$store.commit('setSampleData', sample)
          this.$store.commit('setSelectedImg', res.data.oem[3])
          let param = [{
            key: 'horizontal_speed',
            value: res.data.parameters.horizontal_speed,
          }, {
            key: 'magnetic_rod_lifting_speed',
            value: res.data.parameters.magnetic_rod_lifting_speed,
          }, {
            key: 'magnetic_rod_sleeve_lifting_speed',
            value: res.data.parameters.magnetic_rod_sleeve_lifting_speed,
          }, {
            key: 'aspirate_speed',
            value: res.data.parameters.aspirate_speed,
          }, {
            key: 'aspirate_acceleration',
            value: res.data.parameters.aspirate_acceleration,
          }, {
            key: 'aspirate_delay',
            value: res.data.parameters.aspirate_delay,
          }, {
            key: 'dispense_speed',
            value: res.data.parameters.dispense_speed,
          }, {
            key: 'dispense_acceleration',
            value: res.data.parameters.dispense_acceleration,
          }, {
            key: 'dispense_delay',
            value: res.data.parameters.dispense_delay,
          }, {
            key: 'blow_liquid',
            value: res.data.parameters.blow_liquid,
          }, {
            key: 'air_gap',
            value: res.data.parameters.air_gap,
          }, {
            key: 'pre_wetting_cycle',
            value: res.data.parameters.pre_wetting_cycle,
          }, {
            key: 'tip_aspirate_speed',
            value: res.data.parameters.tip_aspirate_speed,
          }, {
            key: 'tip_dispense_speed',
            value: res.data.parameters.tip_dispense_speed,
          }, {
            key: 'tip_dispense_delay',
            value: res.data.parameters.tip_dispense_delay,
          }, {
            key: 'magnetic_speed',
            value: res.data.parameters.magnetic_speed,
          }]
          this.$store.commit('setSaveParameters', param)
        })
      },
      closeClear() {
        this.clear_status = false;
      }
    }
  }
</script>

<style>
  .setting-div {
    width: 100%;
    height: 100%;
  }

  .single-setting {
    width: 384px;
    height: 480px;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-left: 42px;
    margin-top: 44px;
  }

  .single-setting:nth-child(5),
  .single-setting:nth-child(1) {
    margin-left: 50px;
  }

  .single-setting:nth-child(n+5) {
    margin-top: 53px;
  }

  .setting-img {
    font-size: 30px;
    color: #333333;
    text-align: center;
    width: fit-content;
  }

  .setting-text {
    margin-top: 43px;
  }

  .single-setting:nth-child(6)>div>div {
    margin-top: 44px;
  }

  .single-setting:nth-child(7)>div>div {
    margin-top: 22px;
  }
</style>
