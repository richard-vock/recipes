<script>
    import { page } from "$app/stores";
    import SectionBox from "$lib/components/section_box.svelte";
    import { to_url, from_url } from "$lib/utils";

    export let categories;

    $:visible = false;
    function toggle_visible() {
        visible = !visible;
    }
</script>
<div class="container mx-auto py-2 flex flex-col gap-1">
    <SectionBox>
        <button
            class="h-9 bg-slate-300 px-5 flex flex-row items-center gap-2 active:bg-sky-400"
            class:bg-sky-400={visible}
            on:click={toggle_visible}
        >
            Recipes
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
    </SectionBox>
    {#if visible }
        <SectionBox>
            <nav class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-stretch">
                {#each Object.keys(categories) as category}
                    <section class="bg-gray-100 grow px-4 py-2 border border-slate-300 border-0 border-r-2 border-b-2">
                        <h1
                            class="capitalize"
                            class:text-sky-500={from_url($page.params.category) === category}
                        >
                            {category}
                        </h1>

                        <ul>
                            {#each categories[category] as subcategory}
                                <li class="text-sm capitalize">
                                    <a
                                        href="/{to_url(category, subcategory)}"
                                        class="hover:text-sky-400 active:text-sky-400"
                                        class:text-slate-500={from_url($page.params.subcategory) !== subcategory}
                                        class:text-sky-500={from_url($page.params.subcategory) === subcategory}
                                        on:click={toggle_visible}
                                >
                                        {subcategory}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </section>
                {/each}
            </nav>
        </SectionBox>
    {/if}
</div>
