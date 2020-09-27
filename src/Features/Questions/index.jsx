/* eslint-disable no-console */
import React from 'react';
import { Button, Grid, Paper, Card, CardContent, List, ListItem, Typography } from '@material-ui/core';
import { Save as SaveIcon, List as ListIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../Utilities/UI/Title';
import style from './Questions.css';
import AddQuestion from './AddQuestion';
import { FetchTopQuestions, SetSelectedQuestion } from "../../actions";

export default function QuestionsComponent() {
  const questionsList = useSelector(state => state.QuestionsList);
  const dispatch = useDispatch();
  console.log(questionsList);
  const [addQuestionFlag, setAddQuestionFlag] = React.useState(false);

  const searchQuestions = () => {
    dispatch(FetchTopQuestions);
  };
  React.useEffect(() => {
    searchQuestions();
  }, []);
  const questionSelected = (question) => {
    let questionAnswers = [];
    if (question) {
      if (question.incorrect_answers) {
        questionAnswers = question.incorrect_answers.map((wrongAnswer, index) => ({ ansId: index + 2, answer: wrongAnswer, isCorrect: false }));
      }
      if (question.correct_answer) {
        questionAnswers.push({ ansId: 1, answer: question.correct_answer, isCorrect: true });
      }
    }
    dispatch(SetSelectedQuestion({ question: question.question, questionAnswers }));
    setAddQuestionFlag(true);
  };

  return (

    <>
      <Grid item xs={12} sm={5}>
        <Paper>
          {addQuestionFlag
            /* <AddQuestionEnhanced onAddQuestion={addQuestion} /> */
            ? <AddQuestion />
            : ""}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Paper className={` ${style.paper}`}>
          <Title gutterBottom>Questions</Title>
          <Button variant="contained" color="primary" onClick={() => { searchQuestions(); }}>
            Reload
          </Button>
          <List>
            {questionsList && questionsList.length && questionsList.map((question) => (
              <ListItem>
                <Card className={` ${style.card}`}>
                  <CardContent>
                    <Grid container xs={12}>
                      <Grid item xs={10}>
                        <Typography variant="body2" component="p">
                          {question.question}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          {question.category}
                        </Typography>
                        <Typography color="textSecondary">
                          {question.difficulty}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => questionSelected(question)}
                        >
                          Edit
                          <ListIcon />
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => questionSelected(question)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>

        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={` ${style.paper}`}>
          <Title gutterBottom>Questions</Title>
          <Grid xs={12} item>
            <Button
              variant="contained"
              color="primary"
              disabled={addQuestionFlag}
              onClick={() => setAddQuestionFlag(true)}
            >
              Add Question
              <SaveIcon />
            </Button>
            <Button variant="contained" color="primary" disabled={addQuestionFlag}>
              Reload
            </Button>
          </Grid>
        </Paper>
      </Grid>

    </>

  );
}
