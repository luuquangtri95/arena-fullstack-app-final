import { ActionList, Button, ButtonGroup, Popover, Stack, Tag, TextField } from '@shopify/polaris'
import React, { useState } from 'react'
import FilterByPriceRange from './filters/FilterByPriceRange'

function Filters(props) {
  const { filter = {}, onChange = null, vendorList = [] } = props
  const [search, setSearch] = useState(filter.keyword || '')
  const [vendorActive, setVendorActive] = useState(false)
  const [statusActive, setStatusActive] = useState(false)
  const [publishActive, setPublishActive] = useState(false)
  const [priceActive, setPriceActive] = useState(false)

  const vendorActionList = vendorList.map((vendor) => ({
    content: vendor.name,
    value: '' + vendor.id,
    onAction: () => onChange({ ...filter, vendorId: '' + vendor.id }) & setVendorActive(false),
  }))

  const statusActionList = [
    {
      content: 'ACTIVE',
      value: 'active',
      onAction: () => onChange({ ...filter, status: 'active' }) & setStatusActive(false),
    },
    {
      content: 'DRAFT',
      value: 'draft',
      onAction: () => onChange({ ...filter, status: 'draft' }) & setStatusActive(false),
    },
    {
      content: 'ARCHIVED',
      value: 'archived',
      onAction: () => onChange({ ...filter, status: 'archived' }) & setStatusActive(false),
    },
  ]

  const publishActionList = [
    {
      content: 'TRUE',
      value: 'true',
      onAction: () => onChange({ ...filter, publish: 'true' }) & setPublishActive(false),
    },
    {
      content: 'FALSE',
      value: 'false',
      onAction: () => onChange({ ...filter, publish: 'false' }) & setPublishActive(false),
    },
  ]

  const handleSearch = (value) => {
    setSearch(value)

    if (window.__searchTimeout) {
      clearTimeout(window.__searchTimeout)
    }

    window.__searchTimeout = setTimeout(() => {
      onChange({ ...filter, keyword: value })
    }, 600)
  }

  return (
    <Stack vertical alignment="fill">
      <Stack>
        <Stack.Item fill>
          <TextField
            value={search}
            placeholder="Search By Title Or Description..."
            onChange={(value) => handleSearch(value)}
            clearButton
            onClearButtonClick={() => setSearch('') & onChange({ ...filter, keyword: '' })}
          />
        </Stack.Item>

        <Stack.Item>
          <ButtonGroup segmented>
            <Popover
              active={vendorActive}
              activator={
                <Button disclosure onClick={() => setVendorActive(!vendorActive)}>
                  Vendor
                </Button>
              }
              onClose={() => setVendorActive(false)}
            >
              <ActionList actionRole="menuitem" items={vendorActionList} />
            </Popover>

            <Popover
              active={statusActive}
              activator={
                <Button disclosure onClick={() => setStatusActive(!statusActive)}>
                  Status
                </Button>
              }
              onClose={() => setStatusActive(false)}
            >
              <ActionList actionRole="menuitem" items={statusActionList} />
            </Popover>

            <Popover
              active={publishActive}
              activator={
                <Button disclosure onClick={() => setPublishActive(!publishActive)}>
                  Publish
                </Button>
              }
              onClose={() => setPublishActive(false)}
            >
              <ActionList actionRole="menuitem" items={publishActionList} />
            </Popover>

            <Popover
              active={priceActive}
              activator={
                <Button disclosure onClick={() => setPriceActive(!priceActive)}>
                  Price Range
                </Button>
              }
              onClose={() => setPriceActive(false)}
            >
              <ActionList actionRole="menuitem" items={[{ content: <FilterByPriceRange /> }]} />
            </Popover>
          </ButtonGroup>
        </Stack.Item>
      </Stack>

      <Stack>
        {Boolean(filter.vendorId) && (
          <Tag onRemove={() => onChange({ ...filter, vendorId: '' })}>
            Vendor: {vendorActionList.find((item) => item.value === filter.vendorId)?.content}
          </Tag>
        )}

        {Boolean(filter.status) && (
          <Tag onRemove={() => onChange({ ...filter, status: '' })}>
            Status: {statusActionList.find((item) => item.value === filter.status)?.content}
          </Tag>
        )}

        {Boolean(filter.publish) && (
          <Tag onRemove={() => onChange({ ...filter, publish: '' })}>
            Publish: {publishActionList.find((item) => item.value === filter.publish)?.content}
          </Tag>
        )}
      </Stack>
    </Stack>
  )
}

export default Filters
