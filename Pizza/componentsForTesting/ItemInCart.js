import React from 'react';
import PropTypes from 'prop-types';

import '../css/Cart.css'
import '../css/Item.css'


class ItemInCart extends React.Component{

   static propTypes = {
       info: PropTypes.object.isRequired,
   }

   render(){

           
       return(
           <div className='ItemInCart'> 
           <div className='itemInfo'>
              <div className='nameAndSize'>
                  <div className='name'>
                    {this.props.info.name}
                  </div>
                  <div className='size'>
                    {this.props.info.size}
                  </div>
              </div>
              <div className='addAndDeleteButtons'>
                      <input className='addOrDeleteButton' type='button' value='-' onClick={this.deleteFromCart}/>
                  <span className='count'>{this.props.info.count}</span>
                      <input className='addOrDeleteButton' type='button' value='+' onClick={this.addToCart} />
                  </div>
              <div className='price'>
                  {this.props.info.price}
              </div>
           </div>
           <hr/>
           </div>
       )
   }
}
 
  export default ItemInCart;