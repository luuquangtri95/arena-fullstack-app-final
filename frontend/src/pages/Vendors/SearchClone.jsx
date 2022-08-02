import { Autocomplete, Icon } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'
import { useState } from 'react'

export default function SearchClone({ options = [], value = [], onChange = null }) {
  const [inputValue, setInputValue] = useState('')
  const [selectOptions, setSelectOptions] = useState(options)

  const updateText = (value) => {
    setInputValue(value)

    const resultOptions = options.filter((option) => option.label.includes(inputValue))

    setSelectOptions(resultOptions)
  }

  const updateSelection = (selected) => {
    onChange([...value, ...selected])
  }

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Search Vendor"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
      clearButton
      onClearButtonClick={() => setInputValue('')}
    />
  )

  return (
    <div>
      <Autocomplete
        options={selectOptions.filter((item) => !value.includes('' + item.value))}
        selected={value}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  )
}
