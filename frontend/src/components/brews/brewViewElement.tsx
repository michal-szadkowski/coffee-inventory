import BrewDTO from "../../services/entities/brewDTO";
import {InventoryItemDTO} from "../../services/entities/inventoryItemDTO";

export function BrewViewElement({brew, actions, usedItems}: {
    brew: BrewDTO,
    actions?: React.ReactNode,
    usedItems: InventoryItemDTO[]
}) {
    let usage = brew.usage.map(x => ({usage: x, item: usedItems.find(y => y.id === x.itemId)}));
    const labelStyle = "col-3 col-xxl-1 fst-italic fw-lighter"
    const itemStyle = "col-9 col-xxl-2"
    return (
        <div className="col-12 col-lg-12 col-xxl-12 my-2 mx-xxl-0">
            <div className="card-body card border border-2">
                <div className="card-text row g-0 gx-1">
                    <div className={labelStyle}>Data:</div>
                    <div className={itemStyle}>{brew.time.toLocaleDateString()}</div>
                    <div className={labelStyle}>Godzina:</div>
                    <div className={itemStyle}>{brew.time.toLocaleTimeString().slice(0, 5)}</div>
                    <div className={labelStyle}>Zużycie:</div>
                    <div className={itemStyle}>
                        {usage.map((x, i) => (
                            <div key={i}>{x.item?.origin} {x.item?.roaster} {x.item?.name} <i>{x.usage.amount}</i>
                            </div>))}
                    </div>
                    <div className={labelStyle}>Komentarz:</div>
                    <div className={itemStyle}>{brew.comment}</div>
                    {actions}
                </div>
            </div>
        </div>)
}