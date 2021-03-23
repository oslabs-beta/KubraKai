import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { context } from '../context.js'
/**
 * Authors: Jordan Kind, Taylor Davis
 * @param {*} 
 * 
 * 
 * 
 */
export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { ip, setIP, ipArray } = useContext(context);

  const menuClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  
  const handleClick = (event) => {
    const newIp = ipArray[event.target.id]
    setIP(newIp);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const iPmenuItems = [];
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
  const mystyle = {
    color: "yellow", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "baseline", 
    fontFamily: "Arial",
  }

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
