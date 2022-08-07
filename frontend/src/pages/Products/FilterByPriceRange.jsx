import { Button, RangeSlider, Stack, TextField } from '@shopify/polaris'
import { useState } from 'react'

const initialValue = [50000, 200000]
const prefix = 'đ'
const min = 0
const max = 1000000
const step = 100

export default function FilterByPriceRange({ onChange = null, filter = [] }) {
  const [intermediateTextFieldValue, setIntermediateTextFieldValue] = useState(initialValue)
  const [rangeValue, setRangeValue] = useState(filter)

  const handleRangeSliderChange = (value) => {
    setRangeValue(value)
    setIntermediateTextFieldValue(value)
  }

  const handleLowerTextFieldChange = (value) => {
    const upperValue = rangeValue[1]
    setIntermediateTextFieldValue([parseInt(value, 100), upperValue])
  }

  const handleUpperTextFieldChange = (value) => {
    const lowerValue = rangeValue[0]
    setIntermediateTextFieldValue([lowerValue, parseInt(value, 100)])
  }

  const handleLowerTextFieldBlur = () => {
    const upperValue = rangeValue[1]
    const value = intermediateTextFieldValue[0]

    setRangeValue([parseInt(value, 100), upperValue])
  }

  const handleUpperTextFieldBlur = () => {
    const lowerValue = rangeValue[0]
    const value = intermediateTextFieldValue[1]

    setRangeValue([lowerValue, parseInt(value, 100)])
  }

  const lowerTextFieldValue =
    intermediateTextFieldValue[0] === rangeValue[0] ? rangeValue[0] : intermediateTextFieldValue[0]

  const upperTextFieldValue =
    intermediateTextFieldValue[1] === rangeValue[1] ? rangeValue[1] : intermediateTextFieldValue[1]

  const handleSubmit = () => {
    onChange(rangeValue)
  }

  return (
    <div>
      <RangeSlider
        output
        label="Money spent is between"
        value={rangeValue}
        prefix={prefix}
        min={min}
        max={max}
        step={step}
        onChange={handleRangeSliderChange}
      />
      <Stack distribution="equalSpacing" spacing="extraLoose">
        <TextField
          label="Min money spent"
          type="number"
          value={`${lowerTextFieldValue}`}
          prefix={prefix}
          min={min}
          max={max}
          step={step}
          onChange={handleLowerTextFieldChange}
          onBlur={handleLowerTextFieldBlur}
          autoComplete="off"
        />
        <TextField
          label="Max money spent"
          type="number"
          value={`${upperTextFieldValue}`}
          prefix={prefix}
          min={min}
          max={max}
          step={step}
          onChange={handleUpperTextFieldChange}
          onBlur={handleUpperTextFieldBlur}
          autoComplete="off"
        />
      </Stack>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}
