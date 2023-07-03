<script>
    import BriefRecipe from "./brief_recipe.svelte";

    export let data;
</script>

<ul>
{#each data.recipes as recipe}
    <BriefRecipe recipe={recipe} />
{/each}
</ul>
