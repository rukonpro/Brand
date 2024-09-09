import Footer from "@/app/components/Footer/Footer";
import CatalogAside from './CatalogAside';
import Catalogs from './Catalogs';


const Catalog = async () => {
  const products = [{}]

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