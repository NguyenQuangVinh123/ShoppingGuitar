import React, { useState } from "react";
import MyButton from '../utils/button';
import {connect} from 'react-redux';
import { addToCart } from '../../actions/user_actions';
const Card = ({ ...props }) => {
  const [quantity,setquantity] = useState(1);
  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  };
  return (
    <div className={`card_item_wrapper ${props.grid}`}>
      <div
        style={{
          background: `url(${renderCardImage(props.images)}) no-repeat`,
        }}
        className="image"
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{props.brand.name}</div>
          <div className="name">{props.name}</div>
          <div className="brand">${props.price}</div>
        </div>
     
      {props.grid ? 
      <div className="description">
        <p>{props.description}</p>
      </div> 
      : null}
      <div className='actions'>
        <div className='button_wrap'>
          <MyButton type ="default" 
          altClass = "card_link" title = "View Product" 
          linkTo= {`/product_details/${props._id}`} addStyles = {{
            margin : "10px 0 0 0"
          }} />
        </div>
        <div className='button_wrap'>
          <MyButton type ="bag_link" 
          altClass = "bag_link" runAction={() =>{
              props.dispatch(addToCart(props._id,quantity))
          }} 
          />
        </div>
      </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) =>{
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Card);
