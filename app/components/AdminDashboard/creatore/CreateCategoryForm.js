import { useFormik } from 'formik';
import { CldUploadWidget } from 'next-cloudinary';
import * as Yup from 'yup';
import {useEffect, useState} from 'react';
import { BiSolidImageAdd } from "react-icons/bi";
import axios from 'axios';
import Image from "next/image";
import CategoryManuAdmin from "@/app/components/AdminDashboard/creatore/CategoryMenuAdmin";
import {createCategory, deleteCategory, updateCategory} from "@/app/utils/Category/fetch_category_api";
import toast from "react-hot-toast";
import useSWR from "swr";
import {fetcher} from "@/app/utils/fetcher/fetcher";
import Loader from "@/app/Loader";
const CreateCategoryForm = () => {
    const {
        data:categories,
        error:categoriesError,
        isLoading:isLoadingCategories,
        mutate
    } = useSWR('/api/category/findMany', fetcher);


    const [imageUrl, setImageUrl] = useState('');
    const [category,setCategory]=useState({});
    const [deleteLoading,setDeleteLoading] = useState(false);
    const [update,setUpdate]=useState(false);


    const formik = useFormik({
        initialValues: {
            name:"",
            photo:"",
            parentId:""
        },
        validationSchema: Yup.object({
            name: Yup.string().trim().required('Category name is required').min(2, 'Name must be at least 2 characters'),
            photo: Yup.string().required('Photo URL is required'),
            parentId: Yup.string().trim()
        }),
        onSubmit: async (values, { setSubmitting,resetForm }) => {

            if(!update){
                const res= await createCategory(values);

                if(res?.status === 201) {
                    toast.success("Category create is successfully",{
                        id:"category"
                    });
                    await mutate();
                    resetForm();
                    setCategory({});
                    setImageUrl("");
                }else {
                    toast.error("Internal error , please try again",{
                        id:"category"
                    })
                }
                setSubmitting(true);
                setTimeout(() => setSubmitting(false), 2000);
            }else {
                const res=await  updateCategory(category?.id,values);

                if(res?.status === 200) {
                    toast.success("Category update is successfully",{
                        id:"category"
                    });
                    await mutate();
                }else {
                    toast.error("Internal error , please try again",{
                        id:"category"
                    })
                }
            }


        }


    });

    // Function to get the Cloudinary signature from your API
    const getSignature = async () => {
        const timestamp = Math.round(new Date().getTime() / 1000); // Generate a timestamp for signing
        const paramsToSign = { timestamp };
        const { data } = await axios.post('/api/signature/signature', { paramsToSign });
        return { signature: data.signature, timestamp };
    };

    const handleUpload = async (open) => {
        const { signature, timestamp } = await getSignature();
        open({ signature, timestamp });
    };

    const handleUploadSuccess = (result) => {
        const uploadedImageUrl = result.info.secure_url;
        setImageUrl(uploadedImageUrl);
        formik.setFieldValue('photo', uploadedImageUrl); // Update Formik field
    };



    useEffect(() => {


        if(update){
            formik.setFieldValue("name",category?.name);
            formik.setFieldValue("photo",category?.photo);
            setImageUrl(category?.photo);
            formik.setFieldValue("parentId",category?.parentId||"");

        }
        else {
            formik.setFieldValue("parentId",category?.id||"");
            formik.setFieldValue("name","");
            setImageUrl(category?.photo);
        }

    }, [category, update]);



    const handleDeleteCategory= async ()=>{
        setDeleteLoading(true);
        const res= await deleteCategory(category?.id);

        if(res?.status === 200) {
            toast.success(res?.data?.message,{
                id:"category"
            });
            setDeleteLoading(false);
          await mutate();
        }else {
            toast.error(res?.error?.response?.data?.error|| "Internal server error , please try again",{
                id:"category"
            });
            setDeleteLoading(false)
        }
    }



    const handleClearId=()=>{
        formik.setFieldValue("parentId","")
    }


    const handleUpdateToggle=()=>{
        setUpdate(!update)
    }
    return (
        <div className="p-4  grid sm:grid-cols-2 gap-5">

            {isLoadingCategories?<Loader/>:
                <CategoryManuAdmin
                    categories={categories||[]}
                    setCategory={setCategory}
                    categoryId={category?.id}
                />
            }
            {categoriesError&&<p className="text-red-500">{categoriesError}</p>}

            <div>
                <div className="flex justify-end py-5">
                    <button onClick={handleUpdateToggle}>
                        {update ? "Cancel" : "Edit"}
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit}>

                    {/* Category Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category
                            Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Inter category name"
                            className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Cloudinary Upload Widget for Category Photo */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 ">Upload Category
                            Photo</label>
                        <CldUploadWidget
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                            signatureEndpoint="/api/signature/signature"
                            onUpload={(result) => {
                                if (result && result.event === 'success') {
                                    handleUploadSuccess(result);
                                }
                            }}
                        >
                            {({open}) => (
                                <button
                                    type="button"
                                    onClick={() => handleUpload(open)}
                                    className="mt-1 w-full px-4 py-2 flex justify-center items-center gap-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-blue-500 hover:bg-blue-50 dark:bg-slate-700 dark:text-slate-300"
                                >
                                    <BiSolidImageAdd className="size-6"/> Upload Photo
                                </button>
                            )}
                        </CldUploadWidget>

                        {/* Show the uploaded image */}
                        {imageUrl && (
                            <div className="mt-2">
                                <Image src={imageUrl} height={80} width={80} alt="Uploaded category photo"
                                       className="h-20"/>
                            </div>
                        )}

                        {/* Formik field to store the image URL */}
                        <input
                            type="hidden"
                            id="photo"
                            name="photo"
                            value={formik.values.photo}
                        />
                        {formik.touched.photo && formik.errors.photo && (
                            <p className="text-red-500 text-sm">{formik.errors.photo}</p>
                        )}
                    </div>

                    {/* Parent ID Field */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="parentId"
                                   className="block text-sm font-medium text-slate-700 dark:text-slate-300">Parent
                                ID</label>
                            <button type="button" onClick={handleClearId}
                                    className="bg-slate-200 px-2 rounded-full dark:bg-slate-700"
                            >Clear ID
                            </button>
                        </div>
                        <input
                            type="text"
                            id="parentId"
                            name="parentId"
                            disabled={!update}
                            placeholder="Select parent Id"
                            className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-300 ${formik.touched.parentId && formik.errors.parentId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.parentId}
                        />
                        {formik.touched.parentId && formik.errors.parentId && (
                            <p className="text-red-500 text-sm">{formik.errors.parentId}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? (update?"Updating...":"Submitting..,") : (update?"Update Category":'Create Category')}
                        </button>


                        <button
                            onClick={handleDeleteCategory}
                            type="button"
                            disabled={deleteLoading}
                            className="w-full px-4 mt-3 py-2 bg-red-500 text-white font-bold rounded-md shadow-sm  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-300"
                        >
                            {
                                deleteLoading ? <span>
                               Deleting...
                            </span> : "Delete Category"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCategoryForm;
