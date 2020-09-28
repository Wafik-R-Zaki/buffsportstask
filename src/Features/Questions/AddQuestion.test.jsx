import { mount, shallow } from 'enzyme';
import React from 'react';
import { Checkbox } from '@material-ui/core';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import AddQuestion from './AddQuestion';

const mockStore = createStore(rootReducer, { count: 0 });
const question = {
  question: "Which of these teams?",
  questionAnswers: [
    { ansId: 2, answer: "New York Rangers", isCorrect: false },
    { ansId: 3, answer: "Toronto Maple Leafs", isCorrect: false },
    { ansId: 4, answer: "Boston Bruins", isCorrect: false },
    { ansId: 1, answer: "Philadelphia Flyers", isCorrect: true }
  ]
};
const EmptyQuestion = {
  question: "",
  questionAnswers: [
    { ansId: 2, answer: "New York Rangers", isCorrect: false },
    { ansId: 1, answer: "Philadelphia Flyers", isCorrect: true }
  ]
};

const EmptyAnswer = {
  question: "Which of these teams?",
  questionAnswers: [
    { ansId: 2, answer: "", isCorrect: false },
    { ansId: 1, answer: "Philadelphia Flyers", isCorrect: true }
  ]
};

describe("<AddQuestion />", () => {
  it("renders without crashing", () => {
    shallow(<Provider store={mockStore}><AddQuestion /></Provider>);
  });

  it("Check all answers rendered", () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <AddQuestion question={question} />
      </Provider>);
    expect(wrapper.find(Checkbox)).toHaveLength(4);
  });

  it("Check that right answer is cheked ", () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <AddQuestion question={question} />
      </Provider>);

    const checkbox = wrapper.findWhere((n) => n.prop('type') == 'checkbox' && n.prop('value') === 1).hostNodes();
    // console.log(checkbox.map((node) => node.html()));
    expect(checkbox.props().checked).toBe(true);

    const unCheckedCheckbox = wrapper.findWhere((n) => n.prop('type') == 'checkbox' && n.prop('value') === 2).hostNodes();
    expect(unCheckedCheckbox.props().checked).toBe(false);
  });


  it("Check Empty Question Validation ", () => {
    let wrapper = mount(
      <Provider store={mockStore}>
        <AddQuestion question={EmptyQuestion} />
      </Provider>);

    let btnSave = wrapper.find('#btnSave').hostNodes();
    // console.log(btnSave.map((node) => node.html()));
    expect(btnSave.props().disabled).toBe(true);

    wrapper = mount(
      <Provider store={mockStore}>
        <AddQuestion question={question} />
      </Provider>);

    btnSave = wrapper.find('#btnSave').hostNodes();
    // console.log(btnSave.map((node) => node.html()));
    expect(btnSave.props().disabled).toBe(false);
  });


  it("Check Empty Answer Validation ", () => {
    let wrapper = mount(
      <Provider store={mockStore}>
        <AddQuestion question={EmptyAnswer} />
      </Provider>);

    let btnSave = wrapper.find('#btnSave').hostNodes();
    expect(btnSave.props().disabled).toBe(true);

    wrapper = mount(
      <Provider store={mockStore}>
        <AddQuestion question={question} />
      </Provider>);

    btnSave = wrapper.find('#btnSave').hostNodes();
    expect(btnSave.props().disabled).toBe(false);
  });
});
