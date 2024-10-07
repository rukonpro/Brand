"use client"
import { useState } from "react";
import CategoriesDropdown from "../../Dropdown/CategoriesDropdown";

// const categoriesData = [
//   {
//     id: 1,
//     name: "Electronics",
//     subcategories: [
//       {
//         id: 101,
//         name: "Mobile Phones",
//         subcategories: [
//           {
//             id: 1011,
//             name: "Smartphones",
//             subcategories: [
//               { id: 10111, name: "Android" },
//               { id: 10112, name: "iOS" },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Clothing",
//     subcategories: [
//       {
//         id: 201,
//         name: "Men's Clothing",
//         subcategories: [{ id: 2011, name: "Shirts" }],
//       },
//     ],
//   },
// ];

// Modal Component
const Modal = ({ isOpen, title, onClose, onSubmit, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
                <div className="mt-4 flex justify-end space-x-4">
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

// Recursive component to display categories and subcategories
const CategoryList = ({ categories, onAdd, onEdit, onDelete, onMove }) => {
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <ul className="ml-4">
            {categories.map((category) => (
                <li key={category.id} className="mb-2">
                    <div className="flex justify-between items-center">
                        <span
                            className="cursor-pointer font-bold"
                            onClick={() => toggleExpand(category.id)}
                        >
                            {category.name}
                        </span>
                        <div className="space-x-2">
                            <CategoriesDropdown>
                                <div> 
                                    <button className="text-blue-500 w-full text-left p-1" onClick={() => onEdit(category.id)}>
                                        Edit
                                    </button>
                                    <button className="text-red-500 w-full text-left p-1" onClick={() => onDelete(category.id)}>
                                        Delete
                                    </button>
                                    <button className="text-green-500 w-full text-left p-1" onClick={() => onAdd(category.id)}>
                                        Add
                                    </button>
                                    <button className="text-yellow-500 w-full text-left p-1" onClick={() => onMove(category.id)}>
                                        Move
                                    </button>
                                </div>
                            </CategoriesDropdown>

                        </div>
                    </div>
                    {expanded[category.id] && category?.children && (
                        <CategoryList
                            categories={category.children}
                            onAdd={onAdd}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onMove={onMove}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

// Main component for category management
export default function CategoriesPage({ categories }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [moveToCategory, setMoveToCategory] = useState(null);

    const handleAddSubcategory = (categoryId) => {
        setModalTitle("Add Subcategory");
        setCurrentCategoryId(categoryId);
        setInputValue("");
        setModalOpen(true);
    };

    const handleEditCategory = (categoryId) => {
        setModalTitle("Edit Category");
        setCurrentCategoryId(categoryId);
        const category = findCategoryById(categoryId, categories);
        setInputValue(category?.name || "");
        setModalOpen(true);
    };

    const handleDeleteCategory = (categoryId) => {
        setModalTitle("Delete Category");
        setCurrentCategoryId(categoryId);
        setInputValue("");
        setModalOpen(true);
    };

    const handleMoveCategory = (categoryId) => {
        setModalTitle("Move Category");
        setCurrentCategoryId(categoryId);
        setMoveToCategory(null); // Reset moveToCategory
        setModalOpen(true);
    };

    const handleSubmit = () => {
        if (modalTitle === "Add Subcategory") {
            alert(`Adding Subcategory to Category ID: ${currentCategoryId}`);
        } else if (modalTitle === "Edit Category") {
            alert(`Editing Category ID: ${currentCategoryId}`);
        } else if (modalTitle === "Delete Category") {
            alert(`Deleting Category ID: ${currentCategoryId}`);
        } else if (modalTitle === "Move Category") {
            alert(`Moving Category ID: ${currentCategoryId} to Category ID: ${moveToCategory}`);
        }
        setModalOpen(false);
    };

    const findCategoryById = (id, categories) => {
        for (const category of categories) {
            if (category.id === id) return category;
            if (category.subcategories) {
                const found = findCategoryById(id, category.subcategories);
                if (found) return found;
            }
        }
        return null;
    };

    return (
        <div className="p-8 max-w-96">
            <h1 className="text-2xl font-bold mb-4">Category Management</h1>
            <CategoryList
                categories={categories}
                onAdd={handleAddSubcategory}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                onMove={handleMoveCategory}
            />
            <div className="mt-6">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleAddSubcategory(null)}
                >
                    Add New Category
                </button>
            </div>

            {/* Modal for Add/Edit/Delete/Move */}
            <Modal
                isOpen={modalOpen}
                title={modalTitle}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                {modalTitle === "Move Category" ? (
                    <>
                        <select
                            value={moveToCategory}
                            onChange={(e) => setMoveToCategory(e.target.value)}
                            className="border p-2 w-full"
                        >
                            <option value="">Select Category to Move To</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat?.name}
                                </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <>
                        {modalTitle !== "Delete Category" && (
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="border p-2 w-full"
                                placeholder="Enter category name"
                            />
                        )}
                        {modalTitle === "Delete Category" && (
                            <p>Are you sure you want to delete this category?</p>
                        )}
                    </>
                )}
            </Modal>
        </div>
    );
}
