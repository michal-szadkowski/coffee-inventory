import BrewDTO from "../../services/entities/brewDTO";
import { InventoryItemDTO } from "../../services/entities/inventoryItemDTO";

export function BrewViewElement({ brew, actions, usedItems }: { brew: BrewDTO, actions?: React.ReactNode, usedItems: InventoryItemDTO[] }) {
    let usage = brew.usage.map(x => ({ usage: x, item: usedItems.find(y => y.id === x.itemId) }));
    return (
        <div className="card border border-1 my-2 mx-xxl-3">
            <div className="card-body">
                <div className="card-title">{brew.time.toLocaleTimeString().slice(0, 5)}</div>
                <div className="card-text">{brew.time.toLocaleDateString()}</div>
                <div className="card-text">{brew.comment}</div>

                {usage.map((x, i) => (
                    <div key={i}>{x.item?.name} <i>{x.usage.amount}</i></div>))}
                {actions}
            </div>
        </div>)
}