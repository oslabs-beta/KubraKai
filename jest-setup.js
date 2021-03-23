import React from 'react';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import "regenerator-runtime/runtime.js";

configure({adapter: new Adapter()});

module.exports = async () => {
    // global.testServer = await require('./server/server');
  };
  