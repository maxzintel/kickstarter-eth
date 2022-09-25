import React from "react";
import { Menu } from 'semantic-ui-react';
 
const Header = () => {
  return (
    // To use JSX to pass in an object literal, we need two sets of curlys
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item name="title">
        Kickstarter
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          Campaigns
        </Menu.Item>
        <Menu.Item>
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;