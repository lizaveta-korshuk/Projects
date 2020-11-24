import React from 'react';
import PropTypes from 'prop-types'; 

import DrinksItem from '../Items/DrinksItem';

import '../css/ForItems.css'

class DrinksPage extends React.PureComponent{
   
    static propTypes ={
        itemsList: PropTypes.array.isRequired,
    }

    render(){

        let drinksCode = this.props.itemsList.map(item => <DrinksItem key={item.key} info={item}/>)

        return(
            <div className='Page DrinksPage'>
                {drinksCode}
            </div>
        )
    }
}

export default DrinksPage;