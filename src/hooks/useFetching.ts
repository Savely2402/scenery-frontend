import { useState, useCallback, useEffect } from 'react'
import axios, { type AxiosRequestConfig, type Method } from 'axios'

interface UseFetchOptions<T> {
  url: string
  method?: Method
  data?: any
  headers?: Record<string, string>
  config?: AxiosRequestConfig
  immediate?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: any) => void
}

export function useFetch<T = unknown>(options: UseFetchOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.request<T>({
        url: options.url,
        method: options.method || 'GET',
        data: options.data,
        headers: options.headers,
        ...options.config,
      })

      setData(response.data)
      options.onSuccess?.(response.data)
    } catch (err) {
      setError(err)
      options.onError?.(err)
    } finally {
      setLoading(false)
    }
  }, [options])

  useEffect(() => {
    if (options.immediate) {
      execute()
    }
  }, [execute, options.immediate])

  return { data, error, loading, execute }
}
