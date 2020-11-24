import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {add_item, delete_item, delete_last_item} from '../../redux/cartAC';

import '../css/Cart.css'
import '../css/Item.css'

import pizzaEvents from '../events';

class ItemInCart extends React.Component{

   static propTypes = {
       info: PropTypes.object.isRequired,
       status: PropTypes.string.isRequired,
   }

   deleteLast = () =>{
    let deletedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.price, size:this.props.info.size}
    this.props.dispatch(delete_last_item(deletedItemInfo));
    pizzaEvents.emit('deletionOfTheLastItemCompleted')
   }


    componentDidUpdate(){                //удаление элемента из state редьюсера после анимации
        if(this.props.status==='deleted'){
            setTimeout(this.deleteLast, 500);
        }
        
    }   

   
   addToCart = () => {
    let addedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.price, size:this.props.info.size};

    this.props.dispatch(add_item(addedItemInfo));
}

deleteFromCart = () => {
    let deletedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.price, size:this.props.info.size}
   
    if(this.props.info.count===1){

        pizzaEvents.emit('deletionOfTheLastItemStarted',{key:this.props.info.key, size:this.props.info.size})

    }else{
            this.props.dispatch(delete_item(deletedItemInfo));

    }
}



   render(){

           
       return(
           <div className={( this.props.status==='exist')?'ItemInCart':'ItemInCart deleted'}> 
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


const mapStateToProps = function(state){
    return {
      cartReducer: state.cart,
    };
  }
      
  export default connect(mapStateToProps)(ItemInCart);