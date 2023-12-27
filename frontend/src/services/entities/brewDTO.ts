export default interface BrewDTO {
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