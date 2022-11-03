import React, { Component } from "react";
import "./styles.scss";
import Buttons from "../forms/Button";
import { signInWithGoogle, auth } from "../../firebase/utils";

import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="signin">
        <div className="wrap">
          <h2>Connexion</h2>

          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Mot de passe"
                handleChange={this.handleChange}
              />

              <Button type="submit">Connexion</Button>

              <div className="socialSignin">
                <div className="row">
                  <Buttons onClick={signInWithGoogle}>
                    Connexion avec Google
                  </Buttons>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
