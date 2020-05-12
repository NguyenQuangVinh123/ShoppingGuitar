import React from 'react';
import MyButton from '../utils/button';
const HomePromotion = (props) => {
    const promotion = [
        {
          img: "/images/featured/featured_home_3.jpg",
          lineOne: "Up to 40% off",
          lineTwo: "In second hand guitars",
          linkTitle: "Shop now",
          linkTo: "/shop",
        }
      ];
      const renderPromotion = () => (
        
          promotion ? 
          <div className= "home_promotion_img" style={{ background:`url(${promotion[0].img})` }}>
              <div className="tag title">{promotion[0].lineOne}</div>
                      <div className="tag low_title">{promotion[0].lineTwo}</div>
                      <div>
                        <MyButton 
                          type="default"
                          title = {promotion[0].linkTitle}
                          linkTo = {promotion[0].linkTo}
                          addStyles = {{margin : '10px 0 0 0'}}
                        />
                      </div>
          </div>  : null
      )
    return (
        <div className="home_promotion">
            {renderPromotion()}
        </div>
    );
};

export default HomePromotion;