<script lang="ts">
    export let value: Date;
</script>

<div class="flex w-full">
    <input
            class="flex-auto text-sm px-3 py-2 rounded-s-md border border-input bg-background focus-visible:outline-none ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:z-50"
            type="date"
            value={value?.toISOString().slice(0, 10) || ""}
            on:change={(e) => {
                    let newDate = new Date(value);
                    if (e.currentTarget.valueAsDate !== null) 
                    {
                        newDate.setFullYear(
                            e.currentTarget.valueAsDate.getFullYear(),
                            e.currentTarget.valueAsDate.getMonth(),
                            e.currentTarget.valueAsDate.getDate());
                    }
                    value=newDate
                }}/>

    <input
            class="flex-auto text-sm px-3 py-2 rounded-e-md border border-input bg-background ring-offset-background focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:z-50    "
            type="time"
            value={value.toTimeString().slice(0, 5)}
            on:change={(e) => {
                    let newDate = new Date(value);
                    if (e.currentTarget.valueAsDate !== null) {
                        newDate.setHours(e.currentTarget.valueAsDate.getHours(), e.currentTarget.valueAsDate.getMinutes(), 0);
                    }
                    value=newDate;
                }}/>
</div>
