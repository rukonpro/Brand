import React from 'react';
import Invoice from "@/app/components/invoice/invoice";
import {getSingleOrder} from "@/app/utils/order/fetch_order_api";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const OrderDetails =async ({params:orderIdParams}) => {
    const session = await getServerSession(authOptions);
    const {user}=session;

    const {id}= orderIdParams;


    const params={
        orderId:id,
        userId:user?.id
    }
    const getOrder =await getSingleOrder(params);

    return (
        <Invoice  order={getOrder?.data}/>
    );
};

export default OrderDetails;