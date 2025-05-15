import { createContext, useState } from "react";

export const ContextVariables = createContext();

export const ContextProvider = ({children}) => {
    const url = "https://shopify-rest-api-demo-production.up.railway.app";
    const [product, setProduct] = useState(undefined);
    const [paginatedData, setPaginatedData] = useState(undefined);

    async function fetch(params) {
        
    }

    async function fetchProduct(productSlug) {
        const endpoint = url + `/product/` + productSlug;
        const res = await fetch(endpoint);
        if (!res.ok) return null;
        if(res.status == 200) {
            const data = await res.json();
            if(data.reviews && data.reviews.length > 0){
                const avarageReviewsRate = (data.reviews.reduce((sum, v) => sum + (v.rating || 0), 0)) / data.reviews.length;
                data.avarageReviewsRate = avarageReviewsRate;
            }

            return data
        }
        return undefined
    }

    return (
        <ContextVariables.Provider value={{product, setProduct, fetchProduct, paginatedData, setPaginatedData }}>
            {children}
        </ContextVariables.Provider>
    )

}