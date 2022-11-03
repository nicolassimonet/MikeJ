import React from "react";
import './style.scss';
import Logo from './../../assets/logo.png'
import { Link } from "react-router-dom";
import { auth } from './../../firebase/utils'


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

export default Header;