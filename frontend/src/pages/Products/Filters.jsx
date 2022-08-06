import { ActionList, Button, ButtonGroup, Popover, Stack, Tag, TextField } from '@shopify/polaris'
import { CaretDownMinor } from '@shopify/polaris-icons'
import React, { useState } from 'react'
import FilterByPriceRange from './filters/FilterByPriceRange'
import './styles.scss'

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

  const handlePriceRangeChange = (value) => {
    onChange({ ...filter, price: value.toString() })
    setPriceActive(false)
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

            <div>
              <Button id="button-price-range" onClick={() => setPriceActive(!priceActive)}>
                Price Range
                <div className="icon-arrow-down">
                  <CaretDownMinor />
                </div>
              </Button>
            </div>
          </ButtonGroup>
        </Stack.Item>
      </Stack>

      {priceActive && (
        <div style={{ width: 400 }}>
          <FilterByPriceRange onChange={handlePriceRangeChange} />
        </div>
      )}

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

        {Boolean(filter.price) && (
          <Tag onRemove={() => onChange({ ...filter, price: '' })}>
            price: from{' '}
            {new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 3 }).format(
              filter.price.split(',')[0],
            )}{' '}
            to{' '}
            {new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 3 }).format(
              filter.price.split(',')[1],
            )}
          </Tag>
        )}
      </Stack>
    </Stack>
  )
}

export default Filters
