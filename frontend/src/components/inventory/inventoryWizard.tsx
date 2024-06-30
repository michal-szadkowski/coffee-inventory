import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {InventoryItemDTO, InventoryItemTypeDTO} from "../../services/entities/inventoryItemDTO";

export default function InventoryWizard({item, submit, close}: {
    item?: InventoryItemDTO,
    submit: (arg: InventoryItemDTO) => void,
    close?: () => void
}) {

    const getDefault = useCallback(() => {
        return item ?? {type: InventoryItemTypeDTO.Other, startDate: new Date()} as InventoryItemDTO
    }, [item]);

    let [itemEdit, setItemEdit] = useState<InventoryItemDTO>(getDefault());

    useEffect(() => {
        setItemEdit(getDefault())
    }, [item, getDefault])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setItemEdit({...itemEdit, [e?.currentTarget.id]: e.currentTarget.value})
    }

    function handleTypeChange(e: ChangeEvent<HTMLInputElement>) {
        setItemEdit({
            ...itemEdit,
            type: e.target.checked ? InventoryItemTypeDTO.Coffee : InventoryItemTypeDTO.Other,
        });
    }

    function submitAndClear() {
        submit(itemEdit)
        setItemEdit(getDefault());
    }

    return (
        <div className="border border-1 p-3 form my-1 card bg-body rounded-2" style={{maxWidth: "30rem"}}>

            <label className="form-label mt-3">Nazwa:</label>
            <input className="form-control" type="text" id="name" value={itemEdit.name || ""}
                   onChange={(e) => handleChange(e)}/>

            <label className="form-label mt-3">Ilość:</label>
            <input className="form-control" type="number" id="amount" value={itemEdit.amount || ""}
                   onChange={(e) => handleChange(e)}/>

            <label className="form-label mt-3">Cena:</label>
            <input className="form-control" type="number" id="price" value={itemEdit.price || ""}
                   onChange={(e) => handleChange(e)}/>

            <label className="form-label mt-3">Data rozpoczęcia:</label>
            <input className="form-control" type="date"
                   value={itemEdit.startDate?.toISOString().slice(0, 10) || ""}
                   onChange={(e) => {
                       setItemEdit({...itemEdit, startDate: e.target.valueAsDate ?? new Date()})
                   }}/>

            <label className="form-label mt-3">Data zakończenia:</label>
            <input className="form-control" type="date"
                   value={itemEdit.endDate?.toISOString().slice(0, 10) || ""}
                   onChange={(e) => {
                       setItemEdit({...itemEdit, endDate: e.target.valueAsDate ?? undefined})
                   }}/>

            <div className="mt-3">
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch"
                           checked={itemEdit.type === InventoryItemTypeDTO.Coffee} onChange={e => handleTypeChange(e)}/>
                    <label className="form-check-label">Kawa</label>
                </div>
            </div>

            <div className="mt-2 me">
                <button className="btn btn-success me-3" onClick={() => submitAndClear()}>Zapisz</button>
                {close !== undefined &&
                    <button className="btn btn-warning " onClick={() => close()}>Anuluj</button>}
            </div>

        </div>)
}