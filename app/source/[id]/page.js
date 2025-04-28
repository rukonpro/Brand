import { getProducts } from '@/app/utils/product/fetch_products_api';
import { getCategoryById } from '@/app/utils/Category/fetch_category_api';
import Source from './Source'; // Import the client component

export async function generateMetadata({ params }) {
    const { id } = params;

    const [category, products] = await Promise.all([
        getCategoryById(id),
        getProducts({ categoryId: id, limit: 10, page: 1 }),
    ]);

    return {
        title: `${category?.data?.name || 'Category'} Products - Brand`,
        description: `Explore top products in the ${category?.data?.name || 'category'} category at Brand. Browse through ${products?.data?.data?.length || 0} selected items with unbeatable prices and fast delivery.`,
        keywords: 'source, product categories, Brand, online shopping, product sourcing',
        openGraph: {
            title: 'Source - Brand',
            description:
                'Explore our diverse range of categories and products on Brand. Discover the perfect items that match your style and preferences.',
            url: `https://brand-rukon.vercel.app/source/${id}`,
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title: 'Source - Brand',
            description:
                'Explore our diverse range of categories and products on Brand. Discover the perfect items that match your style and preferences.',
        },
    };
}

const SourceWrapper = async ({ params }) => {
    const { id } = params;

    const [category, products] = await Promise.all([
        getCategoryById(id),
        getProducts({ categoryId: id, limit: 10, page: 1 }),
    ]);

    return (
        <Source
            initialProducts={products?.data?.data || []}
            pagination={products?.data?.pagination || {}}
            category={category?.data || {}}
            categoryId={id}
        />
    );
};

export default SourceWrapper;