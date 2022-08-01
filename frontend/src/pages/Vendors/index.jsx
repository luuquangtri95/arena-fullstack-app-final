import { Card, Stack } from '@shopify/polaris'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import vendorApi from '../../api/vendor'
import AppHeader from '../../components/AppHeader'
import Table from '../Vendors/Table'
import { useLocation, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import VendorApi from '../../api/vendor'
import MyPagination from '../../components/MyPagination'
import PagePreloader from '../../components/PagePreloader'
import CreateForm from './CreateForm'
import ConfirmDelete from './ConfirmDelete'
import Filter from './Filter'

function VendorsPage(props) {
  const { actions } = props
  const [isReady, setIsReady] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)
  const [vendorList, setVendorList] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (!isReady && vendorList) {
      setIsReady(true)
    }
  })

  useEffect(() => {
    console.log('useEffect location')
    console.log(qs.parse(location.search))
    getVendorList(location.search)
  }, [location])

  const getVendorList = async (query) => {
    try {
      actions.showAppLoading()

      const response = await VendorApi.find(query)

      setVendorList(response.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

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

    setSearchParams(params)
  }

  const handleSubmit = async (formData) => {
    try {
      actions.showAppLoading()

      let data = {}
      Object.keys(formData).forEach((key) =>
        formData[key].value ? (data[key] = formData[key].value) : null,
      )

      let res = null
      if (created?.id) {
        // update
        res = await VendorApi.update(created.id, data)
      } else {
        // create
        res = await VendorApi.create(data)
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

  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await VendorApi.delete(deleted.id)
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: 'Deleted' })

      getVendorList(location.search)
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
        title="Countries"
        actions={[
          {
            label: 'Add country',
            primary: true,
            onClick: () => setCreated({}),
          },
        ]}
      />

      <Card>
        <Card.Section>
          <Filter
            filter={qs.parse(location.search)}
            {...vendorList}
            onChange={(filter) => handleFilter(filter)}
          />
        </Card.Section>

        <Card.Section>
          <div>
            Total items: <b>{vendorList?.totalItems}</b>
          </div>
        </Card.Section>

        <Table
          {...props}
          {...vendorList}
          onEdit={(item) => setCreated(item)}
          onDelete={(item) => setDeleted(item)}
        />

        <Card.Section>
          <MyPagination
            page={vendorList?.page}
            limit={vendorList?.limit}
            totalPages={vendorList?.totalPages}
            onChange={({ page, limit }) => handleFilter({ page, limit })}
          />
        </Card.Section>

        {deleted && (
          <ConfirmDelete
            onDiscard={() => setDeleted(null)}
            onSubmit={() => handleDelete(deleted) & setDeleted(null)}
          />
        )}
      </Card>
    </Stack>
  )
}

export default VendorsPage
