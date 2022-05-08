import { Spinner, Stack } from 'react-bootstrap'
import NewEntryInput from '../../components/NewEntryInput'
import Page from '../../components/Page'
import Timeline from '../../components/Timeline'
import TimelineHeader from '../../components/TimelineHeader'
import { useAsync } from '../../hooks/useAsync'
import { useEntries } from '../../hooks/useEntries'

function Content() {
  const { find } = useEntries()
  const { result, error, done } = useAsync(find)

  if (error)
    return (
      <>
        <h3>An error ocurred!</h3>
        <pre>{JSON.stringify(error)}</pre>
      </>
    )

  if (!done) return <Spinner animation="grow" variant="primary" />
  return (
    <Stack className="border border-light" direction="vertical">
      <TimelineHeader>
        <span className="fw-bold fs-5">Home</span>
      </TimelineHeader>
      <NewEntryInput />
      <Timeline entries={result!} />
    </Stack>
  )
}

function TimelinePage() {
  return (
    <Page>
      <Content />
    </Page>
  )
}

export default TimelinePage
