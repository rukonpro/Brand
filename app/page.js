import Banner from "./components/Banner/Banner";
import Requests from "./components/requests/Requests";
import RecommendedItems from "./components/RecommendedItems/RecommendedItems";
import OurExtraServices from "./components/OurExtraServices/OurExtraServices";
import SuppliersByRegion from "./components/SuppliersByRegion/SuppliersByRegion";
import Nav from "@/app/components/navbar/nav";
import { Suspense } from "react";
import { SkeletonHeader } from "@/app/components/Skeletons/SkeletonCategories";
import { SkeletonRecommendedItemsSection } from "@/app/components/Skeletons/SkeletonRecommendedItemCard";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/Footer/Footer";
import CategoriesHome from "./components/CategoriesHome/CategoriesHome";
import Loader from "./Loader";
import Offers from "./components/offers/Offers";
import Brands from "@/app/components/Brands/Brands";



export const metadata = {
    title: "Brand - Your Ultimate Online Shopping Destination",
    description: "Discover a wide range of high-quality products at Brand. Enjoy seamless shopping with fast delivery, secure payments, and unbeatable prices. Shop the latest trends and essentials now!",
    keywords: "home, online shopping, fashion, electronics, deals, Brand",
    openGraph: {
        title: "Brand - Your Ultimate Online Shopping Destination",
        description: "Discover a wide range of high-quality products at Brand. Enjoy seamless shopping with fast delivery, secure payments, and unbeatable prices. Shop the latest trends and essentials now!",
        url: "https://brand-rukon.vercel.app", // Adjust the URL if necessary
        type: "website",
    },
    twitter: {
        card: "summary_large_image", // You can use a large image for a better visual impact
        title: "Brand - Your Ultimate Online Shopping Destination",
        description: "Discover a wide range of high-quality products at Brand. Enjoy seamless shopping with fast delivery, secure payments, and unbeatable prices. Shop the latest trends and essentials now!",
    },
};


export default function Home() {
    return (
        <>
            <div className="sticky top-0 z-[20]">
                <Navbar />
            </div>
            <Nav />
            <Suspense fallback={<SkeletonHeader />}>
                <Banner />
            </Suspense>

            <Offers />

            <CategoriesHome />

            <Suspense fallback={<SkeletonRecommendedItemsSection />}>
                <RecommendedItems />
            </Suspense>
            <Brands />

            <Requests />

            <OurExtraServices />
            <SuppliersByRegion />
            <Footer />
        </>
    );
}
