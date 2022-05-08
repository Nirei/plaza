import { BeakerSourceRepository } from '../infrastructure/source/BeakerSourceRepository'

const REPOSITORY = new BeakerSourceRepository()

const create = () => REPOSITORY.create()
const update = () => REPOSITORY.update()

export const useSources = () => {
  return {
    create,
    update,
  }
}
