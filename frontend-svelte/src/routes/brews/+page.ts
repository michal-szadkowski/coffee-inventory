import {BrewService} from "$lib/services/brewsService";
import {InventoryService} from "$lib/services/inventoryService";
import {extendBrewsWithInventoryItems} from "$lib/services/brewsExtender";

export async function load({fetch}) {
    const brews = await BrewService.GetAll();
    const items = await InventoryService.GetAll();
    const brewsWithItems = brews.data.map(x =>
        extendBrewsWithInventoryItems(x, items.data));
    return {
        brews: brewsWithItems,
        items: items.data
    }
}