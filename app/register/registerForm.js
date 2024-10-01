"use client"
import React from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import LoadingIcon from "@/public/images/loading-2-svgrepo-com.svg";
import {createUser} from "@/app/utils/user/createUser";


const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2,"minimum 2 characters")
        .max(20,"Maximum 20 characters")
        .required("First name is required"),
    lastName: Yup.string()
        .min(2,"minimum 2 characters")
        .max(10,"Maximum 10 characters")
        .required("last name is required"),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .required('Password is required'),
    rePassword:Yup.string().required("Re-password is required"),
});



const RegisterForm = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const handleSignup=async ({firstName,lastName,email,password,resetForm})=>{
            setLoading(true);
            const data={firstName,lastName,email,password};
            const res= await createUser(data);
          if(res?.status===201){
              toast.success("Register successfully,Please login now!",{id:"register"});
              router.push("/login")
              setLoading(false);
              resetForm()
          }else {
              toast.error(res?.error?.response?.error||"Internal server error!,Please try again",{
                  id:"register",
              });
              setLoading(false)
          }
    }

    const formik = useFormik({

        initialValues: {
            firstName:"",
            lastName:"",
            email: "",
            password:"",
            rePassword:""
        },
        validationSchema,
        onSubmit:async ({firstName,lastName,email,password,rePassword},{resetForm}) => {
            await handleSignup({firstName,lastName,email,password,rePassword,resetForm})
        },
    });


    const isTrue=formik.values.password===formik.values.rePassword;

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        className={`px-3 py-2 rounded-lg  w-full my-1 bg-white/50 border-2 dark:bg-slate-800/50 dark:border-slate-700  ${formik.touched.firstName && formik.errors.firstName ? "border-red-400" : "border-blue-500"}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName && <div className="text-red-500 text-xs">{formik.errors.firstName}*</div>}
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        className={`px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2 dark:bg-slate-800/50 dark:border-slate-700  ${formik.touched.lastName && formik.errors.lastName ? "border-red-400" : "border-blue-500"}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && <div className="text-red-500 text-xs">{formik.errors.lastName}*</div>}
                </div>
            </div>
            <input
                type="email"
                name="email"
                placeholder="your email address"
                className={`px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2 dark:bg-slate-800/50 dark:border-slate-700  ${formik.touched.email && formik.errors.email ? "border-red-400" : "border-blue-500"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs">{formik.errors.email}*</div>}
            <br/>
            <input
                type="password"
                name="password"
                placeholder="New password with 6 digit"
                className={`px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2 dark:bg-slate-800/50 dark:border-slate-700  ${formik.touched.password && formik.errors.password ? "border-red-400" : "border-blue-500"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && <div className="text-red-500 text-xs">{formik.errors.password}*</div>}
            <br/>
            <input
                type="password"
                name="rePassword"
                placeholder="Re-password"
                className={`px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2 dark:bg-slate-800/50 dark:border-slate-700  ${formik.touched.rePassword && formik.errors.rePassword ? "border-red-400" : "border-blue-500"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.rePassword && formik.errors.rePassword && <div className="text-red-500 text-xs">{formik.errors.rePassword}*</div>}
            <br/>
            <button
                type="submit"
                disabled={!isTrue}
                className={`px-3 py-2 rounded-lg w-full my-1  text-white  mt-4 ${isTrue?"bg-blue-500":"bg-blue-400"}`}
            >{loading ?
                <div className="flex items-center justify-center">
                <Image
                    src={LoadingIcon}
                    height={20}
                    width={20}
                    alt="Loader icon"
                    className="animate-spin"/> Loader...
            </div> : "Sign up"}
            </button>
        </form>
    );
};

export default RegisterForm;