import { Image } from 'react-bootstrap'
import * as NodeReference from '../../model/node/NodeReference'

interface Props {
  node: NodeReference.Type[]
}

function Avatar({ node }: Props) {
  return (
    <Image src="" roundedCircle /> 
  )
}

export default Avatar
