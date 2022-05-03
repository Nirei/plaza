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
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useState } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import * as EntryContent from '../../domain/entry/EntryContent'
import { CreateEntryParameters } from '../../domain/entry/EntryRepository'
import Node from '../../domain/node/Node'
import useAsync from '../../hooks/useAsync'
import { BeakerEntryRepository } from '../../infrastructure/entry/BeakerEntryRepository'
import { BeakerNodeRepository } from '../../infrastructure/node/BeakerNodeRepository'
import AutogrowingTextarea from '../AutogrowableTextarea'
import Avatar from '../Avatar'
import TimelineRow from '../TimelineRow'

const NODE_REPOSITORY = new BeakerNodeRepository()
const GET_LOCAL_NODE = () => NODE_REPOSITORY.local()
const ENTRY_REPOSITORY = new BeakerEntryRepository()
const SEND_ENTRY = (entry: CreateEntryParameters) =>
  ENTRY_REPOSITORY.create(entry)

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
  faFaceGrinTongueSquint,
]
const pickRandomFace = () => {
  return FACE_ARRAY[Math.floor(FACE_ARRAY.length * Math.random())]
}

interface InputProps {
  value: string | undefined
  onChange: (value: string | undefined) => void
}

function Input({ value, onChange }: InputProps) {
  return (
    <AutogrowingTextarea
      value={value}
      onChange={onChange}
      placeholder="What's going on?"
    />
  )
}

interface EntryOptionButtonProps {
  icon: IconDefinition
  onClick: () => void
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

interface SendButtonProps {
  onClick: () => void
  disabled: boolean
}

function SendButton({ onClick, disabled }: SendButtonProps) {
  return (
    <Button
      variant="primary rounded-pill"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{'Send'}</span>
    </Button>
  )
}

interface ButtonRowProps {
  onPicture: () => void
  onEmoji: () => void
  onSchedule: () => void
  onSend: () => void
  sendDisabled: boolean
}

function ButtonRow({
  onPicture,
  onEmoji,
  onSchedule,
  onSend,
  sendDisabled,
}: ButtonRowProps) {
  return (
    <>
      <Col className="px-1" xs="auto">
        <EntryOptionButton onClick={onPicture} icon={faImage} />
      </Col>
      <Col className="px-1" xs="auto">
        <EntryOptionButton onClick={onEmoji} icon={pickRandomFace()} />
      </Col>
      <Col className="px-1" xs="auto">
        <EntryOptionButton onClick={onSchedule} icon={faCalendarCheck} />
      </Col>
      <Col></Col>
      <Col className="p-0" xs="auto">
        <SendButton disabled={sendDisabled} onClick={onSend} />
      </Col>
    </>
  )
}

interface InputCardProps {
  node: Node
}

function InputCard({ node }: InputCardProps) {
  const [value, setValue] = useState<string | undefined>(undefined)

  const sendEntry = useCallback(
    () => SEND_ENTRY({ content: EntryContent.parse(value!) }),
    [value],
  )

  const { execute } = useAsync(sendEntry, false)

  return (
    <>
      <Col className="p-0" xs={1}>
        <Avatar uri={node.avatar_url} />
      </Col>
      <Col>
        <Row className="mt-3 mb-2">
          <Col>
            <Input value={value} onChange={setValue} />
          </Col>
        </Row>
        <Row className="align-items-center">
          <ButtonRow
            onPicture={() => {}}
            onEmoji={() => {}}
            onSchedule={() => {}}
            onSend={execute}
            sendDisabled={!value}
          />
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
