import {InventoryItemDTO, InventoryItemTypeDTO} from "../../services/entities/inventoryItemDTO";

export function InventoryViewItem({item, actions}: { item: InventoryItemDTO, actions?: React.ReactNode }) {
    const labelStyle = "col-6 col-xxl-5 fst-italic fw-lighter"
    const itemStyle = "col-6 col-xxl-7"
    let cardStyle = "card-body card border border-1";
    if (item.endDate != null)
        cardStyle += " opacity-50";

    let name = item.roaster.length > 0 ? item.roaster + " - " : "";
    name += item.name;
    return (
        <div className="col-12 col-lg-6 col-xxl-4 my-2 mx-xxl-0">
            <div className={cardStyle}>
                <h4 className="card-title">{name}</h4>
                <div className="card-text row g-0 gx-1">

                    {item.origin.length > 0 &&
                        <>
                            <div className={labelStyle}>Pochodzenie:</div>
                            <div className={itemStyle}>{item.origin}</div>
                        </>
                    }

                    <div className={labelStyle}>Pozostało:</div>
                    <div className={itemStyle}>{item.amount - item.amountUsed} / {item.amount}</div>
                    <div className={labelStyle}>Cena:</div>
                    <div className={itemStyle}>{item.price} zł</div>
                    <div className={labelStyle}>Początek:</div>
                    <div className={itemStyle}>{item.startDate.toISOString().slice(0, 10)}</div>
                    {item.endDate !== undefined && (<>
                        <div className={labelStyle}>Koniec:</div>
                        <div className={itemStyle}>{item.endDate.toISOString().slice(0, 10)}</div>
                    </>)}
                    <div className={labelStyle}>Typ:</div>
                    <div className={itemStyle}>{TypeText(item.type)}</div>
                </div>
                {actions}
            </div>
        </div>)
}

function TypeText(type: InventoryItemTypeDTO) {
    return type === InventoryItemTypeDTO.Coffee ? "Kawa" : "Inne"
}