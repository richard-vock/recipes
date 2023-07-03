<script>
    import "../app.css";
    import Menu from "./menu.svelte";
    export let data;

</script>

<Menu categories={data.categories} />

<slot />

<style lang="postcss">
    :global(html) {
        height: 100%;
    }
    :global(body) {
        height: 100%;
        background-color: theme(colors.gray.100);
    }
    /* @media (prefers-color-scheme: dark) { */
    /*     :global(body) { */
    /*         height: 100%; */
    /*         background-color: theme(colors.slate.800); */
    /*     } */
    /* } */
</style>
