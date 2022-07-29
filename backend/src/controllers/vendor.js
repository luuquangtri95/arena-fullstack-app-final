import ResponseHandler from '../helpers/responseHandler.js'
import Service from '../services/vendor.js'

export default {
  async find(req, res) {
    try {
      const data = await Service.find(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  async findById(req, res) {
    try {
      const data = await Service.findById(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  async create(req, res) {
    try {
      const data = await Service.create(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  async update(req, res) {
    try {
      const data = await Service.update(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  async delete(req, res) {
    try {
      const data = await Service.delete(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
