import Page from '../../components/Page'
import Timeline from '../../components/Timeline'
import Entry from '../../model/entry/Entry'

const MOCK_ENTRIES = [
  new Entry(
    "a88274af543e662d7db43453a4e63c3bfa410be46b69f4660f8c73d32435ddb7",
    new Date("2022-04-28T23:33:00Z"),
    "This will be the first entry in Plaza ever. 🐦"),
]

function TimelinePage() {
  return (
    <Page>
      <Timeline entries={MOCK_ENTRIES} />
    </Page>
  )
}

export default TimelinePage
