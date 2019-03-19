import Tickets from '../src/components/ticket/Tickets';
import { shallow, mount, render } from 'enzyme';
import React from 'react';

// it('should do something', () => {
//   const wrapper = mount(<Tickets />);
//   let instance = wrapper.instance();
//   const spy = jest.spyOn(instance, 'componentDidMount');
//   expect(spy).toHaveBeenCalledTimes(1);
//   // expect(instance.state.isLoaded).toEqual(true);
// })

it('should do something', () => {
  const spy = jest.spyOn(Tickets.prototype, 'componentDidMount');
  const wrapper = mount(<Tickets />);
  expect(spy).toHaveBeenCalledTimes(1);
  // expect(instance.state.isLoaded).toEqual(true);
})

// it('should do something', () => {
//   const spy = jest.spyOn(Tickets.prototype, 'componentDidMount');
//   shallow(<Tickets />); 
//   // expect(spy).toHaveBeenCalled();
//   expect(Tickets.prototype.state.isLoaded).toEqual(true);
//   Tickets.prototype.componentDidMount.mockRestore();
// })

jest.clearAllMocks();