import { useCallback } from 'react'
import { Spinner } from 'react-bootstrap'
import Autoupdater from './components/Autoupdater'
import { useAsync } from './hooks/useAsync'
import { useNodes } from './hooks/useNodes'
import ExternalProfilePage from './pages/ExternalProfilePage'
import InstallationWizardPage from './pages/InstallationWizardPage'
import LandingPage from './pages/LandingPage'
import TimelinePage from './pages/TimelinePage'

const App = () => {
  const { isOwnNode, isInstalled } = useNodes()
  const getNodeStatus = useCallback(
    () => Promise.all([isOwnNode(), isInstalled()]),
    [isOwnNode, isInstalled],
  )
  const { done, error, result } = useAsync(getNodeStatus)

  if (error) return <h3>FIX ME!</h3>
  if (!done) return <Spinner animation="grow" variant="primary" />

  const [owned, installed] = result!

  if (!owned && installed) return <ExternalProfilePage />
  if (!owned && !installed) return <LandingPage />

  const PageOwned = () => {
    if (!installed) return <InstallationWizardPage />
    return <TimelinePage />
  }

  return (
    <>
      <Autoupdater />
      <PageOwned />
    </>
  )
}

export default App
