import React from 'react';

const DeleteCategory = ({ handleDeleteCategory }) => {

    const onDelete = async () => {
        await handleDeleteCategory()
    }


    return (
        <div className="p-6">
            <p className="mb-4">
                Are you sure you want to delete the category ?
                This action cannot be undone.
            </p>
            <div className="flex justify-end">
                <button
                    onClick={onDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2"
                >
                    Delete
                </button>
                <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteCategory;
