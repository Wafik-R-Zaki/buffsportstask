import React, { useState } from 'react';
import { Grid, TextField, Checkbox, Paper, Button, List, ListItem, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
// import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SetSelectedQuestion, UpdateAnswerValue } from "../../actions";
import style from './AddQuestion.scss';
import Title from '../../Utilities/UI/Title';

function AddQuestion({ onAddQuestion }) {
  const dispatch = useDispatch();
  const question = useSelector(state => state.SelectedQuestion);
  // const [question, setQuestion] = useState({ ...editQuestion });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const total = question.questionAnswers.length;
  const incorrect = question.questionAnswers.filter((value) => !value.isCorrect).length;
  const hasAnyEmptyAnswers = question.questionAnswers.some((value) => !value.answer);
  const checkValidation = (isChecked) => {
    if (isChecked && incorrect === 1) {
      setSnackbarMessage("you must have at least one incorrect answer!");
      setOpenSnackbar(true);
      return false;
    }
    if (!isChecked && (incorrect + 1) === total) {
      setSnackbarMessage("you must have at least one correct answer!");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    const newVal = { ...question, [e.target.id]: e.target.value };
    dispatch(SetSelectedQuestion(newVal));
  };
  const handleCheckChange = (e) => {
    /* if (e.target.checked) {
      selectedRoles = [...question.questionAnswers, e.target.value];
    } else {
      selectedRoles = question.questionAnswers.filter((value) => value !== e.target.value);
    } */

    if (!checkValidation(e.target.checked)) { return; }

    /* const selectedAnswer = question.questionAnswers.find((answer) => answer.ansId == e.target.value);
    selectedAnswer.isCorrect = e.target.checked;
    const newQuestion = { ...question }; */
    dispatch(UpdateAnswerValue({ ansId: e.target.value, isCorrect: e.target.checked }));
  };

  const handleAnswersChange = (e) => {
    /* const selectedAnswer = question.questionAnswers.find((answer) => answer.ansId == e.target.id);
    selectedAnswer.answer = e.target.value;
    const newQuestion = { ...question }; */
    dispatch(UpdateAnswerValue({ ansId: e.target.id, answer: e.target.value }));
  };

  const validateForm = question.question && incorrect && incorrect < total && !hasAnyEmptyAnswers;

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => { setOpenSnackbar(false); }}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Paper className={`${style.fixedHeight} ${style.paper}`}>
          <Title variant="h6" gutterBottom>
            Eidt Question
          </Title>
          <Grid item xs={12}>
            <TextField
              required
              error={!question.question}
              id="question"
              name="question"
              value={question.question}
              onChange={handleChange}
              label="Question"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Title>
              Answers
            </Title>
          </Grid>
          <Grid item xs={12}>

            <List>
              {question.questionAnswers.map((answer) => (
                <ListItem key={answer.ansId}>
                  <Grid container xs={12}>
                    <Grid item xs={10}>
                      <TextField
                        id={answer.ansId}
                        variant="outlined"
                        value={answer.answer}
                        size="small"
                        className={style.field}
                        onChange={handleAnswersChange}
                        required
                        error={!answer.answer}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Checkbox color="primary" onChange={handleCheckChange} checked={answer.isCorrect} value={answer.ansId} />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid xs={12} item>
            <Button variant="contained" color="primary" disabled={!validateForm} onClick={() => { onAddQuestion(question); }}>
              Save Question
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default AddQuestion;
