import { useState, ChangeEvent, FC, useEffect } from "react";
import { GetServerSideProps } from 'next'
import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button } from '@mui/material';
import {Layout} from './../components/layouts';
import Cookies from 'js-cookie';
import axios from 'axios';


interface ThemeChangePageProps{
  theme: string;
}



 const ThemeChangePage:FC<ThemeChangePageProps> = ({theme}) => {

 const [currenttheme, setCurrenttheme] = useState(theme);

useEffect(() => {
  console.log('Local Storage => ', localStorage.getItem('theme') );
  console.log('Cookies => ', Cookies.get('theme') );
}, [])


 const onChangeTheme = (event:ChangeEvent<HTMLInputElement>) => {

  const selections = event.target.value;
  setCurrenttheme(selections);
  Cookies.set('theme', selections);
  localStorage.setItem('theme', selections);

 }

 const onClick = async () =>{
  
  const {data} = await axios.get('/api/hello')

  console.log({data})
 }



  return (
    <Layout>
      <h1>theme-change</h1>
      <Card>
        <CardContent>
          <FormControl>
              <FormLabel>TEMA</FormLabel>
              <RadioGroup
                value={currenttheme}
                onChange={onChangeTheme}
              >
                <FormControlLabel value="light" control={ <Radio/> } label="Light" />
                <FormControlLabel value="dark" control={ <Radio/> } label="Dark" />
                <FormControlLabel value="custom" control={ <Radio/> } label="Custom" />
              </RadioGroup>
          </FormControl>
          <Button  onClick={onClick}>
            Solicitud
          </Button>
        </CardContent>
      </Card>
      

    </Layout>
  )
}


// esto es del lado servidor 
export const getServerSideProps:GetServerSideProps = async ({req}) => {

  // la req viaja a este componente y de ahi pued acceder a mis cokies, xq esta pagina se genera en el servidor y no en el cliente 


  const {theme ='light'} = req.cookies  

  const validTheme = ['light','dark','custom']

  return {
    props:{
      theme: validTheme.includes(theme) ? theme : 'light'
    }
  }

}




export default ThemeChangePage;

/*
Recuerden que todas esas funciones de getStaticProps, GetServerSideProps y getStaticProps
Todos esos solo funcionan si estamos trabajando con páginas, es decir, si son literalmente Next Patch
OK, next page.
*/
