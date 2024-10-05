"use client"
import React from 'react';
import AdminDashboardModal from "@/app/components/Drawer/AdminDashboardModal";
import ProductUpdateForm from "@/app/components/AdminDashboard/Products/ProductUpdateForm";

const UpdateProductOpenModalButton = ({mutate,product,categories,brands}) => {
    const [isOpen, setOpen] = React.useState(false);
    const handleCloseModal=()=>setOpen(false);

    return (
        <>
            <button
                onClick={()=>setOpen(!isOpen)}
                className="text-blue-600 hover:text-blue-900">
                <span role="img" aria-label="edit">✏️</span>
            </button>

            <AdminDashboardModal
                isOpen={isOpen}
                handleCloseModal={handleCloseModal}
                title="Update Product">
               <ProductUpdateForm
                   initialData={product}
                   categories={categories}
                   brands={brands}
                   mutate={mutate}

               />
            </AdminDashboardModal>
        </>
    );
};

export default UpdateProductOpenModalButton;