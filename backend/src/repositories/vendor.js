import Model from '../models/vendor.js'
import { Op } from 'sequelize'

const find = async ({ page, limit, keyword }) => {
  try {
    let _page = page ? (parseInt(page) >= 1 ? parseInt(page) : 1) : 1
    let _limit = limit ? (parseInt(limit) >= 1 ? parseInt(limit) : 5) : 20
    console.log('keyword', keyword)
    // let generateKeyword = keyword.split(',')

    // console.log(generateKeyword)

    let where = {}

    if (keyword) {
      where = {
        ...where,
        [Op.or]: [{ name: { [Op.like]: `%${keyword}%` } }, { name: { [Op.like]: `${keyword}` } }],
      }
    }

    const count = await Model.count({ where })
    const items = await Model.findAll({
      limit: _limit,
      where,
      offset: (_page - 1) * _limit,
      attributes: ['id', 'name'],
    })

    return {
      items,
      page: _page,
      limit: _limit,
      totalPages: Math.ceil(count / _limit),
      totalItems: count,
    }
  } catch (error) {
    throw error
  }
}

const findById = async (id) => {
  try {
    return await Model.findOne({ where: { id } })
  } catch (error) {
    throw error
  }
}

const create = async (data) => {
  try {
    return await Model.create(data)
  } catch (error) {
    throw error
  }
}

const update = async (id, data) => {
  try {
    const updated = await Model.update(data, {
      where: { id },
      returning: true,
      plain: true,
      raw: true,
    })

    return findById(updated[1].id)
  } catch (error) {
    throw error
  }
}

const _delete = async (id) => {
  try {
    return await Model.destroy({
      where: { id },
    })
  } catch (error) {
    throw error
  }
}

export default {
  find,
  findById,
  create,
  update,
  delete: _delete,
}
