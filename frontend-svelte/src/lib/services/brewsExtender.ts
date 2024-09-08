import type {BrewDTO, UsageDTO} from "$lib/services/entities/brewDTO";
import {type InventoryItemDTO, InventoryItemTypeDTO} from "$lib/services/entities/inventoryItemDTO";

export function extendBrewsWithInventoryItems(brew: BrewDTO, allItems: InventoryItemDTO[]) {
    let brewUsage = extendUsageWithInventoryItems(brew.usage, allItems);
    return {...brew, usageItems: brewUsage}
}

export function extendUsageWithInventoryItems(usage: UsageDTO[], allItems: InventoryItemDTO[]) {
    const lookup = new Map(allItems.map(x => [x.id, x]));
    const brewUsage = usage.map(x => {
        return {
            item: lookup.get(x.itemId),
            amount: x.amount
        }
    })
    brewUsage.sort(a => a.item?.type === InventoryItemTypeDTO.Coffee ? 0 : 1)
    return brewUsage;
}
