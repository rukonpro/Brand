import React, { Suspense } from 'react';
import Nav from "@/app/components/navbar/nav";
import { AiOutlineCheck } from "react-icons/ai";
import SupplierCard from "@/app/components/SupplierCard/SupplierCard";
import BackButton from "@/app/components/BackButtons/BackButton";
import ImageChangeButton from '@/app/components/imageChangeButton/ImageChangeButton';
import RelatedProducts from "@/app/components/RelatedProducts/RelatedProducts";
import Loader from "@/app/Loader";
import { getDetailsProduct, getProducts } from "@/app/utils/product/fetch_products_api";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import SaveForLaterButton from "@/app/components/SavedForLaterItems/SaveForLaterButton";
import Countdown from "@/app/components/Countdown/Countdown";
import { MdBlockFlipped } from "react-icons/md";
import { PiImageBrokenLight } from "react-icons/pi";
import baseURL from "@/app/utils/baseURL";
import Navbar from "@/app/components/navbar/navbar";


export async function generateMetadata({ params }, parent) {
    // Extract product ID from route params
    const id = params?.id;

    // Fetch product data from API (replace URL with your API endpoint)
    const product = await getDetailsProduct({ id }) || {};

    // Access previous metadata from the parent, if needed (optional)
    const previousImages = (await parent)?.openGraph?.images || [];
    const productPhotos = Array.isArray(product?.data?.photos) ? product?.data?.photos : [];
    // Return dynamic metadata
    return {
        title: `${product?.data?.name} - Brand`, // Dynamic title based on product name
        description: `Buy ${product?.data?.name} at Brand. ${product?.data?.description}.`, // Dynamic description
        openGraph: {
            title: `${product?.data?.name} - Brand`,
            description: `Buy ${product?.data?.name} at Brand. ${product?.data?.description}.`,
            images: [...productPhotos, ...previousImages], // Using product photos and any previous images
            url: `${baseURL}/details/${product?.data?.id}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product?.data?.name} - Brand`,
            description: `Buy ${product?.data?.name} at Brand. ${product?.data?.description}.`,
            image: product?.data?.photos[0], // First image for Twitter card
        },
        link: [{ rel: 'icon', href: '/favicon.ico' }],
        robots: 'index, follow',
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Product',
                    name: product?.data?.name,
                    description: product?.data?.description,
                    image: product?.data?.photos,
                    brand: product?.data?.brand?.name,
                    offers: {
                        '@type': 'Offer',
                        price: product?.data?.offers?.[0]?.price,
                        priceCurrency: 'USD',
                        availability: 'https://schema.org/InStock',
                    },
                }),
            },
        ],
        // Add any other metadata as needed
    };
}




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

            <div className="max-w-[1200px] mx-auto md:px-3  pb-5">

                <div className="flex justify-between items-center px-3 md:px-0">
                    <h1 className="text-2xl  font-bold text-gray-600 py-5 dark:text-slate-50">Details</h1>

                    <div>
                        <BackButton title="Back" />
                    </div>
                </div>
                <Suspense fallback={<Loader />}>
                    <div
                        className="grid grid-cols-12 gap-4 border-2 p-3 py-10  md:bg-white md:rounded-lg dark:bg-slate-800 dark:border-slate-700">
                        <div className="col-span-12 md:col-span-4">
                            {product?.data?.photos?.length > 0 ? <ImageChangeButton
                                images={product?.data?.photos}
                                name={product?.data?.name} /> :

                                <PiImageBrokenLight
                                    className="w-full h-full"
                                />
                            }
                            <div className="pt-8">

                                {/************************Save for later button ***********************/}
                                <SaveForLaterButton product={product?.data} />

                                {/************************Add to cart button ***********************/}
                                <AddToCartButton product={product?.data} />
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-8 ">
                            <div className="flex justify-between items-center">
                                <div className="flex  gap-1 items-center">
                                    {product?.data?.availability === "IN_STOCK" ?
                                        <AiOutlineCheck className="text-green-500 size-8" /> :
                                        <MdBlockFlipped className="text-red-500 size-8" />}

                                    <p className="text-sm">{product?.data?.availability}</p>
                                </div>
                                {product?.data?.offers?.[0]?.isActive &&
                                    <div className="border rounded p-3 dark:border-slate-700">

                                        <p className="font-bold text-2xl text-red-500 bg-green-100 px-2 rounded-full dark:bg-slate-700 dark:text-green-500">{product?.data?.offers?.[0]?.discountValue}%
                                            Discount</p>
                                        <div className="flex justify-center">
                                            <Countdown endDate={product?.data?.offers?.[0]?.endDate} />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="pt-5">
                                <h1 className="text-2xl font-bold">{product?.data?.name}</h1>

                                <div className="pt-5">
                                    {product?.data?.price &&
                                        <div className="grid grid-cols-12 border-b-2 border-b-gray-700/50 pb-1">
                                            <p className="col-span-4">Price:</p>
                                            <p className="col-span-8">${product?.data?.price}</p>
                                        </div>
                                    }

                                    <div className="border-b-2 border-b-gray-700/50 pb-3">
                                        {product?.data?.colors?.length ?
                                            <div className="grid grid-cols-12 pt-3 ">
                                                <p className="col-span-4">color:</p>
                                                <div className="col-span-8 flex flex-wrap gap-1">{
                                                    product?.data?.colors?.map((color, index) => {
                                                        return (
                                                            <button
                                                                type='button'
                                                                key={index}
                                                                className="mx-1 bg-blue-400 py-0.5 px-1 text-white rounded">{color}</button>
                                                        )
                                                    })
                                                }</div>
                                            </div> : null}

                                        {product?.data?.sizes?.length ?
                                            <div className="grid grid-cols-12 pt-3 ">
                                                <p className="col-span-4">Sizes:</p>
                                                <p className="col-span-8">{
                                                    product?.data?.sizes?.map((size, index) => {
                                                        return (
                                                            <span
                                                                key={index}
                                                                className="mx-1 bg-blue-400 py-0.5 px-1 text-white rounded">{size}</span>
                                                        )
                                                    })
                                                }</p>
                                            </div> : null}


                                        {product?.data?.dimension &&
                                            <div
                                                className="grid grid-cols-12 pt-1 bg-orange-100/50 px-3 my-2 dark:bg-slate-700">
                                                <p className="col-span-4">Dimension:</p>
                                                <div className="col-span-8">
                                                    <p>Height: {product?.data?.dimension?.height}</p>
                                                    <p>Weight: {product?.data?.dimension?.width}</p>
                                                    <p>Length: {product?.data?.dimension?.length}</p>
                                                </div>
                                            </div>}
                                        {product?.data?.brand?.name &&
                                            <div className="grid grid-cols-12 pt-1 ">
                                                <p className="col-span-4">Brand:</p>
                                                <p className="col-span-8">{product?.data?.brand?.name}</p>
                                            </div>}

                                        {product?.data?.material && <div className="grid grid-cols-12 pt-1 ">
                                            <p className="col-span-4">Material:</p>
                                            <p className="col-span-8">{product?.data?.material}</p>
                                        </div>
                                        }

                                        {product?.data?.design && <div className="grid grid-cols-12 pt-1">
                                            <p className="col-span-4">Design:</p>
                                            <p className="col-span-8">{product?.data?.design}</p>
                                        </div>}
                                    </div>

                                    <div className="b-1">

                                        {
                                            product?.data?.offers?.[0]?.description &&
                                            <div className="grid grid-cols-12 pt-1">
                                                <p className="col-span-4 font-bold">Discount:</p>
                                                <p className="col-span-8">{product?.data?.offers?.[0]?.description}</p>
                                            </div>
                                        }
                                        {product?.data?.protection && <div className="grid grid-cols-12 pt-1">
                                            <p className="col-span-4 font-bold">Protection:</p>
                                            <p className="col-span-8">{product?.data?.protection}</p>
                                        </div>}
                                        {
                                            product?.data?.warranty &&
                                            <div className="grid grid-cols-12 pt-1">
                                                <p className="col-span-4 font-bold">Warranty:</p>
                                                <p className="col-span-8">{product?.data?.warranty}</p>
                                            </div>
                                        }
                                        {product?.data?.description &&
                                            <div className="grid grid-cols-12 pt-1">
                                                <p className="col-span-12 font-bold ">Description:</p>
                                                <p className="col-span-12 text-justify">{product?.data?.description}</p>
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div
                            className="col-span-12  lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-none gap-4 lg:gap-0">

                            {/************************Supplier Card ***********************/}
                            {/* <SupplierCard /> */}


                        </div>
                    </div>
                </Suspense>

                {/************************Related products ***********************/}

                {
                    product?.data?.categoryId &&
                    <Suspense fallback={<Loader />}>
                        <RelatedProducts categoryId={product?.data?.categoryId} />
                    </Suspense>
                }


            </div>
        </>
    );
};


export default Details;


export async function getStaticPaths() {
    const res = await getProducts({
        limit: 1000,
    });


    // Get the paths we want to pre-render based on posts
    const paths = res?.data?.map((product) => ({
        params: { id: product?.id }, // must be string type for dynamic routes
    }));

    // Fallback enables dynamic rendering for paths not generated during build
    return { paths, fallback: false };
}