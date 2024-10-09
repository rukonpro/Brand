import { getAllCategory } from '@/app/utils/Category/fetch_category_api'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const CategoriesHome = async () => {
  const categories = await getAllCategory({

  });


  // Recursive function to flatten options
  const flattenOptions = (opts) => {
    return opts?.reduce((acc, option) => {
      // If the option has children, recursively flatten them
      if (option.children && option?.children?.length > 0) {
        return [...acc, ...flattenOptions(option?.children)]; // Flatten children
      }
      return [...acc, option]; // Add the option itself if no children
    }, []);
  };

  // Get the combined options for the dropdown
  const combinedOptions = flattenOptions(categories?.data);


  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-lg pt-5 pb-3 md:px-0 px-5">Categories</h1>

      <ul className="flex gap-0.5 max-w-screen-lg overflow-hidden overflow-x-auto scrollbar-hide md:max-w-[1200px] md:grid md:grid-cols-6 lg:grid-cols-8 pb-12" role="list">
        {
          combinedOptions?.map(category => {
            return (
              <li key={category?.id} role="listitem" className="bg-white p-3 w-36 md:w-full hover:transform-cpu duration-500  overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:shadow-blue-100 hover:z-10">
                <Link href={`/source/${category?.id}` }  passHref>
                  <div className="flex justify-center items-centerjustify-center">
                    <div className="h-20 w-20 ">
                      <Image src={category?.photo} width={200} height={200} alt={category?.name} className="h-full w-full object-fill " />

                    </div>
                  </div>
                  <h1 className="truncate hover:text-clip text-sm text-center px-3">{category?.name}</h1>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default CategoriesHome
