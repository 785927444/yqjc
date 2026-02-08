import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import router from '@/router'
import configStore from '../stores/configStore'
import publicStore from '../stores/publicStore'
import { isNull, getHttp, toPath, encryptData, decryptData, encrypt, setLog, parseTime } from "../utils/common"
import { findNode } from "../utils/tree"

// 基础配置
const service = axios.create({
  baseURL: "",
  timeout: 60000,
  withCredentials: true,
  credentials: 'include',
})

// 刷新 CSRF Token 的标记和队列
let isRefreshing = false
let refreshSubscribers: Array<(value: any) => void> = []

// 添加请求拦截器
service.interceptors.request.use((req: any) => {
  const config = configStore()

  const headers = req.headers
  headers['X-CSRF-Token'] = config.csrfToken
  headers['AuthToken'] = config.secret_key ? `xyz${encrypt(`xyz${config.secret_key}`)}` : ''
  headers['Authorization'] = config.token || ''
  headers['Refresh'] = false
  req.baseURL = getHttp(req)
  if(!isNull(configStore().routes)){
    const path = window.location.hash.replace('#', '') || '/'
    if(path){
      const node = findNode(configStore().routes, (n) => { return n.path && n.path == path })
      if(node) headers['Refresh'] = true
    }
  }

  // 优化条件判断，减少嵌套层级和多次调用configStore()
  if (config.secret_key && !req.status && !config.debugapi && config.config && !config.config.secret && req.url?.includes('/terminal')) {
    headers['Content-Type'] = 'text/plain'
    req.data = encryptData(req.data)
  }
  
  delete headers.ip

  return req
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use((res: any) => {
  const config = configStore()

  // 更新CSRF Token
  if (res.headers?.['x-csrf-token']) config.csrfToken = res.headers['x-csrf-token']

  // 解密响应数据
  if (config.secret_key && !config.debugapi && config.config && !config.config.secret && res.request.responseURL?.includes('/terminal') && typeof res.data === 'string') {
    res.data = decryptData(res.data)
    res.config.data = decryptData(res.config.data)
  }

  setLog(res)

  const { code, errcode } = res.data

  // 优化状态码判断，使用Number转换避免类型比较
  const numCode = Number(code)
  const numErrcode = Number(errcode)

  // 成功响应
  if ([200, 400].includes(numCode) || numErrcode === 0) {
    return res.data
  }

  // 错误处理 - 统一处理相同类型的错误
  const errorHandlers = {
    600: () => {
      ElNotification({ title: '提示', message: '请重新登录', type: 'error' })
      // 重置用户状态
      config.token = ''
      config.user = ''
      config.routes = []

      // 使用requestAnimationFrame优化性能，避免阻塞主线程
      requestAnimationFrame(() => {
        const currentRoute = router.currentRoute.value
        const matchedRoute = currentRoute.matched[0]
        if (matchedRoute?.components?.default?.__file?.includes('admin')) {
          router.push({ path: config.loginRoute })
        }
      })
    },
    601: () => ElNotification({ title: '提示', message: '账号或密码错误', type: 'error' }),
    606: () => ElNotification({ title: '提示', message: '账号或密码错误', type: 'error' }),
    700: () => ElNotification({ title: '提示', message: res.data.msg || '服务器错误', type: 'error' }),
  }

  // 处理已知错误码
  if (errorHandlers[numCode]) {
    errorHandlers[numCode]()
    return Promise.reject(res)
  }

  // 未知错误
  return Promise.reject(res.data || 'error')
}, error => {
  const config = configStore()

  // 更新CSRF Token
  if (error.response?.headers?.['x-csrf-token']) {
    config.csrfToken = error.response.headers['x-csrf-token']
  }

  // 处理 CSRF Token 过期
  if (error.response?.status === 403 && error.response.data?.msg === 'CSRF token invalid') {
    console.log("CSRF Token 过期 自动获取")
    return handleCsrfTokenExpired(error)
  }

  // 处理网络错误
  if (error.message === 'Network Error') {
    console.log('服务器连接异常，请检查服务器！')
    return Promise.reject(new Error('网络连接失败，请检查网络设置'))
  }

  return Promise.reject(error)
})

// 处理 CSRF Token 过期
async function handleCsrfTokenExpired(error: any): Promise<any> {
  const originalRequest = error.config

  return new Promise((resolve, reject) => {
    // 将请求加入队列
    refreshSubscribers.push((token) => {
      originalRequest.status = true
      originalRequest.headers['X-CSRF-Token'] = token
      service(originalRequest).then(resolve).catch(reject)
    })

    // 如果是第一个请求，触发Token刷新
    if (!isRefreshing) {
      isRefreshing = true

      publicStore().http({Api: {}}, '/api/v1/terminal/base/csrfToken', {}, 'get')
        .then((response) => {
          const config = configStore()
          const newToken = response?.data?.token || config.csrfToken
          // 执行队列中的所有请求
          refreshSubscribers.forEach(fn => fn(newToken))
        })
        .catch(err => {
          console.error("CSRF Token 刷新失败:", err)
          refreshSubscribers.forEach(fn => reject(err))
        })
        .finally(() => {
          isRefreshing = false
          refreshSubscribers = []
        })
    }
  })
}

export default service