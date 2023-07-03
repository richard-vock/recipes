import { getRecipeCategories, loadSubCategory } from '$lib/recipes.js';

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


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let recipes = await loadSubCategory(params.category, params.subcategory);
    return {
        recipes,
    }
}
