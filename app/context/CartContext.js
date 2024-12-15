"use client"
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { addtoCartApi, deleteSingleCartItemApi } from '../utils/cart/fetch_cart_api';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher/fetcher';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [loadingRemoveToCartItem, setLoadingRemoveToCartItem] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [imageChange, setImageChange] = useState("");
    const [selectVariant, setSelectVariant] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { data: userData, status: userStatus } = useSession();
    const user = userData?.user;





    const {
        data: cart,
        isLoading: isLoadingCart,
        mutate
    } = useSWR(`/api/cart/${user?.id}/getCart`, fetcher);





    const addToCart = async ({ matchingVariant, product }) => {
        if (matchingVariant) {
            // Check for unselected attributes specific to the selected variant
            const unselectedAttributes = matchingVariant.attributes
                .filter(attr => !selectedAttributes[attr.name]) // Compare `name` in attributes
                .map(attr => attr.name); // Extract the names of unselected attributes

            if (unselectedAttributes.length > 0) {
                toast.error(`Please select the following attributes for the selected variant: ${unselectedAttributes.join(', ')}`, {
                    id: "addToCart",
                    position: "bottom-center"
                });
                toast.error(`Missing attributes for variant: ${unselectedAttributes.join(', ')}`, {
                    id: "addToCart",
                    position: "bottom-center"
                });
                return;
            }

            const cartItem = {
                userId: user?.id,
                productId: product?.id,
                variantId: matchingVariant?.id,
                productName: product?.name,
                price: matchingVariant?.price,
                quantity,
                selectedAttributes, // Ensure this is in the updated { name, value } format
            };

            // Add the cart item (store it in context, state, or localStorage)
            setLoading(true);
            const res = await addtoCartApi(cartItem);
            setLoading(false);

            if (res?.status === 200 || res?.status === 201) {
                toast.success(`${res?.data?.message} ${res?.data?.item?.productName}`, {
                    id: "addToCart",
                    position: "bottom-center"
                });
                mutate();
            } else if (res?.status === 405) {
                toast.success(`${res?.data?.message}`, {
                    id: "addToCart",
                    position: "bottom-center"
                });
            } else if (res?.status === 500) {
                toast.error(`${res?.data?.error}`, {
                    id: "addToCart",
                    position: "bottom-center"
                });
            }
        } else {
            toast.error('No matching variant found', {
                id: "addToCart",
                position: "bottom-center"
            });
        }
    };

    const handleItemRemoveToCart = async ({ itemId }) => {
        const params = {
            userId: user?.id,
            itemId: itemId
        };

        setLoadingRemoveToCartItem(true);
        const res = await deleteSingleCartItemApi(params);
        setLoadingRemoveToCartItem(false);

        if (res?.status === 200) {
            mutate();
            toast.success(res?.data?.message, {
                id: "cart",
                position: "bottom-center"
            });
        } else {
            toast.error(res?.data?.message, {
                id: "cart",
                position: "bottom-center"
            });
        }
    };



    return (
        <CartContext.Provider value={{
            loading,
            setLoading,
            addToCart,
            selectedAttributes,
            setSelectedAttributes,
            imageChange,
            setImageChange,
            setSelectVariant,
            selectVariant,
            quantity,
            setQuantity,
            cart,
            mutate,
            isLoadingCart,
            handleItemRemoveToCart,
            loadingRemoveToCartItem,
            user,
            userStatus
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);