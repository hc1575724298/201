<template>
  <div :class="[whitchStyle === 'view' ? 'info-view' : 'info-run']">
    <div class="parameter" v-if="whitchStyle === 'run'">
      {{ $t("language.basic") }}
    </div>
    <div>
      <span>{{ $t("language.step") }}:</span> <span>{{ info.step_name }}</span>
    </div>
    <div>
      <span>{{ $t("language.well") }}(1 / {{ cartridgeWell }}):</span>
      <span>{{ info.well }}</span>
    </div>
    <div>
      <span>{{ $t("language.temperature") }}(37-120℃):</span>
      <span>{{ info.incubator_temperature }}</span>
    </div>
    <div>
      <span>{{ $t("language.time") }}(0-999min):</span>
      <span>{{ info.incubator_time }}</span>
    </div>
  </div>
</template>

<script>
import { mapState as mapProtocolsState } from "vuex";
export default {
  name: "incubator",
  data() {
    return {};
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    whitchStyle: {
      type: String,
      default: "view"
    }
  },
  computed: {
    magnetLabware(){
        if(this.info.magnet_labware===0){
          return this.$t('language.d_tip')
        }else if(this.info.magnet_labware===1){
          return this.$t('language.e_tip')
        }else {
          return this.$t('language.e_sleeve')
        }
      },
    ...mapProtocolsState("protocols", ["protocalInfo"]),
    cartridgeWell() {
      if (this.protocalInfo.cartridge === 2) {
        return "2 / " + 12;
      } else if (this.protocalInfo.cartridge === 8) {
        return 10;
      } else {
        return 8;
      }
    },

  },
  created() {},
  methods: {}
};
</script>

<style scoped>
@import url(../../../../style/stepInfo.css);
</style>
