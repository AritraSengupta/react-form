import React from 'react'
import { fireEvent, getAllByRole } from '@testing-library/react'
import FormDisplay from './FormDisplay'
import '@testing-library/jest-dom/extend-expect'


const data = [
  {
    dataId: 'id',
    type: 'hidden',
    defaultValue: null
  },
  {
    dataId: 'random',
    defaultValue: '',
    validators: [{ type: 'required' }]
  },
  {
    fieldname: 'Date',
    dataId: 'date',
    type: 'date',
    defaultValue: '1-1-20',
    validators: [{ type: 'required' }]
  },
  {
    fieldname: 'Name',
    dataId: 'name',
    type: 'input',
    defaultValue: 'abcd',
    validators: [{ type: 'required' }]
  },
  {
    fieldname: 'TextArea',
    dataId: 'textarea',
    type: 'textarea',
    defaultValue: '',
    validators: [{ type: 'required' }]
  },
  {
    fieldname: 'Dropdown',
    dataId: 'dropdown',
    type: 'dropdown',
    defaultValue: {},
    config: {
      clearable: true
    },
    options: [
      { text: 'Option1', value: 1 },
      { text: 'Option2', value: 2 }
    ],
    validators: [{ type: 'required' }]
  },
  {
    fieldname: 'Dropdown',
    dataId: 'dropdownMul',
    type: 'dropdown',
    defaultValue: {},
    config: {
      multiple: true,
      search: true,
      callback: jest.fn(),
    },
    options: [
      { text: 'Option1', value: 1 },
      { text: 'Option2', value: 2 }
    ],
    validators: [{ type: 'required' }]
  },
  {
    fieldname: 'Checkbox',
    dataId: 'checkbox',
    type: 'checkbox',
    defaultValue: {},
    options: [
      { text: 'Option1', value: 1 },
      { text: 'Option2', value: 2 }
    ],
    validators: [{ type: 'required' }]
  },
  {
    fieldname: 'Radio',
    dataId: 'radio',
    type: 'radio',
    defaultValue: {},
    options: [
      { text: 'Option1', value: 1 },
      { text: 'Option2', value: 2 },
      { text: 'Option3', value: 3 }
    ],
    validators: [{ type: 'required' }]
  }
]

const formChangeMock = jest.fn()

describe('FormDisplay', () => {
  beforeEach(() => {
    formChangeMock.mockRestore()
  })

  it('should render', () => {
    const wrapper = render(<FormDisplay data={[]} onChange={() => {}} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with all the units', async () => {
    const { getByTestId, container } = render(
      <FormDisplay data={data} onChange={formChangeMock} columns={2}/>
    )
    const inputWrapper = getByTestId('input')
    expect(container).toMatchSnapshot()
    const inputElement = inputWrapper.children[0]
    expect(inputElement.value).toBe('abcd');
    fireEvent.change(inputElement, { target: { value: '1234' } })
    expect(inputElement.value).toBe('1234');
  })

  it('should be able to change dropdown values', () => {
    const dropdownData = [{
      fieldname: 'Dropdown',
      dataId: 'dropdown',
      type: 'dropdown',
      defaultValue: {value: 1, selected: { text: 'Option1', value: 1 }},
      config: {
        clearable: true
      },
      options: [
        { text: 'Option1', value: 1 },
        { text: 'Option2', value: 2 }
      ],
      validators: [{ type: 'required' }]
    }];
    const { getByTestId, container } = render(
      <FormDisplay data={dropdownData} onChange={formChangeMock} />
    )
    const dropdownWrapper = getByTestId('dropdown')
    expect(container).toMatchSnapshot()
    const dropdownElement = dropdownWrapper.children[0]
    const dropdownOptions = getAllByRole(dropdownWrapper, 'option')
    const dropdownOptionsText = dropdownOptions.map(d => d.textContent)
    expect(dropdownElement.textContent).toBe(dropdownOptionsText[0]);
    fireEvent.click(dropdownElement);
    fireEvent.click(dropdownOptions[1]);
    expect(dropdownElement.textContent).toBe(dropdownOptionsText[1]);
  })
})
