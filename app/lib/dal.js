import {cache} from 'react';
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import User from "@/app/models/userModel";
import {redirect} from "next/navigation";

export const verifySession = cache(async () => {
    const cookie = cookies().get('session')?.value||""
    const session = await decrypt(cookie)

    if (!session?.userId) {
        redirect('/login')
    }
    return { isAuth: true, userId: session?.userId }
})


export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const user = await User.findOne({_id: session.userId})
        return user
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})