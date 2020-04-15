import React from 'react'
import { Link } from 'react-router-dom';

const MyButton = (props) => {
    const buttons = () =>{
        let template = '';
        switch (props.type) {
            case "default":
                template = <Link className='link_default' to={prop.LinkTo} {...props.addStyles}>
                    {props.title}
                </Link>
                break;
        
            default:
                template ='';
                break;
        }
        return template
    }
    return (
        <div className="my_link">
            {
                buttons()
            }
            
        </div>
    )
}

export default MyButton
