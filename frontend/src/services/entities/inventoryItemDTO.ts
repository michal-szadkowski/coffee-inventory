export interface InventoryItemDTO
{
    id: string,
    coffeeId: string,
    name: string,
    type: InventoryItemTypeDTO,
    startDate: Date,
    endDate?: Date,

    amount: number,
    amountUsed: number,

    price: number
}

export enum InventoryItemTypeDTO
{
    Coffee = 0,
    Other = 1
}
