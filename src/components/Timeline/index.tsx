import { Stack } from 'react-bootstrap'
import Entry from '../../domain/entry/Entry'
import EntryCard from '../EntryCard'
import For from '../For'

interface Props {
  entries: Entry[]
}

function Timeline({ entries }: Props) {
  return (
    <Stack className="border border-light" direction="vertical">
      <For
        each={entries}
        render={(entry) => <EntryCard entry={entry} key={entry.uri} />}
      />
    </Stack>
  )
}

export default Timeline
