import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

import { auth } from './../../firebase/utils'


const EmailPassword = () => {
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]); // Ajoutez cette ligne pour gérer les erreurs
  const navigate = useNavigate();
  

  const handleChange = e => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const config = {
        url: 'http://localhost:3000/login'
      };
      
      await auth.sendPasswordResetEmail(email, config )
      .then(() => {
          navigate('/login');
          console.log("aucun problème");
        })
        .catch(() => {
          setErrors([`Veuillez founir une adresse mail valide.`]);
          console.log("un problème est survenue");
        });

    } catch (err) {
      console.log(err);
    }
  }
  
    const configAuthWrapper = {
      headline: 'Récupération de mot de passe'
    };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="form__wrap">

      {errors && errors.length > 0 && ( // Vérifiez si errors est vide avant de l'afficher
          <ul>
            {errors.map((e, index) => {
              return (
                <li key={index}>
                  {e}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />

          <Button type="submit">
            Email du compte
          </Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default EmailPassword;
