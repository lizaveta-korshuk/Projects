import React from 'react';
import PropTypes from 'prop-types'; 

import DessertItem from '../Items/DessertItem';

import '../css/ForItems.css'

class DessertPage extends React.PureComponent{
    
    static propTypes ={
        itemsList: PropTypes.array.isRequired,
    }

    render(){

        let dessertCode = this.props.itemsList.map(item => <DessertItem key={item.key} info={item}/>)

        return(
            <div className='Page DessertPage'>
                {dessertCode}
            </div>
        )
    }
}

export default DessertPage;