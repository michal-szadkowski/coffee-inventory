import {BrewService} from "$lib/services/brewsService";
import {InventoryService} from "$lib/services/inventoryService";
import type {BrewDTO} from "$lib/services/entities/brewDTO";
import {type InventoryItemDTO, InventoryItemTypeDTO} from "$lib/services/entities/inventoryItemDTO";

export async function load({fetch}) {
    const brews = await BrewService.GetAll();
    const items = await InventoryService.GetAll();
    const brewsWithItems = brews.data.map(x =>
        extendBrewsWithInventoryItems(x, items.data));
    return {
        brews: brewsWithItems
    }
}


function extendBrewsWithInventoryItems(brew: BrewDTO, allItems: InventoryItemDTO[]) {
    const brewUsage = brew.usage.map(x => {
        return {
            item: allItems.filter(y => y.id == x.itemId)[0],
            amount: x.amount
        }
    })
    brewUsage.sort(a => a.item.type === InventoryItemTypeDTO.Coffee ? 0 : 1)
    return {...brew, usageItems: brewUsage}
}