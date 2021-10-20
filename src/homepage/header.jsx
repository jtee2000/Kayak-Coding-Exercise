import React, { Component } from 'react';
import '../stylesheets/header.css';
import logo from '../assets/Logo.svg'


class Header extends Component {
  render() {
    return (
      <div className="navbar-container">
        <img src={logo} alt="kayak-logo"/>
      </div>
    );
  }
}

export default Header;