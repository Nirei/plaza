import * as NodeReference from './NodeReference'
import * as Username from './Username'
import * as Handle from './Handle'
import * as Bio from './Bio'
import * as NodeLocation from './Location'
import * as Uri from '../common/Uri'

const DEFAULT_AVATAR = ''
const DEFAULT_BACKGROUND = ''

export default class Node {
  /** Nodes public key ID */
  readonly id: NodeReference.Type
  /** User's username */
  readonly username: string
  /** User's handle */
  readonly handle: string
  /** User's biography */
  readonly bio: string
  /** Pointer to the message this entry is replying to. Not mandatory. */
  readonly location?: string
  /** Birth date */
  readonly birth?: Date
  /** Avatar URI */
  readonly avatar?: Uri.Type
  /** Profile background URI */
  readonly background?: Uri.Type

  constructor(
    id: string,
    username: string,
    handle: string,
    bio: string,
    location?: string,
    birth?: Date,
    avatar?: string,
    background?: string,
  ) {
    this.id = NodeReference.parse(id)
    this.username = Username.parse(username)
    this.handle = Handle.parse(handle)
    this.bio = Bio.parse(bio)
    this.location = location ? NodeLocation.parse(location) : undefined
    this.birth = birth
    this.avatar = avatar ? Uri.parse(avatar) : undefined
    this.background = background ? Uri.parse(background) : undefined
  }

  /**
   * User's avatar URL. Must be the relative path to an image stored in their account's hyperdrive.
   * It needs to be exactly 400x400 and cannot exceed 2MB.
   * Accepted formats are JPEG, GIF, PNG and WEBP.
   */
  get avatar_url() {
    return this.avatar ? `hyper://${this.id}/${this.avatar}` : DEFAULT_AVATAR
  }

  /**
   * User's avatar URL. Must be the relative path to an image stored in their account's hyperdrive.
   * It needs to be exactly 400x400 and cannot exceed 2MB.
   * Accepted formats are JPEG, GIF, PNG and WEBP.
   */
  get background_url() {
    return this.background ? `hyper://${this.id}/${this.background}` : DEFAULT_BACKGROUND
  }
}
