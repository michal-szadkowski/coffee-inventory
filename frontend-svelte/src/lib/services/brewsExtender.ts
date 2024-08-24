import type {BrewDTO} from "$lib/services/entities/brewDTO";
import {type InventoryItemDTO, InventoryItemTypeDTO} from "$lib/services/entities/inventoryItemDTO";

export function extendBrewsWithInventoryItems(brew: BrewDTO, allItems: InventoryItemDTO[]) {
    const brewUsage = brew.usage.map(x => {
        return {
            item: allItems.filter(y => y.id == x.itemId)[0],
            amount: x.amount
        }
    })
    brewUsage.sort(a => a.item.type === InventoryItemTypeDTO.Coffee ? 0 : 1)
    return {...brew, usageItems: brewUsage}
}