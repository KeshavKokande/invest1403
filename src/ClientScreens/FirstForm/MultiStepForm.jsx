import React, { useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import './Page.css';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageFour from './PageFour';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    qualification: '',
    email: '',
    address: '',
    jobRole: '',
    agreement: false,
    // Additional fields if needed for other steps
  });

  const [activeStep, setActiveStep] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validatePageOne = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.age) errors.age = 'Age is required';
    // Add more validation rules as needed
    return errors;
  };

  const validatePageTwo = () => {
    // Validation logic for PageTwo fields
    return {};
  };

  const validatePageThree = () => {
    // Validation logic for PageThree fields
    return {};
  };

  const validatePageFour = () => {
    const errors = {};
    if (!formData.agreement) errors.agreement = 'You must agree to the terms and conditions';
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

    // Replace 'your-api-endpoint' with your actual API endpoint
    fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log('API response:', data))
      .catch((error) => console.error('Error:', error));
  };

  const nextStep = () => {
    let errors = {};
    // Validate current step
    switch (activeStep) {
      case 0:
        errors = validatePageOne();
        break;
      case 1:
        errors = validatePageTwo();
        break;
      case 2:
        errors = validatePageThree();
        break;
      case 3:
        errors = validatePageFour();
        break;
      default:
        break;
    }
    
    // Proceed to next step if there are no errors
    if (Object.keys(errors).length === 0) {
      setActiveStep(activeStep + 1);
      setFormErrors({});
    } else {
      // Show alert for errors
      alert(Object.values(errors).join('\n'));
      setFormErrors(errors);
    }
  };
  
  const prevStep = () => {
    setActiveStep(activeStep - 1);
    setFormErrors({});
  };

    const [agreed, setAgreed] = useState(false);

    const handleAgreementChange = () => {
      setAgreed(!agreed);
    };

  return (
    <>
      <Stepper activeStep={activeStep}>
        <Step label="Page 1" />
        <Step label="Page 2" />
        <Step label="Page 3" />
        <Step label="Page 4" />
      </Stepper>
      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <PageOne formData={formData} handleChange={handleFormChange} />
        )}
        {activeStep === 1 && (
          <PageTwo formData={formData} handleChange={handleFormChange} />
        )}
        {activeStep === 2 && (
          <PageThree formData={formData} handleChange={handleFormChange} />
        )}
        {activeStep === 3 && (
          <PageFour formData={formData} handleChange={handleFormChange} agreed={agreed} handleAgreementChange={handleAgreementChange} />
        )}
        {activeStep < 3 && (
          <button type="button" onClick={nextStep}>Next</button>
        )}
        {activeStep > 0 && (
          <button type="button" onClick={prevStep}>Back</button>
        )}
        {activeStep === 3 && agreed && (
          <button type="submit">Submit</button>
        )}
        {Object.keys(formErrors).length > 0 && (
          <div className="error-message">
            {Object.values(formErrors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default MultiStepForm;
