import React, { useState, useEffect } from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/FormField'
import {update,generateData,ifFormValid,populateOptionFileds,resetFields} from '../../utils/Form/FormAction'
import {connect} from 'react-redux';
import { getBrands ,getWoods, addProduct,clearProduct} from '../../../actions/products_actions';
import FileUpload from '../../utils/Form/FileUpload';

const AddProduct = (props) => {
    const [form,setForm] = useState({
        formError : false,
        formSuccess : false,
        formData : {
            name : {
                element : 'input',
                value : '',
                config : {
                    name : "name_input",
                    label : 'Product name',
                    type : 'text',
                    placeholder : "Enter your name"
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            description : {
                element : 'textarea',
                value : '',
                config : {
                    name : "description_input",
                    label : 'Product description',
                    type : 'text',
                    placeholder : "Enter your description"
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            price : {
                element : 'input',
                value : '',
                config : {
                    name : "price_input",
                    label : 'Product price',
                    type : 'number',
                    placeholder : "Enter your price"
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            brand : {
                element : 'select',
                value : '',
                config : {
                    name : "brands_input",
                    label : 'Product Brand',
                    options : []
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            shipping : {
                element : 'select',
                value : '',
                config : {
                    name : "shipping_input",
                    label : 'Shipping',
                    options : [
                        {key : true,value : 'Yes'},
                        {key : false,value : 'No'}
                    ]
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            available : {
                element : 'select',
                value : '',
                config : {
                    name : "available_input",
                    label : 'Available ,in stock',
                    options : [
                        {key : true,value : 'Yes'},
                        {key : false,value : 'No'}
                    ]
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            wood : {
                element : 'select',
                value : '',
                config : {
                    name : "wood_input",
                    label : 'Wood material',
                    options : []
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            frets : {
                element : 'select',
                value : '',
                config : {
                    name : "frets_input",
                    label : 'Frets',
                    options : [
                        {key : 21,value : 21},
                        {key : 22,value : 22},
                        {key : 23,value : 23},
                        {key : 24,value : 24}

                    ]
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            publish : {
                element : 'select',
                value : '',
                config : {
                    name : "publish_input",
                    label : 'Publish',
                    options : [
                        {key : true,value : 'Publish'},
                        {key : false,value : 'Hidden'}
                    ]
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
            images : {
                value: [],
                validation : {
                    required : false
                },
                valid : true,
                touched : false,
                validationMessage : '',
                showlabel : false
            },
            bestselling : {
                element : 'select',
                value : '',
                config : {
                    name : "bestselling_input",
                    label : 'Bestselling',
                    options : [
                        {key : true,value : 'Show'},
                        {key : false,value : 'Hidden'}
                    ]
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
                showlabel : true
            },
        }
    })
    
    useEffect(() => {
        props.dispatch(getBrands()).then(res =>{
            const newFormData = populateOptionFileds(form.formData,res.payload,'brand');
            updateFields(newFormData)
        })
        props.dispatch(getWoods()).then(res =>{
            const newFormData = populateOptionFileds(form.formData,res.payload,'wood');
            updateFields(newFormData)
        })
    },[]);
    useEffect(() =>
    {
        props.dispatch(clearProduct())
    },[form.formSuccess])
    const updateFields = (newFormData) => {
        setForm((preState) => ({
            ...preState,
            formData : newFormData
        }))
    }
    const setStateFormError = async() => {
        await setForm((preState) => ({
            ...preState,
            formError : true,
        }))
    }
    const updateForm = async (element) =>{
        const newFormData = update(element,form.formData,'products');
        const newFormData_Input = {
            formError : false, 
            formData : newFormData
        }
        await setForm(newFormData_Input)
    }
    const resetFiledHandler = () => {
        const newFormData = resetFields(form.formData,'products');
        setForm((preState) => ({
            ...preState,
            formSuccess : true,
            formData : newFormData
        }))
        setTimeout(() => {
            setForm((preState) => ({
                ...preState,
                formSuccess : false,
            }))
        },3000)
    }
    const submitForm = async (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(form.formData,'products');
        let formIsValid = ifFormValid(form.formData,'products');

        if(formIsValid) {
          props.dispatch(addProduct(dataToSubmit)).then((res) =>{
              if(res.payload.success){
                  resetFiledHandler();
              }else{
                setStateFormError()
              }
          })
        }else {
            setStateFormError()
        }
    }
    const imagesHandler = (images) => {
        const newFormData = {
            ...form.formData
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;
        setForm((preState) =>({
            ...preState,
            formData : newFormData
        }))
    }
    return (
        <UserLayout>
            <div>
                   <h1>Add Product</h1>
                   <form onSubmit={(event) => submitForm(event)}>
                       <FileUpload 
                        imagesHandler = {(images) => imagesHandler(images) }
                        reset = {form.formSuccess}
                       />
                        <FormField id={'name'} formData={form.formData.name}
                            change = {(element) => updateForm(element)}
                        />
                        <FormField id={'description'} formData={form.formData.description}
                            change = {(element) => updateForm(element)}
                        />
                        <FormField id={'price'} formData={form.formData.price}
                            change = {(element) => updateForm(element)}
                        />
                        <div className='form_devider'> </div>
                        <FormField id={'brand'} formData={form.formData.brand}
                            change = {(element) => updateForm(element)}
                        />
                        <FormField id={'shipping'} formData={form.formData.shipping}
                            change = {(element) => updateForm(element)}
                        />
                         <FormField id={'available'} formData={form.formData.available}
                            change = {(element) => updateForm(element)}
                        />
                         <div className='form_devider'> </div>
                         <FormField id={'wood'} formData={form.formData.wood}
                            change = {(element) => updateForm(element)}
                        />
                        <FormField id={'frets'} formData={form.formData.frets}
                            change = {(element) => updateForm(element)}
                        />
                         <FormField id={'publish'} formData={form.formData.publish}
                            change = {(element) => updateForm(element)}
                        />
                        <FormField id={'bestselling'} formData={form.formData.bestselling}
                            change = {(element) => updateForm(element)}
                        />
                    
                        {
                            form.formSuccess ? 
                            <div className='form_success'>
                                Success
                            </div>
                            : null
                        }
                        {
                                        form .formError ? 
                                        <div className="error_label">
                                            Please check your data
                                        </div>
                                        : null
                        }
                                    <button onClick={(event) => submitForm(event)}>
                                        ADD PRODUCT
                                    </button>

                   </form>
            </div>
        </UserLayout>
      
    );
};
const mapStateToProps = (state) =>{
    return {
        products : state.products
    }
}
export default connect(mapStateToProps)(AddProduct);