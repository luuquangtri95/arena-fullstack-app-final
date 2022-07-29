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
      }
    } else {
      delete params.page
    }

    if ('limit' in filter) {
      if (filter.limit) {
        params = { ...params, limit: filter.limit }
      }
    } else {
      delete params.limit
    }

    setSearchParams(params)
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
        <Card.Section>{/* filter */}</Card.Section>

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
      </Card>
    </Stack>
  )
}

export default VendorsPage
