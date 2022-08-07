import { Autocomplete, Stack, Tag } from '@shopify/polaris'
import { useEffect, useState } from 'react'

export default function FilterVendorSuggest({ optionList, onChange, value }) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(optionList)

  const updateText = (value) => {
    setInputValue(value)

    if (value === '') {
      setOptions(optionList)
      return
    }

    const resultOptions = optionList.filter((option) => option.label.includes(inputValue))

    setOptions(resultOptions)
  }

  const removeTag = (tag) => () => {
    const options = [...value]
    options.splice(options.indexOf(tag), 1)

    onChange?.(options)
  }

  const handleSelectChange = (selected) => {
    onChange?.([...selected])
  }

  const verticalContentMarkup =
    value.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {value.map((option) => {
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {optionList.find((it) => it.value === option)?.label}
            </Tag>
          )
        })}
      </Stack>
    ) : null

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Vendors"
      value={inputValue}
      placeholder="Vendor Search: Iphone, Samsung..."
      verticalContent={verticalContentMarkup}
      clearButton
      onClearButtonClick={() => setInputValue('')}
    />
  )

  return (
    <div>
      <Autocomplete
        allowMultiple
        options={options}
        selected={value}
        textField={textField}
        onSelect={handleSelectChange}
        listTitle="Suggested Vendors"
      />
    </div>
  )
}
