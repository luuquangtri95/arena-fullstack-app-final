import { Card, Stack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import ProductApi from '../../api/product'
import UploadApi from '../../api/upload'
import vendorApi from '../../api/vendor'
import AppHeader from '../../components/AppHeader'
import CreateForm from '../Products/CreateFrom'
import Table from '../Products/Table'
import qs from 'query-string'
import PagePreloader from '../../components/PagePreloader'
import ConfirmDelete from '../Products/ConfirmDelete'
import MyPagination from '../../components/MyPagination'
import Filters from './Filters'

function ProductsPage(props) {
  const { actions } = props
  const [productList, setProductList] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)
  const [vendorList, setVendorList] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const getProductList = async (query) => {
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

  useEffect(() => {
    if (!isReady && productList && vendorList) {
      setIsReady(true)
    }
  })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await vendorApi.find()
        if (!res.success) {
          throw res.error
        }

        setVendorList(res.data)
      } catch (error) {
        console.log(error)
        actions.showNotify({ error: true, message: error.message })
      } finally {
        actions.hideAppLoading()
      }
    })()
  }, [])

  useEffect(() => {
    console.log('useEffect location')
    console.log(qs.parse(location.search))
    getProductList(location.search)
  }, [location])

  const handleFilter = (filter) => {
    let params = qs.parse(location.search) || {}

    if ('page' in filter) {
      if (filter.page) {
        params = { ...params, page: filter.page }
      } else {
        delete params.page
      }
    }

    if ('limit' in filter) {
      if (filter.limit) {
        params = { ...params, limit: filter.limit }
      } else {
        delete params.limit
      }
    }

    if ('keyword' in filter) {
      if (filter.keyword) {
        params = { ...params, keyword: filter.keyword }
      } else {
        delete params.keyword
      }
    }

    if ('vendorId' in filter) {
      if (filter.vendorId) {
        params = { ...params, vendorId: filter.vendorId }
      } else {
        delete params.vendorId
      }
    }

    if ('status' in filter) {
      if (filter.status) {
        params = { ...params, status: filter.status }
      } else {
        delete params.status
      }
    }

    if ('publish' in filter) {
      if (filter.publish) {
        params = { ...params, publish: filter.publish }
      } else {
        delete params.publish
      }
    }

    setSearchParams(params)
  }

  const handleSubmit = async (formData) => {
    try {
      actions.showAppLoading()

      // handle upload images
      if (formData['thumbnail'].value) {
        let images = await UploadApi.upload([formData['thumbnail'].value])
        if (!images.success) {
          actions.showNotify({ error: true, message: images.error.message })
        }

        formData['thumbnail'].value = images.data[0]
      } else if (formData['thumbnail'].originValue) {
        formData['thumbnail'].value = formData['thumbnail'].originValue
      }

      if (formData['images'].value.length) {
        let images = await UploadApi.upload(formData['images'].value)
        if (!images.success) {
          actions.showNotify({ error: true, message: images.error.message })
        }

        formData['images'].value = [...images.data, ...formData['images'].originValue]
      } else if (formData['images'].originValue.length) {
        formData['images'].value = formData['images'].originValue
      }

      // handle data before submit
      let data = {}

      Object.keys(formData)
        .filter((key) => !['images'].includes(key))
        .forEach((key) => (formData[key].value ? (data[key] = formData[key].value) : null))

      if (formData['images'].value.length) {
        data['images'] = formData['images'].value
      } else {
        data['images'] = []
      }

      if (!formData['thumbnail'].value) {
        data['thumbnail'] = ''
      }

      let res = null
      if (created?.id) {
        // update

        res = await ProductApi.update(created.id, data)
      } else {
        // create
        res = await ProductApi.create(data)
      }
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: created?.id ? 'Saved' : 'Added' })

      setCreated(null)
      setSearchParams({})
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleDelete = async (itemDelete) => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.delete(itemDelete.id)
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: 'Deleted' })

      setSearchParams(qs.parse(location.search))
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (!isReady) {
    return <PagePreloader />
  }

  if (created) {
    return (
      <CreateForm
        {...props}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={(formData) => handleSubmit(formData)}
        vendorList={vendorList}
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
          <Filters
            filter={qs.parse(location.search)}
            vendorList={vendorList}
            onChange={(filter) => handleFilter(filter)}
          />
        </Card.Section>

        <Card.Section>
          <div>
            Total items: <b>{productList?.totalItems}</b>
          </div>
        </Card.Section>

        <Card.Section>
          <Table
            {...props}
            {...productList}
            onEdit={(item) => setCreated(item)}
            onDelete={(item) => setDeleted(item)}
          />
        </Card.Section>

        <Card.Section>
          <MyPagination
            page={productList.page}
            limit={productList.limit}
            totalPages={productList.totalPages}
            onChange={({ page, limit }) => handleFilter({ page, limit })}
          />
        </Card.Section>
      </Card>

      {deleted && (
        <ConfirmDelete
          onDiscard={() => setDeleted(null)}
          onSubmit={() => handleDelete(deleted) & setDeleted(null)}
        />
      )}
    </Stack>
  )
}

export default ProductsPage
