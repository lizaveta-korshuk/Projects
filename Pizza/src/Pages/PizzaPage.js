import React from 'react';
import PropTypes from 'prop-types'; 

import PizzaItem from '../Items/PizzaItem';
import '../css/ForItems.css'

class PizzaPage extends React.PureComponent{
   
    static propTypes ={
        itemsList: PropTypes.array.isRequired,
    }

    state = {
        itemsList: this.props.itemsList,
        filter: 'all',
    }

    filter = (EO) => {
        if(this.state.filter===EO.target.value){
            this.setState({filter:'all'});
            this.setState({itemsList:this.props.itemsList});
        }else{
            if (EO.target.value === 'C грибами') {
    
                this.setState({
                    filter: 'C грибами'
                })
                this.setState({
                    itemsList: this.props.itemsList.filter(item => {
                        return (item.description.indexOf('шампиньоны') !== -1 || (item.description.indexOf('опята')) !== -1)
                    })
                });
            } else if (EO.target.value === 'С мясом') {
                this.setState({
                    filter: 'С мясом'
                })
                this.setState({
                    itemsList: this.props.itemsList.filter(item => {
                        return (item.description.indexOf('свинина') !== -1 || (item.description.indexOf('филе')) !== -1 || (item.description.indexOf('колбаски')) !== -1 || (item.description.indexOf('ветчина')) !== -1 || (item.description.indexOf('говядина')) !== -1 || (item.description.indexOf('пепперони')) !== -1)
                    })
                });
        
            } else if (EO.target.value === 'Вегетерианская') {
                this.setState({
                    filter: 'Вегетерианская'
                })
                this.setState({
                    itemsList: this.props.itemsList.filter(item => {
                        return (item.description.indexOf('свинина') === -1 && (item.description.indexOf('филе')) === -1 && (item.description.indexOf('колбаски')) === -1 && (item.description.indexOf('ветчина')) === -1 && (item.description.indexOf('говядина')) === -1 && (item.description.indexOf('пепперони')) === -1)
                    })
                });
            } else if (EO.target.value === 'Без лука') {
                this.setState({
                    filter: 'Без лука'
                })
                this.setState({
                    itemsList: this.props.itemsList.filter(item => {
                        return (item.description.indexOf('лук') === -1)
                    })
                });
            }
        }
    };
    

    render(){

        let pizzaCode = this.state.itemsList.map(item => <PizzaItem key={item.key} info={item}/>)

        return(
            <div>
                <div className='filter'>
                    <input type='button' value='C грибами' className={(this.state.filter==='C грибами')?'filterButton selected':'filterButton'} onClick={this.filter}/>
                    <input type='button' value='С мясом' className={(this.state.filter==='С мясом')?'filterButton selected':'filterButton'} onClick={this.filter}/>
                    <input type='button' value='Вегетерианская' className={(this.state.filter==='Вегетерианская')?'filterButton selected':'filterButton'} onClick={this.filter}/>
                    <input type='button' value='Без лука' className={(this.state.filter==='Без лука')?'filterButton selected':'filterButton'} onClick={this.filter}/>
                </div>
              <div className='Page PizzaPage'>
                {pizzaCode}
            </div>
            </div>
        )
    }
}

export default PizzaPage;