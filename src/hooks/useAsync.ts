import { useCallback, useEffect, useState } from 'react'

export function useAsync<Output>(
  callback: () => Promise<Output>,
  immediate: boolean = true,
) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [result, setResult] = useState<Output>()
  const [error, setError] = useState<Error>()

  // Set appropriate states and use callback
  const execute = useCallback(async () => {
    setDone(false)
    setLoading(true)
    try {
      setResult(await callback())
    } catch (e) {
      console.error(e)
      setError(e as Error)
    }
    setLoading(false)
    setDone(true)
  }, [callback])

  // If immediate, trigger once when first loaded
  useEffect(() => {
    if (!loading && !done && immediate) {
      execute()
    }
  }, [loading, done, immediate, execute])

  return { execute, result, error, loading, done }
}
