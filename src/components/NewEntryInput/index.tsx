import {
  faCalendarCheck,
  faFaceAngry,
  faFaceDizzy,
  faFaceFlushed,
  faFaceGrinTongueSquint,
  faFaceGrinTongueWink,
  faFaceGrinWide,
  faFaceGrinWink,
  faFaceKiss,
  faFaceKissBeam,
  faFaceKissWinkHeart,
  faFaceLaugh,
  faFaceLaughBeam,
  faFaceLaughSquint,
  faFaceLaughWink,
  faFaceMeh,
  faFaceMehBlank,
  faFaceRollingEyes,
  faFaceSadCry,
  faFaceSadTear,
  faFaceSmile,
  faFaceSmileBeam,
  faFaceSmileWink,
  faFaceSurprise,
  faFaceTired,
  faImage,
  IconDefinition
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import Entry from '../../domain/entry/Entry'
import Node from '../../domain/node/Node'
import useAsync from '../../hooks/useAsync'
import { BeakerEntryRepository } from '../../infrastructure/entry/BeakerEntryRepository'
import { BeakerNodeRepository } from '../../infrastructure/node/BeakerNodeRepository'
import Avatar from '../Avatar'
import TimelineRow from '../TimelineRow'

const NODE_REPOSITORY = new BeakerNodeRepository()
const GET_LOCAL_NODE = () => NODE_REPOSITORY.local()
const ENTRY_REPOSITORY = new BeakerEntryRepository()
const SEND_ENTRY = (entry: Entry) => ENTRY_REPOSITORY.create(entry)

const FACE_ARRAY = [
  faFaceAngry,
  faFaceDizzy,
  faFaceTired,
  faFaceSurprise,
  faFaceSmileWink,
  faFaceSmileBeam,
  faFaceTired,
  faFaceSadTear,
  faFaceSmile,
  faFaceSadCry,
  faFaceRollingEyes,
  faFaceFlushed,
  faFaceMehBlank,
  faFaceMeh,
  faFaceLaughWink,
  faFaceLaughSquint,
  faFaceLaughBeam,
  faFaceLaugh,
  faFaceKissWinkHeart,
  faFaceKissBeam,
  faFaceKiss,
  faFaceGrinWink,
  faFaceGrinWide,
  faFaceGrinTongueWink,
  faFaceGrinTongueSquint
]
const pickRandomFace = () => {
  return FACE_ARRAY[Math.floor(FACE_ARRAY.length * Math.random())]
}

interface InputProps {
  value: string | undefined
  onChange: (value: string | undefined) => void 
}

function Input({value, onChange}: InputProps) {
  return (
    <Form.Control
      className="border-0"
      size="lg"
      as="textarea"
      placeholder="What's going on?"
      style={{ height: '100px', resize: 'none' }}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

interface EntryOptionButtonProps {
  icon: IconDefinition
}

function EntryOptionButton({ icon }: EntryOptionButtonProps) {
  return (
    <Button
      className="d-flex p-0 border-0 fs-5 rounded-circle btn-square justify-content-center align-items-center"
      variant="outline-primary"
    >
      <FontAwesomeIcon fixedWidth icon={icon} />
    </Button>
  )
}

function SendButton() {
  return (
    <Button variant="primary rounded-pill">
      <span>{'Send'}</span>
    </Button>
  )
}

function ButtonRow() {
  return (
    <>
      <Col className="px-1" xs="auto">
        <EntryOptionButton icon={faImage} />
      </Col>
      <Col className="px-1" xs="auto">
        <EntryOptionButton icon={pickRandomFace()} />
      </Col>
      <Col className="px-1" xs="auto">
        <EntryOptionButton icon={faCalendarCheck} />
      </Col>
      <Col></Col>
      <Col className="p-0" xs="auto">
        <SendButton />
      </Col>
    </>
  )
}

interface InputCardProps {
  node: Node
}

function InputCard({ node }: InputCardProps) {

  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <>
      <Col className="p-0" xs={1}>
        <Avatar uri={node.avatar_url} />
      </Col>
      <Col>
        <Row>
          <Col>
            <Input value={value} onChange={setValue}/>
          </Col>
        </Row>
        <Row>
          <ButtonRow />
        </Row>
      </Col>
    </>
  )
}

function Content() {
  const { result, error, done } = useAsync(GET_LOCAL_NODE)

  if (error) return <h3>FIXME</h3>
  if (!done) return <Spinner animation="grow" variant="secondary" />

  return <InputCard node={result!} />
}

function NewEntryInput() {
  return (
    <TimelineRow>
      <Content />
    </TimelineRow>
  )
}

export default NewEntryInput
