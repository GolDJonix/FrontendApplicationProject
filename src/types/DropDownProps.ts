export interface DropdownProps {
    options: string[]
    onSelect: (selectedOption: string) => void
    isVisible: boolean
  }