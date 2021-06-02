import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { appContext } from '../context.js'
/**
 * Authors: Jordan Kind, Taylor Davis
 * Drop Down Component to Display IP Addrresses, as well as create
 * clickable buttons to Fetch new data upon updated IP address toggle. 
 */
export default function SimpleMenu() {
  //create anchor element to place a specific IP on the top to anchor our dropdown. 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { ip, setIP, ipArray } = useContext(appContext);
  const menuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = (event) => {
    const newIp = ipArray[event.target.id]
    setIP(newIp);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Create Array to Populate W/ function upon each new render. 
  const iPmenuItems = [];
  if (ipArray.length > 0) {
  for(let i = 0; i < ipArray.length; i++) {
    iPmenuItems.push(  
    <MenuItem 
    style={{
      background: "gray",
      color: "black", 
      fontFamily: "Arial"
    }}
    key = {`Key${i}`} 
    id={i} 
    onClick={handleClick}>{ipArray[i]}</MenuItem>)
    }
  };
  const mystyle = {
    color: "yellow", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "baseline", 
    fontFamily: "Arial",
  };
  return (
    <div style={mystyle}>
      <Button 
      style={{color: "yellow"}}
      aria-controls="simple-menu" 
      aria-haspopup="true" 
      onClick={menuClick}>
        Kubernetes Cluster Address
      </Button>
      <div>{ip}</div>
      <Menu
        style={{mystyle}}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {iPmenuItems}
      </Menu>
    </div>
  );
}
