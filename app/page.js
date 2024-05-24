import Banner from "./components/Banner/Banner";
import Offers from "./components/offers/Offers";
import Requests from "./components/requests/Requests";
import RecommendedItems from "./components/RecommendedItems/RecommendedItems";
import OurExtraServices from "./components/OurExtraServices/OurExtraServices";
import SuppliersByRegion from "./components/SuppliersByRegion/SuppliersByRegion";
import Nav from "@/app/components/navbar/nav";
import SourcesProductsLayout from "./components/SourcesProductsLayout/SourcesProductsLayout";
import { cookies } from "next/headers";


async function getCookieData() {
    const cookieData = cookies().getAll()
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(cookieData)
        }, 1000)
    )
}

export default async function Home() {
    const chocieData =await getCookieData();

    console.log(chocieData)
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
