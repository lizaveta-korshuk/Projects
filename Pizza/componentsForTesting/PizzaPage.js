import React from 'react';
import PropTypes from 'prop-types'; 

import PizzaItem from './PizzaItem';
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
        if(this.state.filter==='C грибами'){
            this.setState({filter:'all'});
            this.setState({itemsList:this.props.itemsList});
        }else{
                this.setState({
                    filter: 'C грибами'
                })
                this.setState({
                    itemsList: this.props.itemsList.filter(item => {
                        return (item.description.indexOf('шампиньоны') !== -1 || (item.description.indexOf('опята')) !== -1)
                    })
                });
            }
        };
    

    render(){

        let pizzaCode = this.state.itemsList.map(item => <PizzaItem key={item.key} info={item}/>)

        return(
            <div>
                <div className='filter'>
                    <input type='button' value='C грибами' id='mushrooms' className={(this.state.filter==='C грибами')?'filterButton selected':'filterButton'} onClick={this.filter}/>
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