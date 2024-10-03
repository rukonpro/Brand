import React from 'react';
import CheckoutLayout from "@/app/components/checkout/CheckoutLayout";

export const metadata = {
    title: "Checkout - Brand",
    description: "Complete your purchase at Brand. Enjoy a secure and fast checkout process with multiple payment options and reliable delivery services. Review your cart and place your order with confidence.",
};

const Checkout = () => {

    return (
        <div>
            <CheckoutLayout/>
        </div>
    );
};

export default Checkout;