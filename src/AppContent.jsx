import { useContext, useEffect } from "react";
import { ContextVariables } from "./assets/context-variables/ContextVariables";

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
        <img src={product.media[0]} alt={product.slug} />
      </>
    );
  }
}
