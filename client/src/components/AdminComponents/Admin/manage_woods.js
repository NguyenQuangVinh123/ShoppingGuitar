import React,{useState,useEffect} from 'react';
import {update,generateData,ifFormValid,resetFields} from '../../../utils/Form/FormAction'
import FormField from '../../../utils/Form/FormField'
import {connect} from 'react-redux';
import {  getWoods,addWoods} from '../../../actions/products_actions';
const ManageWoods = (props) => {
    const [form,setForm] = useState({
        formError : false,
        formSuccess : false,
        formData : {
            name : {
                element : 'input',
                value : '',
                config : {
                    name : "name_input",
                    label : 'Wood name',
                    type : 'text',
                    placeholder : "Enter the wood"
                },
                validation : {
                    required : true,
                },
                valid : false,
                touched : false,
                validationMessage : '',
            }
        }
    });
    useEffect(() => {
        props.dispatch(getWoods());
    },[]);
    const updateForm = async (element) =>{
        const newFormData = update(element,form.formData,'woods');
        const newFormData_Input = {
            formError : false, 
            formData : newFormData
        }
        await setForm(newFormData_Input)
    }
    const setStateFormError = async() => {
        await setForm((preState) => ({
            ...preState,
            formError : true,
        }))
    }
    const resetFieldHandels = () => {
        const newFormData = resetFields(form.formData,'woods');
        setForm((preState) => ({
            ...preState,
            formSuccess : true,
            formData : newFormData
        }))
    }
    const showCategoryItems  = () => (
        props.products.woods ? 
        props.products.woods.map((item,index) => (
            <div className="category_item" key={item._id}>
                {item.name}
            </div>
        ))
        : null
    )
    const pluck = (key,array) => array.reduce((val,current) => {
        val.push(current[key]);
        return val;
      }, []);
    const submitForm = async (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(form.formData,'woods');
        let formIsValid = ifFormValid(form.formData,'woods');
        let existingWoods = props.products.woods;
        let getNameWoods = pluck("name",existingWoods);
        if(getNameWoods.includes(dataToSubmit.name)){
            alert('Check name woods duplicate');
            return;
        }
        if(formIsValid) {
            props.dispatch(addWoods(dataToSubmit,existingWoods))
                .then(res => {
                    if(res.payload.success){
                        resetFieldHandels()
                    }else{
                        alert("Duplicate")
                    }
                })
        }else {
            setStateFormError()
        }
    }
    return (
        <div className='admin_category_wrapper'>
             <h1>Woods</h1>
             <div className='admin_two_column'>
                 <div className='left'>
                     <div className='brands_container'>
                         {showCategoryItems()}
                     </div>
                 </div>
                 <div className='right'>
                 <form onSubmit={(event) => submitForm(event)}>
                 <FormField id={'name'} formData={form.formData.name}
                            change = {(element) => updateForm(element)}
                        />
                         {
                                        form .formError ? 
                                        <div className="error_label">
                                            Please check your data
                                        </div>
                                        : null
                         }
                                    <button onClick={(event) => submitForm(event)}>
                                        ADD WOOD
                                    </button>
                </form>
                 </div>
             </div>
        </div>
    );
};
const mapStateToPropst = (state) => {
    return {
        products : state.products
    }
}

export default connect(mapStateToPropst)(ManageWoods)