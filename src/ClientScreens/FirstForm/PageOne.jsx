import React from 'react';

const PageOne = ({ formData, handleChange }) => {
  return (
    <div className="container">
      <div className="form-container">
        
          <div className='question-container'>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div >
          <div className='question-container'>
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className='question-container'>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className='question-container'>
            <label htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className='question-container'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className='question-container'>
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className='question-container'>
            <label htmlFor="jobRole">Job Role:</label>
            <input
              type="text"
              id="jobRole"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="form-control"
            />
          </div>
      </div>
    </div>
  );
};

export default PageOne;