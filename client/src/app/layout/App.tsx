import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

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
      <CssBaseline />
      <Header darkMode={darkMode} handleThemChange={handleThemChange}/>
        <Container>
          <Catalog />
        </Container>
    </ThemeProvider>
  );
}

export default App;
