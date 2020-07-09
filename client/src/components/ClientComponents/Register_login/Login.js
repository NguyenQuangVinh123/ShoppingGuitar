import React, { useState } from "react";
import { connect } from "react-redux";
import FormField from "../../../utils/Form/FormField";
import { loginUser } from "../../../actions/user_actions";
import { update, generateData, ifFormValid } from "../../../utils/Form/FormAction";
import { withRouter } from "react-router-dom";
const Login = (props) => {
  const state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };
  const [input, setInput] = useState(state);
  const updateForm = async (element) => {
    const newFormData = update(element, input.formData, "login");
    const newFormData_Input = {
      formError: false,
      formData: newFormData,
    };
    await setInput(newFormData_Input);
  };
  const submitForm = async (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(input.formData, "login");
    let formIsValid = ifFormValid(input.formData, "login");

    if (formIsValid) {
      props.dispatch(loginUser(dataToSubmit)).then((res) => {
        if (res.payload.loginSuccess) {
          props.history.push("/user/dashboard");
        } else {
          setInput((preState) => ({
            ...preState,
            formError: true,
          }));
        }
      });
    } else {
      await setInput((preState) => ({
        ...preState,
        formError: true,
      }));
    }
  };
  return (
    <div className="signin_wrapper">
      <form onSubmit={(event) => submitForm(event)}>
        <FormField
          id={"email"}
          formData={input.formData.email}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={"password"}
          formData={input.formData.password}
          change={(element) => updateForm(element)}
        />
      </form>
      {input.formError ? (
        <div className="error_label">Please check your data</div>
      ) : null}
      <button onClick={(event) => submitForm(event)}>LOG IN</button>
    </div>
  );
};
export default connect()(withRouter(Login));
