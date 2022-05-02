import { Row } from 'react-bootstrap'

interface Props {
  children?: React.ReactNode
}

function TimelineRow({ children }: Props) {
  return <Row className="border-top border-light px-3 py-2 m-0">{children}</Row>
}

export default TimelineRow
