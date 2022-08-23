import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


export default function Catalog() {
  const[products,setProducts]=useState<Product[]>([]);

  useEffect(()=>{
    fetch('http://localhost:5113/api/products')
    .then(response=>response.json())
    .then(data=>setProducts(data))
  },[])
  // function addProduct()
  // {
  //   setProducts(prevState=> [...prevState,
  //       {
  //         id:prevState.length+101,
  //         name:"Product" + ( prevState.length + 1) , 
  //         description:"all about description",
  //         price:(prevState.length*100)+100,
  //         pictureUrl:"http://allcategories/photo",
  //         brand:"some brand"
  //       }])
  // }
  return (
    <>
      <ProductList products={products}/>
    </>
  );
}
