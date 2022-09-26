import { useState, ChangeEvent, FC } from "react";
import { GetServerSideProps } from 'next'
import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import {Layout} from './../components/layouts';
import Cookies from 'js-cookie';

 const ThemeChangePage:FC = (props) => {

 const [currenttheme, setCurrenttheme] = useState('light');

 const  onChangeTheme = (event:ChangeEvent<HTMLInputElement>) => {

  const selections = event.target.value;

  setCurrenttheme(selections);

  Cookies.set('theme', selections);

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
        </CardContent>
      </Card>
      

    </Layout>
  )
}

export const getServerSideProps:GetServerSideProps = async ({req}) => {

  // la req viaja a este componente y de ahi pued acceder a mis cokies, xq esta pagina se genera en el servidor y no en el cliente 


  const {theme='light'} = req.cookies  

  return {
    props:{
      theme
    }
  }

}




export default ThemeChangePage;


