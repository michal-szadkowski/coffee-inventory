import CoffeeDTO from "../../services/entities/coffeeDTO";
import { InventoryItemDTO, InventoryItemTypeDTO } from "../../services/entities/inventoryItemDTO";

export function InventoryViewItem({ item, coffee, actions }: { item: InventoryItemDTO, coffee?: CoffeeDTO, actions?: React.ReactNode }) {
    return (
        <div className="col-12 col-xxl-4 my-2 mx-xxl-0">
            <div className="card-body card border border-1 m-xxl-2">
                <div className="card-text">
                    <p>{coffee?.roaster} {coffee?.name} {coffee?.origin}</p>
                </div>
                <h4 className="card-title">{item.name}</h4>
                <div className="card-text">{TypeText(item.type)}</div>
                <div className="card-text">{item.amount - item.amountUsed} / {item.amount}</div>
                <div className="card-text">{item.price} zł</div>
                <div className="card-text">{item.startDate.toISOString().slice(0, 10)}</div>
                {item.endDate !== undefined && (<div className="card-text">{item.endDate?.toISOString().slice(0, 10)}</div>)}

                {actions}
            </div>
        </div>)
}

function TypeText(type: InventoryItemTypeDTO) {
    return type === InventoryItemTypeDTO.Coffee ? "Kawa" : ""
}