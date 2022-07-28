import { ActionList, Button, DataTable, Popover, Stack, Thumbnail } from '@shopify/polaris'
import Avatar from '../../components/Avatar/index.jsx'
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons'
import React, { useState } from 'react'
import formatDateTime from '../../helpers/formatDateTime'

function Table(props) {
  const { items = [], page = 1, limit = 20, onEdit = null, onDelete = null } = props
  const [selected, setSelected] = useState(null)

  let rows = items.map((item, index) => [
    (page - 1) * limit + index + 1,
    <Stack vertical spacing="extraTight">
      <Stack spacing="tight" wrap={false}>
        <Avatar alt={item?.title} src={item.thumbnail} size="3em" />

        <div>
          <b>{item?.title}</b>
        </div>
      </Stack>
      <Stack spacing="extraTight">
        {item.images?.length > 0 &&
          item.images.map((_item, _index) => (
            <Thumbnail key={_index} alt="" source={_item} size="small" />
          ))}
      </Stack>
    </Stack>,

    <Stack vertical spacing="extraTight">
      <Stack.Item>Description: {item?.description}</Stack.Item>
      <Stack.Item>URL SEO: {item?.handle}</Stack.Item>
      <Stack.Item>
        Price: {item?.price.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' })}
      </Stack.Item>
      <Stack.Item>Publish: {item?.publish ? 'TRUE' : 'FALSE'}</Stack.Item>
      <Stack.Item>Status: {item?.status}</Stack.Item>
      <Stack.Item>Vendor: {item?.vendor?.name}</Stack.Item>
    </Stack>,

    <Popover
      active={item.id === selected?.id}
      activator={
        <Button
          onClick={() => setSelected(selected?.id === item.id ? null : item)}
          icon={MobileVerticalDotsMajor}
          outline
        />
      }
      onClose={() => setSelected(null)}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'Preview',
            onAction: () => setSelected(null),
          },
          {
            content: 'Edit',
            onAction: () => onEdit(item) & setSelected(null),
          },
          {
            content: 'Delete',
            onAction: () => onDelete(item) & setSelected(null),
          },
        ]}
      />
    </Popover>,
  ])

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'text', 'text']}
      headings={['No.', 'Title', 'Advance', 'Action']}
      rows={rows}
    />
  )
}

export default Table
