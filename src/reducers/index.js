import { ADD_QUESTION, FETCH_QUESTIONS_TOP, SET_SELECTED_QUESTION, UPDATE_ANSWER_VALUE } from "../constants/reduxConst";

const intialState = {
  QuestionsList: [],
  SelectedQuestion: {}
};

function rootReducer(state = intialState, action) {
  if (action.type === ADD_QUESTION) {
    return { QuestionsList: [...state, action.payload] };
  }
  if (action.type === FETCH_QUESTIONS_TOP) {
    return { ...state, QuestionsList: [...action.payload, ...state.QuestionsList] };
  }
  if (action.type === SET_SELECTED_QUESTION) {
    return { ...state, SelectedQuestion: action.payload };
  }
  if (action.type === UPDATE_ANSWER_VALUE) {
    const answers = state.SelectedQuestion.questionAnswers.map((item) => {
      if (item.ansId == action.payload.ansId) {
        return { ...item, ...action.payload };
      }

      // Leave every other item unchanged
      return item;
    });
    return { ...state, SelectedQuestion: { ...state.SelectedQuestion, questionAnswers: answers } };
  }
  return state;
}

export default rootReducer;
