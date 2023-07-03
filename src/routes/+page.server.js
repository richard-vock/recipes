import { getRecipeCategories } from '$lib/recipes.js';

export async function entries() {
    const categories = await getRecipeCategories();
    entries = [];
    for (const cat in categories) {
        for (const subcat of categories[cat]) {
            entries.push({
                category: `${cat}`,
                subcategory: `${subcat}`,
            });
        }
    }
    return entries;
}
export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const categories = await getRecipeCategories();
    return {
        categories: categories,
    }
}
