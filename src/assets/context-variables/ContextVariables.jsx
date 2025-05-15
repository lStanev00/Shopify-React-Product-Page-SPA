import { createContext, useEffect, useState } from "react";

export const ContextVariables = createContext();

export const ContextProvider = ({children}) => {
    const url = "https://shopify-rest-api-demo-production.up.railway.app";
    const [product, setProduct] = useState(undefined);
    const [reviews, setReviews] = useState(undefined);
    const [visitorId, setVisitorId] = useState(undefined);
    const [paginatedData, setPaginatedData] = useState(undefined);

    useEffect(() => {
        if (product && product.reviews && product.reviews.length > 0){
            setReviews(product.reviews);
        }

    },[product])

    async function fetchProduct() {
      const productSlug = window.location.pathname.replace("/products/", ``);

        const endpoint = url + `/product/` + productSlug;
        const res = await fetch(endpoint);
        if (!res.ok) return null;
        if(res.status == 200) {
            const data = await res.json();
            if(data.reviews && data.reviews.length > 0){
                const avarageReviewsRate = (data.reviews.reduce((sum, v) => sum + (v.rating || 0), 0)) / data.reviews.length;
                data.avarageReviewsRate = avarageReviewsRate;
                setReviews(data.reviews);
            }
            setProduct(data);
            return data
        }
        return undefined
    }

    return (
        <ContextVariables.Provider value={{product, setProduct, reviews, fetchProduct, paginatedData, setPaginatedData, visitorId, setVisitorId, url }}>
            {children}
        </ContextVariables.Provider>
    )

}