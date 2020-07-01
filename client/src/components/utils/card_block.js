import React from 'react';
import Card from './card';
const CardBlock = ({...props}) => {
    let list = [];
    if(props.list !== undefined){
        if(props.type === 'bestselling'){
            list = props.list.filter(card => card.bestselling == true);
        }else{
            list = props.list
        }
    }
  
    const renderCards = () => (
        list ?
        list.map((card,index) => (
                
                <Card key={index} {...card} />
           
        )) : null
    )
    return (
        <div className='card_block'>
            <div className="container">
                {
                    props.title ? 
                        <div className="title">
                            {props.title}
                        </div> 
                    : null 
                }
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    )
};

export default CardBlock;