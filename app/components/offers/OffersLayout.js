import React from 'react';
import {getOffers} from "@/app/utils/offer/fetch_offer_api";
import Offers from "@/app/components/offers/Offers";

const OffersLayout = async () => {
    const offers = await getOffers();

    return (
        <>
            <Offers offers={offers?.data?.data} />
        </>
    );
};

export default OffersLayout;