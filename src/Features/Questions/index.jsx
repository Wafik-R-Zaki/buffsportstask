import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../Utilities/UI/Title';
import style from './Questions.css';
import AddQuestion from './AddQuestion';
import QuestionsList from './questionsList';
import { FetchTopQuestions } from "../../actions";

export default function QuestionsComponent() {
  const selectedQuestion = useSelector(state => state.SelectedQuestion);
  const dispatch = useDispatch();

  const searchQuestions = () => {
    dispatch(FetchTopQuestions);
  };
  React.useEffect(() => {
    searchQuestions();
  }, []);
  return (

    <>
      <Grid item xs={12} sm={5}>
        {selectedQuestion && selectedQuestion.questionAnswers
          ? <AddQuestion question={selectedQuestion} />
          : ""}
      </Grid>
      <Grid item xs={12} sm={7}>
        <Paper className={` ${style.paper}`}>
          <Title gutterBottom>Questions</Title>
          <Button variant="contained" color="primary" onClick={() => { searchQuestions(); }}>
            Reload
          </Button>
          <QuestionsList />
        </Paper>
      </Grid>

    </>

  );
}
