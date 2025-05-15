import { useContext, useEffect, useState } from "react";
import { ContextVariables } from "../context-variables/ContextVariables";
import Style from "../Styles/ProductMain.module.css";
import { svg } from "../Components/svgs";

export default function ProductMain() {
  const { product, reviews } = useContext(ContextVariables);
  const [mainImage, setMainImage] = useState(product?.media[0]);
  const [imageList, setImageList] = useState(undefined);
  const [rating, setRating] = useState(0);
  const [reviewsCount, Reviews] = useState(0);

  useEffect(() => {
    if (product) setImageList(product?.media);
    if(product && product.avarageReviewsRate) {

      setRating((product.avarageReviewsRate).toFixed(1))
    }
    if(reviews){
      Reviews(reviews.length);
    }
  }, [product]);

  const handleImageListClick = (e) => {
    const element = e.target;
    const href = element.src;

    return setMainImage(href);
  };

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

          <div className={Style.productContent}>
            <div className={Style.contentHeader}>
              <span className={Style.productName}>{product.title}</span>
              <span className={Style.productPrice}>
                {product.price.amount} {product.price.currencyCode}
              </span>
            </div>

            <div className={Style.productDescriptionContent}>
              <div className={Style.contentReviews}>
                <StarsDiv />
                <div className={Style.reviewCounts}>
                  {rating} ( {reviewsCount} reviews )
                </div>
              </div>
              <p className={Style.productDescription}>{product.description}</p>
            </div>

            <button
              id="#ProductSubmitButton-template--24968587608408__main"
              style={{marginTop: "20px"}}
              className={Style.addToCartButton}
            >
              ADD TO CART
            </button>
          </div>
        </section>
      </>
    );
  }
}

export function StarsDiv({item}) {
  const {product} = useContext(ContextVariables);
  const [fullStars, setFullStars] = useState([...Array(Math.floor(product.avarageReviewsRate ?? 0))]);
  const [emptyStars, setEmptyStars] = useState([...Array(5 - Math.floor(product.avarageReviewsRate ?? 0))]);

  useEffect(()=>{
    if (item) {
      setFullStars([...Array(item.rating)]);
      setEmptyStars([...Array(5 - (item.rating))]);
    }
  },[item])

  return (
    <div className="starsDiv">
      {fullStars && fullStars.length> 0 &&
        fullStars.map((dummy, i) => {
          return (
            <div className="starDiv" key={`star${i}`}>
              <svg.FullStar />
            </div>
          );
        })}
      {emptyStars && emptyStars.length> 0 &&
        emptyStars.map((dummy, i) => {
          return (
            <div className="starDiv" key={`star${i}`}>
              <svg.EmptyStar />
            </div>
          );
        })}
    </div>
  );
}
