import { ADD_QUESTION, FETCH_QUESTIONS_TOP, SET_SELECTED_QUESTION, UPDATE_ANSWER_VALUE, UPDATE_LOADING }
  from "../constants/reduxConst";
import Questions from "../services/Api/Questions";

export function UpdateLoading(payload) {
  return { type: UPDATE_LOADING, payload };
}
export function FetchTopQuestions(dispatch) {
  dispatch(UpdateLoading(true));
  Questions.get().then(
    (response) => {
      dispatch({ type: FETCH_QUESTIONS_TOP, payload: response.data.results });
    }).finally(() => dispatch(UpdateLoading(false)));
}
export function SetSelectedQuestion(payload) {
  return { type: SET_SELECTED_QUESTION, payload };
}
export function UpdateAnswerValue(payload) {
  return { type: UPDATE_ANSWER_VALUE, payload };
}
export function AddQuestion(payload) {
  return { type: ADD_QUESTION, payload };
}
