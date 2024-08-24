<script>
    import "../app.css";
</script>

<div class="flex p-1 border-b-2 bg-muted">
    <a class="ml-2 text-3xl font-semibold tracking-tight" href="/">Coffee Inventory
        <span class="italic text-base">
            2.0
        </span>
    </a>
    <div class="grow"></div>
    <a class="mr-5 self-center text-xl" href="/inventory">Inwentarz</a>
    <a class="mr-5 self-center text-xl" href="/brews">Parzenia</a>
</div>

<slot></slot>
