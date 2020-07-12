import React from 'react';
import './index.scss';

function FooterNav({ HomeNav }) {
  const navStyle = HomeNav ? 'HomeNav' : 'FooterNav';
  return (
    <nav className={navStyle}>
      <nav>
        <ul className="NavigationLinks">
          <li>
            <a href="https://www.google.lt/">About</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Help</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Press</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Api</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Jobs</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Privacy</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Terms</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Locations</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Top Accounts</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Hashtags</a>
          </li>
          <li>
            <a href="https://www.google.lt/">Language</a>
          </li>
        </ul>
      </nav>
      <span className="Copyright">© 2020 IG clone by MZ</span>
    </nav>
  );
}
export default FooterNav;
