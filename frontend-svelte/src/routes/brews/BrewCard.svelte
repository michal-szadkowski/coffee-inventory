<script lang="ts">

    import type {BrewWithItems} from "$lib/services/entities/brewDTO";
    import {Card, CardContent, CardTitle} from "$lib/components/ui/card";
    import {CardFooter, CardHeader} from "$lib/components/ui/card/index.js";
    import {InventoryItemTypeDTO} from "$lib/services/entities/inventoryItemDTO";
    import {Table, TableCell, TableRow} from "$lib/components/ui/table";
    import {LucideEllipsis} from "lucide-svelte";
    import formatItemName from "$lib/itemNameFormatter";

    export let select: () => void;
    export let brew: BrewWithItems;
</script>

<Card>
    <CardHeader class="p-3 xl:p-5">
        <CardTitle class="flex">
            <span>{brew.time.toLocaleDateString()}</span>
            <span class="pl-4">{brew.time.getHours()}:{brew.time.getMinutes() < 10 ? "0" : ""}{brew.time.getMinutes()}</span>
            <button on:click={select} class="ms-auto">
                <LucideEllipsis/>
            </button>
        </CardTitle>
    </CardHeader>
    <CardContent class="pb-1">
        <Table class="xl:text-base">
            {#each brew.usageItems as usage}
                <TableRow class="border-y border-muted-foreground">
                    <TableCell class="py-1 w-5/6">
                        { formatItemName(usage.item)}
                    </TableCell>
                    <TableCell class="py-1 text-right min-w-fit text-nowrap">
                        {usage.amount}
                        {#if usage.item?.type === InventoryItemTypeDTO.Coffee}g{/if}
                    </TableCell>
                </TableRow>
            {/each}
        </Table>
    </CardContent>
    <CardFooter class="p-4 italic text-sm">
        {brew.comment}
    </CardFooter>
</Card>