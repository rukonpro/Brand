const { default: CategoriesDropdown } = require("../../Dropdown/CategoriesDropdown");


const CategoryDropdownButton=({handleOpenModal})=>{


    return(
        <CategoriesDropdown>
        <div className="grid grid-cols-1 p-1">
            <button
                onClick={() => {
                    handleOpenModal("Create Category");
                }}
                type="button"
                className="inline-block text-left hover:bg-slate-100 rounded p-0.5">
                Create
            </button>
            <button
                onClick={() =>{
                    handleOpenModal("Update Category");
                }}
                type="button"
                className="inline-block text-left hover:bg-slate-100 rounded p-0.5">
                Update
            </button>
            <button
                onClick={() =>{
                    handleOpenModal("Delete Category");
                }}
                type="button"
                className="inline-block text-left hover:bg-slate-100 rounded p-0.5">
                Delete
            </button>
        </div>
    </CategoriesDropdown>
    )
}

export default CategoryDropdownButton;