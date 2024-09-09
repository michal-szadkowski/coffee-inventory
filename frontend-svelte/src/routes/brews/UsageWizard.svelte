<script lang="ts">
    import type {UsageDTO} from "$lib/services/entities/brewDTO";
    import formatItemName from "$lib/itemNameFormatter";
    import {type InventoryItemDTO, InventoryItemTypeDTO} from "$lib/services/entities/inventoryItemDTO";
    import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "$lib/components/ui/select";
    import {LucideDelete, LucidePlus} from "lucide-svelte";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import {Table, TableCell, TableRow} from "$lib/components/ui/table";
    import {Button} from "$lib/components/ui/button";
    import {extendUsageWithInventoryItems} from "$lib/services/brewsExtender";
    import {onMount} from "svelte";

    export let usage: UsageDTO[] = [];
    export let items: InventoryItemDTO[];

    $: openItems = items.filter(x => x.endDate === undefined);

    $:usageWithItems = extendUsageWithInventoryItems(usage, items);

    function addDefaultUsage() {
        let others = items.filter(x => x.type === InventoryItemTypeDTO.Other);
        if (others.length === 1 && usage.length === 0) {
            usage = [{itemId: others[0].id ?? "", amount: 1}]
        }
    }

    onMount(() => addDefaultUsage());

    let newItemId: { value: string, label: string } = {value: "", label: ""};
    let newItemCount: string | undefined = undefined;

    function addNew() {
        if (newItemCount === undefined) return;
        const newItemCountNumber: number | undefined = parseFloat(newItemCount);
        if (newItemId.value === "" || newItemCountNumber <= 0) return;

        const existing: UsageDTO | undefined = usage.find(x => x.itemId === newItemId.value);
        if (existing !== undefined) {
            existing.amount += newItemCountNumber;
            usage = usage;
        } else {
            usage = [...usage, {itemId: newItemId.value, amount: newItemCountNumber}]
        }
        newItemId = {value: "", label: ""};
        newItemCount = undefined;
    }

    function remove(itemId: string | undefined) {
        usage = usage.filter(x => x.itemId !== itemId);
    }

    let editedId: string | undefined = undefined;
    let editedAmount: number | undefined = undefined;

    function edit(id: string | undefined) {
        editedId = id;
        editedAmount = usage.find(x => x.itemId == editedId)?.amount;
    }

    function stopEdit() {
        if (editedId !== undefined && editedAmount !== undefined) {
            let edited: UsageDTO | undefined = usage.find(x => x.itemId == editedId);
            if (edited !== undefined) {
                edited.amount = parseFloat(editedAmount.toString());
                usage = usage;
            }
        }
        editedId = undefined;
        editedAmount = undefined;
    }

    function focusInline(element: HTMLInputElement) {
        element.focus()
    }

    function keydownInline(event: KeyboardEvent) {
        if (event.key == 'Escape') {
            event.preventDefault()
            stopEdit()
        }
    }
</script>

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

        {#each usageWithItems as usage}
            <TableRow class="border-y border-muted-foreground text-sm">
                <TableCell class="py-1 w-4/6">{formatItemName(usage.item)}</TableCell>
                <TableCell class="py-1 text-nowrap w-2/6 px-0">
                    <div class="text-right flex justify-items-end   ">
                        {#if editedId !== undefined && usage.item?.id === editedId}
                            <input dir="rtl" class="p-0 2xl:ml-4 bg-background outline-none text-right w-full" type="number"
                                   bind:value={editedAmount}
                                   use:focusInline
                                   on:keydown={keydownInline}
                                   on:blur={stopEdit}
                            />

                        {:else}
                            <span class="mx-auto w-full cursor-pointer" on:click={()=>edit(usage.item?.id)}>
                                {usage.amount}
                            </span>
                        {/if}
                        {#if usage.item?.type === InventoryItemTypeDTO.Coffee}<span class="mx-auto ml-1">g</span>{/if}

                    </div>
                </TableCell>
                <TableCell class="py-1 w-1/6">
                    <button class="flex ml-auto"
                            on:click={()=>{if(usage.item !==undefined){remove(usage.item?.id)}}}>
                        <LucideDelete size="20" class="self-center mx-auto justify-self-end"/>
                    </button>
                </TableCell>
            </TableRow>
        {/each}

    </Table>
</div>