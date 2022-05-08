import { Row } from 'react-bootstrap'
import { Col, Container } from 'react-bootstrap'
import SideMenu from '../SideMenu'

interface Props {
  children?: JSX.Element
}

function Page({ children }: Props) {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <SideMenu />
        </Col>
        <Col xs={6}>{children}</Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Page
