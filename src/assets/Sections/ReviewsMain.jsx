import { useContext } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";

export default function ReviewsMain () {
    const { product, paginatedData, setPaginatedData } = useContext(ContextVariables);

    if (paginatedData) {
        return(
            <>
                <section className={Style.mainSection}></section>
            </>
        )
    }
}