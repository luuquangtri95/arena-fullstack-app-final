import Repository from '../repositories/vendor.js'

export default {
  async find(req) {
    try {
      return await Repository.find()
    } catch (error) {
      throw error
    }
  },
}
