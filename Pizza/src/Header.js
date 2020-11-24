import React from 'react';
import { NavLink } from 'react-router-dom';
import isoFetch from 'isomorphic-fetch';
import {connect} from 'react-redux';
import {set_initial} from '../redux/cartAC';

import './css/Header.css';

class Header extends React.Component {
          
  componentDidMount(){
     document.addEventListener('scroll', this.scroll);
     this.loadCartItems();
  }

  requestAllowed=true;

  shouldComponentUpdate(nextProps){

        if(this.props.cartReducer.state!=='initiated'&&this.requestAllowed&&this.props.cartReducer!==nextProps.cartReducer){
            
                this.requestAllowed=false;   
                setTimeout(this.lockDB,3000);
        }
        return true;
  }

  state={
    scrolled: false,
    ajaxRequestAllowed:true,
  }

fetchSuccess = (data) =>{

    this.props.dispatch(set_initial(data));

}

fetchError= (jqXHR, statusStr, errorStr) => {
    console.log(statusStr + ' ' + errorStr);
    console.log(jqXHR);
}

loadCartItems = () =>{

    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'Korshuk_FD3_cart');

   isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
       method: 'POST',
       headers:{
           "Accept":"application/json"
       },
       body: sp
   })
    .then (response => {
        if(!response.ok){
            throw new Error ('fetch error ' + response.status);
        }else{
            return response.json();
        }
    })
    .then (data =>{
        let result = JSON.parse(data.result)
        this.fetchSuccess(result);
    })
    .catch(error =>{
        this.fetchError(error.message);
    })
}

lockDB = () =>{

  let sp = new URLSearchParams();
  sp.append('f', 'LOCKGET');
  sp.append('n', 'Korshuk_FD3_cart');

  let password = Math.random();
  sp.append('p', password);


 isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
     method: 'POST',
     headers:{
         "Accept":"application/json"
     },
     body: sp
 })
  .then (response => {
      if(!response.ok){
          throw new Error ('fetch error ' + response.status);
      }else{
          this.setNewValueInDB(password);
                  
      }
  })
  .catch(error =>{
      this.fetchError(error.message);
  })
  
}

setNewValueInDB = (password) =>{

  let jsonRec = JSON.stringify(this.props.cartReducer);

  let sp = new URLSearchParams();
  sp.append('f', 'UPDATE');
  sp.append('n', 'Korshuk_FD3_cart');
  sp.append('p', password);
  sp.append('v', jsonRec);

 isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
     method: 'POST',
     headers:{
         "Accept":"application/json"
     },
     body: sp
 })
  .then (response => {
      if(!response.ok){
          throw new Error ('fetch error ' + response.status);
      }else{
        this.requestAllowed=true;
      }
  })
  .catch(error =>{
      this.fetchError(error.message);
  })
  
}

  scroll = () =>{
    if( window.pageYOffset>160&&(!this.state.scrolled)){
        this.setState({scrolled:true})
    }
    if( window.pageYOffset<=160&&this.state.scrolled){
      this.setState({scrolled:false})
  }

    
  }

  render() {
     
    return (
        <div>
            <div className={(!this.state.scrolled)?'header notscrolled active':'header notscrolled'}>
                    <div className='menu'>
                <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Пиццы</NavLink>
                <NavLink to="/snacks" className="PageLink" activeClassName="ActivePageLink">Закуски</NavLink>
                <NavLink to="/salads" className="PageLink" activeClassName="ActivePageLink">Салаты</NavLink>
                <NavLink to="/sauces" className="PageLink" activeClassName="ActivePageLink">Соусы</NavLink>
                <NavLink to="/dessert" className="PageLink" activeClassName="ActivePageLink">Десерты</NavLink>
                <NavLink to="/drinks" className="PageLink" activeClassName="ActivePageLink">Напитки</NavLink>
                </div>
                <div className='cart'>
                <div className='amount'>{this.props.cartReducer.totalAmount}</div>
                <NavLink to="/cart" className="PageLink CartLink" activeClassName="ActivePageLink">Корзина</NavLink>
                </div>
         </div>
         <div className={(this.state.scrolled)?'header scrolled active':'header scrolled'}>
                    <div className='menu'>
                <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Пиццы</NavLink>
                <NavLink to="/snacks" className="PageLink" activeClassName="ActivePageLink">Закуски</NavLink>
                <NavLink to="/salads" className="PageLink" activeClassName="ActivePageLink">Салаты</NavLink>
                <NavLink to="/sauces" className="PageLink" activeClassName="ActivePageLink">Соусы</NavLink>
                <NavLink to="/dessert" className="PageLink" activeClassName="ActivePageLink">Десерты</NavLink>
                <NavLink to="/drinks" className="PageLink" activeClassName="ActivePageLink">Напитки</NavLink>
                </div>
                <div className='cart'>
                <div className='amount'>{this.props.cartReducer.totalAmount}</div>
                <NavLink to="/cart" className="PageLink CartLink" activeClassName="ActivePageLink">Корзина</NavLink>
                </div>
         </div>
         </div>
    );
    
  }

}

const mapStateToProps = function(state){
  return {
    cartReducer: state.cart,
  };
}
    
export default connect(mapStateToProps)(Header);
  