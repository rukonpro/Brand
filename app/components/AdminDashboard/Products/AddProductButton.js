import React from 'react'
import AdminDashboardModal from '../../Drawer/AdminDashboardModal';
import NewProductForm from '../creatore/NewProductForm';
// import CreateProductForm from '../creatore/CreateProductForm';

export default function AddProductButton({ mutate, categories, brands }) {
    const [isOpen, setOpen] = React.useState(false);
    const handleCloseModal = () => setOpen(false);
    return (
        <><button
            onClick={() => setOpen(true)}
            className="bg-green-100 px-2 py-0.5 rounded-lg">Add new</button>
            <AdminDashboardModal
                isOpen={isOpen}
                handleCloseModal={handleCloseModal}
                title="Create Product">
                <NewProductForm />
                {/* <CreateProductForm
                    mutate={mutate}
                    categories={categories}
                    brands={brands}
                /> */}
            </AdminDashboardModal>
        </>
    )
}

