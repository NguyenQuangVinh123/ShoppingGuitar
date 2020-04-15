import React from 'react';

const FormField = ({formData,change,id}) => {
    const renderTemplate = () =>{
        let formTemplate = null;

        switch (key) {
            case ('input'):
                formTemplate = (
                    <div className="formBlock">
                        <input 
                            {...formData.config}
                            value = {formData.value}
                            onBlur = {(event) => change({event,id,blur:true}) }
                            onChange = {(event) => change({event,id})}
                        />
                    </div>
                )
                break;
        
            default:
                formTemplate = null
                break;
        }
        return formTemplate;
    }
    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;