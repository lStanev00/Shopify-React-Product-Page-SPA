import { useContext, useEffect, useState } from "react";
import { ContextVariables } from "../../context-variables/ContextVariables";
import Style from "../../Styles/ProductMain.module.css";
import {svg} from "../../Components/svgs"

export default function ProductMain() {
  const { product } = useContext(ContextVariables);
  const [mainImage, setMainImage] = useState(product?.media[0]);
  const [imageList, setImageList] = useState(undefined);
  const [rating, setRating] = useState(4.9);
  const [starCount, setStarCount] = useState(Math.round(rating));
  const [reviewsCount, Reviews] = useState(102);

  useEffect(() => {if (product) setImageList(product?.media)}, [product]);

  const handleImageListClick = (e) => {
    const element = e.target;
    const href = element.src;

    return setMainImage(href);
  }

  if (product) {
    return (
      <>
        <section className={Style.productMain}>
          <div className={Style.imagesDiv}>
            <div className={Style.mainImage}>
              <img
                className={Style.mainImage}
                src={mainImage}
                alt={product.title}
              />
            </div>
            {imageList &&
              imageList.map((imgHref) => {
                return (
                  <img
                    className={Style.listedImage}
                    src={imgHref}
                    alt={"image " + imageList.indexOf(imgHref)}
                    key={imageList.indexOf(imgHref)}
                    onClick={(e) => handleImageListClick(e)}
                  />
                );
              })}
          </div>

          <div className={Style.productContent} >
            <div className={Style.contentHeader}>
                <span className={Style.productName}>{product.title}</span>
                <span className={Style.productPrice}>{product.price.amount} {product.price.currencyCode}</span>
            </div>

            <div className={Style.productDescriptionContent}>
                <div className={Style.contentReviews}>
                    <div className={Style.startsDiv}>
                        {starCount && (
                            [...Array(starCount)].map((dummy, i) => {
                                return (
                                    <>
                                    <div className={Style.starDiv} key={`star${i}`}><svg.FullStar /></div>
                                    </>
                                )
                            })
                        )}
                    </div>
                    <div className={Style.reviewCounts}>{rating} ( {reviewsCount} reviews )</div>
                </div>
            </div>

          </div>
        </section>
      </>
    );
  }
}
