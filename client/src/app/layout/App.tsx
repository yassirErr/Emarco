import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPgae";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/SeverError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { getCookie } from "../util/Util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useDispatch } from "react-redux";
import { setBasket } from "../../features/basket/basketSlice";



function App() {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const buyerId = getCookie("buyerId");
    if(buyerId){
      agent.Basket.get()
      .then(basket=>dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false));
    }else{
      setLoading(false)
    }
  },[dispatch])

  
  const [darkMode,serDarkMode]= useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette:{
        mode:paletteType,
        background:{
          default:paletteType === 'light' ? '#eeeeee' : '#121212'
        }
    }
})


function handleThemChange(){
  serDarkMode(!darkMode)
}
  if(loading) return <LoadingComponent message="Initialising App ... "/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemChange={handleThemChange}/>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/catalog" element={<Catalog/>}/>
            <Route path="/catalog/:id" element={<ProductDetails/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/server-error" element={<ServerError/>}/>
            <Route  element={<NotFound/>}/>
            <Route path="/basket" element={<BasketPage/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
          </Routes>
          
        </Container>
    </ThemeProvider>
  );
}

export default App;
