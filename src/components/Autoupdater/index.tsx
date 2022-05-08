import { useCallback } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { useAsync } from '../../hooks/useAsync'
import { useSources } from '../../hooks/useSources'

const Autoupdater = () => {
  const { update } = useSources()
  const updateCallback = useCallback(async () => {
    const updated = await update()
    if (updated) {
      window.location.reload()
    }
  }, [update])
  const { done, error } = useAsync(updateCallback)

  if (!done)
    return (
      <Alert variant="info">
        <Spinner animation="border" variant="secondary" />
        <span>Checking for updates...</span>
      </Alert>
    )

  if (error)
    return (
      <Alert variant="warning">
        <span>Error updating: {error.message}</span>
      </Alert>
    )

  return null
}

export default Autoupdater
