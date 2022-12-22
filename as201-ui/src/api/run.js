import request from '@/utils/request'
/**
 * 获取程序列表
 * @returns
 */
export function getAllProtocol () {
  return request({
    url: '/protocol/all',
  })
}
// 查询程序详情
export function getProtocolDetail (id) {
  return request({
    url: '/protocol/get',
    params: {
      protocol_id: id,
    }
  })
}


// 查看门的状态
export function getDoorState () {
  return request({
    url: '/run/get-door-state',
  })
}

// 打开仪器门
export function openDoor () {
  return request({
    url: '/run/open-door',
    method: 'POST',
  })
}

//关闭仪器门
export function closeDoor () {
  return request({
    url: '/run/close-door',
    method: 'POST',
  })
}

// 运行，暂时只创建运行记录
export function setRun (data) {
  return request({
    url: '/run/run',
    method: 'POST',
    data
  })
}

// 条件搜索程序
export function sortProtocolsList (data) {
  return request({
    url: '/protocol/search',
    method: 'GET',
    params: data
  })
}

//继续运行
export function goOnRun () {
  return request({
    url: '/run/go-on',
    method: 'POST',
  })
}

/**
 * 暂停程序
 * @returns
 */
export function pauseRun () {
  return request({
    url: '/run/pause',
    method: 'POST',
  })
}

//停止运行
export function stopRun () {
  return request({
    url: '/run/stop',
    method: 'POST',
  })
}

// 跳过孵育
export function skipIncubator (step_id) {
  return request({
    url: '/run/skip',
    method: 'POST',
    data: {
      step_id
    }
  })
}

//导出运行记录为pdf
export function getRunReport (run_ids) {
  return request({
    url: '/run/report-export',
    method: 'POST',
    data: {
      run_ids
    }
  })
}

//获取设置的相关信息
export function getSettingAll () {
  return request({
    url: '/setting/all',
  })
}


// 关闭键盘
export function closeKeyboard () {
  return request({
    url: '/window/close-keyboard',
    method: 'POST',
  })
}

// 开启键盘
export function openKeyboard () {
  return request({
    url: '/window/open-keyboard',
    method: 'POST',
  })
}

//打开紫外灯
export function openUV (seconds) {
  return request({
    url: '/run/open-uv',
    method: 'POST',
    data: {
      seconds
    }
  })
}

//关闭紫外灯
export function closeUV () {
  return request({
    url: '/run/close-uv',
    method: 'POST',
  })
}
