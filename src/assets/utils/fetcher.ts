import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import Axios from 'axios'
import useSWRV, { type IConfig } from 'swrv'
import type { MaybeRef } from '@vueuse/core'
import { unref } from 'vue'

export interface AxiosClient {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>

  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>

  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>

  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>

  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>

  $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>

  $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>

  $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

function makeClient(axios: AxiosInstance): AxiosClient {
  axios.interceptors.response.use(undefined, error => {
    if (!error.response) throw error
    if (error.response.status === 401) {
      const redirectUrl = error.response.data?.redirectUrl
      if (redirectUrl) {
        location.href = redirectUrl
        return
      }
    }
    return Promise.reject(error)
  })
  return {
    $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return axios.delete(url, config).then(res => res?.data)
    },
    $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return axios.get(url, config).then(res => res?.data)
    },
    $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return axios.head(url, config).then(res => res?.data)
    },
    $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return axios.options(url, config).then(res => res?.data)
    },
    $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      return axios.patch(url, data, config).then(res => res?.data)
    },
    $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      return axios.post(url, data, config).then(res => res?.data)
    },
    $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      return axios.put(url, data, config).then(res => res?.data)
    },
    $request<T = any>(config: AxiosRequestConfig): Promise<T> {
      return axios.request(config).then(res => res?.data)
    },
  }
}

export const axios = Axios.create({ baseURL: '/v1' })
export const axiosClient = makeClient(axios)

const axiosFetcher: <T>(url: string) => Promise<T> = function <T>(url: string) {
  return axiosClient.$get<T>(url)
}

export function axiosRef<T>(url: string, params?: MaybeRef<any>, extra?: IConfig) {
  return useSWRV<T | undefined>(
    params ? () => `${url}?${new URLSearchParams(unref(params)).toString()}` : url,
    axiosFetcher,
    extra,
  )
}

/**
 * 连接到 HoroscopeVerse
 */
export const verse = Axios.create({ baseURL: '/v2' })
export const verseClient = makeClient(verse)
export const verseFetcher: <T>(url: string) => Promise<T> = function <T>(url: string) {
  return verseClient.$get<T>(url)
}

export function verseRef<T>(url: string, params?: MaybeRef<any>, extra?: IConfig) {
  return useSWRV<T>(params ? () => `${url}?${new URLSearchParams(unref(params)).toString()}` : url, verseFetcher, extra)
}

export default axiosFetcher
