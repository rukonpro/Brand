


export const getAllCategory = async () => {
    const catagorys = await fetch(`/api/category/all-category`, {
        headers: {
            Accept: "application/json",
            method: "GET"
        }
    });

    return await catagorys.json()
}