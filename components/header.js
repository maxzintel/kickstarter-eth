import React from "react";
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
 
const Header = () => {
  return (
    // To use JSX to pass in an object literal, we need two sets of curlys
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">
          Kickstarter
        </a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">
            Campaigns
          </a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;