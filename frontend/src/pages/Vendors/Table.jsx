import PropTypes from 'prop-types'
import { ActionList, Button, DataTable, Popover, Stack } from '@shopify/polaris'
import React, { useState } from 'react'
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons'

Table.propTypes = {
  items: PropTypes.array,
  page: PropTypes.number,
  limit: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

Table.defaultProps = {
  items: [],
  page: 1,
  limit: 5,
  onEdit: () => null,
  onDelete: () => null,
}

function Table(props) {
  const { items, page, limit, onEdit, onDelete } = props
  const [selected, setSelected] = useState(null)

  let rows = items.map((item, index) => [
    (page - 1) * limit + index + 1,
    <Stack vertical spacing="extraTight">
      <div>
        <b>{item.name}</b>
      </div>
    </Stack>,
    <Stack vertical spacing="extraTight"></Stack>,
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
      headings={['No.', 'Vendor', 'Advanced', 'Action']}
      rows={rows}
    />
  )
}

export default Table
