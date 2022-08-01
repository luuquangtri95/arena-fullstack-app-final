import { Stack, Tag } from '@shopify/polaris'
import React from 'react'
import Search from './Search'

function Filter({ items = [], onChange = null, filter = {} }) {
  const handleSearchChange = (vendorIdList) => {
    const newValue = vendorIdList.join(',')
    onChange({ ...filter, vendorId: newValue })
  }
  return (
    <Stack vertical>
      <Stack.Item fill>
        {/* search */}
        <Search items={items} onChange={(value) => handleSearchChange(value)} />
      </Stack.Item>

      <Stack.Item>
        {Boolean(filter.vendorId) && (
          <Tag onRemove={() => onChange({ ...filter, vendorId: '' })}>
            Vendor: {filter.vendorId}
          </Tag>
        )}
      </Stack.Item>

      {/* ... filters */}
    </Stack>
  )
}

export default Filter
