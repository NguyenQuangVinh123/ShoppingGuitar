import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import  faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import  faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

const CollapseCheckbox = ({...props}) => {
    const collapse = {
        open: false,
        checked : []
    }
    const [stateCollapse,setStateCollapse] = useState(collapse)
    useEffect(() =>{
        if(props.initState){
            setStateCollapse((preState) => ({
                ...preState,
                open : props.initState
            }))
        }
    },[])
    useEffect(() => {
        props.handleFilters(stateCollapse.checked);
    },[stateCollapse.checked])
    const handleClick = () =>{
        setStateCollapse((preState) => ({
            ...preState,
            open : !stateCollapse.open
        }))
    } 
    const handleAngle = () =>(
        stateCollapse.open ? 
        <FontAwesomeIcon icon={faAngleUp} className='icon' /> :
        <FontAwesomeIcon icon={faAngleDown} className='icon' />
    )
    const handleToggle = (val,check) => {
        const { checked } = stateCollapse;
        const currentIndex = checked.indexOf(val);
        const newChecked = [...checked];
        if(currentIndex === -1){
            newChecked.push(val)
        }else{
            newChecked.splice(currentIndex,1)
        }
        setStateCollapse((preState) => ({
            ...preState,
            checked : newChecked,
        }))
    }

    const renderList = () => (
        props.list ?
        props.list.map((value) => (
            <ListItem key={value._id} style={{padding : '10px 0'}} >
                <ListItemText primary={value.name} />
                <ListItemSecondaryAction>
                    <Checkbox color="primary"
                        onChange={(e,checkValue) => handleToggle(value._id,checkValue)}  
                        checked={stateCollapse.checked.indexOf(value._id) !== -1 }
                     />
                </ListItemSecondaryAction> 
            </ListItem>
        )) : null
    )
    return (
        <div className='collapse_items_wrapper'>
                <List style={{borderBottom : '1px soled #dbdbdb'}}>
                    <ListItem onClick = {() => handleClick()} style={{padding : '10px 23px 10px 0'}}>
                        <ListItemText primary= {props.title} className="collapse_title" />
                        {handleAngle()}
                    </ListItem>
                    <Collapse in={stateCollapse.open} timeout= 'auto' unmountOnExit>
                        <List component="div"  disablePadding  >  
                            {renderList()}
                        </List>
                    </Collapse>
                </List>
        </div>
    );
};

export default CollapseCheckbox;