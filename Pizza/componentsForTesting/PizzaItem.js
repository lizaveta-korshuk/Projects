import React from 'react';
import PropTypes from 'prop-types';

import '../css/Item.css'

class PizzaItem extends React.PureComponent{
   
    static propTypes = {
        info: PropTypes.object.isRequired,
    }

    render(){
        
        return(
            <div className='Item'>
            <img className='itemImage' src={this.props.info.image}/>
            <div className='title'> 
                {this.props.info.name}
            </div>
            <div className='cost'>
            <div className='desc'> 
                Большая:
            </div>
            <div>
              <span className='price'>{this.props.info.priceForBig}</span>            
                  <input className='toCartButton' type='button' value='В корзину' onClick={this.addBigToCart}/>               
            </div>
            <div>
              0,8–0,9 кг
            </div>
            </div>
            <div className='cost'>
             <div className='desc'> 
                Стандартная:
            </div>
            <div>
                <span className='price'>{this.props.info.priceForStandart}</span>
                <input className='toCartButton' type='button' value='В корзину' onClick={this.addStandartToCart}/>     
            </div>
            <div>
              0,6–0,7 кг
            </div>
            </div>
            <div className='desc'> 
                {this.props.info.description}
            </div>
        </div>
        )
    }
}

  export default PizzaItem;