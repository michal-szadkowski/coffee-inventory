export interface InventoryItemDTO {
    id: string,

    name: string,

    roaster: string,
    origin: string,

    type: InventoryItemTypeDTO,
    startDate: Date,
    endDate?: Date,

    amount: number,
    amountUsed: number,

    price: number
}

export enum InventoryItemTypeDTO {
    Coffee = 0,
    Other = 1
}
