import React from 'react';
import isoFetch from 'isomorphic-fetch';

import './withDataLoad.css';

let withDataLoad = (stringName) => Component => {

   class ComponentWithDataLoad extends React.Component{

    state={
        dataReady: false,
        data: null,
    }

    componentDidMount(){
        this.loadData();
    }

    fetchSuccess = (data) =>{

        this.setState({dataReady:true, data:data});

    }

    fetchError= (errorMessage) => {
        console.error(showStr);
    }

     loadData = () => {

        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', stringName);

       isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
           method: 'POST',
           headers:{
               "Accept":"application/json"
           },
           body: sp
       })
        .then (response => {
            if(!response.ok){
                throw new Error ('fetch error ' + response.status);
            }else{
                return response.json();
            }
        })
        .then (data =>{
            let result = JSON.parse(data.result)
            this.fetchSuccess(result);
        })
        .catch(error =>{
            this.fetchError(error.message);
        })
     }

     render(){
         if(!this.state.dataReady){
             return (
                <div className="floatingCirclesG">
                    <div className="f_circleG frotateG_01"></div>
                    <div className="f_circleG frotateG_02"></div>
                    <div className="f_circleG frotateG_03"></div>
                    <div className="f_circleG frotateG_04"></div>
                    <div className="f_circleG frotateG_05"></div>
                    <div className="f_circleG frotateG_06"></div>
                    <div className="f_circleG frotateG_07"></div>
                    <div className="f_circleG frotateG_08"></div>
                  </div>
             )
         } else {
                return <Component itemsList={this.state.data}/>
             }
     }
   }
   return ComponentWithDataLoad;
}

export default withDataLoad;