import React, { useState } from 'react';

const PageThree = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  return (
    <div className="container">
      <div className="form-container">
        
        
          <div className="form-group className='question-container'">
            <label htmlFor="photoId">Upload Photo ID:</label>
            <input
              type="file"
              id="photoId"
              name="photoId"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="form-control-file"
            />
          </div>
          {photo && (
            <div className="preview-container">
              <p>Preview:</p>
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded Photo ID"
                className="preview-image"
              />
            </div>
          )}
        
      </div>
    </div>
  );
};

export default PageThree;