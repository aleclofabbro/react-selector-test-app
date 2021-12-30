import { Comp } from "./Comp";
import { useFormik } from "formik";
import { useCallback, useReducer, useState } from "react";
import "./styles.css";

function randomOpts(length: number, toSelect: number) {
  const opts: [string, boolean][] = [];

  while (opts.length < length) {
    const key = String(Math.ceil(Math.random() * 100));
    //const key = Math.random().toString(36).substring(3, 3).toUpperCase()
    if (!opts.find(([k]) => k === key)) {
      opts.push([`${key}`, false]);
    }
  }

  while (toSelect > 0) {
    const optCandy = opts[Math.floor(Math.random() * opts.length)];
    !optCandy[1] && (optCandy[1] = true) && toSelect--;
  }

  return opts;
}
const getSelected = (opts: [string, boolean][]) =>
  opts.filter(([, sel]) => sel).map(([val]) => val);

export default function App() {
  const submit = useCallback((_) => {
    console.log(`submit ${JSON.stringify(_)}`);
  }, []);

  const [singleOpts, setSingleOpts] = useState<[string, boolean][]>(() =>
    randomOpts(5, 1)
  );

  const [multiOpts, setMultiOpts] = useState<[string, boolean][]>(() =>
    randomOpts(7, 3)
  );
  const [selOpts, setSelOpts] = useState<[string, boolean][]>(() =>
    randomOpts(7, 3)
  );
  const form = useFormik<{ s: string | undefined; m: string[]; sel: string[] }>(
    {
      initialValues: {
        sel: getSelected(selOpts),
        s: getSelected(singleOpts)[0],
        m: getSelected(multiOpts)
      },
      onSubmit: submit
    }
  );
  // console.log("m", form.values.m);
  // console.log('sel', form.values.sel)
  const setFormValues = form.setValues;
  const mix = useCallback(() => {
    const _multiOpts = randomOpts(7, 3);
    setMultiOpts(_multiOpts);

    const _singleOpts = randomOpts(5, 1);
    setSingleOpts(_singleOpts);

    const _selOpts = randomOpts(7, 3);
    setSelOpts(_selOpts);

    setFormValues({
      s: getSelected(_singleOpts)[0],
      m: getSelected(_multiOpts),
      sel: getSelected(_selOpts)
    });
  }, [setFormValues]);

  const [isOpen, toggleOpen] = useReducer((prev) => !prev, false);

  return (
    <div className="App">
      <button onClick={mix}>mix</button>
      <br />
      <br />
      <h3 onClick={toggleOpen}>{isOpen ? "close" : "open"}</h3>
      {isOpen && (
        <Comp
          multiOpts={multiOpts.map(([key /* , selected */]) => ({
            label: `label for ${key}`,
            // selected,
            key
          }))}
          singleOpts={singleOpts.map(([key /* , selected */]) => ({
            label: `label for ${key}`,
            // selected,
            key
          }))}
          form={form}
        />
      )}
      <br />
      <br />
      <br />
      sel:{form.values.sel.join(" | ")}
      <br />
      <select
        multiple
        name="sel"
        value={form.values.sel}
        onChange={form.handleChange}
      >
        {selOpts.map(([key]) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={form.submitForm}>sub</button>
    </div>
  );
}
