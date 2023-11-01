import { ChangeEvent, FormEvent, useState } from "react";
import CoffeeDTO from "../../services/entities/coffeeDTO";

export default function CoffeeWizard({ coffee, submit }: { coffee?: CoffeeDTO, submit: (arg: CoffeeDTO) => void }) {

    let [coffeeEdit, setCoffeeEdit] = useState<CoffeeDTO>(coffee ?? {} as CoffeeDTO);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCoffeeEdit({ ...coffeeEdit, [e?.currentTarget.id]: e.currentTarget.value })
    }
    function handleChangeArea(e: ChangeEvent<HTMLTextAreaElement>) {
        setCoffeeEdit({ ...coffeeEdit, [e?.currentTarget.id]: e.currentTarget.value })
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

            <button className="btn btn-success mt-2" onClick={() => submit(coffeeEdit)}>Zapisz</button>
        </div>)
}