import React from 'react';
import { Button, Grid, Paper, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../Utilities/UI/Title';
import style from './Questions.css';
import AddQuestion from './AddQuestion';
import ViewQuestion from './viewQuestion';
import QuestionsList from './questionsList';
import { FetchTopQuestions } from "../../actions";

const loadingText = 'Loading    ';
export default function QuestionsComponent() {
  const questionsList = useSelector(state => state.QuestionsList);
  const selectedQuestion = useSelector(state => state.SelectedQuestion);
  const isLoading = useSelector(state => state.IsLoading);
  const dispatch = useDispatch();

  const searchQuestions = () => {
    dispatch(FetchTopQuestions);
  };
  React.useEffect(() => {
    searchQuestions();
  }, []);

  let questionComponent = "";
  if (selectedQuestion && selectedQuestion.questionAnswers) {
    questionComponent = selectedQuestion.isView
      ? <ViewQuestion question={selectedQuestion} />
      : <AddQuestion question={selectedQuestion} />;
  }

  return (

    <>
      <Grid item xs={12} sm={5}>
        {questionComponent}
      </Grid>
      <Grid item xs={12} sm={7}>
        <Paper className={` ${style.paper}`}>
          <Title gutterBottom>Questions</Title>
          <Button variant="contained" color="primary" onClick={() => { searchQuestions(); }} disabled={isLoading}>
            {isLoading && (
              <>
                <span>{loadingText}</span>
                <CircularProgress size={14} />
              </>
            )}
            {!isLoading && 'Load More'}
          </Button>
          <QuestionsList questionsList={questionsList} />
        </Paper>
      </Grid>

    </>

  );
}
