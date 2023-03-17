import React from 'react'
import { DropdownProps } from '../types/DropDownProps'

const DropdownComponent: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value)
  }

  return (
    <select onChange={handleSelect}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default DropdownComponent