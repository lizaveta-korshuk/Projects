import React from 'react';
import {Route} from 'react-router-dom';

import PizzaPage from './Pages/PizzaPage';
import SnacksPage from './Pages/SnacksPage';
import SaladsPage from './Pages/SaladsPage';
import SaucesPage from './Pages/SaucesPage';
import DessertPage from './Pages/DessertPage';
import DrinksPage from './Pages/DrinksPage';
import CartPage from './Pages/CartPage';

import './css/MainPageWithRoutes.css'

import withDataLoad from '../HOC/withDataLoad';


class MainPageWithRoutes extends React.Component{

    
    
    PizzaPageWithData = withDataLoad('Korshuk_FD3_pizza')(PizzaPage);
    SnacksPageWithData = withDataLoad('Korshuk_FD3_snacks')(SnacksPage);
    SaladsPageWithData = withDataLoad('Korshuk_FD3_salads')(SaladsPage);
    SaucesPageWithData = withDataLoad('Korshuk_FD3_sauces')(SaucesPage);
    DessertPageWithData = withDataLoad('Korshuk_FD3_dessert')(DessertPage);
    DrinksPageWithData = withDataLoad('Korshuk_FD3_drinks')(DrinksPage);

   
    render(){

        let PizzaPageWithData = this.PizzaPageWithData;
        let SnacksPageWithData = this.SnacksPageWithData;
        let SaladsPageWithData = this.SaladsPageWithData;
        let SaucesPageWithData = this.SaucesPageWithData;
        let DessertPageWithData = this.DessertPageWithData;
        let DrinksPageWithData = this.DrinksPageWithData;
        
        return(
            <div className='mainPage'>
               <Route path="/" exact component={PizzaPageWithData}/>
               <Route path="/snacks" component={SnacksPageWithData}/>
               <Route path="/salads" component={SaladsPageWithData}/>
               <Route path="/sauces" component={SaucesPageWithData}/>
               <Route path="/dessert" component={DessertPageWithData}/>
               <Route path="/drinks" component={DrinksPageWithData}/>
               <Route path="/cart" component={CartPage}/>
            </div>
        )
    }
}
 
  export default MainPageWithRoutes;