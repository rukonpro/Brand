import React, { Suspense } from 'react';
import Nav from "@/app/components/navbar/nav";
import BackButton from "@/app/components/BackButtons/BackButton";
import ImageChangeButton from '@/app/components/imageChangeButton/ImageChangeButton';
import RelatedProducts from "@/app/components/RelatedProducts/RelatedProducts";
import Loader from "@/app/Loader";
import { getDetailsProduct, getProducts } from "@/app/utils/product/fetch_products_api";
import SaveForLaterButton from "@/app/components/SavedForLaterItems/SaveForLaterButton";
import { PiImageBrokenLight } from "react-icons/pi";
import Navbar from "@/app/components/navbar/navbar";
import Specifications from '@/app/components/Specifications/Specifications';
import Footer from '@/app/components/Footer/Footer';
import SelectAttributes from './SelectAttributes';
import RelatedProductsSkeleton from '@/app/components/Skeletons/RelatedProductsSkeleton';
import SpecificationsSkeleton from '@/app/components/Skeletons/SpecificationsSkeleton';
import ProductDetails from './ProductDetails';



const Details = async ({ params }) => {
    /*//https://www.figma.com/file/OO4BPb5dJMEaRxPvBPx2uC/Figma-ecommerce-UI-Kit-(web-%26-mobile)-(Community)?node-id=238%3A4835&mode=dev
*/
    const id = params?.id;

    const product = await getDetailsProduct({ id });


    return (
        <>
            <div className="sticky top-0 z-[20]">
                <Navbar />
            </div>
            <Nav />

            <div className="max-w-[1200px] mx-auto md:px-3  pb-5 ">



                <div className="flex justify-between items-center px-3 md:px-0">
                    <h1 className="text-2xl  font-bold text-gray-600 py-5 dark:text-slate-50">Details</h1>

                    <div>
                        <BackButton title="Back" />
                    </div>
                </div>
                <Suspense fallback={<Loader />}>
                    <div
                        className="grid grid-cols-12 gap-4 md:border-2 p-3  md:bg-white md:rounded-lg dark:bg-slate-800 dark:border-slate-700 relative">
                        <div className="col-span-12 md:col-span-4">

                            <div className='absolute right-3 top-3'>
                                <SaveForLaterButton product={product?.data} />
                            </div>

                            {product?.data ?
                                (<ImageChangeButton

                                    product={product?.data}
                                />) :

                                (

                                    <PiImageBrokenLight
                                        size={400}
                                    />)
                            }


                        </div>

                        <div className="col-span-12 md:col-span-8 ">
                            <div className="flex justify-between items-center">
                                {product?.data?.offers?.[0]?.isActive &&
                                    <div >

                                        <p className="font-bold text-2xl text-red-500 ">{product?.data?.offers?.[0]?.discountValue}%
                                            Discount</p>
                                        {/* <div className="flex justify-center">
                                            <Countdown endDate={product?.data?.offers?.[0]?.endDate} />
                                        </div> */}
                                    </div>
                                }
                            </div>
                            <div className="pt-5">
                                <Suspense fallback={""}>
                                    <ProductDetails product={product?.data} />

                                    <SelectAttributes product={product?.data} id={id} />
                                </Suspense>


                            </div>
                        </div>



                    </div>


                </Suspense>






                {product?.data?.specifications &&
                    <Suspense fallback={<SpecificationsSkeleton />}>
                        <Specifications data={product?.data?.specifications} />
                    </Suspense>}



                {/************************Related products ***********************/}

                {

                    <Suspense fallback={<RelatedProductsSkeleton />}>
                        <RelatedProducts categoryId={product?.data?.categoryId} />
                    </Suspense>
                }
            </div>

            <Footer />
        </>
    );
};


export default Details;


export async function getStaticPaths() {
    const res = await getProducts({
        limit: 1000,
    });
    const products = res?.data || []

    // Get the paths we want to pre-render based on posts
    const paths = products?.map((product) => ({
        params: { id: product?.id }, // must be string type for dynamic routes
    }));

    // Fallback enables dynamic rendering for paths not generated during build
    return { paths, fallback: false };
}