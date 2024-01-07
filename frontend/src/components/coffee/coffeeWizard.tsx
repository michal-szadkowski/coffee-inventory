import { ChangeEvent, useEffect, useState } from "react";
import CoffeeDTO from "../../services/entities/coffeeDTO";

export default function CoffeeWizard({ coffee, submit, close }: { coffee?: CoffeeDTO, submit: (arg: CoffeeDTO) => void, close?: () => void }) {

    let [coffeeEdit, setCoffeeEdit] = useState<CoffeeDTO>(getDefault());

    useEffect(() => {
        setCoffeeEdit(getDefault())
    }, [coffee])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCoffeeEdit({ ...coffeeEdit, [e?.currentTarget.id]: e.currentTarget.value })
    }
    function handleChangeArea(e: ChangeEvent<HTMLTextAreaElement>) {
        setCoffeeEdit({ ...coffeeEdit, [e?.currentTarget.id]: e.currentTarget.value })
    }

    function getDefault() {
        return coffee ?? {} as CoffeeDTO
    };

    function submitAndClear() {
        submit(coffeeEdit)
        setCoffeeEdit(getDefault);
    }

    return (
        <div className="border border-1 p-3 form" style={{ width: "25rem" }}>

            <label className="form-label mt-3">Nazwa:</label>
            <input className="form-control" type="text" id="name" value={coffeeEdit.name} onChange={(e) => handleChange(e)} />

            <label className="form-label mt-3">Palarnia:</label>
            <input className="form-control" type="text" id="roaster" value={coffeeEdit.roaster} onChange={(e) => handleChange(e)} />

            <label className="form-label mt-3">Pochodzenie:</label>
            <input className="form-control" type="text" id="origin" value={coffeeEdit.origin} onChange={(e) => handleChange(e)} />

            <label className="form-label mt-3">Opis:</label>
            <textarea className="form-control" id="description" value={coffeeEdit.description} onChange={(e) => handleChangeArea(e)} />

            <div className="mt-2 me">
                <button className="btn btn-success me-3" onClick={() => submitAndClear()}>Zapisz</button>
                {close !== undefined &&
                    <button className="btn btn-warning " onClick={() => close()}>Anuluj</button>}
            </div>

        </div>)
}