"use client"

import { useCategorys } from '@/lib/user/useCategorys';
import React from 'react';
import SourcesProducts from '../SourceProducts/SourcesProducts';






const SourcesProductsLayout = () => {

    const { categorys, isError, isLoading } = useCategorys();

    return (
        <div>
            {
                categorys?.map((category, index) => {
                    return (
                        <>
                            {isLoading ? <p>Loading...</p> : <SourcesProducts
                                key={index}
                                category={category}
                            />}
                        </>
                    )
                })
            }
        </div>
    );
};

export default SourcesProductsLayout;