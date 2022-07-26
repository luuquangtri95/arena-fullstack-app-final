import ResponseHandler from '../helpers/responseHandler.js'
import Service from '../services/vendor.js'

export default {
  async find(req, res) {
    try {
      const data = await Service.find()
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
