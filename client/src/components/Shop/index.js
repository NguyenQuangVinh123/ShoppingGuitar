import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageTop from '../utils/page_top';
import { getBrands, getWoods } from '../../actions/products_actions';
import CollapseCheckbox from '../utils/collapseCheckbox';

const Shop = (props) => {
    // const [productsBrands,setProductsBrands] = useState(props.products.brands)
    useEffect(() => {
        props.dispatch(getBrands());
        props.dispatch(getWoods());

    },[])

    // const productBrands = props.products.brands;
    const handleFilters = (filters,cate) =>{
        console.log(filters)
    }
    return (
        
        <div>
            <PageTop title="Browse Products" />
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckbox initState = {true} title='Brands' 
                        list={props.products.brands} handleFilters={((filters) =>handleFilters(filters,'brand')  )}  />
                        {/* <CollapseCheckbox initState = {true} title='Frets' 
                        list={props.products.brands} handleFilters={((filters) =>handleFilters(filters,'frets')  )}  /> */}
                    </div>
                    <div className="right">
                        right
                    </div>

                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        products : state.products
    }
}
export default connect(mapStateToProps)(Shop);