import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import  faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import  faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
const CollapseRadio = ({...props}) => {

    const [radioState,setRadioState] = useState({
        open : false,
        value : '0'
    });
    useEffect(() =>{
        if(props.initState){
            setRadioState((preState) => ({
                ...preState,
                open : props.initState
            }))
        }
    },[]);

    const handleClick = () =>{
        setRadioState((preState) => ({
            ...preState,
            open : !radioState.open
        }))
    } 
    const handleAngle = () =>(
        radioState.open ? 
        <FontAwesomeIcon icon={faAngleUp} className='icon' /> :
        <FontAwesomeIcon icon={faAngleDown} className='icon' />
    )
    const handleChange = (event) => {
        props.handleFilters(event.target.value)
        setRadioState((preState) => ({
            ...preState,
            value : event.target.value
        }))
    }
    const renderList = () => (
        props.list ? 
            props.list.map((val) => (
                <FormControlLabel
                    key={val._id}
                    value={`${val._id}`}
                    control = {<Radio />}
                    label = {val.name}
                />
            ))
        : null
    )
        return (
        <div>
            <List style={{borderBottom : '1px soled #dbdbdb'}}>
                    <ListItem onClick = {() => handleClick()} style={{padding : '10px 23px 10px 0'}}>
                        <ListItemText primary= {props.title} className="collapse_title" />
                        {handleAngle()}
                    </ListItem>
                    <Collapse in={radioState.open} timeout= 'auto' unmountOnExit>
                        <List component="div"  disablePadding  >  
                           <RadioGroup  name='prices' value={radioState.value}
                            onChange = {(e) => handleChange(e)} >
                                {renderList()}
                           </RadioGroup>
                        </List>
                    </Collapse>
                </List>
        </div>
    );
};

export default CollapseRadio;