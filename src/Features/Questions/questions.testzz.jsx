import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import QuestionsComponent from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
it("renders without crashing", () => {
  shallow(<QuestionsComponent />);
});

it("find email input", () => {
  const wrapper = shallow(<QuestionsComponent />);
  expect(wrapper.exists('#email')).toBe(true);
});
