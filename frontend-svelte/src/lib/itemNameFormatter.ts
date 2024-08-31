import type {InventoryItemDTO} from "$lib/services/entities/inventoryItemDTO";

export default function formatItemName(item?: InventoryItemDTO) {
    if (item?.name === undefined)
        return "Usunięto!";
    let name = item.name;
    if (name.search(item.origin) === -1) name += " " + item.origin;
    if (name.search(item.roaster) === -1) name += " " + item.roaster;
    return name;
}