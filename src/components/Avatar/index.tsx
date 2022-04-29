import { useCallback } from 'react'
import { Image, Spinner } from 'react-bootstrap'
import * as NodeReference from '../../domain/node/NodeReference'
import useAsync from '../../hooks/useAsync'
import { MockNodeRepository } from '../../infrastructure/node/MockNodeRepository'

const NODE_REPOSITORY = new MockNodeRepository()

interface Props {
  node: NodeReference.Type
}

function Avatar({ node }: Props) {
  const findNode = useCallback(() => NODE_REPOSITORY.fetch(node), [node])
  const { result, loading, error } = useAsync(findNode, true)
  
  if (loading) return <Spinner animation='grow' variant='secondary' />
  if (error) return <h3>FIXME</h3>
  return <Image src={result?.avatar_url} fluid roundedCircle />
}

export default Avatar
