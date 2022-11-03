import React from "react";
import './styles.scss';


const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="form__row">
      {label && (
        <label>
          {label}
        </label>
      )}
      
      <input className="form__input" onChange={handleChange} {...otherProps} />
    </div>
  )
}

export default FormInput