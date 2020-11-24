import React from 'react';
import PropTypes from 'prop-types'; 

import PikesItem from '../Items/PikesItem';
import MohentohensItem from '../Items/MohentohensItem';
import MohsetItem from '../Items/MohsetItem';

import '../css/ForItems.css'

class SnacksPage extends React.PureComponent{
    
  static propTypes ={
    itemsList: PropTypes.object.isRequired,
}

    render(){

        let pikeItemsCode = this.props.itemsList.pikes.map(item => <PikesItem key={item.key} info={item}/>)
        let mohentohenItemsCode = this.props.itemsList.mohentohens.map(item => <MohentohensItem key={item.key} info={item}/>)
        let mohsetItemsCode = this.props.itemsList.mohset.map(item => <MohsetItem key={item.key} info={item}/>)

        return(
            <div className='SnacksPage'>
                <div className='Page pikes'>
                   {pikeItemsCode}
                </div>
                <div className='Page mohentohens'>
                  {mohentohenItemsCode}
                </div>
                <div className='Page mohset'>
                  {mohsetItemsCode}
                </div>
            </div>
        )
    }
}

export default SnacksPage;