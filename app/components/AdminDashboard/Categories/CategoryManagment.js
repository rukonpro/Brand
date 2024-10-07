"use client"
import { useState } from "react";

const categoriesData = [
    {
        id: 1,
        name: "Electronics",
        subcategories: [
            {
                id: 101,
                name: "Mobile Phones",
                subcategories: [
                    {
                        id: 1011,
                        name: "Smartphones",
                        subcategories: [
                            { id: 10111, name: "Android" },
                            { id: 10112, name: "iOS" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        name: "Clothing",
        subcategories: [
            {
                id: 201,
                name: "Men's Clothing",
                subcategories: [{ id: 2011, name: "Shirts" }],
            },
        ],
    },
];

// Modal Component
const Modal = ({ isOpen, title, onClose, onSubmit, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
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
const CategoryList = ({ categories, onAdd, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <ul className="ml-4 gird gird-grid-cols-1 gap-0.5">
            {categories.map((category) => (
                <li key={category.id} className="mb-2 bg-slate-200">
                    <div className="flex justify-between items-center">
                        <span
                            className="cursor-pointer font-bold"
                            onClick={() => toggleExpand(category.id)}
                        >
                            {category.name}
                        </span>
                        <div className="space-x-2">
                            <button
                                className="text-blue-500"
                                onClick={() => onEdit(category.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-500"
                                onClick={() => onDelete(category.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="text-green-500"
                                onClick={() => onAdd(category.id)}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    {expanded[category.id] && category.subcategories && (
                        <CategoryList
                            categories={category.subcategories}
                            onAdd={onAdd}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

// Main component for category management
export default function CategoriesPage() {
    const [categories, setCategories] = useState(categoriesData);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [inputValue, setInputValue] = useState("");

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

    const handleSubmit = () => {
        if (modalTitle === "Add Subcategory") {
            // Logic to add subcategory
            alert(`Adding Subcategory to Category ID: ${currentCategoryId}`);
        } else if (modalTitle === "Edit Category") {
            // Logic to edit category
            alert(`Editing Category ID: ${currentCategoryId}`);
        } else if (modalTitle === "Delete Category") {
            // Logic to delete category
            alert(`Deleting Category ID: ${currentCategoryId}`);
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
        <div className="p-8 w-96">
            <h1 className="text-2xl font-bold mb-4">Category Management</h1>
            <CategoryList
                categories={categories}
                onAdd={handleAddSubcategory}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
            />
            <div className="mt-6">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleAddSubcategory(null)}
                >
                    Add New Category
                </button>
            </div>

            {/* Modal for Add/Edit/Delete */}
            <Modal
                isOpen={modalOpen}
                title={modalTitle}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
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
            </Modal>
        </div>
    );
}
