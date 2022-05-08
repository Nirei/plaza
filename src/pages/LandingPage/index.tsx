import { Button } from 'react-bootstrap/lib/InputGroup'
import Page from '../../components/Page'
import { useNodes } from '../../hooks/useNodes'

const JoinButton = () => {
  return <Button onClick={() => {}}/>
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
      <JoinButton />
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
