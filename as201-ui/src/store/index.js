import Vue from "vue";
import Vuex from "vuex";
import persistedState from 'vuex-persistedstate';
import protocols from './modules/protocols'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: '', //当前用户token
    user: {}, //当前登录用户
    menuIndex: 1,
    systemMenu: 1,
    systemHeadMenu: 1,
    settingOption: null,
    settingSystemSiderbar: 1,
    languageCode: 0,
    systemTime: null,
    settingTools: 1,
    maintenanceSiderbar: 1,
    instrumentsiderbar: 1,
    tubeType: 'elution_tube',
    parameters: "motion",
    saveParameters: null,
    setting: null,
    elutionData: [],
    reagentData: [],
    sampleData: [],
    selectedWorktableStatus: 1,
    backSrc: null,
    selectedImg: null,
    yzlists: null,
    temOption: null,
    isNotify: false,
    protocol: null,
    tubeProtocol: null,
    lightstatus: null,
    advancedSiderbar: null,
    temperatureSv: null,
    encryption: null,
    saveProrocolStatus: 1
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    menuIndex: state => state.menuIndex,
    systemMenu: state => state.systemMenu,
    systemHeadMenu: state => state.systemHeadMenu,
    settingOption: state => state.settingOption,
    settingSystemSiderbar: state => state.settingSystemSiderbar,
    languageCode: state => state.languageCode,
    systemTime: state => state.systemTime,
    settingTools: state => state.settingTools,
    maintenanceSiderbar: state => state.maintenanceSiderbar,
    instrumentsiderbar: state => state.instrumentsiderbar,
    tubeType: state => state.tubeType,
    parameters: state => state.parameters,
    setting: state => state.setting,
    elutionData: state => state.elutionData,
    reagentData: state => state.reagentData,
    sampleData: state => state.sampleData,
    saveParameters: state => state.saveParameters,
    selectedWorktableStatus: state => state.selectedWorktableStatus,
    backSrc: state => state.backSrc,
    selectedImg: state => state.selectedImg,
    yzlists: state => state.yzlists,
    temOption: state => state.temOption,
    isNotify: state => state.isNotify,
    protocol: state => state.protocol,
    tubeProtocol: state => state.tubeProtocol,
    lightstatus: state => state.lightstatus,
    advancedSiderbar: state => state.advancedSiderbar,
    temperatureSv: state => state.temperatureSv,
    encryption: state => state.encryption,
    saveProrocolStatus: state => state.saveProrocolStatus,
  },
  actions: {},
  mutations: {
    setUser(state, data) {
      state.user = data;
      state.token = data.Token;
    },
    setMenuIndex(state, menu_index) {
      state.menuIndex = menu_index;
    },
    setSystemMenu(state, system_Menu) {
      state.systemMenu = system_Menu;
    },
    setSystemHeadMenu(state, system_Head_Menu) {
      state.systemHeadMenu = system_Head_Menu;
    },
    setSettingOption(state, setting_option) {
      state.settingOption = setting_option;
    },
    setSettingSystemSiderbar(state, setting_system_siderbar) {
      state.settingSystemSiderbar = setting_system_siderbar;
    },
    setSystemTime(state, system_time) {
      state.systemTime = system_time;
    },
    setLanguageCode(state, setting_language_code) {
      state.languageCode = setting_language_code;
    },
    setSettingTools(state, setting_tools) {
      state.settingTools = setting_tools;
    },
    setMaintenanceSiderbar(state, maintenance_siderbar) {
      state.maintenanceSiderbar = maintenance_siderbar;
    },
    setInstrumentSiderbar(state, instrument_siderbar) {
      state.instrumentsiderbar = instrument_siderbar;
    },
    setTubeType(state, tube_type) {
      state.tubeType = tube_type;
    },
    setPrameters(state, parameters_type) {
      state.parameters = parameters_type;
    },
    setSetting(state, instrument_setting) {
      state.setting = instrument_setting;
    },
    setElutionData(state, elution_data) {
      state.elutionData = elution_data;
    },
    setReagentData(state, reagent_data) {
      state.reagentData = reagent_data;
    },
    setSampleData(state, sample_data) {
      state.sampleData = sample_data;
    },
    setSaveParameters(state, save_parameters) {
      state.saveParameters = save_parameters;
    },
    setSelectedWorktableStatus(state, selected_worktable_status) {
      state.selectedWorktableStatus = selected_worktable_status;
    },
    setBackSrc(state, back_src) {
      state.backSrc = back_src;
    },
    setSelectedImg(state, selected_img) {
      state.selectedImg = selected_img;
    },
    setYzlists(state, yz_lists) {
      state.yzlists = yz_lists;
    },
    setTemOption(state, tem_option) {
      state.temOption = tem_option;
    },
    setIsNotify(state, is_Notify) {
      state.isNotify = is_Notify;
    },
    setProtocol(state, protocol) {
      state.protocol = protocol;
    },
    setTubeProtocol(state, tube_Protocol) {
      state.tubeProtocol = tube_Protocol;
    },
    setLightstatus(state, light_status) {
      state.lightstatus = light_status;
    },
    setAdvancedSiderbar(state, advanced_siderbar) {
      state.advancedSiderbar = advanced_siderbar;
    },
    setTemperatureSv(state, temperature_sv) {
      state.temperatureSv = temperature_sv;
    },
    setEncryption(state, encryption) {
      state.encryption = encryption;
    },
    setSaveProrocolStatus(state, save_prorocol_status) {
      state.saveProrocolStatus = save_prorocol_status;
    },
  },
  modules: {
    protocols
  },
  plugins: [persistedState()],
})

export default store
