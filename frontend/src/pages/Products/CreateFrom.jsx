import { Button, Card, Stack } from '@shopify/polaris'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AppHeader from '../../components/AppHeader'
import FormControl from '../../components/FormControl'
import FormValidate from '../../helpers/formValidate'

const initialFormData = {
  title: {
    type: 'text',
    label: 'Title',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [20, 'Too long!'],
    },
    autoFocus: true,
  },

  description: {
    type: 'text',
    label: 'Description',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [20, 'Too long!'],
    },
  },

  price: {
    type: 'number',
    label: 'Price',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [20, 'Too long!'],
    },
  },

  handle: {
    type: 'text',
    label: 'Url SEO',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [100, 'Too long!'],
    },
  },
  status: {
    type: 'select',
    label: 'Status',
    value: '',
    error: '',
    validate: {},
    options: [
      {
        label: 'ACTIVE',
        value: 'ACTIVE',
      },
      {
        label: 'DRAFT',
        value: 'DRAFT',
      },
      {
        label: 'ARCHIVED',
        value: 'ARCHIVED',
      },
    ],
  },

  publish: {
    type: 'radio',
    label: 'Publish',
    value: '',
    error: '',
    validate: {},
    options: [
      {
        label: 'private',
        value: false,
      },
      {
        label: 'publish',
        value: true,
      },
    ],
  },

  thumbnail: {
    type: 'file',
    label: 'Thumbnail',
    value: null,
    originValue: null,
    error: '',
    validate: {},
    allowMultiple: false,
  },

  images: {
    type: 'file',
    label: 'Images Products',
    value: [],
    originValue: [],
    error: '',
    validate: {},
    allowMultiple: true,
  },

  vendorId: {
    type: 'select',
    label: 'Vendor',
    value: '',
    required: true,
    error: '',
    validate: {
      required: [true, 'Vendor is Required!'],
    },
    options: [{ label: 'Select a vendor', value: '' }],
  },
}

function CreateFrom({ created = {}, onDiscard = null, onSubmit = null, vendorList = [] }) {
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(formData))

    _formData.vendorId = {
      ..._formData.vendorId,
      options: [
        { label: 'Select a vendor', value: '' },
        ...vendorList.map((vendor) => ({ label: vendor.name, value: String(vendor.id) })),
      ],
    }

    /**
     * test
     */
    _formData.title.value = 'iphone 12'
    _formData.description.value = 'iphone 12'
    _formData.handle.value = `iphone-12-${Date.now()}`
    _formData.price.value = 1000000

    // is create
    if (created.id) {
      Array.from(['title', 'description', 'handle', 'price', 'status', 'vendorId']).map(
        (key) =>
          (_formData[key] = {
            ..._formData[key],
            value: String(created[key] || ''),
          }),
      )

      Array.from(['publish']).map(
        (key) => (_formData[key] = { ..._formData[key], value: Boolean(created[key] || '') }),
      )

      Array.from(['thumbnail']).map(
        (key) => (_formData[key] = { ..._formData[key], originValue: String(created[key]) }),
      )

      Array.from(['images']).map(
        (key) => (_formData[key] = { ..._formData[key], originValue: created[key] || [] }),
      )
    }

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))

    Array.from(['thumbnail', 'images']).forEach((key) => (_formData[key] = formData[key]))
    _formData[name] = { ..._formData[name], value, error: '' }

    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      console.log('before validate', formData)
      const { valid, data } = FormValidate.validateForm(formData)

      console.log('log after validate', data)

      if (valid) {
        data['thumbnail'].value = formData['thumbnail'].value
        data['images'].value = formData['images'].value

        onSubmit(data)
      } else {
        setFormData(data)

        throw new Error('Invalid form data')
      }
    } catch (error) {
      console.log(error)
      // actions.showNotify({ error: true, message: error.message })
    }
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader title={created.id ? 'Edit Product' : 'Add new Product'} onBack={onDiscard} />

      <Card sectioned>
        <Stack vertical alignment="fill">
          {/* stack fill */}
          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['title']}
                onChange={(value) => handleChange('title', value)}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['description']}
                onChange={(value) => handleChange('description', value)}
              />
            </Stack.Item>
          </Stack>

          {/* stack fill */}
          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['price']}
                onChange={(value) => handleChange('price', value)}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['handle']}
                onChange={(value) => handleChange('handle', value)}
              />
            </Stack.Item>
          </Stack>

          {/* stack fill */}
          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['vendorId']}
                onChange={(value) => handleChange('vendorId', value)}
              />
            </Stack.Item>

            <Stack.Item fill>
              <FormControl
                {...formData['status']}
                onChange={(value) => handleChange('status', value)}
              />
            </Stack.Item>
          </Stack>

          <Stack vertical>
            <Stack.Item fill>
              <FormControl
                {...formData['publish']}
                onChange={(value) => handleChange('publish', value)}
              />
            </Stack.Item>
          </Stack>

          {/* thumbnail and images */}
          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['thumbnail']}
                onChange={(value) => handleChange('thumbnail', value)}
                // onDeleteOriginValue={(value) => {
                //   let _formData = JSON.parse(JSON.stringify(formData))
                //   Array.from(['thumbnail', 'images']).forEach(
                //     (key) => (_formData[key] = formData[key]),
                //   )
                //   _formData['thumbnail'] = {
                //     ..._formData['thumbnail'],
                //     originValue: '',
                //     error: '',
                //   }

                //   setFormData(_formData)
                // }}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['images']}
                onChange={(value) => handleChange('images', value)}
                // onDeleteOriginValue={(value) => {
                //   let _formData = JSON.parse(JSON.stringify(formData))
                //   Array.from(['thumbnail', 'images']).forEach(
                //     (key) => (_formData[key] = formData[key]),
                //   )
                //   _formData['images'] = {
                //     ..._formData['images'],
                //     originValue: _formData['images'].originValue.filter((item) => item !== value),
                //     error: '',
                //   }
                //   setFormData(_formData)
                // }}
              />
            </Stack.Item>
          </Stack>
        </Stack>
      </Card>

      <Stack distribution="trailing">
        <Button onClick={onDiscard}>Discard</Button>
        <Button primary onClick={handleSubmit}>
          {created.id ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default CreateFrom
