import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import SentenceService from '../../services/sentenceService';

import './SentenceForm.css'

const validate = ({ sentence, spanishSentence  }) => {
  const error = {};
  
  if(!sentence || sentence.trim() === ''){
    error.sentence = 'Sentence is required';
  }
  if(!spanishSentence || spanishSentence.trim() === ''){
    error.spanishSentence = 'Sentence spanish is required';
  }
  return error;
};

const emptyError = (error) => Object.keys(error).length === 0;
const doSubmit = (values) => {
  const error = validate(values);
  if (emptyError(error)) {
    console.log(JSON.stringify(error));
    console.log(values);
    SentenceService.createSentence(values).then((resp) => {
      console.log(resp)
      alert('saved correctly!')
      window.location.reload(false);
    }).catch((e)=> {
      console.log(e);
      alert("error !!!");
    });
  } else {
    
    throw new SubmissionError(error);
  }
};

const renderTextArea = ({label, input, meta: { touched, error, warning }}) => (
  <div>
      <label>{label}</label>
      <div>
          <textarea {...input} placeholder="Content" rows="10" cols="40"/>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
  </div>
);

// eslint-disable-next-line import/no-mutable-exports
let SentenceForm = ({
  handleSubmit, pristine, submitting, reset
}) => {

  return (
    <form className="sentence-form" onSubmit={handleSubmit(doSubmit)}>
      <div className="form-group">
        <Field name="sentence" component={renderTextArea} label="Sentence" />
      </div>
      <div className="form-group">
        <Field name="spanishSentence" component={renderTextArea} label="Spanish Sentence" />
      </div>
      <div className="form-group">
        <button type="submit" className="login-button">
          Save data correctly
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          reset
        </button>
      </div>
    </form>
  );
};


const FinalSentenceForm = reduxForm({
  form: 'sentenceForm',
  validate,
})(SentenceForm);

export default FinalSentenceForm;