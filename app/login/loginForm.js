"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import {useFormik} from "formik";
import * as Yup from 'yup';
import LoadingIcon from "@/public/images/loading-2-svgrepo-com.svg";
import Image from "next/image";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});


const LoginForm = () => {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);


    const handleLogin = async ({email,password}) => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Save the token in cookies for authentication
                Cookies.set('token', data.token, { expires: 10 });
                Cookies.set('user', data.user, { expires: 10 });
                // Redirect to a protected page
                router.push('/profiles/myAccount');
            } else {
                toast.error(data.error,{
                    id: 'login',
                });
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.',{
                id:"login"
            })

        }finally {
            setLoading(false);
        }
    };

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




    return (
            <form onSubmit={formik.handleSubmit}>
                <input type="email"
                       name="email"
                       placeholder="your email address"
                       className={`px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2 ${formik.touched.email && formik.errors.email?"border-red-400":"border-white"}`}
                       onChange={formik.handleChange}
                       value={formik.values.email}
                       autoFocus={true}
                />
                {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs">{formik.errors.email}*</div>}
                <br/>
                <input type="password"
                       name="password"
                       placeholder="New password with 6 digit"
                       className={`px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2 ${formik.touched.password && formik.errors.password?"border-red-400":"border-white"}`}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && <div className="text-red-500 text-xs">{formik.errors.password}*</div>}
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