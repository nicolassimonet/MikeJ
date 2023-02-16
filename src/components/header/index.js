import React from "react";
import { connect } from "react-redux";
import './style.scss';

import { Link } from "react-router-dom";
import { auth } from './../../firebase/utils'

import Logo from './../../assets/logo.png'


const Header = props => {
  
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="MikeJ Logo" />
          </Link>
        </div>

        <div className="call__to-actions">

          {currentUser && (
            <ul>
            <li>
              <Link to="/profil">
                Profil
              </Link>
            </li>
              <li>
                <span className="logout__btn" onClick={() => auth.signOut()}>
                  Deconnexion
                </span>
              </li>
            </ul>
          )}

          {!currentUser && (
          <ul>
            <li>
              <Link to="/register">
                Inscription
              </Link>
            </li>
            <li>
              <Link to="/login">
                Connexion
              </Link>
            </li>
          </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null
};

const mapStateToProps = ({ user }) => {
  console.log(user);
  return {

    currentUser: user.currentUser
  }
}

export default connect(mapStateToProps, null)(Header);