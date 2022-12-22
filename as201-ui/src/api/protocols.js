import request from '@/utils/request'

export function getProtocols(params) {
  return request({
    url: 'protocol/search',
    method: 'get',
    params:params
  })
}

export function favorites(params) {
  return request({
    url: 'protocol/favorites',
    method: 'post',
    data:params
  })
}


export function saveAs(params) {
  return request({
    url: 'protocol/save-as',
    method: 'post',
    data:params
  })
}

export function deleteProtocols(params) {
  return request({
    url: 'protocol/delete',
    method: 'post',
    data:params
  })
}

export function saveProtocols(params) {
  return request({
    url: 'protocol/save',
    method: 'post',
    data:params
  })
}

export function searchProtocolInfor(params) {
  return request({
    url: 'protocol/get',
    method: 'get',
    params:params
  })
}

export function getUsbStatus() {
  return request({
    url: 'file/usb-status',
    method: 'get',
  })
}

export function getUserProtocols(params) {
  return request({
    url: 'protocol/select-path',
    method: 'get',
    params:params
  })
}

export function importProtocols(params) {
  return request({
    url: 'protocol/import',
    method: 'post',
    data:params
  })
}

export function exportProtocols(params) {
  return request({
    url: 'protocol/export',
    method: 'post',
    data:params
  })
}

export function returnDirectory() {
  return request({
    url: 'protocol/return-directory',
    method: 'get',
  })
}
