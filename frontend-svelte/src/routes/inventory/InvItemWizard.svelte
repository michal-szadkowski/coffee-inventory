<script lang="ts">
    import {type InventoryItemDTO, InventoryItemTypeDTO} from "$lib/services/entities/inventoryItemDTO.js";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {Switch} from "$lib/components/ui/switch";
    import {InventoryService} from "$lib/services/inventoryService";
    import {Button} from "$lib/components/ui/button";
    import {invalidateAll} from "$app/navigation";

    export let item: InventoryItemDTO | undefined;
    export let close: () => void;

    let itName: string = item?.name ?? "";

    let itRoaster: string = item?.roaster ?? "";
    let itOrigin: string = item?.origin ?? "";

    let itType: boolean = item?.type !== InventoryItemTypeDTO.Other;
    let itStartDate: Date = item?.startDate ?? new Date(Date.now());
    let itEndDate: Date | undefined = item?.endDate;

    let itAmount: number = item?.amount ?? 0;
    let itPrice: number = item?.price ?? 0;
    $:result = {
        id: item?.id ?? "",
        name: itName,
        roaster: itType ? itRoaster : "",
        origin: itType ? itOrigin : "",
        type: itType ? InventoryItemTypeDTO.Coffee : InventoryItemTypeDTO.Other,
        startDate: itStartDate,
        endDate: itEndDate,
        amount: itAmount,
        amountUsed: item?.amountUsed ?? 0,
        price: itPrice
    }

    async function saveItem() {
        if (item === undefined)
            await InventoryService.Add(result);
        else
            await InventoryService.Edit(result);
        close();
        await invalidateAll();
    }

    async function deleteItem() {
        if (item !== undefined)
            await InventoryService.Delete(result.id);
        close();
        await invalidateAll();
    }
</script>
<div class="p-2 2xl:p-8 overflow-auto h-full flex flex-col">
    {#if item === undefined}
        <div class="text-2xl font-bold">Nowy</div>
    {:else}
        <div class="text-2xl font-bold">Edycja</div>
    {/if}

    <div class="mt-3">
        <Label for="itname">
            Nazwa:
            <Input id="itname" type="text" placeholder="nazwa" bind:value={itName} autocomplete="off" data-vaul-no-drag/>
        </Label>
    </div>

    <div class="mt-3">
        <Label for="itstartdate">
            Rozpoczęcie:
            <Input id="itstartdate" type="date" value={itStartDate?.toISOString?.().split("T")[0]}
                   on:change={(e)=>{itStartDate = e.currentTarget.valueAsDate ?? new Date()}} autocomplete="off"/>
        </Label>
    </div>

    <div class="mt-3">
        <Label for="itenddate">
            Zakończenie:
            <Input id="itenddate" type="date" value={itEndDate?.toISOString?.().split("T")[0]}
                   on:change={(e)=>{itEndDate = e.currentTarget.valueAsDate??undefined}} autocomplete="off"/>
        </Label>
    </div>

    <div class="mt-3">
        <Label for="itamount">
            Ilość:
            <Input id="itamount" type="number" placeholder="ilość" bind:value={itAmount} autocomplete="off" data-vaul-no-drag/>
        </Label>
    </div>

    <div class="mt-3">
        <Label for="itprice">
            Cena:
            <Input id="itprice" type="number" placeholder="cena" bind:value={itPrice} autocomplete="off" data-vaul-no-drag/>
        </Label>
    </div>

    <div class="mt-3 flex items-center space-x-2 w-fit" data-vaul-no-drag>
        <Switch id="ittype" bind:checked={itType}/>
        <Label for="ittype">
            Kawa
        </Label>
    </div>

    {#if itType}
        <div class="mt-3">
            <Label for="itroaster">
                Palarnia:
                <Input id="itroaster" type="text" placeholder="palarnia" bind:value={itRoaster} autocomplete="off" data-vaul-no-drag/>
            </Label>
        </div>

        <div class="mt-3">
            <Label for="itorigin">
                Pochodzenie:
                <Input id="itorigin" type="text" placeholder="pochodzenie" bind:value={itOrigin} autocomplete="off" data-vaul-no-drag/>
            </Label>
        </div>
    {/if}

    <div class="justify-self-end mt-auto pt-6 mb-5 2xl:mb-0 w-full flex justify-around">
        {#if item !== undefined}
            <Button class="bg-destructive my-auto" on:click={()=>deleteItem()}>Usuń</Button>
        {/if}
        <Button on:click={()=>saveItem()}>
            Zapisz
        </Button>

    </div>
</div>      