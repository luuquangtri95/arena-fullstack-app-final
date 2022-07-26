import Model from '../models/vendor.js'

const find = async () => {
  try {
    return await Model.findAll({
      attributes: ['id', 'name'],
    })
  } catch (error) {
    throw error
  }
}

export default {
  find,
}
