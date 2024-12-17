import React from 'react';
import PriceFilter from '@/app/catalog/PriceFilter';
import RatingFilter from './RatingFilter';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';



const CatalogAsideManu = ({ categories, brands }) => {
   
    return (
        <nav className="relative w-full">
            <CategoryFilter />
            <BrandFilter brands={brands}/>
            <PriceFilter />
            <RatingFilter />
        </nav>
    );
};

export default CatalogAsideManu;


