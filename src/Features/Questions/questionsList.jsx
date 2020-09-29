/* eslint-disable no-console */
import React from 'react';
import { Button, Grid, Card, CardContent, List, ListItem, Typography } from '@material-ui/core';
import { List as ListIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import style from './Questions.css';
import QuestionsSkeleton from './quetionsSkeleton';
import ConfirmDialog from './confirmAlert';
import { SetSelectedQuestion } from "../../actions";

export default function QuestionsList({ questionsList }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const hadnleDialog = (show) => {
    setOpen(show);
  };

  const questionSelected = (question) => {
    let questionAnswers = [];
    if (question) {
      if (question.incorrect_answers) {
        questionAnswers = question.incorrect_answers.map((wrongAnswer, index) => ({ ansId: `${index + 2}`, answer: wrongAnswer, isCorrect: false }));
      }
      if (question.correct_answer) {
        questionAnswers.unshift({ ansId: '1', answer: question.correct_answer, isCorrect: true });
      }
    }
    dispatch(SetSelectedQuestion({ question: question.question, questionAnswers }));
  };

  return (
    <>
      <ConfirmDialog open={open} handleClose={() => hadnleDialog(false)} />
      {questionsList && questionsList.length ? (

        <List>
          {questionsList && questionsList.length && questionsList.map((question, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={question.correct_answer + index}>
              <Card className={` ${style.card}`}>
                <CardContent>
                  <Grid container>
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
                        onClick={() => hadnleDialog(true)}
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
      ) : (
        <QuestionsSkeleton />
      )}
    </>
  );
}
