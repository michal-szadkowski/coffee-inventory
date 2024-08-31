<script lang="ts">
    import type {InventoryItemDTO} from "$lib/services/entities/inventoryItemDTO.js";
    import {Card, CardContent, CardHeader, CardTitle} from "$lib/components/ui/card/index.js";
    import {LucideEllipsis} from "lucide-svelte";

    export let item: InventoryItemDTO;
    export let select: () => void;
</script>

<Card class={"flex flex-col m-1 overflow-hidden" + (item.endDate !== undefined? " opacity-75":"")}>
    <CardHeader class="p-3 xl:p-6">
        <CardTitle class="flex">
            {item.name}
            <button on:click={select} class="ms-auto">
                <LucideEllipsis/>
            </button>
        </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 p-3 xl:p-6 xl:pt-0">
        {#if item.origin !== ''}
            <div class="italic">Pochodzenie:</div>
            <div>{item.origin}</div>
        {/if}
        {#if item.roaster !== ''}
            <div class="italic">Palarnia:</div>
            <div>{item.roaster}</div>
        {/if}

        <div class="italic">Pozostało:</div>
        <div>{(item.amount - item.amountUsed).toLocaleString()} / {item.amount}</div>

        <div class="italic">Rozpoczęto:</div>
        <div>{item.startDate.toISOString().slice(0, 10)}</div>

        {#if item.endDate !== undefined}
            <div class="italic">Zakończono:</div>
            <div>{item.endDate.toISOString().slice(0, 10)}</div>
        {/if}

        <div class="italic">Cena:</div>
        <div>{item.price} zł</div>


    </CardContent>
</Card>