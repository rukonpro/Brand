import data from '@/app/FakeData/FakeData'
import React from 'react'
export default function Brands() {

    return (
        <div className="max-w-[1200px] mx-auto">
            <h1 className="text-lg pt-5 pb-3 md:px-0 px-5">Brands</h1>
            <ul className="flex gap-0.5 max-w-screen-lg overflow-hidden overflow-x-auto scrollbar-hide md:max-w-[1200px] md:grid md:grid-cols-8 lg:grid-cols-12 " role="list">
                {
                    data?.brands?.map(brand => (
                        <li key={brand?.id} role="listitem" className="bg-white dark:bg-slate-800 p-3   flex items-center justify-center h-16">
                            {brand?.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
