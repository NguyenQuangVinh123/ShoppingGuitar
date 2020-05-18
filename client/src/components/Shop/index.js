import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageTop from '../utils/page_top';
import { getBrands, getWoods } from '../../actions/products_actions';
import CollapseCheckbox from '../utils/collapseCheckbox';
import {frets,price} from '../utils/Form/Fixed_categories';
import CollapseRadio from '../utils/collapseRadio';
const Shop = (props) => {
    const [layout,setLayout]  = useState({grid : '',limit : 6,skip : 0,filters : {
        brand : [],
        frets: [],
        wood : [],
        price : []
    } })
    useEffect(() => {
        props.dispatch(getBrands());
        props.dispatch(getWoods());

    },[])

    const handleFilters = (filters,cate) =>{
       const newFilter = {...layout.filters}
       newFilter[cate] = filters;
       setLayout((preState) => ({
        ...preState,
        filters : newFilter
       }))
      
    }
    return (
        <div>
            <PageTop title="Browse Products" />
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckbox initState = {true} title='Brands' 
                        list={props.products.brands} handleFilters={((filters) =>handleFilters(filters,'brand')  )}  />
                        <CollapseCheckbox initState = {false} title='Frets' 
                        list={frets} handleFilters={((filters) =>handleFilters(filters,'frets')  )}  />
                        <CollapseCheckbox initState = {true} title='Wood' 
                        list={props.products.woods} handleFilters={((filters) =>handleFilters(filters,'wood')  )}  />
                         <CollapseRadio initState = {true} title='Price' 
                        list={price} handleFilters={((filters) =>handleFilters(filters,'price')  )}  />
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