export const validate = (element,formdata = []) => {
    let error  = [true,''];
    if(element.validation.email){
        const regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = regex_email.test(element.value)
        
        const message = `${!valid ? 'Must be a valid email' : ''}`
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? "Passwords do not match" : ''}`;
        error = !valid ? [valid,message] : error;

    }
    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`
        error = !valid ? [valid,message] : error;
    }
    return error 
}
export const update = (element, formdata, formName ) => {
    const newFormdata = {
        ...formdata
    };
    
    const newElement = {
        ...newFormdata[element.id]
    }
    newElement.value = element.event.target.value;
    if(element.blur){
        let validData = validate(newElement,formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;
    return newFormdata;
}
export const generateData = (formdata,formName) =>{
     let dataToSubmit = {};
     for(let key in formdata){
         if(key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
         }

     }
     return dataToSubmit;
}
export const ifFormValid = (formdata,formName) => {
    let formIsValid = true;

    for (let key in formdata) {
        formIsValid = formdata[key].valid && formIsValid
        
    }
    return formIsValid;
}
export const populateOptionFileds = (formdata,arrayData = [] , field) => {
    const newArray = [];
    const newFormData = {...formdata};
    arrayData.forEach(item => {
        newArray.push({
            key:item._id,
            value : item.name
        })
    })
    newFormData[field].config.options = newArray;
    return newFormData;
}
export const resetFields = (formdata,formName) => {
    const newFormData = {...formdata};
    for(let key in newFormData){
        if(key === 'images'){
            newFormData[key].value = [];
        }else{
            newFormData[key].value = '';

        }
        newFormData[key].valid = false;
        newFormData[key].touched = false;
        newFormData[key].validationMessage = '';
    }
    return newFormData
}