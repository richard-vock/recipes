<script>
    import Menu from "../../menu.svelte";
    import BriefRecipe from "./brief_recipe.svelte";

    export let data;
</script>

<Menu categories={data.categories} />

<ul>
{#each data.recipes as recipe}
    <BriefRecipe recipe={recipe} />
{/each}
</ul>
