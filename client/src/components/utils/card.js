import React from 'react';

const Card = ({props}) => {
    const renderCardImage = (images) => {
        if (images.length > 0) {
            return images[0].url
        } else {
            return '/images/image_not_available.png'
        }
    }
    return (
        <div className={`card_item_wrapper ${props.grid}`}>
            <div style={{background : `url(${renderCardImage(props.images)}) no-repeat`}} className='image'>
           
            </div>
            <div className='action_container'>
                <div className='tags'>
    <div className='brand'>{props.brand.name}</div>
    <div className='name'>{props.name}</div>
    <div className='brand'>{props.price}</div>

                </div>    
            </div>
            {props.grid ? <div className='description'>
                sdsadasd
            </div> :null}
        </div>
    );
};

export default Card;