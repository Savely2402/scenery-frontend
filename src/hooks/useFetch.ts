import { useState, useCallback, useEffect } from 'react'
import { type AxiosError } from 'axios'

export function useFetch<T>(callback: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = await callback()

            setData(data)
        } catch (err) {
            const axiosError = err as AxiosError
            setError(axiosError)
        } finally {
            setIsLoading(false)
        }
    }, [callback])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, setData, error, isLoading }
}
