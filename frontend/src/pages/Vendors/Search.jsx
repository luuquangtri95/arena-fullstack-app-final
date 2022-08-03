import { Autocomplete, Icon } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'
import { useState } from 'react'

export default function Search({ options = [], value = [], onChange = () => {}, onSearchChange }) {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState(options)

  const updateText = (value) => {
    setInputValue(value)

    const resultOptions = options.filter((option) => option.label.includes(inputValue))
    setSelectedOptions(resultOptions)

    onSearchChange(inputValue)
  }

  const updateSelection = (selected) => {
    onChange([...value, ...selected])
    setInputValue('')
  }

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Search Vendor"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search Vendor..."
      clearButton
      onClearButtonClick={() => setInputValue('')}
    />
  )

  return (
    <div>
      <Autocomplete
        options={selectedOptions.filter((item) => !value.includes('' + item.value))}
        selected={value}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  )
}
