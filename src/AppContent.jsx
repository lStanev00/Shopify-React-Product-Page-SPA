import { useContext, useEffect } from "react";
import { ContextVariables } from "./assets/context-variables/ContextVariables";
import ProductMain from "./assets/Sections/Product/ProductMain";
import "./assets/Styles/Main.css"

export default  function AppContent() {
  const { product, setProduct, fetchProduct } = useContext(ContextVariables);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProduct("implement");
      setProduct(data);
    }
    loadProduct();
  }, []);

  if (product) {
    return (
      <>
        <ProductMain />
      </>
    );
  }
}
