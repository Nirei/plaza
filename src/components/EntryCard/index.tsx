import { useCallback } from 'react'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowUpFromBracket,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Spinner } from 'react-bootstrap'
import { humanRelativeTime } from '../../domain/common/Date'
import Entry from '../../domain/entry/Entry'
import Avatar from '../Avatar'
import InteractionButton from '../InteractionButton'
import useAsync from '../../hooks/useAsync'
import { BeakerNodeRepository } from '../../infrastructure/node/BeakerNodeRepository'
import Node from '../../domain/node/Node'

const NODE_REPOSITORY = new BeakerNodeRepository()

function NodeName({ name }: { name: string }) {
  return <span className="fw-bold mb-1 me-1">{name}</span>
}

function NodeHandle({ handle, id }: { handle: string; id: string }) {
  const short = id.substring(0, 6)
  return (
    <>
      <span className="mb-1 text-secondary">{`@${handle}`}</span>
      <span className="mb-1 me-1 fs-6 font-monospace text-uppercase text-secondary">{`#${short}`}</span>
    </>
  )
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

interface ContentProps {
  entry: Entry
  node: Node
}

function Card({ entry, node }: ContentProps) {
  return (
    <>
      <Col className="p-0" xs={1}>
        <Avatar uri={node.avatar_url} />
      </Col>
      <Col>
        <Row>
          <Col>
            <NodeName name={node.username} />
            <NodeHandle handle={node.handle} id={node.id} />
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
    </>
  )
}

interface Props {
  entry: Entry
}

function Content({ entry }: Props) {
  const findNode = useCallback(
    () => NODE_REPOSITORY.fetch(entry.node),
    [entry.node],
  )
  const { result, done, error } = useAsync(findNode, true)

  if (error) return <h3>FIXME</h3>
  if (!done) return <Spinner animation="grow" variant="secondary" />

  return <Card entry={entry} node={result!} />
}

function EntryCard({ entry }: Props) {
  return (
    <Row className="border-top border-light px-3 py-2 m-0">
      <Content entry={entry} />
    </Row>
  )
}

export default EntryCard
