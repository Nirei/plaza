import { Col, Container, Row } from 'react-bootstrap'

interface Props {
  children?: JSX.Element
}

function Page({ children }: Props) {
  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col>{children}</Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Page
