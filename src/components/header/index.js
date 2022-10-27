import React from "react";
import './style.scss';
import Logo from './../../assets/logo.png'
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="MikeJ Logo" />
          </Link>
        </div>

        <div className="call__to-actions">
          <ul>
            <li>
              <Link to="/register">
                Inscription
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;