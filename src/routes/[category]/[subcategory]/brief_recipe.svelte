<script>
    import SectionBox from "$lib/components/section_box.svelte";

    export let recipe;

    let base_amount = 1;
    if ("base amount" in recipe.metadata) {
        base_amount = parseInt(recipe.metadata["base amount"]);
    }
    let base_unit = "g";
    if ("base unit" in recipe.metadata) {
        base_unit = recipe.metadata["base unit"];
    }

    let relative = "type" in recipe.metadata && recipe.metadata["type"] == "relative";

    let base_factor = 1.0;
    function formatAmount(amount, base, unit = null, factor=1.0) {
        if (relative) {
            return `${Math.round(0.01 * amount * base)}${base_unit}`;
        } else {
            return `${Math.round(factor*parseFloat(amount))}${unit || "g"}`;
        }
    }

    function formatStepDescription(parts) {
        let tokens = [];
        for (const part of parts) {
            if (part.type == "text") {
                tokens.push(part.value);
            }
        }
        return tokens.join('');
    }
</script>

<div class="container mx-auto py-2">
<SectionBox>
    <div class="bg-sky-400 text-black flex justify-between object-fit px-2 py-2 border border-slate-300 border-0 border-b-2">
        <h1 class="capitalize">{recipe.title}</h1>
        <span>
            {#if relative }
                Base amount:
                <input type="number" class="w-24 bg-gray-50 border border-slate-300 text-right" bind:value={base_amount} />
                { base_unit }
            {:else}
                Scale:
                <input type="number" class="w-24 bg-gray-50 border border-slate-300 text-right" bind:value={base_factor} />
                x
            {/if}
        </span>
    </div>
    <div class="object-fit grid grid-cols-2 text-sm gap-2 border border-slate-300 border-0 border-b-2">
        <div class="px-2 py-2">
            {#if relative }
                <div class="object-fit grid grid-cols-3 gap-x-2">
                    <div class="font-bold">
                        Ingredient
                    </div>
                    <div class="font-bold text-right">
                        Scaling
                    </div>
                    <div class="font-bold text-right">
                        Amount
                    </div>
                </div>
            {:else}
                <div class="object-fit grid grid-cols-2 gap-x-2">
                    <div class="font-bold">
                        Ingredient
                    </div>
                    <div class="font-bold text-right">
                        Amount
                    </div>
                </div>
            {/if}
        </div>
        <div class="px-2 py-2">
            <div class="font-bold">
                Instructions
            </div>
        </div>
    </div>
    {#each recipe.steps as step, step_nr}
        <div class="object-fit grid grid-cols-2 gap-2 text-sm border border-slate-300 border-0 border-b-2">
            <div class="px-2 py-2">
                {#if relative }
                    <div class="object-fit grid grid-cols-3 gap-x-2">
                        {#each step as part}
                            {#if part.type === "ingredient"}
                                <div class="capitalize">
                                    {part.name}
                                </div>
                                <div class="text-right">
                                    {part.quantity}%
                                </div>
                                <div class="text-right">
                                    {formatAmount(part.quantity, base_amount)}
                                </div>
                            {/if}
                        {/each}
                    </div>
                {:else}
                    <div class="object-fit grid grid-cols-2 gap-x-2">
                        {#each step as part}
                            {#if part.type === "ingredient"}
                                <div class="capitalize">
                                    {part.name}
                                </div>
                                <div class="text-right">
                                    {formatAmount(part.quantity, base_amount, part.units, base_factor)}
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
            <div class="px-2 py-2">
                <div class="float-left bg-slate-300 rounded-full mr-2 px-2 w-5 h-5 min-w-fit min-h-fit flex items-center justify-center">
                    { step_nr + 1 }
                </div>
                {formatStepDescription(step)}
                <div class="clear-left" />
            </div>
        </div>
    {/each}
</SectionBox>
</div>
