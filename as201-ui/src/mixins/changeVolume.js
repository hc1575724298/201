import { mapState as mapProtocolsState } from "vuex";
export default {
  props: {
    info: {
      type: Object,
      default: () => { }
    },
    whitchStyle: {
      type: String,
      default: "view"
    }
  },
  computed: {
    basicLabware () {
      if (this.info.basic_labware === 0) {
        return this.$t('language.d_tip')
      } else if (this.info.basic_labware === 1) {
        return this.$t('language.e_tip')
      } else {
        return this.$t('language.e_sleeve')
      }
    },
    ...mapProtocolsState("protocols", ["protocalInfo"]),
    volume () {
      if (this.info.well == 'A') {
        return {
          v: 10000,
          mixV: 1000
        }
      } else if (this.info.well == 'B' || this.info.well == 'C') {
        return {
          v: 1000,
          mixV: 600
        }
      }
      if (this.protocalInfo.cartridge == 2) {
        if (this.info.well == 1 || this.info.well == 2) {
          return {
            v: 2000,
            mixV: 1000
          };
        } else if (this.info.well >= 3 && this.info.well <= 10) {
          return {
            v: 1000,
            mixV: 600
          }
        } else if (this.info.well == 11 || this.info.well == 12) {
          return {
            v: 200,
            mixV: 120
          }
        } else if (this.info.well == 'A') {
          return {
            v: 10000,
            mixV: 1000
          }
        } else {
          return {
            v: 1000,
            mixV: 600
          }
        }
      } else if (this.protocalInfo.cartridge == 8) {
        if (this.info.well == 1) {
          return {
            v: 8000,
            mixV: 1000
          };
        } else if (this.info.well >= 2 && this.info.well <= 9) {
          return {
            v: 1000,
            mixV: 600
          }
        } else if (this.info.well == 10) {
          return {
            v: 200,
            mixV: 120
          }
        }
      } else if (this.protocalInfo.cartridge == 15) {
        if (this.info.well == 1) {
          return {
            v: 15000,
            mixV: 1000
          };
        } else if (this.info.well >= 2 && this.info.well <= 7) {
          return {
            v: 1000,
            mixV: 600
          }
        } else if (this.info.well == 8) {
          return {
            v: 200,
            mixV: 120
          }
        }
      }
    }
  }
}
