// import Banner from "./components/Banner/Banner";
// import Offers from "./components/offers/Offers";
// import Requests from "./components/requests/Requests";
// import RecommendedItems from "./components/RecommendedItems/RecommendedItems";
// import OurExtraServices from "./components/OurExtraServices/OurExtraServices";
// import SuppliersByRegion from "./components/SuppliersByRegion/SuppliersByRegion";
import Nav from "@/app/components/navbar/nav";
// import SourcesProductsLayout from "./components/SourcesProductsLayout/SourcesProductsLayout";
// import {Suspense} from "react";
// import Loading from "@/app/loading";


export default function Home() {

    return (
        <>
            <Nav />
           {/* <Banner />*/}
           {/* <Suspense fallback={<Loading/>}>*/}
           {/*     <Offers />*/}
           {/* </Suspense>*/}
           {/* <Suspense fallback={<Loading/>}>*/}
           {/*     <SourcesProductsLayout />*/}
           {/* </Suspense>*/}
           {/* <Requests />*/}
           {/*<Suspense fallback={<Loading/>}>*/}
           {/*    <RecommendedItems />*/}
           {/*</Suspense>*/}
           {/* <OurExtraServices />*/}
           {/* <SuppliersByRegion />*/}
        </>
    );
}
