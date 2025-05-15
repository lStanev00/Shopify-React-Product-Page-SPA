import { useContext } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";
import Style from "../Styles/ReviewsMain.module.css";
import { StarsDiv } from "./ProductMain";
import ReviewBreakdown from "../Components/ReviewBreakdown";

export default function ReviewsMain () {
    const { product, paginatedData, setPaginatedData } = useContext(ContextVariables);

    if (paginatedData) {
        return(
            <>
                <section className={Style.mainSection}>
                    <p className={Style.headerP}>Customer reviews</p>

                    <div className={Style.reviewsContent}>
                        <div className={Style.contentHeader}>
                            <div className={Style.currentReviewsMaxes}>
                                <div className={Style.currentStarCount}>
                                    <StarsDiv />
                                    {(product.avarageReviewsRate).toFixed(1)}
                                </div>

                                <div className={Style.reviewsCount}>Based on {product.reviews.length} reviews</div>

                            </div>

                            <div className={Style.reviewBrakedown}>
                                <ReviewBreakdown reviews={product.reviews} />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}