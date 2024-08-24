<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import BrewCard from "./BrewCard.svelte";
    import {Drawer, DrawerContent} from "$lib/components/ui/drawer";
    import type {BrewDTO} from "$lib/services/entities/brewDTO";

    export let data;
    let drawer: boolean;
    let edited: BrewDTO | undefined;

    function selectEl(x: BrewDTO) {
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
        Dodaj nowe
    </Button>
</div>

<div class="w-full 2xl:w-2/5 lg:w-1/2 grid grid-cols-1 m-auto mt-4 gap-3">
    {#each data.brews as brew (brew.id)}
        <BrewCard brew={brew} select={()=>selectEl(brew)}/>
    {/each}
</div>

<Drawer direction="left" bind:open={drawer}>
    <DrawerContent class="left-0 top-0 bottom-0 w-11/12 sm:w-2/3 lg:w-1/3 2xl:w-1/4 h-full xl:h-4/5 my-auto">
    </DrawerContent>
</Drawer>