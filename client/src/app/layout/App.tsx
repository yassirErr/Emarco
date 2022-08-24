import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
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


function App() {
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
          </Routes>
          
        </Container>
    </ThemeProvider>
  );
}

export default App;
