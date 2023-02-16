/* eslint-disable no-undef */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles.scss";
import Buttons from "../forms/Button";
import { signInWithGoogle, auth } from "../../firebase/utils";

import AuthWrapper from "../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";


const SignIn = props => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {

    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!email) {
        await signInWithGoogle();
      } else {
        await auth.signInWithEmailAndPassword(email, password);
        resetForm();
      }
      navigate('/');
    } catch (err) {
      console.log(err);
      alert("Adresse e-mail ou mot de passe incorrect.");
    }
  };
  

    const configAuthWrapper = {
      headline: 'Connexion'
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>

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

            <Button type="submit">Connexion</Button>

            <div className="socialSignin">
              <div className="row">
                <Buttons onClick={signInWithGoogle}>
                  Connexion avec Google
                </Buttons>
              </div>
            </div>

            <div className="links">
              <Link to="/recovery">
                Mot de passe oublié.
              </Link>
            </div>
            
          </form>
        </div>
      </AuthWrapper>
    );
  }

export default SignIn;
