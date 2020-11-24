import React from 'react';

import {connect} from 'react-redux';
import {delete_item} from '../../redux/cartAC';

import ItemInCart from '../Items/ItemInCart';
import '../css/Cart.css'

import pizzaEvents from '../events';


class CartPage extends React.PureComponent{

  state={
      deletedItem: null,
      validationMessage: '',
  }
  
  componentDidMount(){
    pizzaEvents.addListener('deletionOfTheLastItemStarted', this.deletionOfTheLastItemStarted);
    pizzaEvents.addListener('deletionOfTheLastItemCompleted', this.deletionOfTheLastItemCompleted);
  }

  componentWillUnmount(){
    pizzaEvents.removeAllListeners();
  }

  deletionOfTheLastItemStarted = (item) =>{
    if(this.state.deletedItem===null){
      this.setState({deletedItem:item})
    }
  }

  deletionOfTheLastItemCompleted = () =>{
      this.setState({deletedItem:null})
  }

  validation = () =>{ 

    if(this.phoneRef.value===''){
         this.setState({validationMessage:'Укажите ваш номер телефона'});

    }else if(isNaN(this.phoneRef.value)||this.phoneRef.value.length!==9){
      this.setState({validationMessage:'Проверьте правильность написания вашего номера телефона. Пример: 255043134'});

    }else if(this.streetRef.value===''||this.buildingRef.value===''){
         this.setState({validationMessage:'Улица или номер дома не выбраны'});
        
     } else {
      if(this.state.validationMessage!==''){
        this.setState({validationMessage:''})
      }
      alert('В течение часа курьер доставит ваш заказ!');
      this.props.dispatch(delete_item('all'));
    }
  }

  phoneRef = null;

setPhoneRef = (ref) =>{
        this.phoneRef = ref;
    }

  streetRef = null;

setStreetRef = (ref) =>{
        this.streetRef = ref;
    }

  buildingRef = null;

setBuildingRef = (ref) =>{
        this.buildingRef = ref;
    }


    render(){

        let itemsCode=[];

        if(this.props.cartReducer.items.length>0){
            itemsCode = this.props.cartReducer.items.map(item => {
                let key;
                if(item.size==='Большая'||item.size==='Большая порция'){
                    key = item.key + 0.1;
                } else if (item.size==='Стандартная'||item.size==='Стандартная порция'){
                    key = item.key + 0.2;
                } else {
                    key = item.key;
                }
          if (this.state.deletedItem){
            return <ItemInCart key={key} status={(this.state.deletedItem.key===item.key&&this.state.deletedItem.size===item.size)?'deleted':'exist'} info={item}/>
          }else{
            return <ItemInCart key={key} status='exist' info={item}/>
          }
            })
        }

        return(
            <div className='cart'>
                <div className='h1'>
                  Оформление заказа
                </div>
                {(this.props.cartReducer.items.length>0)
                   ?
                   <div>
                    <div className='h2'>
                      Ваш заказ:
                    </div>
                    <div>
                      {itemsCode}
                    </div>
                    <div className='totalAmount'>
                      <span className='sum'>Итого: </span>
                      <span className='amount'>{this.props.cartReducer.totalAmount}</span>
                     </div>
                     <div className='form'>
                        <div className='h1'>Адрес доставки:</div>
                        <div className='name'>
                          <div>Ваше имя:</div>
                          <input type='text' name='name'/>
                        </div>
                        <div className='phone'>
                          <div>Ваш мобильный телефон:</div>
                          <input type='tel' className='code' name='code' value='+375' readOnly/>
                          <input type='tel' name='number'  maxLength='9' ref={this.setPhoneRef}/>
                        </div>
                        <div className='address'>
                          <div className='street'>
                            <div>Улица</div>
                            <input type='text' name='street' ref={this.setStreetRef}/>
                          </div>
                          <div className='building'>
                            <div>Дом</div>
                            <input type='tel' name='building' ref={this.setBuildingRef}/>
                          </div>
                          <div className='apartment'>
                            <div>Квартира</div>
                            <input type='tel' name='apartment'/>
                          </div>
                          <div className='frontDoor'>
                            <div>Подъезд</div>
                            <input type='tel' name='frontDoor'/>
                          </div>
                          <div className='floor'>
                            <div>Этаж</div>
                            <input type='tel' name='floor'/>
                          </div> 
                        </div>
                        <input type='button' value='Заказать' className='orderButton' onClick={this.validation}/>
                        <div className='validation'>{this.state.validationMessage}</div>
                     </div>
                </div>
                   :
                   <div className='h2'>
                  Ваша корзина пуста.
                </div>}

            </div>
        )
    }
}

const mapStateToProps = function(state){
    return {
      cartReducer: state.cart,
    };
  }
      
  export default connect(mapStateToProps)(CartPage);
