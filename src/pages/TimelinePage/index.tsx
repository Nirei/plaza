import { Spinner } from 'react-bootstrap'
import Page from '../../components/Page'
import Timeline from '../../components/Timeline'
import useAsync from '../../hooks/useAsync'
import { MockEntryRepository } from '../../infrastructure/entry/MockEntryRepository'

const ENTRY_REPOSITORY = new MockEntryRepository()

function Content() {
  const { result, error, done } = useAsync(ENTRY_REPOSITORY.find, true)

  if (error) return <h3>An error ocurred!</h3>
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
