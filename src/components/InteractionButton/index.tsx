import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: IconDefinition
}

function InteractionButton({ icon }: Props) {
  return (
    <Button
      className="p-0 border-0 rounded-circle btn-square justify-content-center align-items-center"
      variant="outline-secondary"
    >
      <FontAwesomeIcon fixedWidth icon={icon} />
    </Button>
  )
}

export default InteractionButton
