import { useEffect } from 'react'
import { useState } from 'react'
import ProductApi from '../../api/product'
import qs from 'query-string'
import { useLocation } from 'react-router-dom'
import CreateForm from '../Products/CreateFrom'
import { Card, Stack } from '@shopify/polaris'
import AppHeader from '../../components/AppHeader'
import Table from '../Products/Table'
import MyPagination from '../../components/MyPagination'

function ProductsPage(props) {
  const { actions } = props
  const location = useLocation()
  const [productList, setProductList] = useState(null)
  const [created, setCreated] = useState(null)

  const getProductList = async (query = '?page=1&limit=20') => {
    try {
      const res = await ProductApi.find(query)
      if (!res.success) {
        throw res.error
      }

      setProductList(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleFilter = () => {}

  useEffect(() => {
    getProductList()
  }, [])

  const handleSubmit = () => {}

  if (created) {
    return (
      <CreateForm
        {...props}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={(formData) => handleSubmit(formData)}
      />
    )
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        title="Products"
        actions={[
          {
            label: 'Add products',
            primary: true,
            onClick: () => setCreated({}),
          },
        ]}
      />
      <Card>
        <Card.Section>
          <div>
            Total items: <b>{productList?.totalItems}</b>
          </div>
        </Card.Section>

        <Card.Section>
          <Table {...props} {...productList} onEdit={(item) => setCreated(item)} />
        </Card.Section>
      </Card>
    </Stack>
  )
}

export default ProductsPage
