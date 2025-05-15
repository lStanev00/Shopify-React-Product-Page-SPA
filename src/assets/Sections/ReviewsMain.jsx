import { useContext, useEffect, useState } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";
import Style from "../Styles/ReviewsMain.module.css";
import { StarsDiv } from "./ProductMain";
import ReviewBreakdown from "../Components/ReviewBreakdown";
import { SortDropdown } from "../Components/SortDropdown";
import {
  filterHaveMedia,
  sortOneToFive,
  fiterUsefullReviews,
} from "../helpers/sortingReviews.js";

export default function ReviewsMain() {
  const { product, paginatedData, setPaginatedData, reviews, fetchProduct } =
    useContext(ContextVariables);
  const [sortBy, setSortBy] = useState("highest");
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(undefined);

  useEffect(() => {
    if (paginatedData) {
      setPageCount(paginatedData.length);
      setCurrentPage(paginatedData[0]);
    }
  }, [paginatedData]);

  useEffect(() => {}, []);

  useEffect(() => {
    async function sortHighest() {
      await fetchProduct();
    }
    if (sortBy == `highest`) sortHighest();
    else if (sortBy == `lowest`) setPaginatedData(sortOneToFive(reviews));
    else if (sortBy == `picture`) setPaginatedData(filterHaveMedia(reviews));
    else if (sortBy == `helpful`)
      setPaginatedData(fiterUsefullReviews(reviews));
  }, sortBy);

  if (paginatedData && currentPage) {
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
                <ReviewBreakdown reviews={reviews} />
              </div>

              <button className={Style.openReview}>Leave a review</button>
            </div>
          </div>

          <SortDropdown
            className={Style.SortDropdown}
            value={sortBy}
            onChange={setSortBy}
          />
          <div className={Style.commentsDiv}>
            {currentPage &&
              currentPage.map((review) => {
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
                          {review.media.map((href) => {
                            return (
                              <img
                                className={Style.reviewImage}
                                key={href}
                                src={href}
                                alt="Reveiw Image"
                              />
                            );
                          })}
                        </div>
                      )}
                      <div className={Style.reviewUserAction}>
                        <span className={Style.wasThatHelpfull}>
                          Was this helpful?
                        </span>

                        <div className={Style.likes}>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 20.2849H5V7.28491L12 0.284912L13.25 1.53491C13.3667 1.65158 13.4625 1.80991 13.5375 2.00991C13.6125 2.20991 13.65 2.40158 13.65 2.58491V2.93491L12.55 7.28491H19C19.5333 7.28491 20 7.48491 20.4 7.88491C20.8 8.28491 21 8.75158 21 9.28491V11.2849C21 11.4016 20.9833 11.5266 20.95 11.6599C20.9167 11.7932 20.8833 11.9182 20.85 12.0349L17.85 19.0849C17.7 19.4182 17.45 19.7016 17.1 19.9349C16.75 20.1682 16.3833 20.2849 16 20.2849ZM7 18.2849H16L19 11.2849V9.28491H10L11.35 3.78491L7 8.13491V18.2849ZM5 7.28491V9.28491H2V18.2849H5V20.2849H0V7.28491H5Z"
                              fill="#1C1B1F"
                            />
                          </svg>
                        </div>
                        <div className={Style.dieslikes}>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 0.284912H16V13.2849L9 20.2849L7.75 19.0349C7.63333 18.9182 7.5375 18.7599 7.4625 18.5599C7.3875 18.3599 7.35 18.1682 7.35 17.9849V17.6349L8.45 13.2849H2C1.46667 13.2849 1 13.0849 0.6 12.6849C0.2 12.2849 0 11.8182 0 11.2849V9.28491C0 9.16825 0.0166667 9.04325 0.05 8.90991C0.0833333 8.77658 0.116667 8.65158 0.15 8.53491L3.15 1.48491C3.3 1.15158 3.55 0.868245 3.9 0.634912C4.25 0.401579 4.61667 0.284912 5 0.284912ZM14 2.28491H5L2 9.28491V11.2849H11L9.65 16.7849L14 12.4349V2.28491ZM16 13.2849V11.2849H19V2.28491H16V0.284912H21V13.2849H16Z"
                              fill="#1C1B1F"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
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
    year: "numeric",
  });

  result = result.replaceAll(`.`, `/`).replace(` г/`, ``);
  return result;
}
