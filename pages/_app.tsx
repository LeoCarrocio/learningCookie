import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {darkTheme, lightTheme, customTheme} from '../theme';
import { AppContext } from 'next/app';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';



interface MyAppProps extends AppProps {
  theme:string;
}


function MyApp({ Component, pageProps, theme ='dark' }: MyAppProps) {


  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  
  useEffect(() => {
    
    const cookieTheme = Cookies.get('theme')|| 'light' ;
  
    const currenttheme = cookieTheme === 'light' ? lightTheme : ( cookieTheme === 'dark' ? darkTheme : customTheme )

    setCurrentTheme(currenttheme)
    
  }, [])
  


  return (
  <ThemeProvider theme={ currentTheme }>
    <CssBaseline /> 
    <Component {...pageProps} />
  </ThemeProvider>
  )
}
/* 
Pero el problema es que cada una de las páginas son
 generadas del lado del servidor. es el problema q vamosa tener 
 utilizando getInitialProps
 MyApp.getInitialProps = async ( appContext: AppContext ) => {
   
   const {theme} = appContext.ctx.req ? (appContext.ctx.req as any).cookie :  {theme : 'light'};
   
  console.log({theme})
  

  const validTheme = ['light','dark','custom']
  
  return {
    theme : validTheme.includes(theme) ? theme : 'light'
  }
}
*/


export default MyApp
