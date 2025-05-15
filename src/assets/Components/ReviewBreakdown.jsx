import { svg } from "./svgs";
import Style from "../Styles/ReviewBrakedown.module.css"
import { useContext } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";

export function ReviewBreakdown() {
    const {reviews} = useContext(ContextVariables);
    const totalReviews = reviews.length;

    const ratingCounts = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    };

    for (const review of reviews) {
        const r = review.rating;
        if (ratingCounts[r] !== undefined) {
            ratingCounts[r]++;
        }
    }

    const rows = Object.keys(ratingCounts)
        .sort((a, b) => b - a) 
        .map((star) => {
            const count = ratingCounts[star];
            const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
                <div key={star} className={Style.row}>
                    <span className={Style.stars}>
                        {Array.from({ length: 5 }).map((_, i) => {
                            if (i < star) {
                                return (
                                    <svg.SmallFullStar key={i} />
                                )
                            } else {
                                return(
                                    <svg.SmallEmptyStar key={i} />
                                )
                            }
                            
                        })}
                    </span>
                    <div className={Style.barWrapper}>
                        <div className={Style.barMain} >{"\u00A0"}</div>
                        <div className={Style.barLoader} style={{ width: `${percent}%` }}>{"\u00A0"}</div>
                    </div>
                    <span className={Style.count}>{count}</span>
                </div>
            );
        });

    return <div>{rows}</div>;
}

export default ReviewBreakdown;
