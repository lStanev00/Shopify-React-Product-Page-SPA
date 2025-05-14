import { useContext, useEffect, useState } from "react";
import { ContextVariables } from "../../context-variables/ContextVariables";
import Style from "../../Styles/ProductMain.module.css";

export default function ProductMain() {
  const { product } = useContext(ContextVariables);
  const [mainImage, setMainImage] = useState(product?.media[0]);
  const [imageList, setImageList] = useState(undefined);

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
        </section>
      </>
    );
  }
}
