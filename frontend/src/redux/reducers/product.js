import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productList: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList(state, action) {
      return state
    },
  },
})

const { reducer, actions } = productSlice

export const { setProductList } = actions

export default reducer
