import { Stack, Tag } from '@shopify/polaris'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Search from './Search'

function Filter({ items = [], onChange = null, filter = {} }) {
  const [vendorIds, setVendorIds] = useState([])

  const handleRemoveTag = (idx) => {
    let _vendorIds = JSON.parse(JSON.stringify(vendorIds))

    _vendorIds.splice(idx, 1)

    setVendorIds(_vendorIds)
  }

  useEffect(() => {
    const newValue = vendorIds.join(',')
    onChange({ ...filter, vendorId: newValue })
  }, [vendorIds])

  return (
    <Stack vertical>
      <Stack.Item fill>
        {/* search */}
        <Search
          options={items.map((item) => ({
            value: '' + item.id,
            label: item.name,
          }))}
          value={vendorIds}
          onChange={(value) => setVendorIds(value)}
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

export default Filter
