import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import {darkTheme, lightTheme, customTheme} from '../theme'
import { AppContext } from 'next/app'


interface MyAppProps extends AppProps {
  theme:string;
}


function MyApp({ Component, pageProps, theme }: MyAppProps) {

  const currenttheme = theme === 'light' ? lightTheme : ( theme === 'dark' ? darkTheme : customTheme )


  return (
  <ThemeProvider theme={ currenttheme }>
    <CssBaseline /> 
    <Component {...pageProps} />
  </ThemeProvider>
  )
}
/* 
Pero el problema es que cada una de las páginas son
 generadas del lado del servidor. es el problema q vamosa tener 
 utilizando getInitialProps
*/
MyApp.getInitialProps = async ( appContext: AppContext ) => {

  const {theme} = appContext.ctx.req ? (appContext.ctx.req as any).cookie :  {theme : 'light'};

  console.log({theme})


  const validTheme = ['light','dark','custom']

  return {
    theme : validTheme.includes(theme) ? theme : 'light'
  }
}


export default MyApp
