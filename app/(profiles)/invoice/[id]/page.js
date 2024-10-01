import React, {Suspense} from 'react';
import Invoice from "@/app/(profiles)/invoice/[id]/Invoice";
import {getSingleOrder} from "@/app/utils/order/fetch_order_api";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Loader from "@/app/Loader";

const InvoicePage =async ({params:orderIdParams}) => {
    const session = await getServerSession(authOptions);
    const {user}=session;

    const {id}= orderIdParams;

    const params={
        orderId:id,
        userId:user?.id
    }
    const getOrder =await getSingleOrder(params);
    return (
        <div>
            <Suspense fallback={<Loader/>}>
                <Invoice order={getOrder?.data}/>
            </Suspense>
        </div>
    );
};

export default InvoicePage;