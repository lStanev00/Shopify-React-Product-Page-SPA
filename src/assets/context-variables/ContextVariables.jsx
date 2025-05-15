import { createContext, useState } from "react";

export const ContextVariables = createContext();

export const ContextProvider = ({children}) => {
    const url = "https://shopify-rest-api-demo-production.up.railway.app";
    const [product, setProduct] = useState(undefined);

    async function fetchProduct(productSlug) {
        const endpoint = url + `/product/` + productSlug;
        const res = await fetch(endpoint);

        if (!res.ok) return null;
        if(res.status == 200) {
            const data = await res.json();
            return data
        }
        return undefined
    }

    return (
        <ContextVariables.Provider value={{product, setProduct, fetchProduct}}>
            {children}
        </ContextVariables.Provider>
    )

}