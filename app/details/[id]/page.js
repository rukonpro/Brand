import React, { Suspense } from 'react';
import Nav from "@/app/components/navbar/nav";
import BackButton from "@/app/components/BackButtons/BackButton";
import ImageChangeButton from '@/app/components/imageChangeButton/ImageChangeButton';
import RelatedProducts from "@/app/components/RelatedProducts/RelatedProducts";
import Loader from "@/app/Loader";
import { getDetailsProduct, getProducts } from "@/app/utils/product/fetch_products_api";
import SaveForLaterButton from "@/app/components/SavedForLaterItems/SaveForLaterButton";
import Countdown from "@/app/components/Countdown/Countdown";
import { PiImageBrokenLight } from "react-icons/pi";
import Navbar from "@/app/components/navbar/navbar";
import Specifications from '@/app/components/Specifications/Specifications';
import Footer from '@/app/components/Footer/Footer';
import ProductDetails from './TestDetails';
import RelatedProductsSkeleton from '@/app/components/Skeletons/RelatedProductsSkeleton';
import SpecificationsSkeleton from '@/app/components/Skeletons/SpecificationsSkeleton';




// export async function generateMetadata({ params }, parent) {
//     // Extract product ID from route params
//     const id = params?.id;

//     // Fetch product data from API (replace URL with your API endpoint)
//     const product = await getDetailsProduct({ id }) || {};

//     // Access previous metadata from the parent, if needed (optional)
//     const previousImages = (await parent)?.openGraph?.images || [];
//     const productPhotos = Array.isArray(product?.data) ? product?.data?.variant?.map(variant => variant?.photo) : [];
//     // Return dynamic metadata
//     return {
//         title: `${product?.data?.name} - Brand`, // Dynamic title based on product name
//         description: `Buy ${product?.data?.name} at Brand. ${product?.data?.description}.`, // Dynamic description
//         openGraph: {
//             title: `${product?.data?.name} - Brand`,
//             description: `Buy ${product?.data?.name} at Brand. ${product?.data?.description}.`,
//             images: [...productPhotos, ...previousImages], // Using product photos and any previous images
//             url: `${baseURL}/details/${product?.data?.id}`,
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: `${product?.data?.name} - Brand`,
//             description: `Buy ${product?.data?.name} at Brand. ${product?.data?.description}.`,
//             image: product?.data?.coverPhoto, // First image for Twitter card
//         },
//         link: [{ rel: 'icon', href: '/favicon.ico' }],
//         robots: 'index, follow',
//         script: [
//             {
//                 type: 'application/ld+json',
//                 innerHTML: JSON.stringify({
//                     '@context': 'https://schema.org',
//                     '@type': 'Product',
//                     name: product?.data?.name,
//                     description: product?.data?.description,
//                     image: product?.data?.defaultImage,
//                     brand: product?.data?.brand?.name,
//                     offers: {
//                         '@type': 'Offer',
//                         price: product?.data?.offers?.[0]?.price,
//                         priceCurrency: 'USD',
//                         availability: 'https://schema.org/InStock',
//                     },
//                 }),
//             },
//         ],
//         // Add any other metadata as needed
//     };
// }




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
                                <h1 className="text-2xl font-bold">{product?.data?.name}</h1>
                                {product?.data?.rating && <p> Rating: {product?.data?.rating}</p>}

                                {product?.data?.brand?.name &&
                                    <div className="grid grid-cols-12 pt-1 ">
                                        <p className="col-span-4">Brand:</p>
                                        <p className="col-span-8">{product?.data?.brand?.name}</p>
                                    </div>}

                                {product?.data?.description &&
                                    <div className='mt-10'>
                                        <h3 className="text-lg  pb-2">Description:</h3>
                                        <p className=" text-justify">{product?.data?.description}</p>
                                    </div>
                                }

                                <div className='border-t border-slate-50 dark:border-slate-700 mt-6' />

                                <div className="pt-5 ">
                                    {product?.data?.basePrice &&
                                        <div className="grid grid-cols-12  pb-1">
                                            <p className="col-span-4">Price:</p>
                                            <p className="col-span-8 text-3xl text-blue-500">{product?.data?.basePrice > 0 ?
                                                "$" + product?.data?.basePrice : "free"}</p>
                                        </div>
                                    }

                                    <div className="grid grid-cols-12 pb-1">
                                        <p className="col-span-4">Tax:</p>
                                        <p className="col-span-8">{product?.data?.taxPercentage > 0 ? product?.data?.taxPercentage + "%" : "Free"}</p>
                                    </div>



                                    <div className="grid grid-cols-12  pb-1">
                                        <p className="col-span-4">Delivery fee:</p>
                                        <p className="col-span-8">{product?.data?.deliveryFee > 0 ? "$" + product?.data?.deliveryFee : "Free"}</p>
                                    </div>



                                    {product?.data?.design && <div className="grid grid-cols-12 pt-1">
                                        <p className="col-span-4">Design:</p>
                                        <p className="col-span-8">{product?.data?.design}</p>
                                    </div>
                                    }



                                    {product?.data?.protection &&
                                        <div className="grid grid-cols-12 pt-1">
                                            <p className="col-span-4 ">Protection:</p>
                                            <p className="col-span-8">{product?.data?.protection}</p>
                                        </div>}
                                    {
                                        product?.data?.warranty &&
                                        <div className="grid grid-cols-12 pt-1">
                                            <p className="col-span-4 ">Warranty:</p>
                                            <p className="col-span-8">{product?.data?.warranty}</p>
                                        </div>
                                    }
                                </div>
                                <div className='border-t border-slate-50 dark:border-slate-700 mt-6' />

                                <ProductDetails product={product?.data} />


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