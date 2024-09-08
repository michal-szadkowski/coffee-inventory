<script lang="ts">
    import type {BrewDTO, UsageDTO} from "$lib/services/entities/brewDTO";
    import {type InventoryItemDTO, InventoryItemTypeDTO} from "$lib/services/entities/inventoryItemDTO";
    import {Label} from "$lib/components/ui/label";
    import DateTimePicker from "$lib/components/DateTimePicker.svelte";
    import {Table, TableCell, TableRow} from "$lib/components/ui/table";
    import {extendBrewsWithInventoryItems} from "$lib/services/brewsExtender";
    import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "$lib/components/ui/select";
    import {Input} from "$lib/components/ui/input";
    import {LucideDelete, LucidePlus} from "lucide-svelte";
    import {Textarea} from "$lib/components/ui/textarea";
    import {Button} from "$lib/components/ui/button";
    import {invalidateAll} from "$app/navigation";
    import {BrewService} from "$lib/services/brewsService";
    import formatItemName from "$lib/itemNameFormatter";

    export let brew: BrewDTO | undefined;
    export let items: InventoryItemDTO[];
    export let close: () => void;

    let openItems = items.filter(x => x.endDate === undefined);

    let usage: UsageDTO[] = brew?.usage ?? [];
    let comment: string = brew?.comment ?? "";
    let time: Date = brew?.time ?? new Date(Date.now());

    $:result = {
        id: brew?.id ?? "",
        usage: usage,
        comment: comment,
        time: time,
        coffeeOut: 0,
        timeInSeconds: 0
    }

    $:usageItems = extendBrewsWithInventoryItems(result, items).usageItems

    let newItemId: { value: string, label: string } = {value: "", label: ""};
    let newItemCount: number | undefined = undefined;

    function remove(itemId: string) {
        usage = usage.filter(x => x.itemId !== itemId);
    }

    function addNew() {
        if (newItemCount === undefined) return;
        if (newItemId.value !== "" && newItemCount > 0) {
            usage = [...usage, {itemId: newItemId.value, amount: parseFloat(newItemCount.toString())}]
            newItemId = {value: "", label: ""};
            newItemCount = undefined;
        }
    }

    async function saveBrew() {
        if (brew === undefined)
            await BrewService.Add(result);
        else
            await BrewService.Edit(result);
        await invalidateAll();
        close();
    }

    async function deleteBrew() {
        if (brew !== undefined)
            await BrewService.Delete(result.id);
        close();
        await invalidateAll();
    }

</script>

<div class="p-2 2xl:p-8 overflow-auto h-full flex flex-col">
    {#if brew === undefined}
        <div class="text-2xl font-bold">Nowy</div>
    {:else}
        <div class="text-2xl font-bold">Edycja</div>
    {/if}

    <div class="mt-3" data-vaul-no-drag>
        <Label for="time">
            Dodaj nowy:
            <div class="flex flex-wrap gap-y-3">
                <Select bind:selected={newItemId}>
                    <SelectTrigger class="w-full">
                        <SelectValue class="text-sm text-left"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {#each openItems as item}
                            <SelectItem class="px-1" value={item.id}>{formatItemName(item)}</SelectItem>
                        {/each}
                    </SelectContent>
                </Select>
                <Input class="w-1/2" type="number" placeholder="ilość" bind:value={newItemCount} autocomplete="off"></Input>
                <Button class="w-2/5 justify-self-end ml-auto mr-0" on:click={()=>addNew()}>
                    <LucidePlus size="22"/>
                </Button>
            </div>

        </Label>
    </div>


    <div class="my-3 min-h-28">
        <Table class="xl:text-base">
            {#each usageItems as usage}
                <TableRow class="border-y border-muted-foreground">
                    <TableCell class="py-1 w-5/6 text-sm">{formatItemName(usage.item)}</TableCell>
                    <TableCell class="py-1 text-right min-w-fit text-nowrap text-sm">
                        {usage.amount}
                        {#if usage.item?.type === InventoryItemTypeDTO.Coffee}g{/if}
                    </TableCell>
                    <TableCell class="py-1">
                        <button class="flex" on:click={()=>{if(usage.item !==undefined){remove(usage.item?.id)}}}>
                            <LucideDelete size="20" class="self-center"/>
                        </button>
                    </TableCell>
                </TableRow>
            {/each}
        </Table>
    </div>

    <div class="mt-3">
        <Label for="time">
            Data:
            <DateTimePicker bind:value={time}/>
        </Label>
    </div>

    <div class="mt-3" data-vaul-no-drag>
        <Label for="time">
            Komentarz:
            <Textarea class="resize-none" bind:value={comment} autocomplete="false"/>
        </Label>
    </div>

    <div class="justify-self-end mt-auto pt-6 mb-5 2xl:mb-0 w-full flex justify-around">
        {#if brew !== undefined}
            <Button class="bg-destructive my-auto" on:click={()=>deleteBrew()}>Usuń</Button>
        {/if}
        <Button on:click={()=>saveBrew()}>
            Zapisz
        </Button>

    </div>
</div>      