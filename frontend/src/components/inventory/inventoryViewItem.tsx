import CoffeeDTO from "../../services/entities/coffeeDTO";
import { InventoryItemDTO, InventoryItemTypeDTO } from "../../services/entities/inventoryItemDTO";

export function InventoryViewItem({ item, coffee, actions }: { item: InventoryItemDTO, coffee?: CoffeeDTO, actions?: React.ReactNode }) {
    return (
        <div className="card border border-1 m-2" style={{ width: "18rem" }}>
            <div className="card-body">
                <div>
                    <p>{coffee?.roaster} {coffee?.name} {coffee?.origin}</p>
                </div>
                <h4 className="card-title">{item.name}</h4>
                <p>{TypeText(item.type)}</p>
                <p>{item.amountUsed} / {item.amount}</p>
                <p>{item.price} zł</p>
                <p>{item.startDate.toISOString().slice(0, 10)}</p>
                {actions}
            </div>
        </div>)
}

function TypeText(type: InventoryItemTypeDTO) {
    return type === InventoryItemTypeDTO.Coffee ? "Kawa" : ""
}