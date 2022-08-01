import { Stack, Tag, Autocomplete } from '@shopify/polaris'
import { useState, useCallback, useMemo, useEffect } from 'react'

export default function SearchMultipleField({ items, onChange }) {
  const deselectedOptions = items.map((item) => ({
    value: item.name,
    label: item.name,
  }))

  const [selectedOptions, setSelectedOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(deselectedOptions)

  const updateText = (value) => {
    setInputValue(value)

    if (value === '') {
      setOptions(deselectedOptions)
      return
    }

    const filterRegex = new RegExp(value, 'i')
    const resultOptions = deselectedOptions.filter((option) => option.label.match(filterRegex))
    let endIndex = resultOptions.length - 1
    if (resultOptions.length === 0) {
      endIndex = 0
    }

    setOptions(resultOptions)
  }

  const removeTag = (tag) => () => {
    const options = [...selectedOptions]
    options.splice(options.indexOf(tag), 1)
    setSelectedOptions(options)

    if (selectedOptions.length === 0) {
      onChange?.('')
    } else {
      onChange?.(selectedOptions)
    }
  }

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => {
          let tagLabel = ''
          tagLabel = option.replace('_', ' ')
          tagLabel = titleCase(tagLabel)
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          )
        })}
      </Stack>
    ) : null

  useEffect(() => {
    onChange?.(selectedOptions)
  }, [selectedOptions])

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      placeholder="Vintage, cotton, summer"
      verticalContent={verticalContentMarkup}
    />
  )

  return (
    <div>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="Suggested Tags"
      />
    </div>
  )

  function titleCase(string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('')
  }
}
