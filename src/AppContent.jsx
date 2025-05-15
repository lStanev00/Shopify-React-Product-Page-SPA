import { useContext, useEffect } from "react";
import { ContextVariables } from "./assets/context-variables/ContextVariables";
import ProductMain from "./assets/Sections/ProductMain.jsx";
import "./assets/Styles/Main.css";
import { getVisitorId } from "./assets/helpers/getVisitorId";
import { paginateReviews } from "./assets/helpers/paginateReviews.js";
import ReviewsMain from "./assets/Sections/ReviewsMain.jsx";
import ReviewModal from "./assets/Components/ReviewModal.jsx";

export default function AppContent() {
  const { product, fetchProduct, setPaginatedData, setVisitorId, modalTrigger } = useContext(ContextVariables);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProduct();
                
      if (data.reviews && data.reviews.length > 0) setPaginatedData(paginateReviews(data.reviews))
      const visitorId = await getVisitorId();
      setVisitorId(visitorId);
    }

    loadProduct();
  }, []);


  if (product) {
    return (
      <div className="container">
        <ProductMain />
        <ReviewsMain />
        {modalTrigger && (
          <div className="backdrop"><ReviewModal /></div>
        )}
        
      </div>
    );
  }
}
