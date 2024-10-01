import Banner from "./components/Banner/Banner";
import Requests from "./components/requests/Requests";
import RecommendedItems from "./components/RecommendedItems/RecommendedItems";
import OurExtraServices from "./components/OurExtraServices/OurExtraServices";
import SuppliersByRegion from "./components/SuppliersByRegion/SuppliersByRegion";
import Nav from "@/app/components/navbar/nav";
import {Suspense} from "react";
import Loader from "@/app/Loader";
import OffersLayout from "@/app/components/offers/OffersLayout";
import {SkeletonHeader} from "@/app/components/Skeletons/SkeletonCategories";
import {SkeletonRecommendedItemsSection} from "@/app/components/Skeletons/SkeletonRecommendedItemCard";


export default  function Home() {
    return (
        <>
            <Nav />
            <Suspense fallback={<SkeletonHeader/>}>
                <Banner />
            </Suspense>

            {/*<Suspense fallback={<Loader/>}>*/}
                <OffersLayout />
            {/*</Suspense>*/}
            <Suspense fallback={<SkeletonRecommendedItemsSection/>}>
                <RecommendedItems />
            </Suspense>
            {/*<Suspense fallback={<Loader/>}>*/}
            {/*    <SourcesProductsLayout />*/}
            {/*</Suspense>*/}
            <Requests />

            <OurExtraServices />
            <SuppliersByRegion />
        </>
    );
}
