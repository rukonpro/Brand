import React, { Suspense } from 'react';
import Nav from "@/app/components/navbar/nav";
import { AiOutlineCheck } from "react-icons/ai";
// import SupplierCard from "@/app/components/SupplierCard/SupplierCard";
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
// import baseURL from "@/app/utils/baseURL";
import Navbar from "@/app/components/navbar/navbar";
import Image from 'next/image';
import Specifications from '@/app/components/Specifications/Specifications';
import Footer from '@/app/components/Footer/Footer';
import VariantCatd from '@/app/components/VariantCard/VariantCard';


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

            <div className="max-w-[1200px] mx-auto md:px-3  pb-5">

                <div className="flex justify-between items-center px-3 md:px-0">
                    <h1 className="text-2xl  font-bold text-gray-600 py-5 dark:text-slate-50">Details</h1>

                    <div>
                        <BackButton title="Back" />
                    </div>
                </div>
                <Suspense fallback={<Loader />}>
                    <div
                        className="grid grid-cols-12 gap-4 md:border-2 p-3  md:bg-white md:rounded-lg dark:bg-slate-800 dark:border-slate-700">
                        <div className="col-span-12 md:col-span-4">
                            {product?.data?.variant?.length > 0 ?
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
                                <div className="flex  gap-1 items-center">
                                    {product?.data?.availability === "IN_STOCK" ?
                                        <AiOutlineCheck className="text-green-500 size-8" /> :
                                        <MdBlockFlipped className="text-red-500 size-8" />}

                                    <p className="text-sm">{product?.data?.availability}({product?.data?.totalStock || "00"})</p>
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
                                {product?.data?.rating >= 0 && <p> Rating: {product?.data?.rating}</p>}

                                <div className="pt-5">
                                    {product?.data?.basePrice &&
                                        <div className="grid grid-cols-12 border-b-2 border-b-gray-700/50 pb-1">
                                            <p className="col-span-4">Price:</p>
                                            <p className="col-span-8">${product?.data?.basePrice}</p>
                                        </div>
                                    }
                                    {product?.data?.taxPercentage &&
                                        <div className="grid grid-cols-12 border-b-2 border-b-gray-700/50 pb-1">
                                            <p className="col-span-4">Tax percentage:</p>
                                            <p className="col-span-8">{product?.data?.taxPercentage}%</p>
                                        </div>
                                    }

                                    {product?.data?.deliveryFee &&
                                        <div className="grid grid-cols-12 border-b-2 border-b-gray-700/50 pb-1">
                                            <p className="col-span-4">Delivery fee:</p>
                                            <p className="col-span-8">${product?.data?.deliveryFee}</p>
                                        </div>
                                    }

                                    <div className="border-b-2 border-b-gray-700/50 pb-3">


                                        {product?.data?.brand?.name &&
                                            <div className="grid grid-cols-12 pt-1 ">
                                                <p className="col-span-4">Brand:</p>
                                                <p className="col-span-8">{product?.data?.brand?.name}</p>
                                            </div>}



                                        {product?.data?.design && <div className="grid grid-cols-12 pt-1">
                                            <p className="col-span-4">Design:</p>
                                            <p className="col-span-8">{product?.data?.design}</p>



                                        </div>

                                        }


                                    </div>

                                    <div className="b-1">
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


                                        {/* {
                                            <div className=' border  border-slate-700/50 rounded  mt-5 p-3'>

                                                <ul className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  grid-cols-2 gap-5 py-5'>
                                                    {
                                                        product?.data?.variant?.map(variant => {
                                                            return (
                                                                <li key={variant?.id} className=' bg-slate-700 p-3 rounded-lg'>
                                                                    <div className="w-full flex justify-center ">
                                                                        <Image src={variant?.images?.[0]} width={100} height={100} alt={product?.data?.name} className='h-28 w-28 object-contain' />
                                                                    </div>

                                                                    <div>
                                                                        <VariantCatd data={variant} />
                                                                    </div>

                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        } */}

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div
                            className="col-span-12">
                            <h1 className="text-xl font-bold text-slate-50 dark:text-slate-300 mb-5">Variants:</h1>

                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border-collapse">

                                    <thead>
                                        <tr className="bg-gray-200 dark:bg-slate-700 text-left">
                                            <th className="p-4 border dark:border-slate-700">Photo</th>
                                            <th className="p-4 border dark:border-slate-700">Color</th>
                                            <th className="p-4 border dark:border-slate-700">Size</th>
                                            <th className="p-4 border dark:border-slate-700">Material</th>
                                            <th className="p-4 border dark:border-slate-700">Price</th>
                                            <th className="p-4 border dark:border-slate-700">Stock</th>
                                            <th className="p-4 border dark:border-slate-700">Weight</th>
                                            <th className="p-4 border dark:border-slate-700">Dimensions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product?.data?.variant?.map((variant) => (
                                            <tr key={variant.id} className="border-b">
                                                <td className="p-4 border dark:border-slate-700">
                                                    <div className="w-full flex justify-center ">
                                                        <Image src={variant?.images?.[0]} width={50} height={50} alt={product?.data?.name} className='object-contain' />
                                                    </div>
                                                </td>
                                                <td className="p-4 border dark:border-slate-700">{variant.color}</td>
                                                <td className="p-4 border dark:border-slate-700">{variant.size}</td>
                                                <td className="p-4 border dark:border-slate-700">{variant.material}</td>
                                                <td className="p-4 border dark:border-slate-700">${variant.price.toFixed(2)}</td>
                                                <td className="p-4 border dark:border-slate-700">{variant.stock}</td>
                                                <td className="p-4 border dark:border-slate-700">{variant.weight} kg</td>
                                                <td className="p-4 border dark:border-slate-700">{variant.dimensions}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        {product?.data && <div className="col-span-12 flex justify-end">

                            <div className='max-w-72'>
                                {/************************Save for later button ***********************/}
                                <SaveForLaterButton product={product?.data} />

                                {/************************Add to cart button ***********************/}
                                <AddToCartButton product={product?.data} />
                            </div>
                        </div>}
                    </div>


                </Suspense>

                {/************************Related products ***********************/}

                {
                    product?.data?.categoryId &&
                    <Suspense fallback={<Loader />}>
                        <RelatedProducts categoryId={product?.data?.categoryId} />
                    </Suspense>
                }



                {product?.data?.specifications &&
                    <Suspense fallback={<Loader />}>
                        <Specifications data={product?.data?.specifications} />
                    </Suspense>}

                {product?.data?.description &&
                    <div>
                        <h3 className="text-2xl border-b-4 border-blue-500 inline border-b-1 mb-4 pb-2">Description:</h3>
                        <p className="pt-5 text-justify">{product?.data?.description}</p>
                    </div>
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