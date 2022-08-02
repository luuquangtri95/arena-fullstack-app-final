import { Stack, Tag } from '@shopify/polaris'
import React from 'react'
import { useState } from 'react'
import Search from './Search'
import SearchClone from './SearchClone'

function FilterClone({ items = [], onChange = null, filter = {} }) {
  const [vendorIds, setVendorIds] = useState([])

  console.log('vendorIds :>> ', vendorIds)

  const handleRemoveTag = (idx) => {
    let _vendorIds = JSON.parse(JSON.stringify(vendorIds))

    _vendorIds.splice(idx, 1)

    const newValue = _vendorIds.join(',')

    onChange({ ...filter, vendorId: newValue })
    setVendorIds(_vendorIds)
  }

  return (
    <Stack vertical>
      <Stack.Item fill>
        {/* search */}
        <SearchClone
          options={items.map((item) => ({
            value: String(item.id),
            label: item.name,
            name: item.name,
          }))}
          onChange={(value) => setVendorIds(value)}
          value={vendorIds}
        />
      </Stack.Item>

      <Stack.Item>
        <Stack>
          {vendorIds?.map((x, idx) => (
            <Stack.Item key={idx}>
              <Tag onRemove={() => handleRemoveTag(idx)}>
                Vendor: {items.find((it) => String(it.id) === x)?.name}
              </Tag>
            </Stack.Item>
          ))}
        </Stack>
      </Stack.Item>

      {/* ... filters */}
    </Stack>
  )
}

export default FilterClone
