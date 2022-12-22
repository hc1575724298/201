import { getProtocolDetail } from '@/api/run'
export default {
  namespaced: true,
  state: {
    protocalInfo: {},
    pathName: '',
    initPathName: '',
    selectedTubeList: [],
    sampleIdDataStore: [],
    start_step_id: '',
    run_step_ids: '',
    doorState: '',
    startRunTime: '', // loadLabware 点击Run时间
  },
  mutations: {
    updatedInfo (state, playload) {
      state.protocalInfo = playload[0];
      state.pathName = playload[1];
      state.initPathName = playload[1];
    },
    updatedInitPathName (state, playload) {
      state.initPathName = playload
    },
    changeGoBackName (state, name) {
      state.pathName = name
    },
    changeSelectedTubeList (state, playload) {
      state.selectedTubeList = playload
    },
    updatedSampleIdInfo (state, playload) {
      state.sampleIdDataStore = playload
    },
    updatedStepIds (state, playload) {
      state.start_step_id = playload[0]
      state.run_step_ids = playload[1]
    },
    updatedDoorState (state, playload) {
      state.doorState = playload
    },
    updatedStartRunTime (state, playload) {
      state.startRunTime = playload
    },
    clearRecord (state, playload) {
      state.selectedTubeList = playload
      state.sampleIdDataStore = playload
    }
  },
  getters: {
  },
  actions: {

  }
}
