import baseURL from "@/app/utils/baseURL";


export async function getOffers({ page = 1, pageSize = 6, isActive = true }) {
    try {
        const query = new URLSearchParams({ page, pageSize, isActive }).toString();
        const res = await fetch(`${baseURL}/api/offer/findMany?${query}`, {
            headers: { 'Cache-Control': 'no-store' },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch offers');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching offers:', error);
        return { success: false, error: error.message };
    }
}