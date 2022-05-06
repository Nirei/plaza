import * as NodeReference from '../node/NodeReference'

export const ORIGIN = NodeReference.parse('6a688aa1109653b8e4644bc58515e2c30e6212aac77ff9bc195375f0372382ee')

/**
 * Repository for source code information
 */
export default interface SourceRepository {
  /**
   * Creates a new local hyperdrive with a copy of the source code from ORIGIN.
   * @returns the NodeReference of the created hyperdrive.
   */
  create(): Promise<NodeReference.Type>

  /**
   * Checks if an update has been published in ORIGIN. Updates node to the new version.
   * @returns true if an update has been found and installed, false otherwise.
   */
  update(): Promise<boolean>
}