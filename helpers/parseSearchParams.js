export const parseSearchParams = (url) => {
    const newURL = new URL(url);
    const searchParams = new URLSearchParams(newURL.search);
    let queres = {};
    for (let [name, value] of searchParams.entries()) {
        queres[name] = value;
    }
    return queres
};