import { FC, ReactNode, useReducer } from 'react'
import {
  Selector,
  SelectProps,
  useSelections,
  useSelectorOption,
} from './Selector'

export type DDOpt = {
  value: string
  selected: boolean
}

export type DropdownProps = {
  getLabel(key: string): ReactNode
}

export const Dropdown: FC<SelectProps & DropdownProps> = ({
  getLabel,
  children,
  ...props
}) => {
  return (
    <Selector {...props}>
      <DropdownComp getLabel={getLabel}>{children}</DropdownComp>
    </Selector>
  )
}
const DropdownComp: FC<DropdownProps> = ({ getLabel, children }) => {
  //const selectProps = { ...props, children: undefined };
  const selections = useSelections()
  const [isOpen, toggleOpen] = useReducer((prev) => !prev, false)

  return (
    <div style={{ border: 'thin black solid', margin: '10px' }}>
      <span onClick={toggleOpen}>[{isOpen ? '-' : '+'}]</span>
      <div style={isOpen ? {} : { display: 'none' }}>{children}</div>
      <div>
        {selections.map((val) => (
          <span key={val}>{getLabel(val)}</span>
        ))}
      </div>
    </div>
  )
}
export const DDOptionSimple: FC<{ value: string }> = ({ value, children }) => {
  const { toggle, selected } = useSelectorOption(value)
  //console.log({ selected, value });
  return (
    <>
      <span
        style={{ backgroundColor: selected ? 'lightgray' : '' }}
        onClick={toggle}
      >
        {children}
      </span>
      <br />
    </>
  )
}
