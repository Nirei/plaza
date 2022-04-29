import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowUpFromBracket,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
import { humanRelativeTime } from '../../domain/common/Date'
import Entry from '../../domain/entry/Entry'
import Avatar from '../Avatar'
import InteractionButton from '../InteractionButton'

function NodeName({ id }: { id: string }) {
  const short = id.substring(0, 6)
  return <span className="fw-bold text-uppercase mb-1 me-1">{short}</span>
}

function RelativeTime({ time }: { time: Date }) {
  return (
    <>
      <span className="me-1 text-secondary">·</span>
      <span className="text-secondary">{humanRelativeTime(time)}</span>
    </>
  )
}

function EntryContent({ content }: { content: string }) {
  return <p>{content}</p>
}

function ButtonRow() {
  return (
    <>
      <Col className="p-0">
        <InteractionButton icon={faComment} />
      </Col>
      <Col className="p-0">
        <InteractionButton icon={faRetweet} />
      </Col>
      <Col className="p-0">
        <InteractionButton icon={faHeart} />
      </Col>
      <Col className="p-0">
        <InteractionButton icon={faArrowUpFromBracket} />
      </Col>
    </>
  )
}

interface Props {
  entry: Entry
}

function EntryCard({ entry }: Props) {
  return (
    <Row className="border-top border-light px-3 py-2 m-0">
      <Col className="p-0" xs={1}>
        <Avatar node={entry.node} />
      </Col>
      <Col>
        <Row>
          <Col>
            <NodeName id={entry.node} />
            <RelativeTime time={entry.date} />
          </Col>
        </Row>
        <Row>
          {/* FIXME: This may not have a content, for example pure reblogs */}
          <EntryContent content={entry.content!} />
        </Row>
        <Row>
          <ButtonRow />
        </Row>
      </Col>
    </Row>
  )
}

export default EntryCard
