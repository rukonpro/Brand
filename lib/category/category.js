

export const getAllCategory = async () => {
    const catagorys = await fetch(`${process.env.HOST_URL}/api/Category/all-category`);

    return catagorys.json()
}