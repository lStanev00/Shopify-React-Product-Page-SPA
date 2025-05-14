import { useContext, useEffect } from "react";
import { ContextVariables } from "./assets/context-variables/ContextVariables";
import ProductMain from "./assets/Sections/Product/ProductMain";
import "./assets/Styles/Main.css";
import { getVisitorId } from "./assets/helpers/getVisitorId";

export default function AppContent() {
  const { product, setProduct, fetchProduct } = useContext(ContextVariables);

  useEffect(() => {
    async function loadProduct() {
      const slug = window.location.pathname.replace("/products/", ``);
      const data = await fetchProduct("");
      setProduct(data);
    }
    loadProduct();
    getVisitorId();

  }, []);

  if (product) {
    return (
      <>
        <ProductMain />
      </>
    );
  }
}
