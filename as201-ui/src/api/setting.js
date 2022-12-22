import request from '@/utils/request'
export function searchSetting() {
  return request({
    url: '/setting/all',
    method: 'get',
    query: {}
  })
}

export function saveSetting(params) {
  return request({
    url: '/setting/save',
    method: 'post',
    data: params
  })
}

export function updateSystem(params) {
  return request({
    url: '/setting/update-system-time',
    method: 'post',
    data: params
  })
}
export function getSystemTime() {
  return request({
    url: '/setting/get-system-time',
    method: 'get',
  })
}



export function instrumentGet() {
  return request({
    url: '/setting/get-instrument',
    method: 'get',
  })
}

export function saveInstruments(params) {
  return request({
    url: '/setting/save-instrument',
    method: 'post',
    data: params
  })
}

export function importOem(params) {
  return request({
    url: '/setting/import-image',
    method: 'post',
    data: params
  })
}

export function testCali(params) {
  return request({
    url: '/calibration/start-wdjz',
    method: 'post',
    data: params
  })
}

export function stopCali() {
  return request({
    url: '/calibration/stop-wdjz',
    method: 'post',
  })
}

export function moveYZ(params) {
  return request({
    url: '/worktable/move',
    method: 'post',
    data: params
  })
}

export function searchLabwares(params) {
  return request({
    url: '/labware/search',
    method: 'get',
    params: params
  })
}

export function TestAging(params) {
  return request({
    url: '/setting/aging',
    method: 'post',
    data: params
  })
}

export function openSettingDoor(params) {
  return request({
    url: '/worktable/open-door',
    method: 'post',
    data: params
  })
}

export function closeSettingDoor(params) {
  return request({
    url: '/worktable/close-door',
    method: 'post',
    data: params
  })
}

export function preCalibration(params) {
  return request({
    url: '/worktable/pre-calibration',
    method: 'post',
    data: params
  })
}

export function sfdj(params) {
  return request({
    url: '/worktable/sfdj',
    method: 'post',
    data: params
  })
}

export function lwjz(params) {
  return request({
    url: '/worktable/lwjz',
    method: 'post',
    data: params
  })
}


export function ReturnCalibration(params) {
  return request({
    url: '/worktable/return-calibration',
    method: 'post',
    data: params
  })
}

export function resetData(params) {
  return request({
    url: '/worktable/reset',
    method: 'post',
    data: params
  })
}

export function load(params) {
  return request({
    url: '/worktable/load',
    method: 'post',
    data: params
  })
}

export function unload(params) {
  return request({
    url: '/worktable/unload',
    method: 'post',
    data: params
  })
}

export function startYyjz(params) {
  return request({
    url: '/calibration/start-yyjz',
    method: 'post',
    data: params
  })
}

export function moveInstrument(params) {
  return request({
    url: '/setting/move',
    method: 'post',
    data: params
  })
}


export function testInstrument(params) {
  return request({
    url: '/setting/test',
    method: 'post',
    data: params
  })
}


export function resetInstrument(params) {
  return request({
    url: '/setting/reset',
    method: 'post',
    data: params
  })
}

export function searchReport() {
  return request({
    url: '/run/report-search',
    method: 'get',
  })
}

export function searchLog() {
  return request({
    url: '/run/log-search',
    method: 'get',
  })
}

export function deleteRunningLog(params) {
  return request({
    url: '/run/report-delete',
    method: 'post',
    data: params
  })
}

export function deleteErrorLog(params) {
  return request({
    url: '/run/log-delete',
    method: 'post',
    data: params
  })
}

export function clearLoginRecord(params) {
  return request({
    url: '/setting/clear-login-records',
    method: 'post',
    data: params
  })
}

export function clearRestore(params) {
  return request({
    url: '/setting/one-click-restore',
    method: 'post',
    data: params
  })
}

export function getSystemInfo() {
  return request({
    url: '/setting/system-info',
    method: 'get',
  })
}

export function getUpgradeInfo() {
  return request({
    url: '/upgrade/search',
    method: 'get',
  })
}

export function clearUsedTime(params) {
  return request({
    url: '/setting/clear',
    method: 'post',
    data:params
  })
}

export function exportRun(params) {
  return request({
    url: '/run/report-export',
    method: 'post',
    data:params
  })
}

export function getImportTube(params) {
  return request({
    url: '/labware/select-path',
    method: 'get',
    params:params
  })
}

export function exportTube(params) {
  return request({
    url: '/labware/export',
    method: 'post',
    data:params
  })
}

export function importTube(params) {
  return request({
    url: '/labware/import',
    method: 'post',
    data:params
  })
}

export function exportSysInfo() {
  return request({
    url: '/setting/export-system-info',
    method: 'post',
  })
}

export function getHelper() {
  return request({
    url: '/setting/open-helper',
    method: 'get',
  })
}

export function getOems() {
  return request({
    url: '/setting/get-image',
    method: 'get',
  })
}

export function factory() {
  return request({
    url: '/setting/factory',
    method: 'post',
  })
}
