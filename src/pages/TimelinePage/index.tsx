import { Spinner } from 'react-bootstrap'
import Page from '../../components/Page'
import Timeline from '../../components/Timeline'
import useAsync from '../../hooks/useAsync'
import { BeakerEntryRepository } from '../../infrastructure/entry/BeakerEntryRepository'

const ENTRY_REPOSITORY = new BeakerEntryRepository()

function Content() {
  const { result, error, done } = useAsync(ENTRY_REPOSITORY.find, true)

  if (error) return (
    <>
      <h3>An error ocurred!</h3>
      <pre>{JSON.stringify(error)}</pre>
    </>
  )
  if (done) return <Timeline entries={result!} />
  return <Spinner animation="grow" variant="primary" />
}

function TimelinePage() {
  return (
    <Page>
      <Content />
    </Page>
  )
}

export default TimelinePage
