import { getRecipeCategories } from '$lib/recipes.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const categories = await getRecipeCategories();
    return {
        categories: categories,
    }
}
