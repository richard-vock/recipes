import { loadSubCategory } from '$lib/recipes.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let recipes = await loadSubCategory(params.category, params.subcategory);
    return {
        recipes,
    }
}
