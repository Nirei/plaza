import Entry from '../../domain/entry/Entry'
import EntryCard from '../EntryCard'
import For from '../For'

interface Props {
  entries: Entry[]
}

const renderEntry = (entry: Entry) => (
  <EntryCard entry={entry} key={entry.uri} />
)

function Timeline({ entries }: Props) {
  return <For each={entries} render={renderEntry} />
}

export default Timeline
