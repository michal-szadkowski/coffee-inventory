import { ChangeEvent, useEffect, useState } from "react";
import { InventoryItemDTO, InventoryItemTypeDTO } from "../../services/entities/inventoryItemDTO";
import BrewDTO, { UsageDTO } from "../../services/entities/brewDTO";
import DateTimePicker from "../dateTimePicker";

export default function BrewWizard({ item, submit, close, inventory }: { item?: BrewDTO, submit: (brew: BrewDTO) => void, close?: () => void, inventory: InventoryItemDTO[] }) {

    let [itemEdit, setItemEdit] = useState<BrewDTO>(item ?? { time: dateNoSec(new Date()), usage: [] as UsageDTO[] } as BrewDTO);

    let [newRow, setNewRow] = useState<UsageDTO>({ itemId: inventory[0]?.id ?? "", amount: 0 } as UsageDTO);

    useEffect(() => {
        setItemEdit(item ?? { time: dateNoSec(new Date()), usage: [] as UsageDTO[] } as BrewDTO)
    }, [item])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setItemEdit({ ...itemEdit, [e?.currentTarget.id]: e.currentTarget.value })
    }
    function handleChangeArea(e: ChangeEvent<HTMLTextAreaElement>) {
        setItemEdit({ ...itemEdit, [e?.currentTarget.id]: e.currentTarget.value })
    }
    function dateNoSec(date: Date) {
        date.setSeconds(0, 0);
        return date;
    }
    return (
        <div className="border border-1 p-3 form" style={{ width: "25rem" }}>

            <label className="form-label mt-3">Data parzenia:</label>

            <DateTimePicker value={itemEdit.time} onChange={(date) => setItemEdit({ ...itemEdit, time: date })} />

            <label className="form-label mt-3">Komentarz:</label>
            <textarea className="form-control" id="comment" value={itemEdit.comment || ""} onChange={(e) => handleChangeArea(e)} />

            <div className="mt-3">
                {itemEdit.usage.map((x, i) => {
                    let item = inventory.find(y => y.id === x.itemId);
                    return (<div className="w-100 m-0" key={i}>
                        {item?.name} {item?.amountUsed} + {x.amount} / {item?.amount}
                        <button className="btn" onClick={() => setItemEdit({ ...itemEdit, usage: [...itemEdit.usage.slice(0, i), ...itemEdit.usage.slice(i + 1)] })}>❌</button>
                    </div>)
                })}

                <div className="input-group">
                    <select className="form-control" value={newRow.itemId} onChange={(e) => setNewRow({ ...newRow, itemId: e.target.value })}>
                        {inventory.map((x, i) => (<option key={i} value={x.id}>{x.name} {x.amountUsed}/{x.amount}</option>))}
                    </select>
                    <input className="form-control" type="number" value={newRow.amount} onChange={(e) => setNewRow({ ...newRow, amount: e.target.valueAsNumber })}></input>
                </div>

                <button className="btn btn-success mt-2 mb-1" onClick={() => { setItemEdit({ ...itemEdit, usage: [...itemEdit.usage, newRow] }); setNewRow({ itemId: inventory[0].id, amount: 0 }) }}>+</button>
            </div>

            <div className="mt-2 me">
                <button className="btn btn-success me-3" onClick={() => submit(itemEdit)}>Zapisz</button>
                {close !== undefined &&
                    <button className="btn btn-warning " onClick={() => close()}>Anuluj</button>}
            </div>

        </div>)
}