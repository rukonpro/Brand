

export const getAllCategory = async () => {
    const catagorys = await fetch(`${process.env.HOST_URL_SERVER}/Category/all-category`);

    return catagorys.json()
}