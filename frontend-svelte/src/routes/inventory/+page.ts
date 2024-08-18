import type {InventoryItemDTO} from "$lib/services/entities/inventoryItemDTO";
import {InventoryService} from "$lib/services/inventoryService";

export async function load({fetch}): Promise<{ items: InventoryItemDTO[] }> {
    const items = await InventoryService.GetAll();
    return {
        items: items.data
    };
}