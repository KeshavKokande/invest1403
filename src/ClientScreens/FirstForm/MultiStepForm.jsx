// import React, { useState,useEffect } from 'react';
// import { Stepper, Step } from 'react-form-stepper';
// import './Page.css';
// import PageOne from './PageOne';
// import PageTwo from './PageTwo';
// import PageThree from './PageThree';
// import { useLocation } from 'react-router-dom'; 

// const MultiStepForm = () => {
//   const location = useLocation(); // Initialize useLocation hook
//   const queryParams = new URLSearchParams(location.search); // Get URL parameters
//   const initialName = queryParams.get('name') || '';
//   const initialEmail = queryParams.get('email') || '';
//   const [formData, setFormData] = useState({
//     name: initialName,
//     age: '',
//     gender: '',
//     qualification: '',
//     email:initialEmail,
//     address: '',
//     jobRole: '',
//     agreement: false,
//     photoId: ''
//   });

//   const [activeStep, setActiveStep] = useState(0);
//   const [formErrors, setFormErrors] = useState({});
//   const [termsAgreed, setTermsAgreed] = useState(false);

//   const handleFormChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const validatePageOne = () => {
//     const errors = {};
//     // if (!formData.age) errors.age = 'Age is required';
//     // if (!formData.qualification) errors.qualification = 'Qualification is required';
//     // if (!formData.address) errors.address = 'Address is required';
//     // if (!formData.jobRole) errors.jobRole = 'Job Role is required';
//     return errors;
//   };

//   const validatePageTwo = () => {
//     // Validation logic for PageTwo fields
//     return {};
//   };

//   const validatePageThree = () => {
//     const errors = {};
//     if (!formData.agreement) errors.agreement = 'You must agree to the terms and conditions';
//     return errors;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Form submitted:', formData);

//     // Replace 'your-api-endpoint' with your actual API endpoint
//     // fetch('your-api-endpoint', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify(formData),
//     // })
//     //   .then((response) => response.json())
//     //   .then((data) => console.log('API response:', data))
//     //   .catch((error) => console.error('Error:', error));
//   };

//   const nextStep = () => {
//     let errors = {};
//     // Validate current step
//     switch (activeStep) {
//       case 0:
//         errors = validatePageOne();
//         break;
//       case 1:
//         errors = validatePageTwo();
//         break;
//       case 2:
//         errors = validatePageThree();
//         break;
//       default:
//         break;
//     }
    
//     // Proceed to next step if there are no errors
//     if (Object.keys(errors).length === 0) {
//       setActiveStep(activeStep + 1);
//       setFormErrors({});
//     } else {
//       // Show alert for errors
//       alert(Object.values(errors).join('\n'));
//       setFormErrors(errors);
//     }
//   };
  
//   const prevStep = () => {
//     setActiveStep(activeStep - 1);
//     setFormErrors({});
//   };

//     const handleAgreementChange = () => {
//       setFormData({ ...formData, agreement: !formData.agreement });
//       setTermsAgreed(!termsAgreed); // Update terms agreement state
//     };

//   return (
//     <>
//       <Stepper activeStep={activeStep}>
//         <Step label="Personal Details" />
//         <Step label="Questionnaire" />
//         <Step label="Terms & Conditions" />
//       </Stepper>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         {activeStep === 0 && (
//           <PageOne formData={formData} handleChange={handleFormChange} />
//         )}
//         {activeStep === 1 && (
//           <PageTwo formData={formData} handleChange={handleFormChange} />
//         )}
//         {activeStep === 2 && (
//           <PageThree formData={formData} handleChange={handleFormChange} agreed={formData.agreement} handleAgreementChange={handleAgreementChange} />
//           )}
//         <div className={`btns ${termsAgreed ? 'terms-agreed' : ''}`}>

//         {activeStep < 2 && (
//           <button type="button" className='next-button' onClick={nextStep}>Next</button>
//           )}
//         {activeStep > 0 && (
//           <button type="button" className='prev-button' onClick={prevStep}>Back</button>
//           )}
//           </div>
//         {Object.keys(formErrors).length > 0 && (
//           <div className="error-message">
//             {Object.values(formErrors).map((error, index) => (
//               <p key={index}>{error}</p>
//               ))}
//           </div>
//         )}
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// };

// export default MultiStepForm;





// MultiStepForm.js

import React, { useState, useEffect } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import './Page.css';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import { useLocation } from 'react-router-dom';

const MultiStepForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialName = queryParams.get('name') || '';
  const initialEmail = queryParams.get('email') || '';
  const [formData, setFormData] = useState({
    name: initialName,
    age: '',
    gender: '',
    qualification: '',
    email: initialEmail,
    address: '',
    jobRole: '',
    agreement: false,
    photoId: ''
  });

  const [activeStep, setActiveStep] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [termsAgreed, setTermsAgreed] = useState(false);

  useEffect(() => {
    setFormErrors({});
  }, [activeStep]);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the error message when user starts typing
    }));
  };

  const validatePageOne = () => {
    const errors = {};
    if (!formData.age || isNaN(formData.age) || formData.age <= 18) {
      errors.age = 'Age must be a number >= than 18';
    }
    if (!formData.qualification.trim()) {
      errors.qualification = 'Qualification is required';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!formData.jobRole.trim()) {
      errors.jobRole = 'Job Role is required';
    }
    return errors;
  };

  const validatePageTwo = () => {
    // Validation logic for PageTwo fields
    return {};
  };

  const validatePageThree = () => {
    const errors = {};
    if (!formData.agreement) {
      errors.agreement = 'You must agree to the terms and conditions';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  const nextStep = () => {
    let errors = {};
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
      default:
        break;
    }

    if (Object.keys(errors).length === 0) {
      setActiveStep(activeStep + 1);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAgreementChange = () => {
    setFormData({ ...formData, agreement: !formData.agreement });
    setTermsAgreed(!termsAgreed);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        <Step label="Personal Details" />
        <Step label="Questionnaire" />
        <Step label="Terms & Conditions" />
      </Stepper>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {activeStep === 0 && (
          <PageOne formData={formData} handleChange={handleFormChange} errors={formErrors} />
        )}
        {activeStep === 1 && (
          <PageTwo formData={formData} handleChange={handleFormChange} />
        )}
        {activeStep === 2 && (
          <PageThree formData={formData} handleChange={handleFormChange} agreed={formData.agreement} handleAgreementChange={handleAgreementChange} />
        )}
        <div className={`btns ${termsAgreed ? 'terms-agreed' : ''}`}>
          {activeStep < 2 && (
            <button type="button" className='next-button' onClick={nextStep} disabled={Object.keys(formErrors).length > 0}>Next</button>
          )}
          {activeStep > 0 && (
            <button type="button" className='prev-button' onClick={prevStep}>Back</button>
          )}
        </div>
        {Object.keys(formErrors).length > 0 && (
          <div className="error-message">
            {Object.values(formErrors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MultiStepForm;