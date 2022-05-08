import { Row, Spinner, Stack } from 'react-bootstrap'
import Page from '../../components/Page'
import ProfileHeader from '../../components/ProfileHeader'
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
        <Row>
          <span>PROFILE NAME</span>
        </Row>
        <Row>
          <span>7001 entries</span>
        </Row>
      </TimelineHeader>
      <ProfileHeader />
      <Timeline entries={result!} />
    </Stack>
  )
}

const ExternalProfilePage = () => {
  return (
    <Page>
      <Content />
    </Page>
  )
}

export default ExternalProfilePage
