import { Stack, Tag } from '@shopify/polaris'
import React, { useState } from 'react'
import Search from './Search'

function Filter({ items = [], onChange = null, filter = {} }) {
  const handleSearchChange = (searchValue) => {
    onChange({ ...filter, keyword: searchValue })
  }
  return (
    <Stack vertical>
      <Stack.Item fill>
        {/* search */}
        <Search items={items} onChange={(value) => handleSearchChange(value)} />
      </Stack.Item>

      <Stack.Item>
        {Boolean(filter.keyword) && (
          <Tag onRemove={() => onChange({ ...filter, keyword: '' })}>Vendor: {filter.keyword}</Tag>
        )}
      </Stack.Item>

      {/* ... filters */}
    </Stack>
  )
}

export default Filter
