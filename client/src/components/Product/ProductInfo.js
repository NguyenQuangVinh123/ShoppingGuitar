import React from 'react';
import MyButton from '../utils/button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

const ProductInfo = (props) => {
    const showProductTag = (detail) =>(
        <div className='product_tags'>
            { detail.shipping ? 
            <div className='tag'>
                <div><FontAwesomeIcon icon={faTruck} /></div>
                <div className='tag_text'>
                    <div>FreeShipping</div>                    
                    <div>And Return</div>
                </div>
            </div> : null 
            }
            { detail.available ? 
            <div className='tag'>
                <div><FontAwesomeIcon icon={faCheck} /></div>
                <div className='tag_text'>
                    <div>Available</div>                    
                    <div>in store</div>
                </div>
            </div> : 
            <div className='tag'>
                <div><FontAwesomeIcon icon={faTimes} /></div>
                <div className='tag_text'>
                    <div>Not Available</div>                    
                    <div>Preorder only</div>
                </div>
            </div> 
            }
        </div>
    
    )

    const showProductAction = (detail) =>(
        <div className= 'product_actions'>
            <div className='price'>
                {detail.price} $
            </div>
            <div className='cart'>
                <MyButton type='add_to_cart_link' runAction = {() =>{
                    console.log('addd to card')
                }} />
            </div>
            
        </div>
    
    )
    return (
        <div>
            <h1>{props.detail.brand.name}{props.detail.name}</h1>
            <p>
                {props.detail.description}
            </p>
            {showProductTag(props.detail)}
            {showProductAction(props.detail)}
            
            <MyButton /> 
        </div>
    );
};

export default ProductInfo;