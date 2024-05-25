export const parseSearchParams = (searchParams) => {
    const params = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
};