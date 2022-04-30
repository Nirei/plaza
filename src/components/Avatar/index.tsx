import { Image } from 'react-bootstrap'
import * as Uri from '../../domain/common/Uri'

interface Props {
  uri: Uri.Type
}

function Avatar({ uri }: Props) {
  return <Image src={uri} fluid roundedCircle />
}

export default Avatar
