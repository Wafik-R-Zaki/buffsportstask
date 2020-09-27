import { shallow } from 'enzyme';
import React from 'react';
import SignIn from './login';


it("renders without crashing", () => {
  shallow(<SignIn />);
});


it("find email input", () => {
  const wrapper = shallow(<SignIn />);
  expect(wrapper.exists('#email')).toBe(true);
});
