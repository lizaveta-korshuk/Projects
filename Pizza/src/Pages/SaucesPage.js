import React from 'react';
import PropTypes from 'prop-types'; 

import SaucesItem from '../Items/SaucesItem';

import '../css/ForItems.css'

class SaucesPage extends React.PureComponent{
   
    static propTypes ={
        itemsList: PropTypes.array.isRequired,
    }

    render(){

        let saucesCode = this.props.itemsList.map(item => <SaucesItem key={item.key} info={item}/>)

        return(
            <div className='Page SaucesPage'>
                {saucesCode}
            </div>
        )
    }
}

export default SaucesPage;