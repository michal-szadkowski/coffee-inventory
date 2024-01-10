import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { InventoryItemDTO } from "../../services/entities/inventoryItemDTO";
import BrewDTO, { UsageDTO } from "../../services/entities/brewDTO";
import DateTimePicker from "../dateTimePicker";
import CoffeeDTO from "../../services/entities/coffeeDTO";

export default function BrewWizard({ brew, submit, close, inventory }: { brew?: BrewDTO, submit: (brew: BrewDTO) => void, close?: () => void, inventory: { inv: InventoryItemDTO, coffee: CoffeeDTO | undefined }[] }) {

    const getDefault = useCallback(() => {
        return brew ?? { time: dateNoSec(new Date()), usage: [] as UsageDTO[] } as BrewDTO
    }, [brew]);

    let [brewEdit, setBrewEdit] = useState<BrewDTO>(getDefault());

    let [newRow, setNewRow] = useState<UsageDTO>({ itemId: inventory[0]?.inv.id ?? "", amount: 0 } as UsageDTO);

    useEffect(() => {
        setBrewEdit(getDefault())
    }, [brew, inventory, getDefault])

    function handleChangeArea(e: ChangeEvent<HTMLTextAreaElement>) {
        setBrewEdit({ ...brewEdit, [e?.currentTarget.id]: e.currentTarget.value })
    }
    function dateNoSec(date: Date) {
        date.setSeconds(0, 0);
        return date;
    }

    function submitAndClear() {
        submit(brewEdit)
        setBrewEdit(getDefault());
    }

    return (
        <div className="border border-1 p-3 form my-1 bg-body rounded-2" style={{ maxWidth: "30rem" }}>

            <div className="mt-3">
                <label>Zużycie:</label>
                {brewEdit.usage.map((x, i) => {
                    let item = inventory.find(y => y.inv.id === x.itemId);
                    return (<div className="w-100 m-0" key={i}>
                        {item?.coffee?.roaster} {item?.coffee?.origin} {item?.coffee?.name} {item?.inv.name} <i>{x.amount}</i>
                        <button className="btn" onClick={() => setBrewEdit({ ...brewEdit, usage: [...brewEdit.usage.slice(0, i), ...brewEdit.usage.slice(i + 1)] })}>❌</button>
                    </div>)
                })}

                <div className="input-group">
                    <select className="form-control w-50" value={newRow.itemId} onChange={(e) => setNewRow({ ...newRow, itemId: e.target.value })}>
                        {inventory.map((x, i) => (
                            <option key={i} value={x.inv.id}>{x?.coffee?.roaster} {x?.coffee?.origin} {x?.coffee?.name} {x.inv.name}</option>
                        ))}
                    </select>
                    <input className="form-control" type="number" value={newRow.amount} onChange={(e) => setNewRow({ ...newRow, amount: e.target.valueAsNumber })}></input>
                    <button className="btn btn-success" onClick={() => { setBrewEdit({ ...brewEdit, usage: [...brewEdit.usage, newRow] }); setNewRow({ itemId: inventory[0].inv.id, amount: 0 }) }}>+</button>
                </div>


            </div>

            <label className="form-label mt-3">Data parzenia:</label>

            <DateTimePicker value={brewEdit.time} onChange={(date) => setBrewEdit({ ...brewEdit, time: date })} />

            <label className="form-label mt-3">Komentarz:</label>
            <textarea className="form-control" id="comment" value={brewEdit.comment || ""} onChange={(e) => handleChangeArea(e)} />


            <div className="mt-2 me">
                <button className="btn btn-success me-3" onClick={() => submitAndClear()}>Zapisz</button>
                {close !== undefined &&
                    <button className="btn btn-warning " onClick={() => close()}>Anuluj</button>}
            </div>

        </div>)
}