import {
  faHome,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row } from 'react-bootstrap'
import Logo from '../Logo'

function SideMenuButton({
  text,
  icon,
}: {
  text: string
  icon: IconDefinition
}) {
  return (
    <Button variant="light rounded-pill">
      <FontAwesomeIcon icon={icon} />
      <span className="ms-2 fs-5">{text}</span>
    </Button>
  )
}

function SideMenu() {
  return (
    <Row>
      <Col></Col>
      <Col className="d-grid gap-3" xs={8}>
        <Row>
          <Logo />
        </Row>
        <Row>
          <SideMenuButton text="Home" icon={faHome} />
        </Row>
        <Row>
          <SideMenuButton text="Profile" icon={faUser} />
        </Row>
      </Col>
    </Row>
  )
}

export default SideMenu
