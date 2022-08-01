import apiCaller from '../helpers/apiCaller.js'

const find = async (query) => {
  return await apiCaller(`/api/vendors${query}`)
}

const create = async (data) => {
  return await apiCaller(`/api/vendors`, 'POST', data)
}

const _delete = async (id) => {
  return await apiCaller(`/api/vendors/${id}`, 'DELETE')
}

const update = async (id, data) => {
  return await apiCaller(`/api/vendors/${id}`, 'PUT', data)
}

const VendorApi = {
  find,
  create,
  delete: _delete,
  update,
}

export default VendorApi
