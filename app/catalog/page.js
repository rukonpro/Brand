import Footer from "@/app/components/Footer/Footer";
import fakeData from "@/app/FakeData/FakeData";
import CatalogAside from './CatalogAside';
import Catalogs from './Catalogs';
import getProducts from "@/lib/product/getAllProducts";

const Catalog = async () => {
    const searchParams = {};

    const { products } = await getProducts(searchParams);

    return (
        <div>
            <div className=" p-3 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    <CatalogAside />
                    <Catalogs products={JSON.stringify(products)} />

                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Catalog;