import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import wordService from '../../services/wordService';
import './WordForm.css';

const validate = ({ word, sound, type, meaning, sentence, sentenceSp  }) => {
  const error = {};
  if(!word || word.trim() === ''){
    error.word = 'Word is required';
  }
  if(!sound || sound.trim() === ''){
    error.sound = 'Sound is required';
  }
  if(!type || type.trim() === ''){
    error.type = 'Type is required';
  }
  if(!meaning || meaning.trim() === ''){
    error.meaning = 'Meaning is required';
  }
  if(!sentence || sentence.trim() === ''){
    error.sentence = 'Sentence is required';
  }
  if(!sentenceSp || sentenceSp.trim() === ''){
    error.sentenceSp = 'Sentence spanish is required';
  }
  return error;
};

const emptyError = (error) => Object.keys(error).length === 0;
const doSubmit = (values) => {
  const error = validate(values);
  if (emptyError(error)) {
    console.log(JSON.stringify(error));
    console.log(values);
    wordService.createWord(values).then((resp) => {
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

const getMessage = (touched, error) => {
  if (touched && error) {
    return <span className="text-danger">{error}</span>;
  }
  return '';
};

const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <>
    <label className="login-title">
      {label}
    </label>
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...input}
      type={type}
      className={(error) ? 'login-input danger' : 'login-input'}
      autocomplete={label==='Word' || label==='Sound'?'off':'on'}
    />
    {getMessage(touched, error)}
  </>
);

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
let WordForm = ({
  handleSubmit, pristine, submitting, reset
}) => {

  return (
    <form className="login-form" onSubmit={handleSubmit(doSubmit)}>
      <div className="form-group">
        <Field name="word" component={renderField} label="Word" type="text" />
      </div>
      <div className="form-group">
        <Field name="sound" component={renderField} label="Sound" type="text" />
      </div>
      <div className="form-group">
        <Field name="type" component={renderField} label="Type" type="text" />
      </div>
      <div className="form-group">
        <Field name="meaning" component={renderTextArea} label="Meaning" />
      </div>
      <div className="form-group">
        <Field name="sentence" component={renderTextArea} label="Sentence" />
      </div>
      <div className="form-group">
        <Field name="sentenceSp" component={renderTextArea} label="Sentence Spanish" />
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


const FinalWordForm = reduxForm({
  form: 'wordForm',
  validate,
})(WordForm);

export default FinalWordForm;