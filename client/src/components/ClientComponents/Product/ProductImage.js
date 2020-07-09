import React, { useState, useEffect } from 'react';
const ProductImage = (props) => {
    const[imageProduct,setimageProduct] = useState({
        imagePos : 0,
        lightboxImages : [],
    })
    useEffect(() => {
        if(props.detail.images.length > 0){
            let lightboxImages  = [];
            props.detail.images.forEach(item => {
                lightboxImages.push(item.url)
            }); 
            setimageProduct((preState) =>({
                ...preState,
                lightboxImages : lightboxImages
            }))
        }
    },[])
    const renderCardImage = (images) =>{
        if(images.length > 0){
            return images[0].url
        }else{
            return `/images/image_not_availble.png`
        }
    }
    const showThumbs = () =>(
        imageProduct.lightboxImages.map((item,i) => (
            i > 0 ?
            <div key={i} className='thumb' style={{background:`url(${item}) no-repeat`}} >
            </div> : null
        ))
    )
    return (
        <div className="product_image_container">
            <div className='main_pic'>
                <div  style={{background:`url(${renderCardImage(props.detail.images)}) no-repeat`}}>
                </div>
            </div>
            <div className='main_thumbs'>
                {showThumbs()}
            </div>
        </div>
    );
};

export default ProductImage;