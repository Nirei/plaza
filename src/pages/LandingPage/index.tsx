import { useCallback } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import Page from '../../components/Page'
import { toUri } from '../../domain/node/NodeReference'
import { useAsync } from '../../hooks/useAsync'
import { useSources } from '../../hooks/useSources'

const Join = () => {
  const { create } = useSources()
  const creationCallback = useCallback(async () => {
    const node = await create()
    window.location.assign(toUri(node))
  }, [create])
  const { error, loading, execute } = useAsync(creationCallback, false)

  if (loading)
    return (
      <>
        <Spinner animation="grow" variant="primary" />
        <span>Setting up your node...</span>
      </>
    )

  if (error) return <span>Set up failed: {error.message}</span>
  return <Button onClick={execute}>Join!</Button>
}

const Content = () => {
  return (
    <>
      <h1>Plaza</h1>
      <h2>The distributed microblogging social network.</h2>
      <hr />
      <h3>What's Plaza</h3>
      <p>
        Plaza is a social network that lives in the browser. It doesn't depend
        on central servers funded by private corporations to function.
        Everything in your profile will live in your own browser and that of
        your contacts.
      </p>
      <p>You decide what you show and you decide what you see.</p>
      <hr />
      <Join />
    </>
  )
}

const LandingPage = () => {
  return (
    <Page>
      <Content />
    </Page>
  )
}

export default LandingPage
