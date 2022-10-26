import React from 'react';
import { Form, Field } from "react-final-form";

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => { // in this function meta decides wether or not to show the error and return or not some JSX
    if (touched && error) { //this statement will check if the input was selected or not and if there is a string on the input or not (Touched means when ever the user selected the input and then deselected without typing)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`; //this means if meta.error and meta.touched === true, return error otherwise return empty string
    return (
      <div className={className}>
        <label>{label}</label> {/* 2- connected to Field label: And now i can print out that label argument  */}
        <input {...input} autoComplete="off" /> { /* this line Take the formProps/input property(bject with the value prop, onChange handler and more. it adds all those keys to the input Element as props) */}
        {renderError(meta)} {/* in this line We are calling renderError and passing a meta */}
      </div>
    );
  };

  const onSubmit = (formValues) => { // 2.-this connects with the form: then the data goes to formValues for us to handle the submision or create the stream
    props.onSubmit(formValues); 
  };

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={(formValues) => { //validate values for inputs
        const errors = {};

        if (!formValues.title) {
          errors.title = "You must enter a title"; //only ran if the user did not enter a title
        }

        if (!formValues.description) {
          errors.description = "You must enter a description";
        }

        return errors;
      }}

    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit} className="ui form error"> {/*1.-this connects with onSubmit function: We reference handle submit from the redux props library console.log(this.props) to see the props object and we pass it whatever callback we want to run after the form get submited (this.onSubmit) */}
        <Field name="title" component={renderInput} label="Enter Title" /> {/*1- The label prop is gonna be passed to the renderInput and we can recive that as an aditional property on arguments */}
        <Field name="description" component={renderInput} label="Enter Description" /> {/*connected to renderInput: Redux is gonna look at that name property and then at errors object if field === to the property inside the object, the errors object pass down the error property to the renderInput function*/}
        <button className="ui button primary">Submit</button>
      </form>
    )}
    />
  )
}

export default StreamForm;
