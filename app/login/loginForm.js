"use client"
import React from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import LoadingIcon from "@/public/images/loading-2-svgrepo-com.svg";
import Image from "next/image";
import { signIn } from 'next-auth/react'
import toast from "react-hot-toast";
import {useRouter, useSearchParams} from 'next/navigation';
import {useSession} from "next-auth/react";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});


const LoginForm = () => {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const searchParams = useSearchParams();
    const {data,status,update}=useSession();


    const callbackUrl=searchParams.get("callbackUrl");


    const formik = useFormik({

        initialValues: {
            email: '',
            password:''

        },
        validationSchema,
        onSubmit:async ({email,password}) => {
           await handleLogin({email,password})
        },

    });




    const handleLogin = async ({email,password}) => {
        setLoading(true)
        signIn('credentials', {
            redirect: true,
            email,
            password,
            callbackUrl:callbackUrl || "/"
        }).then(result => {
            if (result?.ok){
                router.push(callbackUrl||"/");
            }
        }).catch(error => {
            toast.error(error?.message,{id: 'login'});
        }).finally(() => {
            setLoading(false);
        })

        // try {
        //     setLoading(true)
        //     const result = await signIn('credentials', {
        //         redirect: true,
        //         email,
        //         password,
        //         callbackUrl:callbackUrl || "/"
        //     });
        //
        //     if (result?.ok){
        //
        //     }
        //     if (result?.error) {
        //         toast.error(result.error,{id: 'login'});
        //     }
        //
        // }
        // catch (e) {
        //     toast.error(e.message,{id: 'login'});
        // }
        // setLoading(false)
    };



    return (
        <form onSubmit={formik.handleSubmit}>
            <input type="email"
                   name="email"
                   placeholder="your email address"
                   className={`px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2 ${formik.touched.email && formik.errors.email ? "border-red-400" : "border-white"}`}
                   onChange={formik.handleChange}
                   value={formik.values.email}
                   autoFocus={true}
            />
            {formik.touched.email && formik.errors.email &&
                <div className="text-red-500 text-xs">{formik.errors.email}*</div>}
            <br/>
            <input type="password"
                   name="password"
                   placeholder="Password"
                   className={`px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2 ${formik.touched.password && formik.errors.password ? "border-red-400" : "border-white"}`}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password &&
                <div className="text-red-500 text-xs">{formik.errors.password}*</div>}
            <br/>
            <button type="submit"
                    className="px-3 py-2 rounded-lg w-full my-1 bg-blue-500 text-white  mt-4"
            >{loading ? <div className="flex items-center justify-center">
                <Image src={LoadingIcon} height={20} width={20} alt="Loading icon" className="animate-spin"/> Loading...
            </div> : "Sign In"}
            </button>

        </form>
    );
};

export default LoginForm;