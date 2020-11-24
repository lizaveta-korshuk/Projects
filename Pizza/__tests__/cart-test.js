import React from 'react';
import renderer from 'react-test-renderer';

import CartPage from '../componentsForTesting/CartPage';
import ItemInCart from '../componentsForTesting/ItemInCart';

import '../css/Cart.css'
import '../css/Item.css'



test('работа корзины', () => {

    let emptyCart = {
        items: [],
       totalAmount: 0,
    }

    let cartWithItems = {
       items: [
            {"key":1,"name":"3 сезона микс","price":21.9,"count":1,"size":"Большая"},{"key":1,"name":"3 сезона микс","price":16.9,"count":1,"size":"Стандартная"},{"key":31,"name":"Тейсти пайк","price":7.9,"count":1},{"key":34,"name":"Вкуснейший мохентохен","price":7.9,"count":1,"size":"Большая порция"},{"key":34,"name":"Вкуснейший мохентохен","price":4.9,"count":1,"size":"Стандартная порция"},{"key":38,"name":"Мохентохен сет","price":14.9,"count":1},{"key":39,"name":"Салат-ролл с лососем","price":8.9,"count":1},{"key":42,"name":"Кетчуп томатный","price":0.7,"count":1},{"key":49,"name":"Чизкейк","price":5.5,"count":1},{"key":52,"name":"Coca-Cola","price":2.1,"count":1}
        ],
        totalAmount: 91.6
    }

   const emptyCartComponent = renderer.create(
    <CartPage itemsInCart={emptyCart}/>
   );

   const fullCartComponent = renderer.create(
    <CartPage itemsInCart={cartWithItems}/>
    );

    let componentTreeForEmpty = emptyCartComponent.toJSON();
    let componentTreeForFull = fullCartComponent.toJSON();
    
    expect(componentTreeForEmpty).toMatchSnapshot(); //как отрендерилась пустая корзина
    expect(componentTreeForFull).toMatchSnapshot(); //как отрендерилась корзина с товарами
;
});
