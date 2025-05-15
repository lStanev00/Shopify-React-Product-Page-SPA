import { useContext, useEffect } from "react";
import { ContextVariables } from "./assets/context-variables/ContextVariables";
import ProductMain from "./assets/Sections/ProductMain.jsx";
import "./assets/Styles/Main.css";
import { getVisitorId } from "./assets/helpers/getVisitorId";
import { paginateReviews } from "./assets/helpers/paginateReviews.js";
import ReviewsMain from "./assets/Sections/ReviewsMain.jsx";

export default function AppContent() {
  const { product, setProduct, fetchProduct, setPaginatedData } = useContext(ContextVariables);

  useEffect(() => {
    async function loadProduct() {
      const slug = window.location.pathname.replace("/products/", ``);
      const data = await fetchProduct(slug);
      setProduct(data);
      if(data.reviews) setPaginatedData(paginateReviews(data.reviews));
    }
    loadProduct();
    getVisitorId();

  }, []);

  if (product) {
    return (
      <div className="container">
        <ProductMain />
        <ReviewsMain />
      </div>
    );
  }
}
