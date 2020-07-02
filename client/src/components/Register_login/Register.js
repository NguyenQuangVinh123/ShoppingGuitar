import React, { useState } from "react";
import { connect } from "react-redux";
import FormField from "../utils/Form/FormField";
import { registerUser } from "../../actions/user_actions";
import { update, generateData, ifFormValid } from "../utils/Form/FormAction";
import Dialog from "@material-ui/core/Dialog";
const Register = (props) => {
  const state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your last name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
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
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm your password",
        },
        validation: {
          required: true,
          confirm: "password",
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };
  const setStateFormError = async () => {
    await setInput((preState) => ({
      ...preState,
      formError: true,
    }));
  };
  const [input, setInput] = useState(state);

  const updateForm = async (element) => {
    const newFormData = update(element, input.formData, "register");
    const newFormData_Input = {
      formError: false,
      formData: newFormData,
    };
    await setInput(newFormData_Input);
  };
  const submitForm = async (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(input.formData, "register");
    let formIsValid = ifFormValid(input.formData, "register");

    if (formIsValid) {
      props
        .dispatch(registerUser(dataToSubmit))
        .then((res) => {
          if (res.payload.success) {
          } else {
            setStateFormError();
          }
        })
        .catch((e) => {});
    } else {
      setStateFormError();
    }
  };
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <form onSubmit={(event) => submitForm(event)}>
              <h2>Personal Information</h2>
              <div className="form_block_two">
                <div className="block">
                  <FormField
                    id={"name"}
                    formData={input.formData.name}
                    change={(element) => updateForm(element)}
                  />
                </div>
                <div className="block">
                  <FormField
                    id={"lastname"}
                    formData={input.formData.lastname}
                    change={(element) => updateForm(element)}
                  />
                </div>
              </div>
              <div>
                <FormField
                  id={"email"}
                  formData={input.formData.email}
                  change={(element) => updateForm(element)}
                />
              </div>
              <h2> Verify password</h2>
              <div className="form_block_two">
                <div className="block">
                  <FormField
                    id={"password"}
                    formData={input.formData.password}
                    change={(element) => updateForm(element)}
                  />
                </div>
                <div className="block">
                  <FormField
                    id={"confirmPassword"}
                    formData={input.formData.confirmPassword}
                    change={(element) => updateForm(element)}
                  />
                </div>
              </div>
              <div>
                {input.formError ? (
                  <div className="error_label">Please check your data</div>
                ) : null}
                <button onClick={(event) => submitForm(event)}>
                  CREATE ACCOUNT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog open={input.formSuccess}>
        <div className="dialog_alert">
          <div>Congratulations !!</div>
          <div>You will be redirected to the LOGIN PAGE in a second...</div>
        </div>
      </Dialog>
    </div>
  );
};

export default connect()(Register);
