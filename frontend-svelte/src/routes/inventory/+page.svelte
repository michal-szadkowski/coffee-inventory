<script lang="ts">
    import type {InventoryItemDTO} from "$lib/services/entities/inventoryItemDTO";
    import {Drawer} from "$lib/components/ui/drawer";
    import {DrawerContent} from "$lib/components/ui/drawer/index.js";
    import InvItemWizard from "./InvItemWizard.svelte";
    import {Button} from "$lib/components/ui/button";
    import InvItemCard from "./InvItemCard.svelte";

    export let data;

    let open: InventoryItemDTO[];
    let closed: InventoryItemDTO[];

    $: open = data.items.filter(x => x.endDate === undefined).sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    $: closed = data.items.filter(x => x.endDate !== undefined);

    let edited: InventoryItemDTO | undefined = undefined;
    let drawer: boolean = false;

    function selectEl(x: InventoryItemDTO) {
        edited = x;
        drawer = true;
    }

    function createNew() {
        edited = undefined;
        drawer = true;
    }

</script>

<div class="w-full flex mt-3">
    <Button on:click={()=>createNew()} class="mx-auto">
        Dodaj nowy
    </Button>
</div>

<div class="w-full 2xl:w-2/3 lg:w-4/5 grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 m-auto mt-4 gap-2">
    {#each open as item (item.id)}
        <InvItemCard {item} on:click={()=>selectEl(item)}/>
    {/each}

    {#each closed as item (item.id)}
        <InvItemCard {item} on:click={()=>selectEl(item)}/>
    {/each}
</div>

<Drawer direction="left" bind:open={drawer} >
    <DrawerContent class="left-0 top-0 bottom-0 w-11/12 sm:w-2/3 lg:w-1/3 2xl:w-1/4 h-full xl:h-4/5 my-auto">
        <InvItemWizard item={edited} close={()=>drawer=false}/>
    </DrawerContent>
</Drawer>
    