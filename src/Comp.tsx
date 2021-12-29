import { FC } from 'react'
import { Dropdown, DDOptionSimple } from './Dropdown'
import { SimplifiedFormik } from './SimplifiedFormik'

type Opt = { label: string; key: string }
// type OptMap = Record<string, Opt>
type CompProps = {
  multiOpts: Opt[]
  singleOpts: Opt[]
  form: SimplifiedFormik<{ m: string[]; s: string | undefined }>
}

const getLabel = (opts: Opt[], _key: string) =>
  opts.find(({ key }) => _key === key)?.label ?? '-?-'
export const Comp: FC<CompProps> = ({ form, multiOpts, singleOpts }) => {
  return (
    <div>
      <Dropdown
        name="m"
        multiple
        value={form.values.m}
        onChange={form.handleChange}
        getLabel={(key) => <h2>{getLabel(multiOpts, key)}</h2>}
      >
        {multiOpts.map(({ label, key }) => (
          <DDOptionSimple value={key} key={key}>
            {label}
          </DDOptionSimple>
        ))}
      </Dropdown>
      <br />
      {false && (
        <Dropdown
          name="s"
          value={form.values.s}
          onChange={form.handleChange}
          getLabel={(key) => <h3>{getLabel(singleOpts, key)}</h3>}
        >
          {singleOpts.map(({ label, key }) => (
            <DDOptionSimple value={key} key={key}>
              {label}
            </DDOptionSimple>
          ))}
        </Dropdown>
      )}
    </div>
  )
}
