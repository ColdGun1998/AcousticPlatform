export function localGet (key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return value
  }
}

export function localSet (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove (key) {
  window.localStorage.removeItem(key)
}

export const pathMap = {

}

// 单张图片上传
// 上传接口
export const uploadImgServer = 'http://localhost:7001/api/upload'
// 图片存储资源地址
export const remoteImgAddress = 'http://localhost:7001'
// 多张图片上传
// export const uploadImgsServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files'
