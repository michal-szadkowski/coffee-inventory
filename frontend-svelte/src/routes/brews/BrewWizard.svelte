<script lang="ts">
    import type {BrewDTO, UsageDTO} from "$lib/services/entities/brewDTO";
    import {type InventoryItemDTO} from "$lib/services/entities/inventoryItemDTO";
    import {Label} from "$lib/components/ui/label";
    import DateTimePicker from "$lib/components/DateTimePicker.svelte";
    import {Textarea} from "$lib/components/ui/textarea";
    import {Button} from "$lib/components/ui/button";
    import {invalidateAll} from "$app/navigation";
    import {BrewService} from "$lib/services/brewsService";
    import UsageWizard from "./UsageWizard.svelte";

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

    <UsageWizard items={openItems} bind:usage={usage}></UsageWizard>

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