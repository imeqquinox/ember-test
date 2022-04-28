import React from 'react';

import { ReactComponent as Logo } from '../assets/logo.svg';

function NavBar() {
  return (
    <div className='navbar_container'>
      <Logo className='logo' />
      <nav>
        <ul className='nav_links'>
          <li><a href='/'>Live Map</a></li>
          <li><a href='/'>FAQ</a></li>
          <li><a href='/'>Contact</a></li>
        </ul>
      </nav>
      <a className='login' href='/'><button>Log In</button></a>
    </div>
  )
}

export default NavBar