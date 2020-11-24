import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {add_item, delete_item, delete_last_item} from '../../redux/cartAC';


import '../css/Item.css'

class MohentohensItem extends React.PureComponent{
   
    static propTypes = {
        info: PropTypes.object.isRequired,
    }


    addBigToCart = () => {
        let addedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.priceForBig, size:'Большая порция'}
        this.props.dispatch(add_item(addedItemInfo));
    }

    addStandartToCart = () => {
        let addedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.priceForStandart, size:'Стандартная порция'}  
        this.props.dispatch(add_item(addedItemInfo));
    }

    deleteBigFromCart = () => {
        let deletedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.priceForBig, size:'Большая порция'};
        let bigItemInReducer = this.props.cartReducer.items.find(item => item.key===this.props.info.key&&item.size==='Большая порция');
        
        if(bigItemInReducer.count===1){
            this.props.dispatch(delete_last_item(deletedItemInfo));
        }else{
            this.props.dispatch(delete_item(deletedItemInfo));
        }
    }

    deleteStandartFromCart = () => {
        let deletedItemInfo = {key:this.props.info.key, name:this.props.info.name, price:this.props.info.priceForStandart, size:'Стандартная порция'};
        let standartItemInReducer = this.props.cartReducer.items.find(item => item.key===this.props.info.key&&item.size==='Стандартная порция');
      
        if(standartItemInReducer.count===1){
            this.props.dispatch(delete_last_item(deletedItemInfo));
        }else{
            this.props.dispatch(delete_item(deletedItemInfo));
        }
    }



    render(){

        let bigItemInReducer = this.props.cartReducer.items.find(item => item.key===this.props.info.key&&item.size==='Большая порция');
        let standartItemInReducer = this.props.cartReducer.items.find(item => item.key===this.props.info.key&&item.size==='Стандартная порция');

        let countOfBigItems;
        let countOfStandartItems;

        if(bigItemInReducer){
            countOfBigItems=bigItemInReducer.count;
        }

        if(standartItemInReducer){
            countOfStandartItems=standartItemInReducer.count;
        }

        return(
            <div className='Item'>
            <img className='itemImage' src={this.props.info.image}/>
            <div className='title'> 
                {this.props.info.name}
            </div>
            <div className='cost'>
            <div className='desc'> 
                Большая порция:
            </div>
            <div>
                <span className='price'>{this.props.info.priceForBig}</span>
                {(!bigItemInReducer)
                  ?
                  <input className='toCartButton' type='button' value='В корзину' onClick={this.addBigToCart}/>
                  :
                  <div className='addAndDeleteButtons'>
                      <input className='addOrDeleteButton' type='button' value='-' onClick={this.deleteBigFromCart}/>
                  <span className='count'>{countOfBigItems}</span>
                      <input className='addOrDeleteButton' type='button' value='+' onClick={this.addBigToCart}/>
                  </div>
        
            }
            </div>
            <div>
              2 шт. 320 г
            </div>
            </div>
            <div className='cost'>
             <div className='desc'> 
                Стандартная порция:
            </div>
            <div>
                <span className='price'>{this.props.info.priceForStandart}</span>
                {(!standartItemInReducer)
                  ?
                <input className='toCartButton' type='button' value='В корзину' onClick={this.addStandartToCart}/>
                  :
                <div className='addAndDeleteButtons'>
                  <input className='addOrDeleteButton' type='button' value='-' onClick={this.deleteStandartFromCart}/>
              <span className='count'>{countOfStandartItems}</span>
                  <input className='addOrDeleteButton' type='button' value='+' onClick={this.addStandartToCart}/>
              </div>
             }
            </div>
            <div>
              1 шт. 160 г
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
      
  export default connect(mapStateToProps)(MohentohensItem);