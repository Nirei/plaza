import { Row } from 'react-bootstrap'
import { Col, Container } from 'react-bootstrap'

interface Props {
  children?: JSX.Element
}

function Page({ children }: Props) {
  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col xs={7} s={6} md={5} lg={4}>{children}</Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Page
