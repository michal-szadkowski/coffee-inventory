import type {InventoryItemDTO} from "$lib/services/entities/inventoryItemDTO";

export interface BrewDTO {
    id: string,
    time: Date
    usage: UsageDTO[],
    coffeeOut: number,
    timeInSeconds: number,
    comment: string
}

export interface UsageDTO {
    itemId: string,
    amount: number
}

export interface BrewWithItems extends BrewDTO {
    usageItems: { item: InventoryItemDTO, amount: number }[],
}