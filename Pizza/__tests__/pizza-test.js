17import React from 'react';
import renderer from 'react-test-renderer';

import PizzaPage from '../componentsForTesting/PizzaPage';
import PizzaItem from '../componentsForTesting/PizzaItem';

import '../src/css/ForItems.css'
import '../src/css/Item.css'



test('работа Pizza компонента', () => {

    let pizzaJson = [{"key":1,"image":"../images/1.jpg","name":"3 сезона микс","priceForBig":21.9,"priceForStandart":16.9,"description":"сырный соус, свежие шампиньоны, филе цыпленка, пепперони, сыр моцарелла, базилик"},{"key":2,"image":"../images/4.jpg","name":"Цыпленок, ветчина и маслины","priceForBig":18.9,"priceForStandart":14.9,"description":"сладкий горчичный соус, филе цыпленка, ветчина, маслины, сыр моцарелла, базилик"},{"key":3,"image":"../images/7.jpg","name":"Грудинка и тейсти-соус","priceForBig":18.9,"priceForStandart":14.9,"description":"соус гриль, грудинка (свинина), свежие томаты, свежий лук, сыр моцарелла, базилик"},{"key":4,"image":"../images/10.jpg","name":"Ранч пицца","priceForBig":18.9,"priceForStandart":14.9,"description":"американский соус ранч, филе цыпленка, ветчина, свежие томаты, сыр моцарелла, базилик"},{"key":5,"image":"../images/13.jpg","name":"Цыпленок барбекю","priceForBig":18.9,"priceForStandart":14.9,"description":"пицца-соус, грудинка (свинина), филе цыпленка, свежий лук, соус барбекю, сыр моцарелла, базилик"},{"key":6,"image":"../images/16.jpg","name":"Баварская","priceForBig":18.9,"priceForStandart":14.9,"description":"сладкий горчичный соус, охотничьи колбаски, свежие шампиньоны, свежий лук, свежие томаты, сыр моцарелла, базилик"},{"key":7,"image":"../images/19.jpg","name":"Гавайская","priceForBig":18.9,"priceForStandart":14.9,"description":"сырный соус, ветчина, филе цыпленка, ананасы, сыр моцарелла, базилик"},{"key":8,"image":"../images/22.jpg","name":"Грибная","priceForBig":18.9,"priceForStandart":14.9,"description":"чесночный соус, ветчина, свежие шампиньоны, сыр моцарелла, базилик"},{"key":9,"image":"../images/25.jpg","name":"Сырный цыпленок","priceForBig":18.9,"priceForStandart":14.9,"description":"сырный соус, филе цыпленка, свежие томаты, сыр моцарелла, кунжут, базилик"},{"key":10,"image":"../images/28.jpg","name":"Деревенская","priceForBig":18.9,"priceForStandart":14.9,"description":"американский соус ранч, грудинка (свинина), свежий лук, соленые огурцы, свежие шампиньоны, сыр моцарелла, базилик"},{"key":11,"image":"../images/31.jpg","name":"Копченый цыпленок и охотничьи колбаски","priceForBig":18.9,"priceForStandart":14.9,"description":"чесночный соус, филе цыпленка копчено-вареное, охотничьи колбаски, свежие шампиньоны, свежий болгарский перец, сыр моцарелла, базилик"},{"key":12,"image":"../images/34.jpg","name":"Колбаски барбекю","priceForBig":18.9,"priceForStandart":14.9,"description":"пицца-соус, охотничьи колбаски, свежий лук, свежие шампиньоны, грудинка (свинина), соленые огурцы, американский соус ранч, соус барбекю, сыр моцарелла, базилик"},{"key":13,"image":"../images/37.jpg","name":"Чесночный цыпленок","priceForBig":18.9,"priceForStandart":14.9,"description":"чесночный соус, филе цыпленка, грудинка (свинина), свежие томаты, сыр моцарелла, базилик"},{"key":14,"image":"../images/40.jpg","name":"Французский цыпленок","priceForBig":18.9,"priceForStandart":14.9,"description":"грибной соус, филе цыпленка, свежие шампиньоны, свежий лук, сыр моцарелла, базилик"},{"key":15,"image":"../images/43.jpg","name":"Салями, ветчина и грибы","priceForBig":18.9,"priceForStandart":14.9,"description":"пицца-соус, свежие шампиньоны, варено-копченая салями, ветчина, сыр моцарелла, базилик"},{"key":16,"image":"../images/46.jpg","name":"Чеддер и копченый цыпленок","priceForBig":24.5,"priceForStandart":18.9,"description":"чесночный соус, филе цыпленка копчено-вареное, сыр чеддер, томаты полусушеные маринованные, базилик"},{"key":17,"image":"../images/49.jpg","name":"Острая чили","priceForBig":24.5,"priceForStandart":18.9,"description":"острый перец халапеньо, чесночный соус, сладкий соус чили, пепперони, грудинка (свинина), свежий болгарский перец, сыр моцарелла, перец кайенский"},{"key":18,"image":"../images/52.jpg","name":"Кантри четыре сезона","priceForBig":24.5,"priceForStandart":18.9,"description":"грибной соус, буженина (свинина), грудинка (свинина), маринованные опята, сыр фета, сыр дорблю, сыр моцарелла, базилик"},{"key":19,"image":"../images/55.jpg","name":"Цыпленок дорблю","priceForBig":24.5,"priceForStandart":18.9,"description":"сырный соус,филе цыпленка, сыр дорблю, сыр моцарелла, базилик"},{"key":20,"image":"../images/58.jpg","name":"Филадельфия","priceForBig":24.5,"priceForStandart":18.9,"description":"пицца-соус, филе лосося слабосоленое, сыр фета, лимон, свежие томаты, сыр моцарелла, базилик"},{"key":21,"image":"../images/61.jpg","name":"Четыре сыра","priceForBig":24.5,"priceForStandart":18.9,"description":"сырный соус, сливочный сыр, сыр фета, сыр дорблю, сыр моцарелла, базилик"},{"key":22,"image":"../images/64.jpg","name":"Пицца лисицца","priceForBig":21.9,"priceForStandart":16.9,"description":"пицца-соус, ветчина, пепперони, свежие шампиньоны, свежий болгарский перец, свежие томаты, сыр моцарелла, базилик"},{"key":23,"image":"../images/67.jpg","name":"Мясная","priceForBig":21.9,"priceForStandart":16.9,"description":"пицца-соус, пепперони, ветчина, фарш (говядина), грудинка (свинина), сыр моцарелла, базилик"},{"key":24,"image":"../images/70.jpg","name":"Четыре сезона","priceForBig":21.9,"priceForStandart":16.9,"description":"чесночный соус, пепперони, ветчина, свежие шампиньоны, филе цыпленка, сыр моцарелла, базилик"},{"key":25,"image":"../images/73.jpg","name":"Грибной цыпленок","priceForBig":21.9,"priceForStandart":16.9,"description":"американский соус ранч, филе цыпленка, ветчина, свежие шампиньоны, сыр фета, сладкий горчичный соус, сыр моцарелла, базилик"},{"key":26,"image":"../images/76.jpg","name":"Чизбургер пицца","priceForBig":21.9,"priceForStandart":16.9,"description":"сырный соус, грудинка (свинина), фарш (говядина), свежие томаты, соленые огурцы, свежий лук, сыр моцарелла, кунжут, базилик"},{"key":27,"image":"../images/79.jpg","name":"Украинская","priceForBig":21.9,"priceForStandart":16.9,"description":"чесночный соус, грудинка (свинина), ветчина, свежий лук, соленые огурцы, сладкий горчичный соус, сыр моцарелла, базилик"},{"key":28,"image":"../images/82.jpg","name":"Итальянская","priceForBig":21.9,"priceForStandart":16.9,"description":"пицца-соус, пепперони, свежие шампиньоны, грудинка (свинина), маслины, сыр моцарелла, базилик"},{"key":29,"image":"../images/85.jpg","name":"Пепперони","priceForBig":21.9,"priceForStandart":16.9,"description":"пицца-соус, пепперони, сыр моцарелла, базилик"},{"key":30,"image":"../images/88.jpg","name":"Вегетарианская","priceForBig":21.9,"priceForStandart":16.9,"description":"пицца-соус, томаты полусушеные маринованные, свежие шампиньоны, свежий болгарский перец, сыр фета, маслины, сыр моцарелла, базилик"}]

    const pizzaPage = renderer.create(
        <PizzaPage itemsList={pizzaJson}/>
     );

   let componentTree=pizzaPage.toJSON();
   expect(componentTree).toMatchSnapshot(); //как отрендерилась страница
 
   const filterByMushrooms = pizzaPage.root.findByProps({"id":"mushrooms"}) //отфильтровать по ингредиенту "грибы"
   filterByMushrooms.props.onClick();
  
   componentTree=pizzaPage.toJSON();
   expect(componentTree).toMatchSnapshot();

   filterByMushrooms.props.onClick();  //вернуть в исходное состояние
  
   componentTree=pizzaPage.toJSON();
   expect(componentTree).toMatchSnapshot();
    
});
