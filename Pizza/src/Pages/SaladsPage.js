import React from 'react';
import PropTypes from 'prop-types'; 

import SaladsItem from '../Items/SaladsItem';

import '../css/ForItems.css'

class SaladsPage extends React.PureComponent{
   
    static propTypes ={
        itemsList: PropTypes.array.isRequired,
    }

    render(){

        let saladsCode = this.props.itemsList.map(item => <SaladsItem key={item.key} info={item}/>)

        return(
            <div className='Page SaladsPage'>
                {saladsCode}
            </div>
        )
    }
}

export default SaladsPage;