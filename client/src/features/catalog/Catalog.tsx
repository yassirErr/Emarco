import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelectore } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
  const products = useAppSelectore(productSelectors.selectAll);
  const {productsLoaded,status} = useAppSelectore(state => state.catalog);
  const dispatch = useAppDispatch();



  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsync());
      
  },[productsLoaded,dispatch])

  if(status.includes('pending')) return <LoadingComponent message="Loading Products..."/>
 
  return (
    <>
      <ProductList products={products}/>
    </>
  );
}
