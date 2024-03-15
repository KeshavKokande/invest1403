import React from 'react';
import Questionnare from "./../../assets/images/questionnare.svg";

const questions = require('./dummyData.json');

const PageTwo = () => {
  return (
    <div className="container">
      <div className="image">
        <img src= {Questionnare} alt="image" />
      </div>
      <div className="form-container form-container1">
        

          {questions.map((question, index) => (
            <div key={index} className="question-container">
              <label>{question.ques}</label>
              {question.type === 'subjective' && (
                <textarea
                  id={`question_${index}`}
                  name={`question_${index}`}
                  className="form-control"
                ></textarea>
              )}
              {question.type === 'yes_no' && (
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`question_${index}`}
                      value="yes"
                      className="form-control"
                    />{' '}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`question_${index}`}
                      value="no"
                      className="form-control"
                    />{' '}
                    No
                  </label>
                </div>
              )}
              {question.type === 'mcq' && (
                <select
                  id={`question_${index}`}
                  name={`question_${index}`}
                  className="form-control"
                >
                  {question.opt.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {question.type === 'range_10' && (
                <input
                  type="range"
                  min="0"
                  max="10"
                  defaultValue="5"
                  id={`question_${index}`}
                  name={`question_${index}`}
                  className="form-control"
                />
              )}
            </div>
          ))}
        
      </div>
    </div>
  );
};

export default PageTwo;