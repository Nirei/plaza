import { Col, Stack } from 'react-bootstrap'
import Entry from '../../domain/entry/Entry'
import EntryCard from '../EntryCard'
import For from '../For'
import NewEntryInput from '../NewEntryInput'
import TimelineRow from '../TimelineRow'

function TimelineHeader() {
  return (
    <TimelineRow>
      <Col>
        <span className="fw-bold fs-5">Home</span>
      </Col>
      <Col></Col>
      <Col></Col>
    </TimelineRow>
  )
}

interface Props {
  entries: Entry[]
}

const renderEntry = (entry: Entry) => (
  <EntryCard entry={entry} key={entry.uri} />
)

function Timeline({ entries }: Props) {
  return (
    <Stack className="border border-light" direction="vertical">
      <TimelineHeader />
      <NewEntryInput />
      <For each={entries} render={renderEntry} />
    </Stack>
  )
}

export default Timeline
