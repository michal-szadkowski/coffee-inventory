<script lang="ts">
    import type {InventoryItemDTO} from "$lib/services/entities/inventoryItemDTO.js";
    import {Card, CardContent, CardHeader, CardTitle} from "$lib/components/ui/card/index.js";

    export let item: InventoryItemDTO;
</script>

<Card class={"flex flex-col m-1" + (item.endDate !== undefined? " opacity-75":"")} on:click>
    <CardHeader class="p-3 xl:p-6">
        <CardTitle>
            {item.name}
        </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 p-3 xl:p-6 pt-0">
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

        <div class="italic">Rozpoczęto</div>
        <div>{item.startDate.toISOString().slice(0, 10)}</div>

        {#if item.endDate !== undefined}
            <div class="italic">Zakończono</div>
            <div>{item.endDate.toISOString().slice(0, 10)}</div>
        {/if}


    </CardContent>
    <!--    <CardFooter class="justify-self-end ms-auto mt-auto p-3 xl:p-6">-->
    <!--        <Button on:click={()=>console.log("ASD")}>Edytuj</Button>-->
    <!--    </CardFooter>-->
</Card>