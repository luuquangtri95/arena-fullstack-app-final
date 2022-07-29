import Repository from '../repositories/vendor.js'

export default {
  async find(req) {
    try {
      console.log(req)
      return await Repository.find(req.query)
    } catch (error) {
      throw error
    }
  },

  async findById(req) {
    try {
      const { id } = req.params
      return await Repository.findById(id)
    } catch (error) {
      throw error
    }
  },

  async create(req) {
    try {
      const data = { ...req.body }

      return await Repository.create(data)
    } catch (error) {
      throw error
    }
  },

  async update(req) {
    try {
      const { id } = req.params
      const data = { ...req.body }

      return await Repository.update(id, data)
    } catch (error) {
      throw error
    }
  },

  async delete(req) {
    try {
      const { id } = req.params

      return await Repository.delete(id)
    } catch (error) {
      throw error
    }
  },
}
