import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

import { auth, handleUserProfile } from "./../../firebase/utils";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "./../forms/Button";


const Signup = props => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      const err = ["Les mot de passe ne correspondent pas."];
      setErrors(err);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });
      reset();
      navigate('/')

    } catch (err) {
      console.log(err);
    }
  };


      const configAuthWrapper = {
        headline: 'Inscription'
      }

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="form__wrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}

          <form onSubmit={handleFormSubmit}>
            
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Nom complet"
              handleChange={e => setDisplayName(e.target.value)}
            />

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={e => setEmail(e.target.value)}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Mot de passe"
              handleChange={e => setPassword(e.target.value)}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirmer le mot de passe"
              handleChange={e => setConfirmPassword(e.target.value)}
            />

            <Button type="submit">Inscription</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }

export default Signup;
