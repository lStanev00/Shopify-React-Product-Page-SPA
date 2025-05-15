import { useContext, useEffect, useState } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";
import Style from "../Styles/ReviewsMain.module.css";
import { StarsDiv } from "./ProductMain";
import ReviewBreakdown from "../Components/ReviewBreakdown";
import { SortDropdown } from "../Components/SortDropdown";
import {
    filterHaveMedia,
    sortOneToFive,
    fiterUsefullReviews
} from "../helpers/sortingReviews.js";
import { RenderVotes } from "../Components/RenderVotes.jsx";
import Pagination from "../Components/Pagination.jsx";

export default function ReviewsMain() {
    const {
        product,
        paginatedData,
        setPaginatedData,
        reviews,
        fetchProduct,
        visitorId,
        setTrigger
    } = useContext(ContextVariables);

    const [sortBy, setSortBy] = useState("highest");
    const [currentPage, setCurrentPage] = useState(undefined);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    useEffect(() => {
        if (paginatedData) {
            setCurrentPageIndex((now) => {return 0})
            setCurrentPage(paginatedData[currentPageIndex]);
        }
    }, [paginatedData]);

    useEffect(() => {if(paginatedData){setCurrentPage(paginatedData[currentPageIndex])}}, [currentPageIndex]);

    useEffect(() => {
        if (!reviews) return
        async function sortHighest() {
            await fetchProduct();
        }
        if (sortBy === "highest") sortHighest();
        else if (sortBy === "lowest") setPaginatedData(sortOneToFive(reviews));
        else if (sortBy === "picture") {

            setPaginatedData(filterHaveMedia(reviews))
        }
        else if (sortBy === "helpful") setPaginatedData(fiterUsefullReviews(reviews));
    }, [sortBy]);

    if (paginatedData && visitorId) {
        return (
            <>
                <section className={Style.mainSection}>
                    <p className={Style.headerP}>Customer reviews</p>

                    <div className={Style.reviewsContent}>
                        <div className={Style.contentHeader}>
                            <div className={Style.currentReviewsMaxes}>
                                <div className={Style.currentStarCount}>
                                    <StarsDiv />
                                    {product.avarageReviewsRate.toFixed(1)}
                                </div>

                                <div className={Style.reviewsCount}>
                                    Based on {reviews.length} reviews
                                </div>
                            </div>

                            <div className={Style.reviewBrakedown}>
                                <ReviewBreakdown review={reviews} />
                            </div>

                            <button onClick={(e) => {setTrigger(true)}} className={Style.openReview}>Leave a review</button>
                        </div>
                    </div>

                    <SortDropdown
                        className={Style.SortDropdown}
                        value={sortBy}
                        onChange={setSortBy}
                    />

                    {currentPage && (
                        <>
                            <div className={Style.commentsDiv}>
                                {currentPage.map((review) => {
                                    return (
                                        <div className={Style.reviewMainWrapper} key={review._id}>
                                            <div className={Style.suberInfo}>
                                                <StarsDiv item={review} />
                                                <span className={Style.suberName}>{review.name}</span>
                                                <span className={Style.reviewDate}>
                                                    {formatLocalDateTime(review.createdAt)}
                                                </span>
                                            </div>

                                            <div className={Style.reviewInfoWrapper}>
                                                <span className={Style.reviewTitle}>{review.title}</span>
                                                <span className={Style.reviewDescriptin}>
                                                    {review.content}
                                                </span>

                                                {review.media.length > 0 && (
                                                    <div className={Style.reviewImageWrapper}>
                                                        {review.media.map((href) => (
                                                            <img
                                                                className={Style.reviewImage}
                                                                key={href}
                                                                src={href}
                                                                alt="Reveiw Image"
                                                            />
                                                        ))}
                                                    </div>
                                                )}

                                                <div className={Style.reviewUserAction}>
                                                    <span className={Style.wasThatHelpfull}>
                                                        Was this helpful?
                                                    </span>
                                                    <RenderVotes review={review} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <Pagination paginatedData={paginatedData} setCurrentPageIndex={setCurrentPageIndex} currentPage={currentPage} />
                        </>
                    )}
                </section>
            </>
        );
    }
}

export function formatLocalDateTime(dateInput) {
    if (!dateInput) return "";

    const date = new Date(dateInput);

    let result = date.toLocaleString("bg-BG", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    result = result.replaceAll(".", "/").replace(" г/", "");
    return result;
}
