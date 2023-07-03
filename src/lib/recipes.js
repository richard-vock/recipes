import { basename } from 'path';
import { glob } from 'glob';
import { readFile } from 'fs/promises';
import { Recipe } from '@cooklang/cooklang-ts';
import { from_url } from './utils';

async function getRecipeFiles() {
    let files = await glob("recipes/**/*.cook");
    let filtered = [];
    for (let file of files) {
        let tokens = file.split('/');
        if (tokens.length != 4) {
            continue;
        }
        tokens = tokens.slice(1);
        filtered.push({
            category: tokens[0],
            subcategory: tokens[1],
            filename: tokens[2],
            path: file,
        });
    }
    return filtered;
}

async function getRecipeCategories() {
    const files = await getRecipeFiles();
    const categories = {};
    for (const file of files) {
        if (!(file.category in categories)) {
            categories[file.category] = new Set();
        }
        categories[file.category].add(file.subcategory);
    }
    for (const cat in categories) {
        categories[cat] = Array.from(categories[cat]);
    }
    return categories;
}

async function loadSubCategory(category, subcategory) {
    const files = await getRecipeFiles();
    const recipes = [];
    for (const file of files) {
        if (file.category == category && file.subcategory == subcategory) {
            const recipe = await loadRecipeFile(file.path);
            // for (const step of recipe.steps) {
            //     console.log(step);
            // }
            console.log(recipe.steps);
            console.log(recipe.steps.length);
            console.log(recipe.metadata);
            recipes.push({
                category,
                subcategory,
                title: recipe.title,
                steps: recipe.steps,
                ingredients: recipe.ingredients,
                metadata: recipe.metadata,
            });
        }
    }
    return recipes;
}

async function loadRecipeFile(filename) {
    const content = await readFile(filename, 'utf-8');
    const recipe = new Recipe(content);
    recipe.title = from_url(basename(filename, ".cook"));
    return recipe;
}

export { getRecipeFiles, getRecipeCategories, loadSubCategory, loadRecipeFile };
