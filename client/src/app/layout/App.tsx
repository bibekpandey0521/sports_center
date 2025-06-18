import {useState} from "react";
import { Container,CssBaseline , createTheme} from "@mui/material";
//import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";



function App() {
  const [darkMode,setDarkMode] = useState(false);
  const plattteType = darkMode ? 'dark' : 'light';
  
  const theme = createTheme({
	palette:{
		mode:plattteType,
		
	}
  })
  function handleThemeChange(){
	setDarkMode(!darkMode);
  }
  return (
	<ThemeProvider theme={theme}>	
     <CssBaseline/>
	 <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container sx={{paddingTop: "64px"}}>
	  	<Outlet/>
	  </Container>
	 </ThemeProvider> 
  )
}

export default App
