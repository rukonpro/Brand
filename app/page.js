import Banner from "./components/Banner/Banner";
import Offers from "./components/offers/Offers";
import Requests from "./components/requests/Requests";
import RecommendedItems from "./components/RecommendedItems/RecommendedItems";
import OurExtraServices from "./components/OurExtraServices/OurExtraServices";
import SuppliersByRegion from "./components/SuppliersByRegion/SuppliersByRegion";
import Nav from "@/app/components/navbar/nav";
import SourcesProductsLayout from "./components/SourcesProductsLayout/SourcesProductsLayout";
import API_BASE_URL from "@/lib/API_BASE_URL/API_BASE_URL";



export default function Home() {
    if (!API_BASE_URL) {
        return null
    }
    return (
        <>
            <Nav />
            <Banner />
            <Offers />
            <SourcesProductsLayout />
            <Requests />
            <RecommendedItems />
            <OurExtraServices />
            <SuppliersByRegion />
        </>
    );
}
