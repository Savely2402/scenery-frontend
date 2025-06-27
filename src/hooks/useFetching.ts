import { useState, useCallback, useEffect } from 'react'
import axios, {
  type AxiosRequestConfig,
  type Method,
  type AxiosResponse,
  type AxiosError,
} from 'axios'

interface UseFetchOptions<T, U = undefined> {
  url: string
  method?: Method
  data?: U
  headers?: Record<string, string>
  config?: AxiosRequestConfig
  immediate?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: AxiosError) => void
}

export function useFetch<T = unknown, U = undefined>(
  options: UseFetchOptions<T, U>
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response: AxiosResponse<T> = await axios.request<T>({
        url: options.url,
        method: options.method || 'GET',
        data: options.data,
        headers: options.headers,
        ...options.config,
      })

      setData(response.data)
      options.onSuccess?.(response.data)
    } catch (err) {
      const axiosError = err as AxiosError
      setError(axiosError)
      options.onError?.(axiosError)
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
