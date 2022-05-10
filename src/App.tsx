import { useCallback } from 'react'
import { Routes, useLocation } from 'react-awesome-router'
import { Spinner } from 'react-bootstrap'
import Autoupdater from './components/Autoupdater'
import { useAsync } from './hooks/useAsync'
import { useNodes } from './hooks/useNodes'

const App = () => {
  const { isOwnNode, isInstalled } = useNodes()
  const getNodeStatus = useCallback(
    () => Promise.all([isOwnNode(), isInstalled()]),
    [isOwnNode, isInstalled],
  )
  const { done, error, result } = useAsync(getNodeStatus)

  const { setContext } = useLocation()

  if (error) return <h3>FIX ME!</h3>
  if (!done) return <Spinner animation="grow" variant="primary" />

  const [owned, installed] = result!

  setContext({ owned, installed })

  return (
    <>
      {installed && <Autoupdater />}
      <Routes />
    </>
  )
}

export default App
