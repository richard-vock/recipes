function to_url(category, subcategory) {
    let url = `${category}/${subcategory}`;
    url = url.replace(/ /g, "-");
    url = url.replace(/\&/g, "and");
    return url.toLowerCase();
}

function from_url(url) {
    if (url === undefined) {
        return "";
    }
    let str = url.replace(/_/g, " ");
    str = str.replace(/-/g, " ");
    str = str.replace(/and/g, "&");
    return str;
}


export { to_url, from_url };
