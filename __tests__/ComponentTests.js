import React from 'react';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import "regenerator-runtime/runtime.js";
import { context } from '../client/context';
import Button from '@material-ui/core/Button'; 


import IpInput from '../client/components/ipInput';
configure({adapter: new Adapter()});

describe('React unit tests', () => {
    describe('ipInput', () => {
        let wrapper; 

        beforeAll(() => {
            let data = {
                ipArray: [],
                setipArray: (newArr) => {
                   data.ipArray = newArr;
                   return data
                }
            }
            wrapper = mount(<context.Provider value={data}><IpInput /></context.Provider>)
        })
    
        it('Renders a <Button> with the label in Aria', () => {
            console.log(toJson(wrapper))
            expect(wrapper.contains(<IpInput/>)).toEqual(true);
        }) 
    });
});