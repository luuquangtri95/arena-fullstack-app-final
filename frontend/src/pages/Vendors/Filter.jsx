import { Stack, TextField } from '@shopify/polaris'
import React, { useState } from 'react'

function Filter({ onChange = null, filter = {} }) {
  const [keyword, setKeyword] = useState(filter.keyword || '')

  const handleSearchChange = (value) => {
    setKeyword(value)

    if (window.__searchTimeout) {
      clearTimeout(window.__searchTimeout)
    }

    window.__searchTimeout = setTimeout(() => {
      onChange({ ...filter, keyword: value })
    }, 600)
  }

  return (
    <Stack vertical>
      <Stack.Item fill>
        {/* search */}
        <TextField
          value={keyword}
          placeholder="Search By vendor..."
          onChange={(value) => handleSearchChange(value)}
          clearButton
          onClearButtonClick={() => setKeyword('') & onChange({ ...filter, keyword: '' })}
        />
      </Stack.Item>

      {/* ... filters */}
    </Stack>
  )
}

export default Filter
