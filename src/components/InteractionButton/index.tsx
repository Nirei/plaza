import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: IconDefinition
}

function InteractionButton({ icon }: Props) {
  return (
    <Button className="border-0" variant="outline-secondary">
      <FontAwesomeIcon icon={icon} />
    </Button>
  )
}

export default InteractionButton
