import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowUpFromBracket,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row } from 'react-bootstrap'
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

interface Props {
  entry: Entry
}

function EntryCard({ entry }: Props) {
  return (
    <Container className="border-top border-light py-2">
      <Row>
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
            <Col xs={{ span: 1, offset: 0 }}>
              <InteractionButton icon={faComment} />
            </Col>
            <Col xs={{ span: 1, offset: 2 }}>
              <InteractionButton icon={faRetweet} />
            </Col>
            <Col xs={{ span: 1, offset: 2 }}>
              <InteractionButton icon={faHeart} />
            </Col>
            <Col xs={{ span: 1, offset: 2 }}>
              <InteractionButton icon={faArrowUpFromBracket} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default EntryCard
