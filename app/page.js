import Banner from "./components/Banner/Banner";
import Requests from "./components/requests/Requests";
import RecommendedItems from "./components/RecommendedItems/RecommendedItems";
import OurExtraServices from "./components/OurExtraServices/OurExtraServices";
import SuppliersByRegion from "./components/SuppliersByRegion/SuppliersByRegion";
import Nav from "@/app/components/navbar/nav";
// import SourcesProductsLayout from "./components/SourcesProductsLayout/SourcesProductsLayout";
import {Suspense} from "react";
import Loading from "@/app/loading";
import OffersLayout from "@/app/components/offers/OffersLayout";


export default function Home() {

    return (
        <>
            <Nav />
            <Banner />
            <Suspense fallback={<Loading/>}>
                <OffersLayout />
            </Suspense>
            <Suspense fallback={<Loading/>}>
                <RecommendedItems />
            </Suspense>
            {/*<Suspense fallback={<Loading/>}>*/}
            {/*    <SourcesProductsLayout />*/}
            {/*</Suspense>*/}
            <Requests />

            <OurExtraServices />
            <SuppliersByRegion />
        </>
    );
}
