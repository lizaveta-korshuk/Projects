import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {add_item, delete_item, delete_last_item} from '../../redux/cartAC';

import '../css/Item.css'

class DrinksItem extends React.PureComponent{
   
    static propTypes = {
        info: PropTypes.object.isRequired,
    }

    addToCart = () => {
        let addedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.price};
        this.props.dispatch(add_item(addedItemInfo));
    }

    deleteFromCart = () => {
        let deletedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.price};
        let itemInReducer = this.props.cartReducer.items.find(item => item.key===this.props.info.key);
        
        if(itemInReducer.count===1){
            this.props.dispatch(delete_last_item(deletedItemInfo));
        }else{
            this.props.dispatch(delete_item(deletedItemInfo));
        }
    }
    

    render(){

        let itemInReducer = this.props.cartReducer.items.find(item => item.key===this.props.info.key);

        let countOfItems;

        if(itemInReducer){
            countOfItems=itemInReducer.count;
        }

        return(
            <div className='Item'>
            <img className='itemImage' src={this.props.info.image}/>
            <div className='title'> 
                {this.props.info.name}
            </div>
            <div className='cost'>
            <div>
                <span className='price'>{this.props.info.price}</span>
                {(!itemInReducer)
                  ?
                  <input className='toCartButton' type='button' value='В корзину' onClick={this.addToCart}/>
                  :
                  <div className='addAndDeleteButtons'>
                      <input className='addOrDeleteButton' type='button' value='-' onClick={this.deleteFromCart}/>
                  <span className='count'>{countOfItems}</span>
                      <input className='addOrDeleteButton' type='button' value='+' onClick={this.addToCart}/>
                  </div>
        
            }
            </div>
            <div>
              0.5 л
            </div>
            </div>
            <div className='desc'> 
                {this.props.info.description}
            </div>
        </div>
        )
    }
}

const mapStateToProps = function(state){
    return {
      cartReducer: state.cart,
    };
  }
      
  export default connect(mapStateToProps)(DrinksItem);