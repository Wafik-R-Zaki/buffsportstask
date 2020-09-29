/* eslint-disable no-console */
import React from 'react';
import { Button, Grid, Card, CardContent, List, ListItem, Typography } from '@material-ui/core';
import { List as ListIcon, Visibility } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import style from './Questions.css';
import QuestionsSkeleton from './quetionsSkeleton';
import ConfirmDialog from './confirmAlert';
import { SetSelectedQuestion } from "../../actions";

const useStyles = makeStyles(() => ({
  ActionBtn: {
    marginBottom: "4px",
    width: "100%"
  },
}));
const confirmMessage = "Are you sure you want to delete this question?";

export default function QuestionsList({ questionsList }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const hadnleDialog = (show) => {
    setOpen(show);
  };

  const questionSelected = (question, isView) => {
    let questionAnswers = [];
    if (question) {
      if (question.incorrect_answers) {
        questionAnswers = question.incorrect_answers.map((wrongAnswer, index) => ({ ansId: `${index + 2}`, answer: wrongAnswer, isCorrect: false }));
      }
      if (question.correct_answer) {
        questionAnswers.unshift({ ansId: '1', answer: question.correct_answer, isCorrect: true });
      }
    }
    dispatch(SetSelectedQuestion({ question: question.question, questionAnswers, isView }));
  };

  const classes = useStyles();
  return (
    <>
      <ConfirmDialog
        open={open}
        handleClose={() => hadnleDialog(false)}
        message={confirmMessage}
      />
      {questionsList && questionsList.length ? (

        <List>
          {questionsList && questionsList.length && questionsList.map((question, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={question.correct_answer + index}>
              <Card className={` ${style.card}`}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography variant="h6" component="p">
                        {question.question}
                      </Typography>
                      <Typography>
                        <b>Category:</b>
                        {' '}
                        {question.category}
                      </Typography>
                      <Typography>
                        <b>Difficulty:</b>
                        {' '}
                        {question.difficulty}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.ActionBtn}
                        onClick={() => questionSelected(question, false)}
                      >
                        Edit
                        <ListIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className={classes.ActionBtn}
                        onClick={() => questionSelected(question, true)}
                      >
                        View
                        <Visibility />
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.ActionBtn}
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
