import { useContext } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";
import Style from "../Styles/ReviewsMain.module.css";

export default function ReviewsMain () {
    const { product, paginatedData, setPaginatedData } = useContext(ContextVariables);

    if (paginatedData) {
        return(
            <>
                <section className={Style.mainSection}>
                    <p className={Style.headerP}>Customer reviews</p>

                    <div className={Style.reviewsContent}>
                        <div className={Style.contentHeader}>
                            <div className={Style.currentStarCount}>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}