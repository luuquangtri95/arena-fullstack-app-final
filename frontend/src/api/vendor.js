import apiCaller from '../helpers/apiCaller.js'

const find = async (query) => {
  return await apiCaller(`/api/vendors${query}`)
}

const VendorApi = {
  find,
}

export default VendorApi
