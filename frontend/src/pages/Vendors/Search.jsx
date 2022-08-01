import { Autocomplete, Icon } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Search({ items, onChange = null, filters = {} }) {
  const [selectedOptions, setSelectedOptions] = useState([])
  const deselectedOptions = items.map((item) => ({
    value: String(item.id),
    label: item.name,
  }))
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(deselectedOptions)

  const updateText = (value) => {
    setInputValue(value)

    const resultOptions = deselectedOptions.filter((option) => option.label.includes(inputValue))
    setOptions(resultOptions)
  }

  const updateSelection = (selected) => {
    setSelectedOptions((prevState) => [...prevState, ...selected])
  }

  useEffect(() => {
    onChange(selectedOptions)
  }, [selectedOptions])

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Search Vendor"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
      clearButton
      onClearButtonClick={() => setInputValue('') & onChange('')}
    />
  )

  return (
    <div>
      <Autocomplete
        options={options.filter((item) => !selectedOptions.includes('' + item.value))}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  )
}
