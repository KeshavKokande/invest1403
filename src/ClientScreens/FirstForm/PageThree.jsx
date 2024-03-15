import React, { useState } from 'react';
import termsAndConditions from "./../../assets/images/terms_conditions.svg";

const PageThree = () => {
  const [agreed, setAgreed] = useState(false);

  const handleAgreementChange = () => {
    setAgreed(!agreed);
  };

  return (
    <div className="container">
      <div className="image">
        <img src= {termsAndConditions} alt="image" />
      </div>
      <div className="form-container form-container2">
        {/* <h2>Page 4</h2> */}
        
          <div className="terms">
            <h3>Terms and Conditions</h3>
            <p>
              By proceeding, you agree to abide by the terms and conditions
              outlined in our agreement.
            </p>
            <p>
              This is where you include all your terms and conditions text.
              Make sure it's clear and easy to understand.
            </p>
          </div>
          <div className="checkbox-container">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={agreed}
                onChange={handleAgreementChange}
                className="form-control-checkbox"
              />
            <label htmlFor="agreement">I agree to the terms and conditions</label>
          </div>
        
      </div>
    </div>
  );
};

export default PageThree;