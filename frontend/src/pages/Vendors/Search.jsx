import { Autocomplete, Icon } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'
import { useState } from 'react'

export default function Search({ items, onChange = null, filters = {} }) {
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
    setOptions(resultOptions)
  }

  const updateSelection = (selected) => {
    const selectedValue = selected.map((selectedItem) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selectedItem)
      })
      return matchedOption && matchedOption.label
    })

    setSelectedOptions(selected)
    setInputValue(selectedValue[0])

    //

    onChange?.(selected)
    setInputValue('')
  }

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
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  )
}
