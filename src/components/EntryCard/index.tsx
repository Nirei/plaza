import { Card, Col, Container, Row } from 'react-bootstrap'
import Entry from '../../model/entry/Entry'
import Avatar from '../Avatar'

interface Props {
  entry: Entry
}

function EntryCard({ entry }: Props) {
  return (
    <Card>
      <Container>
        <Col>
          <Row>
            <Avatar node={entry.node} />
          </Row>
        </Col>
        <Col>
          <Row>{entry.node}</Row>
          <Row>{entry.content}</Row>
        </Col>
      </Container>
    </Card>
  )
}

export default EntryCard
