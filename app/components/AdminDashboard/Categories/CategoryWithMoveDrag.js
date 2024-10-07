"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialCategoriesData = [
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

// Recursive component to display categories and subcategories
const CategoryList = ({ categories, onAdd, onEdit, onDelete }) => {
  return categories.map((category, index) => (
    <Droppable key={category.id} droppableId={`category-${category.id}`} type="CATEGORY">
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps} className="ml-4">
          <Draggable key={category.id} draggableId={String(category.id)} index={index}>
            {(provided) => (
              <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-2">
                <div className="flex justify-between items-center">
                  <span className="cursor-pointer font-bold">{category.name}</span>
                  <div className="space-x-2">
                    <button className="text-blue-500" onClick={() => onEdit(category.id)}>
                      Edit
                    </button>
                    <button className="text-red-500" onClick={() => onDelete(category.id)}>
                      Delete
                    </button>
                    <button className="text-green-500" onClick={() => onAdd(category.id)}>
                      Add Subcategory
                    </button>
                  </div>
                </div>
                {category.subcategories && (
                  <SubCategoryList
                    subcategories={category.subcategories}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                )}
              </li>
            )}
          </Draggable>
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  ));
};

// Recursive component for subcategories
const SubCategoryList = ({ subcategories, onAdd, onEdit, onDelete }) => {
  return subcategories.map((subcategory, index) => (
    <Droppable key={subcategory.id} droppableId={`subcategory-${subcategory.id}`} type="SUBCATEGORY">
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps} className="ml-4">
          <Draggable key={subcategory.id} draggableId={String(subcategory.id)} index={index}>
            {(provided) => (
              <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-2">
                <div className="flex justify-between items-center">
                  <span className="cursor-pointer">{subcategory.name}</span>
                  <div className="space-x-2">
                    <button className="text-blue-500" onClick={() => onEdit(subcategory.id)}>
                      Edit
                    </button>
                    <button className="text-red-500" onClick={() => onDelete(subcategory.id)}>
                      Delete
                    </button>
                    <button className="text-green-500" onClick={() => onAdd(subcategory.id)}>
                      Add Subcategory
                    </button>
                  </div>
                </div>
                {subcategory.subcategories && (
                  <SubCategoryList
                    subcategories={subcategory.subcategories}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                )}
              </li>
            )}
          </Draggable>
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  ));
};

// Main component for category management
export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategoriesData);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Find the list that was moved within
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    if (source.droppableId === destination.droppableId) {
      // If dragged within the same list
      const newCategories = reorder(categories, source.index, destination.index);
      setCategories(newCategories);
    } else {
      // Logic for moving between categories and subcategories goes here
      console.log("Moving between categories or subcategories");
    }

    // Update the backend with new order if necessary
    // Call API to save new order
    console.log("New category/subcategory order:", categories);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <CategoryList
          categories={categories}
          onAdd={(id) => console.log("Add Subcategory", id)}
          onEdit={(id) => console.log("Edit Category", id)}
          onDelete={(id) => console.log("Delete Category", id)}
        />
      </DragDropContext>
    </div>
  );
}
